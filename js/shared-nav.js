// Shared menu, search panel, and archive view navigation.
(() => {
  const $ = (s) => document.querySelector(s);
  if (!$("#room-menu")) return;
  $("#paper-view").onclick = () => (location.href = "archive.html?view=paper");
  $("#orbit-view").onclick = () => (location.href = "archive.html?view=orbit");
  $("#paper-view").setAttribute("aria-pressed", "false");
  const pairs = [
    ["#menu-toggle", "#room-menu"],
    ["#search-toggle", "#search-panel"],
  ];
  function close() {
    pairs.forEach(([b, p]) => {
      $(p).hidden = true;
      $(b).setAttribute("aria-expanded", "false");
    });
  }
  pairs.forEach(([b, p]) => {
    $(b).onclick = () => {
      const open = $(p).hidden;
      close();
      $(p).hidden = !open;
      $(b).setAttribute("aria-expanded", String(open));
      if (open && p === "#search-panel") $("#archive-search").focus();
    };
  });
  $("#clear-search").onclick = () => {
    $("#archive-search").value = "";
    $("#archive-category").value = "all";
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const active = pairs.find(([b, p]) => !$(p).hidden);
      close();
      if (active) $(active[0]).focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".room-toolbar,.floating-panel")) close();
  });
  $("#room-menu")
    .querySelectorAll("a")
    .forEach((a) => {
      if (a.getAttribute("href") === location.pathname.split("/").pop())
        a.setAttribute("aria-current", "page");
    });
})();
