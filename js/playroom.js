// Interactive metal drawing and paper experiments.
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s),
    reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let mode = "metal";
  function resize(canvas) {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const d = Math.min(window.devicePixelRatio || 1, 2),
      w = r.width,
      h = r.height;
    canvas.width = Math.round(w * d);
    canvas.height = Math.round(h * d);
    return { w, h, d };
  }

  const tabs = [...document.querySelectorAll("[data-mode]")];
  function selectTab(tab) {
    mode = tab.dataset.mode;
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on);
      t.tabIndex = on ? 0 : -1;
      $("#panel-" + t.dataset.mode).hidden = !on;
    });
    if (mode === "fold") drawFold();
  }
  tabs.forEach((t, i) => {
    t.onclick = () => selectTab(t);
    t.onkeydown = (e) => {
      let n = i;
      if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") n = (i + tabs.length - 1) % tabs.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabs.length - 1;
      else return;
      e.preventDefault();
      tabs[n].focus();
      selectTab(tabs[n]);
    };
  });
  // An actual height field, lit from its surface normals. No external texture needed.
  const metal = $("#metal"),
    mc = metal.getContext("2d"),
    W = 760,
    H = 440,
    height = document.createElement("canvas");
  height.width = W;
  height.height = H;
  const hc = height.getContext("2d", { willReadFrequently: true });
  let lightX = -0.7,
    lightY = -0.5,
    drawing = false,
    lastPoint = null,
    metalDirty = true;
  function point(e, c) {
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    };
  }
  function stroke(a, b) {
    hc.strokeStyle = "white";
    hc.lineCap = "round";
    hc.lineJoin = "round";
    hc.lineWidth = +$("#brush").value;
    hc.shadowColor = "white";
    hc.shadowBlur = 5;
    hc.beginPath();
    hc.moveTo(a.x, a.y);
    hc.lineTo(b.x, b.y);
    hc.stroke();
    metalDirty = true;
  }
  function initialMark() {
    hc.clearRect(0, 0, W, H);
    hc.shadowBlur = 4;
    hc.shadowColor = "white";
    hc.fillStyle = "white";
    hc.font = "italic 150px Georgia";
    hc.textAlign = "center";
    hc.fillText("keep.", W / 2, H * 0.62);
    metalDirty = true;
  }
  function renderMetal() {
    const z = hc.getImageData(0, 0, W, H).data,
      out = mc.createImageData(W, H),
      d = out.data;
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        const i = (y * W + x) * 4,
          nx = (z[i - 4 + 3] - z[i + 4 + 3]) * 0.045,
          ny = (z[i - W * 4 + 3] - z[i + W * 4 + 3]) * 0.045;
        const norm = Math.sqrt(nx * nx + ny * ny + 1),
          diff = (nx * lightX + ny * lightY + 1) / norm;
        const sweep =
          25 * Math.sin((x / W) * 13 + (y / H) * 0.7) + 15 * Math.sin((x / W) * 28);
        const shine = Math.pow(Math.max(0, diff / 1.25), 12) * 100;
        const val = Math.max(
          20,
          Math.min(
            250,
            112 + diff * 45 + sweep + shine + Math.sin(y * 8.1 + x * 0.021) * 2
          )
        );
        d[i] = val;
        d[i + 1] = val;
        d[i + 2] = val * 0.97;
        d[i + 3] = 255;
      }
    mc.putImageData(out, 0, 0);
    metalDirty = false;
  }
  metal.onpointerdown = (e) => {
    drawing = true;
    lastPoint = point(e, metal);
    metal.setPointerCapture(e.pointerId);
    stroke(lastPoint, { x: lastPoint.x + 0.1, y: lastPoint.y });
  };
  metal.onpointermove = (e) => {
    const p = point(e, metal);
    lightX = (p.x / W - 0.5) * 1.5;
    lightY = (p.y / H - 0.5) * 1.5;
    if (drawing) {
      stroke(lastPoint, p);
      lastPoint = p;
    }
    metalDirty = true;
  };
  metal.onpointerup = metal.onpointercancel = () => {
    drawing = false;
    lastPoint = null;
  };
  $("#clear-metal").onclick = () => {
    hc.clearRect(0, 0, W, H);
    metalDirty = true;
  };
  $("#mark").onclick = () => {
    const start = { x: 160 + Math.random() * 280, y: 150 + Math.random() * 100 };
    for (let i = 1; i < 80; i++) {
      const p = { x: start.x + i * 2.5, y: start.y + Math.sin(i * 0.09) * 45 };
      stroke(i === 1 ? start : lastPoint, p);
      lastPoint = p;
    }
  };
  $("#save-metal").onclick = () => {
    if (metalDirty) renderMetal();
    const a = document.createElement("a");
    a.download = "a-trace.png";
    a.href = metal.toDataURL("image/png");
    a.click();
  };
  initialMark();
  renderMetal();
  // Triangulated paper surface. Every triangle keeps the corresponding part of the note.
  const fold = $("#fold"),
    fc = fold.getContext("2d"),
    paper = document.createElement("canvas");
  paper.width = 480;
  paper.height = 600;
  const pc = paper.getContext("2d");
  let amount = 0,
    foldDrag = null;
  function texture() {
    pc.fillStyle = "#eee7d8";
    pc.fillRect(0, 0, 480, 600);
    pc.strokeStyle = "#b1a798";
    pc.strokeRect(23, 23, 434, 554);
    pc.fillStyle = "#544e45";
    pc.font = "13px Courier New";
    pc.fillText("A NOTE TO KEEP", 42, 65);
    pc.font = "48px Archive Hand, cursive";
    const words = $("#note-text").value.trim().split(/\s+/);
    let line = "",
      y = 185;
    words.forEach((word) => {
      if (pc.measureText(line + word).width > 390 && line) {
        pc.fillText(line, 42, y);
        y += 65;
        line = "";
      }
      line += word + " ";
    });
    pc.fillText(line, 42, y);
    pc.font = "14px Courier New";
    pc.fillText("fold / unfold / remember", 42, 520);
    pc.fillText("my favourite archives", 42, 545);
    for (let i = 0; i < 2300; i++) {
      pc.fillStyle = i % 2 ? "#ffffff12" : "#00000012";
      pc.fillRect((i * 73.19) % 480, (i * 31.57) % 600, 1, 1);
    }
  }
  function drawTriangle(a, b, c, sa, sb, sc) {
    const den = sa.x * (sb.y - sc.y) + sb.x * (sc.y - sa.y) + sc.x * (sa.y - sb.y);
    if (!den) return;
    const m1 = (a.x * (sb.y - sc.y) + b.x * (sc.y - sa.y) + c.x * (sa.y - sb.y)) / den,
      m3 = (a.x * (sc.x - sb.x) + b.x * (sa.x - sc.x) + c.x * (sb.x - sa.x)) / den,
      m5 =
        (a.x * (sb.x * sc.y - sc.x * sb.y) +
          b.x * (sc.x * sa.y - sa.x * sc.y) +
          c.x * (sa.x * sb.y - sb.x * sa.y)) /
        den;
    const m2 = (a.y * (sb.y - sc.y) + b.y * (sc.y - sa.y) + c.y * (sa.y - sb.y)) / den,
      m4 = (a.y * (sc.x - sb.x) + b.y * (sa.x - sc.x) + c.y * (sb.x - sa.x)) / den,
      m6 =
        (a.y * (sb.x * sc.y - sc.x * sb.y) +
          b.y * (sc.x * sa.y - sa.x * sc.y) +
          c.y * (sa.x * sb.y - sb.x * sa.y)) /
        den;
    fc.save();
    fc.beginPath();
    fc.moveTo(a.x, a.y);
    fc.lineTo(b.x, b.y);
    fc.lineTo(c.x, c.y);
    fc.closePath();
    fc.clip();
    fc.transform(m1, m2, m3, m4, m5, m6);
    fc.drawImage(paper, 0, 0);
    fc.restore();
    fc.fillStyle = `rgba(0,0,0,${Math.min(0.47, Math.abs(a.z - b.z) * 0.009 * amount)})`;
    fc.beginPath();
    fc.moveTo(a.x, a.y);
    fc.lineTo(b.x, b.y);
    fc.lineTo(c.x, c.y);
    fc.closePath();
    fc.fill();
  }
  function drawFold() {
    const size = resize(fold);
    if (!size) return;
    const { w, h, d } = size;
    fc.setTransform(d, 0, 0, d, 0, 0);
    fc.clearRect(0, 0, w, h);
    const scale = Math.min(w / 700, h / 760),
      cols = 12,
      rows = 16;
    fc.save();
    fc.translate(w / 2, h / 2);
    fc.scale(scale, scale);
    fc.fillStyle = "#24241c18";
    fc.beginPath();
    fc.ellipse(15, 310 - amount * 120, 180 - amount * 70, 18, 0, 0, 7);
    fc.fill();
    const pts = [];
    for (let j = 0; j <= rows; j++)
      for (let i = 0; i <= cols; i++) {
        const u = i / cols,
          v = j / rows,
          x = (u - 0.5) * 480,
          y = (v - 0.5) * 600,
          z = Math.sin(i * 2.7 + j * 1.9) * 45 + Math.cos(i * 1.2 - j * 2.1) * 35;
        pts.push({
          x: x * (1 - amount * 0.68) + Math.sin(v * 14 + u * 7) * amount * 48,
          y: y * (1 - amount * 0.62) + Math.cos(u * 13 - v * 9) * amount * 46,
          z,
        });
      }
    const triangles = [];
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const a = j * (cols + 1) + i,
          b = a + 1,
          c = a + cols + 1,
          e = c + 1,
          sa = { x: (i / cols) * 480, y: (j / rows) * 600 },
          sb = { x: ((i + 1) / cols) * 480, y: sa.y },
          sc = { x: sa.x, y: ((j + 1) / rows) * 600 },
          se = { x: sb.x, y: sc.y };
        triangles.push(
          [pts[a], pts[b], pts[c], sa, sb, sc],
          [pts[b], pts[e], pts[c], sb, se, sc]
        );
      }
    triangles.sort((a, b) => a[0].z + a[1].z + a[2].z - (b[0].z + b[1].z + b[2].z));
    triangles.forEach((t) => drawTriangle(...t));
    fc.restore();
  }
  function setFold(v) {
    amount = Math.max(0, Math.min(1, v));
    $("#crumple").value = Math.round(amount * 100);
    drawFold();
  }
  $("#crumple").oninput = (e) => setFold(e.target.value / 100);
  $("#unfold").onclick = () => setFold(0);
  $("#note-text").oninput = () => {
    texture();
    drawFold();
  };
  fold.onpointerdown = (e) => {
    foldDrag = { y: e.clientY, value: amount };
    fold.setPointerCapture(e.pointerId);
  };
  fold.onpointermove = (e) => {
    if (foldDrag) setFold(foldDrag.value + (foldDrag.y - e.clientY) / 220);
  };
  fold.onpointerup = fold.onpointercancel = () => {
    foldDrag = null;
  };
  texture();
  document.fonts.ready.then(() => {
    texture();
    if (mode === "fold") drawFold();
  });
  window.addEventListener("resize", () => {
    if (mode === "fold") drawFold();
  });
  function tick(t) {
    if (!document.hidden) {
      if (mode === "metal" && metalDirty) renderMetal();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
