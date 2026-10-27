// Paper diary, search, and interactive orbit controls.
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s),
    reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let view = params.get("view") === "orbit" ? "orbit" : "paper",
    selected = 0,
    opened = params.has("selected"),
    paused = reduce.matches,
    angle = 0,
    tilt = 0.12,
    zoom = 1,
    orbitDrag = null,
    suppressClick = false,
    last = 0;
  let layout = params.get("layout") === "original" ? "original" : "pencil";
  let found = entries.slice(),
    images = new Map(),
    visibleCards = [];
  const annotations = {
    "night-walk": "after the city goes quiet",
    "ticket-stub": "a small piece of a bigger night",
    "unfinished-thought": "before i forget",
    "on-repeat": "one more time",
  };
  function iconArt(item) {
    const box = document.createElement("div");
    box.className = "sheet-art";
    box.dataset.surface = archiveSurface(item);
    box.dataset.item = item.id;
    if (images.has(item.id)) {
      const im = new Image();
      im.src = images.get(item.id);
      im.alt = "Selected image for " + item.title;
      box.append(im);
      return box;
    }
    if (item.images?.length) {
      const im = new Image();
      im.src = item.images[0];
      im.alt = item.title;
      box.append(im);
      return box;
    }
    if (item.card === "concert") {
      box.append(concertTicket());
      return box;
    }
    if (item.card === "boarding") {
      box.append(demoTicket());
      return box;
    }
    if (item.card) {
      const card = document.createElement("div");
      card.className = "archive-card " + item.card;
      card.textContent =
        item.card === "boarding"
          ? "BOARDING / SAMPLE\nHKG → SYD\nHONG KONG / SYDNEY\nDATE —  SEAT —  GATE —"
          : item.card === "football"
            ? "FOOTBALL\nAFTER HOURS\nmovement / practice / repeat"
            : "KEEP THE BOX\nFRAGILE\na home for collected things";
      box.append(card);
      return box;
    }
    const a = document.createElement("div");
    if (item.category === "photos") {
      a.className = "art-photo";
      a.innerHTML =
        "<strong>NIGHT<br>WALK.</strong><span>PHOTO TO COME<br>A place for the light<br>i wanted to remember.</span>";
    } else if (item.category === "objects") {
      a.className = "art-ticket";
      a.innerHTML =
        'ADMIT ONE<strong>A NIGHT<br>TO KEEP.</strong>OBJECT STUDY / 002<div class="barcode"></div>';
    } else if (item.category === "music") {
      a.className = "art-disc";
      a.innerHTML = "<span>on repeat / side a</span>";
    } else {
      a.className = "art-note";
      a.textContent = "Some thoughts are worth keeping, even before they make sense.";
    }
    box.append(a);
    return box;
  }
  function stateURL() {
    const p = new URLSearchParams();
    if ($("#archive-search").value) p.set("q", $("#archive-search").value);
    if ($("#archive-category").value !== "all")
      p.set("category", $("#archive-category").value);
    p.set("view", view);
    p.set("layout", layout);
    if (opened && found[selected]) p.set("selected", found[selected].id);
    return p;
  }
  function saveState() {
    try {
      history.replaceState(null, "", "archive.html?" + stateURL());
    } catch (_) {}
  }
  function update(animate = 0) {
    $("#entry-jump").value = selected;
    document.body.classList.toggle("pencil-layout", layout === "pencil");
    document
      .querySelectorAll("[data-layout]")
      .forEach((b) => b.setAttribute("aria-pressed", b.dataset.layout === layout));
    const item = found[selected],
      none = !item;
    $("#collection-count").textContent =
      found.length +
      " " +
      (found.length === 1 ? "entry" : "entries") +
      " / personal archive";
    $("#empty-archive").hidden = !none;
    $("#paper-scene").hidden = none || view !== "paper";
    $("#orbit-scene").hidden = none || view !== "orbit";
    $("#book-cover").hidden = opened;
    $("#archive-book").hidden = !opened;
    $("#paper-view").setAttribute("aria-pressed", view === "paper");
    $("#orbit-view").setAttribute("aria-pressed", view === "orbit");
    $("#previous").disabled = none || selected === 0;
    $("#next").disabled = none || selected === found.length - 1;
    $("#edge-prev").disabled = none || selected === 0;
    $("#edge-next").disabled = none || selected === found.length - 1;
    $("#read-entry").hidden = none;
    $("#close-book").hidden = view !== "paper" || !opened;
    $("#pause-orbit").hidden = view !== "orbit";
    $("#spin-toggle").hidden = view !== "orbit";
    $("#orbit-controls").hidden = view !== "orbit";
    $("#entry-photo").disabled = none;
    $("#remove-photo").disabled = none || !images.has(item?.id);
    $("#view-hint").textContent =
      view === "paper"
        ? "a little collection, one page at a time"
        : "choose a memory / move to explore";
    $("#entry-status").textContent = none
      ? "Nothing found."
      : !opened && view === "paper"
        ? "A book of small memories."
        : `${String(selected + 1).padStart(2, "0")} / ${String(found.length).padStart(2, "0")} — ${item.title}`;
    if (item) {
      const p = stateURL();
      p.set("from", "archive");
      p.set("selected", item.id);
      p.set("id", item.id);
      $("#read-entry").href = "entry.html?" + p;
      const book = $("#archive-book");
      book.dataset.arrangement = selected % 2 ? "left" : "right";
      book.dataset.surface = archiveSurface(item);
      book.dataset.item = item.id;
      const left = $("#sheet-left"),
        right = $("#sheet-right");
      left.replaceChildren();
      right.replaceChildren();
      const label = document.createElement("small");
      label.textContent =
        item.category.toUpperCase() + " / " + String(selected + 1).padStart(3, "0");
      const h = document.createElement("h2");
      if (item.title.length > 16) h.className = "long-title";
      (item.title.length > 12
        ? [
            item.title
              .split(" ")
              .slice(0, Math.ceil(item.title.split(" ").length / 2))
              .join(" "),
            item.title
              .split(" ")
              .slice(Math.ceil(item.title.split(" ").length / 2))
              .join(" "),
          ]
        : item.title.split(" ")
      ).forEach((word) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        h.append(span);
      });
      const note = document.createElement("p");
      note.className = "annotation";
      note.textContent =
        item.annotation || annotations[item.id] || "a little thing to keep";
      const description = document.createElement("p");
      description.className = "entry-copy";
      description.textContent = item.description;
      const meta = document.createElement("div");
      meta.className = "page-meta";
      meta.innerHTML =
        "<span>personal archive</span><span>" +
        String(selected * 2 + 1).padStart(2, "0") +
        "</span>";
      left.append(label, h, note, description, meta);
      const caption = document.createElement("small");
      caption.textContent = images.has(item.id)
        ? "YOUR SELECTED IMAGE"
        : item.source
          ? "COLLECTED REFERENCE"
          : "FROM THE ARCHIVE";
      const bottom = document.createElement("div");
      bottom.className = "page-meta";
      const a = document.createElement("a");
      a.href = $("#read-entry").href;
      a.textContent = "Read the story";
      const n = document.createElement("span");
      n.textContent = String(selected * 2 + 2).padStart(2, "0");
      bottom.append(a, n);
      const scribble = document.createElement("p");
      scribble.className = "pencil-caption";
      scribble.textContent =
        (item.annotation || annotations[item.id] || "a little thing to keep") + " ↗";
      right.append(caption, iconArt(item), scribble, bottom);
      if (animate) {
        const book = $("#archive-book");
        book.classList.remove("turn-next", "turn-prev");
        void book.offsetWidth;
        book.classList.add(animate > 0 ? "turn-next" : "turn-prev");
      }
    }
    visibleCards.forEach((b, i) => (b.dataset.active = i === selected));
    saveState();
    if (view === "orbit") layoutOrbit();
  }
  document.querySelectorAll("[data-layout]").forEach(
    (b) =>
      (b.onclick = () => {
        layout = b.dataset.layout;
        update();
      })
  );
  function chooseView(v) {
    view = v;
    $("#archive-options").hidden = true;
    $("#more-toggle").setAttribute("aria-expanded", "false");
    update();
  }
  $("#paper-view").onclick = () => chooseView("paper");
  $("#orbit-view").onclick = () => chooseView("orbit");
  $("#book-cover").onclick = () => {
    opened = true;
    update(1);
  };
  function step(d) {
    if (!found.length) return;
    opened = true;
    const next = Math.max(0, Math.min(found.length - 1, selected + d));
    const moved = next !== selected;
    selected = next;
    update(moved ? d : 0);
  }
  $("#previous").onclick = $("#edge-prev").onclick = () => step(-1);
  $("#next").onclick = $("#edge-next").onclick = () => step(1);
  $("#close-book").onclick = () => {
    opened = false;
    $("#archive-options").hidden = true;
    $("#more-toggle").setAttribute("aria-expanded", "false");
    update();
    $("#book-cover").focus();
  };
  function toggle(button, panel) {
    const open = panel.hidden;
    ["#room-menu", "#search-panel", "#archive-options"].forEach(
      (s) => ($(s).hidden = true)
    );
    ["#menu-toggle", "#search-toggle", "#more-toggle"].forEach((s) =>
      $(s).setAttribute("aria-expanded", "false")
    );
    panel.hidden = !open;
    button.setAttribute("aria-expanded", open);
    if (open && panel.id === "search-panel") $("#archive-search").focus();
  }
  $("#menu-toggle").onclick = () => toggle($("#menu-toggle"), $("#room-menu"));
  $("#search-toggle").onclick = () => toggle($("#search-toggle"), $("#search-panel"));
  $("#more-toggle").onclick = () => toggle($("#more-toggle"), $("#archive-options"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      for (const [b, p] of [
        ["#menu-toggle", "#room-menu"],
        ["#search-toggle", "#search-panel"],
        ["#more-toggle", "#archive-options"],
      ])
        if (!$(p).hidden) {
          $(p).hidden = true;
          $(b).setAttribute("aria-expanded", "false");
          $(b).focus();
        }
    }
    if (e.target.matches("input,select,textarea,button,a")) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  $("#archive-search").value = params.get("q") || "";
  $("#archive-category").value = params.get("category") || "all";
  if (!$("#archive-category").value) $("#archive-category").value = "all";
  $("#entry-jump").onchange = (e) => {
    selected = Number(e.target.value);
    opened = true;
    view = "paper";
    update();
  };
  function filter(initial = false) {
    const s = new URLSearchParams({
      q: $("#archive-search").value,
      category: $("#archive-category").value,
    });
    found = matches(s);
    selected = initial
      ? Math.max(
          0,
          found.findIndex((i) => i.id === params.get("selected"))
        )
      : 0;
    $("#entry-jump").replaceChildren(
      ...found.map((item, i) => {
        const o = document.createElement("option");
        o.value = i;
        o.textContent = String(i + 1).padStart(2, "0") + " / " + item.title;
        return o;
      })
    );
    buildOrbit();
    update();
  }
  $("#search-panel").onsubmit = (e) => {
    e.preventDefault();
    filter();
    $("#search-panel").hidden = true;
    $("#search-toggle").setAttribute("aria-expanded", "false");
    $("#search-toggle").focus();
  };
  function clear() {
    $("#archive-search").value = "";
    $("#archive-category").value = "all";
    filter();
  }
  $("#clear-search").onclick = $("#empty-reset").onclick = clear;
  function buildOrbit() {
    const holder = $("#orbit-items");
    holder.replaceChildren();
    visibleCards = [];
    found.forEach((item, i) => {
      const b = document.createElement("button");
      b.className = "orbit-item";
      b.dataset.surface = archiveSurface(item);
      b.dataset.item = item.id;
      b.setAttribute("aria-label", "Open " + item.title + " in book");
      if (item.images?.length) {
        const back = new Image();
        back.src = item.images[item.images.length - 1];
        back.alt = "";
        back.className = "orbit-back";
        const im = new Image();
        im.src = item.images[0];
        im.alt = "";
        im.className = "orbit-front";
        b.append(im);
      } else if (item.card === "concert") {
        b.append(concertTicket());
      } else if (item.card === "boarding") {
        b.append(demoTicket());
      } else {
        const slip = document.createElement("span");
        slip.className = "orbit-slip";
        slip.textContent =
          item.id === "football" ? "AFTER HOURS / FOOTBALL" : "KEEP THE BOX / FRAGILE";
        b.append(slip);
      }
      const title = document.createElement("strong");
      title.textContent = item.title;
      b.append(title);
      b.onclick = () => {
        if (suppressClick) return;
        selected = i;
        opened = true;
        chooseView("paper");
        $("#read-entry").focus();
      };
      b.addEventListener("focus", () => {
        if (b.matches(":focus-visible")) {
          paused = true;
          pauseLabel();
          layoutOrbit();
        }
      });
      holder.append(b);
      visibleCards.push(b);
    });
  }
  function layoutOrbit() {
    if (view !== "orbit") return;
    const r = $("#orbit-scene").getBoundingClientRect(),
      radius = zoom * Math.min(r.width * 0.35, r.height * 0.39);
    const all = [...$("#orbit-items").children];
    all.forEach((node, i) => {
      const card = i < found.length,
        n = card ? i : i - found.length,
        count = card ? found.length : all.length - found.length;
      const y = 1 - (2 * (n + 0.5)) / Math.max(count, 1),
        theta = n * 2.39996 + angle + (card ? 0 : 1.4),
        ring = Math.sqrt(1 - y * y);
      let x = Math.cos(theta) * ring,
        z = Math.sin(theta) * ring;
      const py = y * Math.cos(tilt) - z * Math.sin(tilt);
      z = y * Math.sin(tilt) + z * Math.cos(tilt);
      const scale = 2.7 / (2.7 - z),
        width = card ? (r.width < 700 ? 68 : 96) : r.width < 700 ? 36 : 60,
        height = card ? (r.width < 700 ? 91 : 126) : r.width < 700 ? 48 : 80,
        rad = radius * (card ? 1 : 1.13);
      node.style.transform = `translate(${r.width / 2 + x * rad * scale - width / 2}px,${r.height / 2 + py * rad * scale - height / 2}px) scale(${scale}) rotate(${Math.sin(theta) * 12}deg)`;
      node.style.zIndex = String(Math.round((z + 1) * 50) + (card ? 2 : 0));
      node.style.opacity = String(card ? 0.56 + (z + 1) * 0.22 : 0.2 + (z + 1) * 0.18);
    });
  }
  const scene = $("#orbit-scene");
  scene.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    orbitDrag = { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY };
    suppressClick = false;
    paused = true;
    pauseLabel();
  });
  scene.addEventListener("pointermove", (e) => {
    if (!orbitDrag) return;
    const dx = e.clientX - orbitDrag.x,
      dy = e.clientY - orbitDrag.y;
    if (Math.hypot(e.clientX - orbitDrag.startX, e.clientY - orbitDrag.startY) > 6) {
      suppressClick = true;
      scene.setPointerCapture(e.pointerId);
    }
    angle += dx * 0.009;
    tilt = Math.max(-1.4, Math.min(1.4, tilt + dy * 0.006));
    orbitDrag.x = e.clientX;
    orbitDrag.y = e.clientY;
    layoutOrbit();
  });
  function endDrag() {
    orbitDrag = null;
    setTimeout(() => (suppressClick = false), 80);
  }
  scene.addEventListener("pointerup", endDrag);
  scene.addEventListener("pointercancel", endDrag);
  function zoomBy(d) {
    zoom = Math.max(0.65, Math.min(1.5, zoom + d));
    layoutOrbit();
  }
  $("#orbit-in").onclick = () => zoomBy(0.1);
  $("#orbit-out").onclick = () => zoomBy(-0.1);
  $("#orbit-reset").onclick = () => {
    angle = 0;
    tilt = 0.12;
    zoom = 1;
    paused = true;
    pauseLabel();
    layoutOrbit();
  };
  scene.addEventListener("keydown", (e) => {
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "=", "-"].includes(e.key)
    )
      return;
    e.preventDefault();
    e.stopPropagation();
    paused = true;
    pauseLabel();
    if (e.key === "ArrowLeft") angle -= 0.16;
    if (e.key === "ArrowRight") angle += 0.16;
    if (e.key === "ArrowUp") tilt -= 0.1;
    if (e.key === "ArrowDown") tilt += 0.1;
    if (e.key === "+" || e.key === "=") zoomBy(0.1);
    if (e.key === "-") zoomBy(-0.1);
    layoutOrbit();
  });
  $("#spin-toggle").onclick = () => {
    paused = !paused;
    pauseLabel();
  };
  function pauseLabel() {
    $("#spin-toggle").textContent = paused ? "Spin orbit ↻" : "Pause orbit Ⅱ";
    $("#spin-toggle").setAttribute("aria-pressed", paused);
    $("#pause-orbit").textContent = paused ? "Resume orbit" : "Pause orbit";
    $("#pause-orbit").setAttribute("aria-pressed", paused);
  }
  $("#pause-orbit").onclick = () => {
    paused = !paused;
    pauseLabel();
  };
  pauseLabel();
  reduce.addEventListener("change", () => {
    if (reduce.matches) {
      paused = true;
      pauseLabel();
    }
  });
  let drag = null;
  $("#archive-book").addEventListener("pointerdown", (e) => {
    if (e.target.closest("button,a")) return;
    drag = { x: e.clientX, y: e.clientY };
  });
  $("#archive-book").addEventListener("pointerup", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x,
      dy = e.clientY - drag.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    drag = null;
  });
  $("#archive-book").addEventListener("pointercancel", () => (drag = null));
  $("#entry-photo").onchange = (e) => {
    const f = e.target.files[0],
      item = found[selected];
    if (!f || !item) return;
    if (!f.type.startsWith("image/")) return;
    if (images.has(item.id)) URL.revokeObjectURL(images.get(item.id));
    images.set(item.id, URL.createObjectURL(f));
    opened = true;
    view = "paper";
    update();
  };
  $("#remove-photo").onclick = () => {
    const id = found[selected]?.id;
    if (images.has(id)) {
      URL.revokeObjectURL(images.get(id));
      images.delete(id);
      update();
    }
  };
  window.addEventListener("resize", layoutOrbit);
  window.addEventListener("pagehide", (e) => {
    if (!e.persisted) images.forEach(URL.revokeObjectURL);
  });
  function tick(t) {
    if (view === "orbit" && !paused && !document.hidden) {
      angle += Math.min(t - last, 40) * 0.00024;
      layoutOrbit();
    }
    last = t;
    requestAnimationFrame(tick);
  }
  filter(true);
  requestAnimationFrame(tick);
})();
