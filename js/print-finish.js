// The text stays selectable and editable; the filter imitates imperfect ink coverage.
(() => {
  const wrap = document.createElement("div");
  wrap.setAttribute("aria-hidden", "true");
  wrap.className = "print-filter-defs";
  wrap.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><filter id="ink-print" x="-5%" y="-8%" width="110%" height="116%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".085 .14" numOctaves="3" seed="8" result="edge"/><feDisplacementMap in="SourceGraphic" in2="edge" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="rough"/><feTurbulence type="fractalNoise" baseFrequency=".73" numOctaves="3" seed="21" result="grain"/><feColorMatrix in="grain" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0"/><feComponentTransfer><feFuncA type="discrete" tableValues=".7 .97 1 1 1 1 1 1"/></feComponentTransfer><feComposite in="rough" operator="in"/></filter></defs></svg>';
  document.body.prepend(wrap);
  if (document.body.classList.contains("page-entry")) {
    const layout = new URLSearchParams(location.search).get("layout") || "pencil";
    document.body.classList.toggle("pencil-layout", layout === "pencil");
  }
  const title = document.querySelector(".hero-copy h1");
  if (title) title.innerHTML = "<span>ARCHIVE</span><span>DUMPS.</span>";
})();
