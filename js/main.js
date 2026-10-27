// Shared archive data, entry rendering, and navigation helpers.
const entries = [
  {
    id: "night-walk",
    title: "sketches outside",
    category: "photos",
    tags: ["photos", "night walk", "sketches outside"],
    media: "sketches outside",
    description:
      "An open sketchbook on the grass. Loose pen lines turn an ordinary moment into something worth filing.",
    story:
      "An open sketchbook on the grass. Loose pen lines turn an ordinary moment into something worth filing.",
    annotation: "a page from outside",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-1.jpg"],
    caption: "a page from outside",
  },
  {
    id: "cabin-sketch",
    title: "in between places",
    category: "photos",
    tags: ["photos", "cabin sketch", "in between places"],
    media: "in between places",
    description:
      "Rows of seats, overhead panels and the view from inside a cabin, drawn across a sketchbook spread.",
    story:
      "Rows of seats, overhead panels and the view from inside a cabin, drawn across a sketchbook spread.",
    annotation: "drawing while travelling",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-2.jpg"],
    caption: "drawing while travelling",
  },
  {
    id: "unfinished-thought",
    title: "unfinished lines",
    category: "notes",
    tags: ["notes", "unfinished thought", "unfinished lines"],
    media: "unfinished lines",
    description:
      "A close look at marks in the sketchbook: small studies, dark outlines and ideas left open.",
    story:
      "A close look at marks in the sketchbook: small studies, dark outlines and ideas left open.",
    annotation: "leave the rough edges",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-3.jpg"],
    caption: "leave the rough edges",
  },
  {
    id: "dreamer",
    title: "dreamer",
    category: "photos",
    tags: ["photos", "dreamer", "dreamer"],
    media: "dreamer",
    description:
      "A blue-and-red typographic design from the uploaded collection. Bold type, a quiet field of colour and Japanese text.",
    story:
      "A blue-and-red typographic design from the uploaded collection. Bold type, a quiet field of colour and Japanese text.",
    annotation: "design dump / 01",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-4.jpg"],
    caption: "design dump / 01",
  },
  {
    id: "glass-study",
    title: "glass & roots",
    category: "photos",
    tags: ["photos", "glass study", "glass & roots"],
    media: "glass & roots",
    description:
      "A glass vessel, green leaves and visible roots. Filed here as a design and image study.",
    story:
      "A glass vessel, green leaves and visible roots. Filed here as a design and image study.",
    annotation: "design dump / 02",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-5.jpg"],
    caption: "design dump / 02",
  },
  {
    id: "side-b",
    title: "side b / diary",
    category: "notes",
    tags: ["notes", "side b", "side b / diary"],
    media: "side b / diary",
    description:
      "Idea journal: a cassette-shaped energy-drink ad, playlist cans, an interactive bus stop, an AR album cover and a giant headphone billboard.",
    story:
      "Idea journal: a cassette-shaped energy-drink ad, playlist cans, an interactive bus stop, an AR album cover and a giant headphone billboard.",
    annotation: "15 october 2026 / ideas in progress",
    credit: "Uploaded archive image",
    source: "",
    images: [
      "assets/collection/personal-6.jpg",
      "assets/collection/personal-7.jpg",
      "assets/collection/personal-8.jpg",
    ],
    caption: "15 october 2026 / ideas in progress",
    date: "15 October 2026",
  },
  {
    id: "phone",
    title: "phone / paper screen",
    category: "notes",
    tags: ["notes", "phone", "phone / paper screen"],
    media: "phone / paper screen",
    description:
      "The phone drawing in the idea diary imagines scanning a can to bring an album cover to life. A phone photograph can be added later.",
    story:
      "The phone drawing in the idea diary imagines scanning a can to bring an album cover to life. A phone photograph can be added later.",
    annotation: "an idea for a screen",
    credit: "Uploaded archive image",
    source: "",
    images: ["assets/collection/personal-7.jpg"],
    caption: "an idea for a screen",
  },
  {
    id: "on-repeat",
    title: "spirited away",
    category: "music",
    tags: ["music", "on repeat", "spirited away"],
    media: "spirited away",
    description:
      "YoungQueenz — 神隱 Spirited Away. Album artwork saved as a music and packaging reference.",
    story:
      "YoungQueenz — 神隱 Spirited Away. Album artwork saved as a music and packaging reference.",
    annotation: "soundtrack to the archive",
    credit: "YoungQueenz / Bandcamp artwork",
    source: "https://youngqueenz.bandcamp.com/album/spirited-away",
    images: ["assets/collection/youngqueenz.jpg"],
    caption: "soundtrack to the archive",
  },
  {
    id: "blur",
    title: "blur / wembley",
    category: "music",
    tags: ["music", "blur", "blur / no distance"],
    media: "blur / no distance",
    description:
      "Blur, live at Wembley Stadium. A crowd, a mirrorball and one enormous night.",
    story: "The supplied Wembley poster, filed with my music references.",
    annotation: "a poster worth keeping",
    credit: "User-supplied archive reference",
    source: "",
    images: ["assets/collection/blur-new.png"],
    caption: "a poster worth keeping",
  },
  {
    id: "wave-to-earth",
    title: "wave to earth / ticket",
    category: "music",
    tags: ["music", "wave to earth", "wave to earth"],
    media: "wave to earth",
    description:
      "Wave to Earth / Australia & New Zealand tour artwork, saved with my concert keepsakes.",
    story:
      "The supplied tour artwork, kept in the archive as a ticket-style paper keepsake.",
    annotation: "a ticket, a sound, a memory",
    credit: "User-supplied archive reference",
    source: "",
    images: ["assets/collection/wave-new.png"],
    caption: "wave to earth / tour keepsake",
  },
  {
    id: "punch-drunk-love",
    title: "punch-drunk love",
    category: "photos",
    tags: ["photos", "punch drunk love", "punch-drunk love"],
    media: "punch-drunk love",
    description:
      "The film poster saved for its colour, framing and small figures against a deep blue scene.",
    story:
      "The film poster saved for its colour, framing and small figures against a deep blue scene.",
    annotation: "cinema / colour notes",
    credit: "Sony Pictures — Punch-Drunk Love key art",
    source: "https://www.sonypictures.com/movies/punchdrunklove",
    images: ["assets/collection/film.jpg"],
    caption: "cinema / colour notes",
  },
  {
    id: "kendama",
    title: "wood & balance",
    category: "objects",
    tags: ["objects", "kendama", "wood & balance"],
    media: "wood & balance",
    description:
      "A natural oak kendama reference: simple shapes, visible grain and a red string.",
    story:
      "A natural oak kendama reference: simple shapes, visible grain and a red string.",
    annotation: "small object / endless practice",
    credit: "Kendama USA — Kaizen Natural Luna Oak",
    source: "https://shop.kendamausa.com/products/kaizen-natural-luna-oak",
    images: ["assets/collection/kendama.jpg"],
    caption: "small object / endless practice",
  },
  {
    id: "japanese-y2k",
    title: "jump / paper worlds",
    category: "photos",
    tags: ["magazine", "jump", "manga", "paper"],
    media: "japanese y2k",
    description:
      "A Jump magazine cover: dense lettering, overlapping characters and a whole world packed onto one page.",
    story:
      "Collected for the crowded cover composition and printed-paper feeling. This reference is a contemporary Jump issue, not a vintage Y2K issue.",
    annotation: "a whole world on paper",
    credit: "Weekly Shonen Jump, 2026 issue 47. Cover © Shueisha / respective creators.",
    source: "https://www.shonenjump.com/j/weeklyshonenjump/",
    images: ["assets/collection/jump.jpg"],
    caption: "Weekly Shonen Jump / cover reference",
  },
  {
    id: "fencing",
    title: "foil & mask",
    category: "objects",
    tags: ["objects", "fencing", "blades & mask"],
    media: "blades & mask",
    description: "A foil and mask resting on the gym floor.",
    story: "Two pieces of fencing kit, kept together as one memory.",
    annotation: "balance / precision / repeat",
    credit: "User-supplied archive reference",
    source: "",
    images: ["assets/collection/fencing-new.png"],
    caption: "foil & mask / between practice",
  },
  {
    id: "dylan",
    title: "dylan rieder",
    category: "photos",
    tags: ["photos", "dylan", "dylan rieder"],
    media: "dylan rieder",
    description:
      "Dylan Rieder performing a hardflip. A skate-photo reference collected for movement and composition.",
    story:
      "Dylan Rieder performing a hardflip. A skate-photo reference collected for movement and composition.",
    annotation: "skating / a moment held still",
    credit: "User-supplied archive reference",
    source: "",
    images: ["assets/collection/dylan-new.png"],
    caption: "skating / a moment held still",
  },
  {
    id: "ticket-stub",
    title: "hong kong → sydney",
    category: "objects",
    tags: ["objects", "ticket stub", "hong kong → sydney"],
    media: "hong kong → sydney",
    description:
      "A route keepsake for Hong Kong to Sydney. This demo boarding pass uses fictional passenger, flight and seat details. It is a visual keepsake, not a valid travel document.",
    story:
      "A route keepsake for Hong Kong to Sydney. This demo boarding pass uses fictional passenger, flight and seat details. It is a visual keepsake, not a valid travel document.",
    annotation: "hkg → syd / in transit",
    credit: "Original sample design — not a travel document",
    source:
      "https://flights.cathaypacific.com/destinations/en_HK/flights-from-hong-kong-to-sydney",
    images: [],
    caption: "hkg → syd / in transit",
    card: "boarding",
  },
  {
    id: "football",
    title: "football / after hours",
    category: "objects",
    tags: ["objects", "football", "football / after hours"],
    media: "football / after hours",
    description:
      "A black-and-white football. Scuffed panels, stitching and the familiar shape of an afternoon outside.",
    story: "A black-and-white football, filed with the things that keep me moving.",
    annotation: "one more game",
    credit: "User-supplied football photograph",
    source: "",
    images: ["assets/collection/football.png"],
    caption: "after hours / football",
  },
  {
    id: "boxes",
    title: "carton boxes",
    category: "objects",
    tags: ["objects", "boxes", "carton boxes"],
    media: "carton boxes",
    description:
      "A collecting note for cardboard cartons, folded corners and labels. The containers become part of the archive too.",
    story:
      "A collecting note for cardboard cartons, folded corners and labels. The containers become part of the archive too.",
    annotation: "keep the box",
    credit: "Original typographic archive card",
    source: "",
    images: [],
    caption: "keep the box",
    card: "boxes",
  },
  {
    id: "movie-ticket",
    title: "first screening / cinema",
    category: "objects",
    tags: ["movie", "ticket", "cinema"],
    images: ["assets/collection/movie-ticket.png"],
    description: "A first-screening print for The Odyssey, photographed on paper.",
    story:
      "A collected cinema print. The details belong to the supplied image; this archive does not establish attendance.",
    caption: "cinema paper / collected reference",
    annotation: "keep the paper",
    credit: "User-supplied reference",
    source: "",
  },
];
function archiveSurface(item) {
  if (["blur", "dylan", "punch-drunk-love", "fencing", "movie-ticket"].includes(item.id))
    return "poster";
  if (item.category === "photos" && !["glass-study", "japanese-y2k"].includes(item.id))
    return "polaroid";
  if (["kendama", "glass-study", "football", "fencing", "foil-mask"].includes(item.id))
    return "cutout";
  if (
    ["side-b", "phone", "night-walk", "cabin-sketch", "unfinished-thought"].includes(
      item.id
    )
  )
    return "diary";
  if (["ticket-stub", "wave-to-earth"].includes(item.id)) return "ticket";
  if (["on-repeat"].includes(item.id)) return "sleeve";
  return "poster";
}
function concertTicket() {
  const t = document.createElement("div");
  t.className = "demo-ticket concert-ticket";
  t.innerHTML =
    '<div class="ticket-band">LIVE MUSIC <span>ARCHIVE EDITION / DEMO</span></div><div class="concert-name">wave to earth</div><p class="concert-sub">a night worth keeping</p><div class="ticket-details"><span>ADMISSION<b>GENERAL</b></span><span>QUANTITY<b>ONE</b></span><span>SERIAL<b>WTE–001</b></span><span>DATE<b>—</b></span><span>VENUE<b>—</b></span><span>DOORS<b>—</b></span></div><div class="ticket-stub"><span>ADMIT ONE<br>KEEP THIS PART</span><span class="ticket-code" aria-hidden="true"></span></div><small>FICTIONAL DEMO · NOT VALID FOR ENTRY</small>';
  return t;
}
function demoTicket() {
  const ticket = document.createElement("div");
  ticket.className = "demo-ticket";
  ticket.innerHTML =
    '<div class="ticket-band">ARCHIVE AIR <span>BOARDING PASS / DEMO</span></div><div class="ticket-route">HKG <span>→</span> SYD</div><div class="ticket-cities">HONG KONG <span>SYDNEY</span></div><div class="ticket-details"><span>PASSENGER<b>ARCHIVE / GUEST</b></span><span>FLIGHT<b>DEMO 001</b></span><span>DATE<b>22 OCT 2026</b></span><span>GATE<b>—</b></span><span>SEAT<b>12A</b></span><span>BOARDING<b>—</b></span></div><div class="ticket-stub"><span>HKG → SYD<br>KEEP THIS PART</span><span class="ticket-code" aria-hidden="true"></span></div><small>SAMPLE KEEPSAKE · NOT VALID FOR TRAVEL</small>';
  return ticket;
}
const params = new URLSearchParams(location.search);
const el = (id) => document.getElementById(id);
const label = (category) => category[0].toUpperCase() + category.slice(1);
function matches(state) {
  const category = state.get("category") || "all";
  const q = (state.get("q") || "").trim().toLowerCase();
  const result = entries.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      (item.title + " " + item.tags.join(" ")).toLowerCase().includes(q)
  );
  return state.get("sort") === "oldest" ? result.reverse() : result;
}
function link(text, href) {
  const a = document.createElement("a");
  a.textContent = text;
  a.href = href;
  return a;
}
function entryURL(item, state) {
  const next = new URLSearchParams(state);
  next.set("id", item.id);
  if (next.has("selected")) next.set("selected", item.id);
  return "entry.html?" + next.toString();
}
if (el("archive-form")) {
  ["q", "category", "sort", "view"].forEach((id) => {
    if (params.has(id)) el(id).value = params.get(id);
  });
  if (!el("category").value) el("category").value = "all";
  let page = Math.max(1, Number.parseInt(params.get("page"), 10) || 1);
  function render() {
    const state = new URLSearchParams(new FormData(el("archive-form")));
    const found = matches(state);
    const pages = Math.max(1, Math.ceil(found.length / 2));
    page = Math.min(page, pages);
    state.set("page", page);
    // Preserve search and page state in detail-page links and the address bar.
    try {
      history.replaceState(null, "", "archive.html?" + state.toString());
    } catch (_) {}
    state.set("from", "archive");
    const results = el("results");
    results.replaceChildren();
    el("result-count").textContent =
      found.length + " draft " + (found.length === 1 ? "entry" : "entries");
    if (!found.length) {
      const message = document.createElement("p");
      message.textContent = "Nothing here yet. ";
      message.append(link("Clear filters", "archive.html"));
      results.append(message);
    }
    const listMode = state.get("view") === "list";
    const list = document.createElement("ul");
    if (listMode) results.append(list);
    for (const item of found.slice((page - 1) * 2, page * 2)) {
      const article = document.createElement(listMode ? "li" : "article");
      const heading = document.createElement(listMode ? "p" : "h2");
      heading.append(link(item.title, entryURL(item, state)));
      article.append(heading);
      if (!listMode) {
        const figure = document.createElement("figure");
        const p = document.createElement("p");
        p.textContent = "[" + item.media + " preview to be added]";
        figure.append(p);
        article.append(figure);
      }
      const meta = document.createElement("p");
      meta.textContent = label(item.category) + " / date to be added";
      article.append(meta);
      (listMode ? list : results).append(article);
    }
    el("pagination").hidden = found.length === 0;
    el("page-count").textContent = "Page " + page + " of " + pages;
    el("previous-page").disabled = page === 1;
    el("next-page").disabled = page === pages;
  }
  el("archive-form").addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    render();
  });
  el("previous-page").addEventListener("click", () => {
    page--;
    render();
  });
  el("next-page").addEventListener("click", () => {
    page++;
    render();
  });
  render();
}
if (el("entry-content")) {
  const item = entries.find((e) => e.id === (params.get("id") || "night-walk"));
  const state = new URLSearchParams(params);
  state.delete("id");
  state.delete("from");
  const origin = params.get("from");
  el("return-link").href =
    origin === "home"
      ? "index.html"
      : origin === "listening"
        ? "listening.html"
        : "archive.html?" + state.toString();
  el("return-link").textContent =
    origin === "home"
      ? "Back to home"
      : origin === "listening"
        ? "Back to listening room"
        : "Back to archive";
  if (!item) {
    el("entry-content").replaceChildren();
    const h = document.createElement("h1");
    h.textContent = "Entry not found";
    el("entry-content").append(h, link("Browse the archive", "archive.html"));
    el("entry-pagination").hidden = true;
    document.title = "Entry not found | Archive Dumps";
  } else {
    document.title = item.title + " | Archive Dumps";
    el("entry-title").textContent = item.title;
    el("breadcrumb-title").textContent = item.title;
    el("entry-category").textContent = label(item.category);
    el("entry-category").href = "archive.html?category=" + item.category;
    document.body.dataset.surface = archiveSurface(item);
    document.body.dataset.item = item.id;
    document.body.dataset.arrangement = entries.indexOf(item) % 2 ? "left" : "right";
    el("entry-media").replaceChildren();
    if (item.card === "concert") {
      el("entry-media").append(concertTicket());
    } else if (item.card === "boarding") {
      el("entry-media").append(demoTicket());
    } else if (item.images.length) {
      item.images.forEach((src) => {
        const image = new Image();
        image.src = src;
        image.alt = item.title;
        image.loading = "lazy";
        el("entry-media").append(image);
      });
    } else {
      el("entry-media").textContent =
        item.card === "boarding"
          ? "HKG → SYD / SAMPLE / Date — Seat — Gate —"
          : item.card === "football"
            ? "FOOTBALL / AFTER HOURS / A STUDY IN MOVEMENT"
            : "KEEP THE BOX / FRAGILE / COLLECTED THINGS";
    }
    el("entry-caption").textContent = item.caption;
    el("entry-meta").textContent =
      label(item.category) + " / " + (item.date || "collected reference");
    el("entry-description").textContent = item.description;
    el("entry-story").textContent = item.story;
    el("entry-credit").textContent = item.credit + " ";
    if (item.source) el("entry-credit").append(link("View source ↗", item.source));
    el("entry-tags").replaceChildren();
    item.tags.forEach((tag, i) => {
      if (i) el("entry-tags").append(", ");
      el("entry-tags").append(link(tag, "archive.html?q=" + encodeURIComponent(tag)));
    });
    el("music-link").hidden = item.category !== "music";
    let collection =
      origin === "listening"
        ? entries.filter((e) => e.category === "music")
        : matches(state);
    if (!collection.some((e) => e.id === item.id)) collection = entries;
    const i = collection.findIndex((e) => e.id === item.id);
    el("previous-entry").hidden = i === 0;
    el("next-entry").hidden = i === collection.length - 1;
    if (i > 0) el("previous-entry").href = entryURL(collection[i - 1], params);
    if (i < collection.length - 1)
      el("next-entry").href = entryURL(collection[i + 1], params);
    el("entry-pagination").hidden = collection.length < 2;
    el("related").replaceChildren();
    entries
      .filter((e) => e.id !== item.id)
      .slice(0, 2)
      .forEach((e) => {
        const li = document.createElement("li");
        li.append(link(e.title, "entry.html?id=" + e.id));
        el("related").append(li);
      });
  }
}
