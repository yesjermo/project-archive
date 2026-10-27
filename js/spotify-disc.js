// Spotify embed controller and playback-synchronized CD motion.
(() => {
  const disc = document.getElementById("spotify-disc"),
    status = document.getElementById("spotify-state"),
    button = document.getElementById("spotify-toggle"),
    reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let playing = false;
  function sync() {
    disc.classList.toggle("spinning", playing && !reduce.matches);
    button.textContent = playing ? "Pause album" : "Play album";
    button.setAttribute("aria-pressed", String(playing));
  }
  reduce.addEventListener("change", sync);
  window.onSpotifyIframeApiReady = (api) => {
    const host = document.getElementById("spotify-player");
    host.replaceChildren();
    const mount = document.createElement("div");
    host.append(mount);
    api.createController(
      mount,
      { uri: "spotify:album:2Huknl8e9mKDF7VTOWOq2b", width: "100%", height: 352 },
      (controller) => {
        controller.addListener("ready", () => {
          button.disabled = false;
          status.textContent = "Ready / press play.";
        });
        controller.addListener("playback_update", (e) => {
          playing = !e.data.isPaused && !e.data.isBuffering;
          status.textContent = e.data.isBuffering
            ? "Buffering…"
            : playing
              ? "Playing / side a"
              : "Paused / side a";
          sync();
        });
        button.onclick = () => controller.togglePlay();
        document
          .getElementById("audio-player")
          ?.addEventListener("play", () => controller.pause());
      }
    );
  };
  const script = document.createElement("script");
  script.src = "https://open.spotify.com/embed/iframe-api/v1";
  script.async = true;
  script.onerror = () => {
    status.textContent = "Use the Spotify player or open the album in Spotify.";
  };
  document.body.append(script);
})();
