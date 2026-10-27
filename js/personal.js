// Portrait rendering, click sounds, and the custom pointer.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ring = document.createElement("div");
  ring.className = "motion-cursor";
  ring.setAttribute("aria-hidden", "true");
  document.body.append(ring);
  let x = -100,
    y = -100,
    rx = x,
    ry = y,
    active = false;
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    x = e.clientX;
    y = e.clientY;
    active = true;
    document.body.classList.add("cursor-active");
    ring.classList.toggle("over", !!e.target.closest("a,button,input,select,textarea"));
  });
  document.documentElement.addEventListener("pointerleave", () => {
    active = false;
    document.body.classList.remove("cursor-active");
  });
  function tick() {
    if (active) {
      rx += (x - rx) * (reduced ? 1 : 0.25);
      ry += (y - ry) * (reduced ? 1 : 0.25);
      ring.style.transform = `translate(${rx - ring.offsetWidth / 2}px,${ry - ring.offsetHeight / 2}px)`;
    }
    requestAnimationFrame(tick);
  }
  tick();
  addEventListener("pointerdown", () => ring.classList.add("down"));
  addEventListener("pointerup", () => ring.classList.remove("down"));
  let muted = false;
  try {
    muted = localStorage.getItem("archive-muted") === "true";
  } catch {}
  let audio;
  const sound = document.createElement("button");
  sound.className = "sound-toggle";
  sound.type = "button";
  document.body.append(sound);
  function label() {
    sound.textContent = muted ? "Sound off ◌" : "Sound on ·";
    sound.setAttribute("aria-pressed", String(!muted));
    sound.setAttribute("aria-label", muted ? "Enable click sounds" : "Mute click sounds");
  }
  label();
  sound.addEventListener("click", () => {
    muted = !muted;
    try {
      localStorage.setItem("archive-muted", String(muted));
    } catch {}
    label();
  });
  document.addEventListener("click", (e) => {
    if (muted || !e.target.closest("button,a,input,select")) return;
    try {
      audio ||= new (window.AudioContext || window.webkitAudioContext)();
      audio.resume();
      const o = audio.createOscillator(),
        g = audio.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(950, audio.currentTime);
      o.frequency.exponentialRampToValueAtTime(240, audio.currentTime + 0.035);
      g.gain.setValueAtTime(0.035, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.045);
      o.connect(g);
      g.connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + 0.05);
    } catch {}
  });
  const canvas = document.getElementById("ascii-portrait");
  if (!canvas) return;
  const ctx = canvas.getContext("2d"),
    img = new Image();
  let mode = "ascii";
  function draw() {
    if (!img.complete || !img.naturalWidth) return;
    const cols = 128,
      rows = 170,
      source = document.createElement("canvas");
    source.width = cols;
    source.height = rows;
    const sc = source.getContext("2d");
    sc.drawImage(img, 0, 0, cols, rows);
    const pixels = sc.getImageData(0, 0, cols, rows).data;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 640, 850);
    ctx.fillStyle = "#111";
    ctx.font = "6px monospace";
    ctx.textBaseline = "top";
    const chars = " .:+*#@";
    const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const lum = Math.min(
          1,
          Math.pow(
            (pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722) / 255,
            0.55
          )
        );
        if (mode === "ascii")
          ctx.fillText(chars[Math.min(6, Math.floor((1 - lum) * 7))], x * 5, y * 5);
        else if (lum < (bayer[(y % 4) * 4 + (x % 4)] + 0.5) / 16)
          ctx.fillRect(x * 5, y * 5, 5, 5);
      }
  }
  img.onload = draw;
  img.src = "assets/collection/about-portrait.jpg";
  document.querySelectorAll("[data-portrait]").forEach((b) =>
    b.addEventListener("click", () => {
      mode = b.dataset.portrait;
      document
        .querySelectorAll("[data-portrait]")
        .forEach((v) => v.setAttribute("aria-pressed", String(v === b)));
      canvas.hidden = mode === "original";
      document.getElementById("portrait-original").hidden = mode !== "original";
      if (mode !== "original") draw();
    })
  );
})();
