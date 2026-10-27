// Canvas visual studies and optional local-audio interactions.
// One authored motion scene. Pause when hidden or when reduced motion is requested.
(() => {
  const canvas = document.getElementById("memory-field");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const pause = document.getElementById("pause-field");
  const density = document.getElementById("field-density");
  const state = document.getElementById("field-state");
  let paused = motion.matches,
    visible = true,
    frame = 0,
    t = 0,
    last = 0;
  let w = 0,
    h = 0,
    pointer = { x: -999, y: -999 };
  function sync() {
    pause.textContent = paused ? "Resume motion" : "Pause motion";
    pause.setAttribute("aria-pressed", String(paused));
    state.textContent = paused ? "still study" : "live study";
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const mobile = w < 700,
      cx = w * (mobile ? 0.56 : 0.7),
      cy = h * (mobile ? 0.69 : 0.47),
      radius = Math.min(w * (mobile ? 0.4 : 0.26), h * 0.37);
    const step = Number(density.value);
    ctx.font = "11px Courier New";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let y = -radius; y <= radius; y += step)
      for (let x = -radius; x <= radius; x += step) {
        const distance = Math.hypot(x, y),
          r = distance / radius;
        if (r > 1 || r < 0.17) continue;
        const angle = Math.atan2(y, x) + t * 0.25;
        const wave = Math.sin(angle * 5 - r * 18 + t * 1.1);
        const xx = cx + x,
          yy = cy + y * 0.86;
        const dx = xx - pointer.x,
          dy = yy - pointer.y,
          near = Math.max(0, 1 - Math.hypot(dx, dy) / 130);
        const shift = near * 22;
        ctx.fillStyle =
          near > 0.15
            ? "#a52e24"
            : wave > 0.3
              ? "#343430"
              : wave > -0.3
                ? "#77776e"
                : "#a0a096";
        ctx.fillText(
          wave > 0.55 ? "@" : wave > 0 ? "+" : wave > -0.6 ? ":" : ".",
          xx + Math.sin(angle + t) * shift,
          yy + Math.cos(angle + t) * shift
        );
      }
  }
  function tick(now) {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    t += Math.min((now - last) / 1000, 0.05);
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!frame && !paused && visible && !document.hidden) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }
  function resize() {
    const rect = canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2);
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver((items) => {
    visible = items[0].isIntersecting;
    if (visible) start();
    else stop();
  }).observe(canvas);
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const b = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - b.left, y: e.clientY - b.top };
    if (paused) draw();
  });
  canvas.parentElement.addEventListener("pointerleave", () => {
    pointer = { x: -999, y: -999 };
    if (paused) draw();
  });
  pause.addEventListener("click", () => {
    paused = !paused;
    sync();
    paused ? stop() : start();
  });
  density.addEventListener("input", draw);
  document.getElementById("reset-field").addEventListener("click", () => {
    t = 0;
    density.value = "17";
    pointer = { x: -999, y: -999 };
    draw();
  });
  document.addEventListener("visibilitychange", () =>
    document.hidden ? stop() : start()
  );
  motion.addEventListener("change", () => {
    paused = motion.matches;
    sync();
    paused ? stop() : start();
  });
  sync();
  resize();
  start();
})();

// Audio stays local: object URLs are discarded when changing the selection.
(() => {
  const audio = document.getElementById("audio-player");
  if (!audio) return;
  const input = document.getElementById("audio-files"),
    status = document.getElementById("audio-status"),
    title = document.getElementById("track-title"),
    disc = document.getElementById("disc");
  const play = document.getElementById("toggle-play"),
    prev = document.getElementById("previous-track"),
    next = document.getElementById("next-track"),
    list = document.getElementById("local-tracklist");
  let tracks = [],
    selected = 0;
  function buttons() {
    play.disabled = !tracks.length;
    prev.disabled = tracks.length < 2;
    next.disabled = tracks.length < 2;
  }
  function select(index, autoplay = false) {
    if (!tracks.length) return;
    selected = (index + tracks.length) % tracks.length;
    audio.src = tracks[selected].url;
    title.textContent = tracks[selected].name;
    status.textContent = "Ready to play.";
    list
      .querySelectorAll("button")
      .forEach((b, i) => b.setAttribute("aria-pressed", String(i === selected)));
    if (autoplay)
      audio.play().catch(() => {
        status.textContent = "Could not play this file. Try an MP3 or WAV file.";
      });
  }
  input.addEventListener("change", () => {
    audio.pause();
    audio.removeAttribute("src");
    tracks.forEach((t) => URL.revokeObjectURL(t.url));
    tracks = Array.from(input.files).map((f) => ({
      name: f.name.replace(/\.[^.]+$/, ""),
      url: URL.createObjectURL(f),
    }));
    list.replaceChildren();
    tracks.forEach((track, i) => {
      const li = document.createElement("li"),
        button = document.createElement("button");
      button.type = "button";
      button.textContent = track.name;
      button.addEventListener("click", () => select(i, !audio.paused));
      li.append(button);
      list.append(li);
    });
    buttons();
    if (tracks.length) select(0);
    else {
      title.textContent = "nothing queued.";
      status.textContent = "No audio files selected.";
      list.textContent = "No tracks selected";
    }
  });
  play.addEventListener("click", () =>
    audio.paused
      ? audio.play().catch(() => {
          status.textContent = "Could not play this file. Choose another audio file.";
        })
      : audio.pause()
  );
  prev.addEventListener("click", () => select(selected - 1, !audio.paused));
  next.addEventListener("click", () => select(selected + 1, !audio.paused));
  audio.addEventListener("play", () => {
    play.textContent = "Pause";
    disc.classList.add("playing");
    status.textContent = "Playing from your device.";
  });
  audio.addEventListener("pause", () => {
    play.textContent = "Play";
    disc.classList.remove("playing");
  });
  audio.addEventListener("ended", () => {
    disc.classList.remove("playing");
    play.textContent = "Play";
    if (tracks.length > 1) select(selected + 1, true);
  });
  audio.addEventListener("error", () => {
    disc.classList.remove("playing");
    play.textContent = "Play";
    status.textContent = "This audio format could not be played. Choose another file.";
  });
  buttons();
})();
