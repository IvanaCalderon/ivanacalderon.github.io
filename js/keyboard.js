// Skills keyboard — a 60% layout where the colored caps map to my stack.
(function () {
  // tag colors tuned for legibility on a white background
  const CATCOLOR = { lang: "#c79a1f", fw: "#d2542a", data: "#2a9d96", ai: "#6f5bd0", tool: "#2f74c0", me: "#b8901f" };
  const CATNAME  = { lang: "Language", fw: "Framework", data: "Data & Infra", ai: "AI & Automation", tool: "Tooling", me: "Me" };

  // tech definitions: cap label kept short; full name shows in the readout
  const T = {
    ruby:   { label: "Ruby",  name: "Ruby",           cat: "lang", color: "#c0271d", note: "My main language — expressive, joyful, gets out of the way." },
    rails:  { label: "Rails", name: "Ruby on Rails",  cat: "fw",   color: "#e8412f", note: "My framework of choice for shipping real products fast." },
    js:     { label: "JS",    name: "JavaScript",     cat: "lang", color: "#f7df1e", note: "The glue for interactive, responsive front-ends." },
    html:   { label: "HTML",  name: "HTML",           cat: "lang", color: "#e8552a", note: "Semantic structure — the foundation of every page." },
    css:    { label: "CSS",   name: "CSS",            cat: "lang", color: "#3f8ff0", note: "Layout, motion, and the small details that delight." },
    sql:    { label: "SQL",   name: "SQL",            cat: "lang", color: "#d98a2b", note: "Querying and shaping relational data with intent." },
    git:    { label: "Git",   name: "Git",            cat: "tool", color: "#f0502e", note: "Version control and a clean, reviewable history." },
    hot:    { label: "Hot",   name: "Hotwire",        cat: "fw",   color: "#ff5a1f", note: "Modern, server-driven UI without the SPA overhead." },
    turbo:  { label: "Turbo", name: "Turbo",          cat: "fw",   color: "#15c7c5", note: "Snappy page updates and live streams over the wire." },
    stim:   { label: "Stim",  name: "Stimulus",       cat: "fw",   color: "#46b06a", note: "Small sprinkles of behavior on server-rendered HTML." },
    alp:    { label: "Alp",   name: "Alpine.js",      cat: "fw",   color: "#79c2d6", note: "Lightweight reactivity declared right in the markup." },
    psql:   { label: "PSQL",  name: "PostgreSQL",     cat: "data", color: "#4f93d6", note: "My go-to database — reliable, powerful, flexible." },
    redis:  { label: "Redis", name: "Redis",          cat: "data", color: "#ff463a", note: "Fast caching and the backbone for background jobs." },
    skiq:   { label: "Skiq",  name: "Sidekiq",        cat: "data", color: "#d94d68", note: "Background processing for everything that runs async." },
    stripe: { label: "Strp",  name: "Stripe",         cat: "data", color: "#7a72ff", note: "Payments, wallets, and credit systems done right." },
    meta:   { label: "Meta",  name: "Meta Graph API", cat: "data", color: "#2f86ff", note: "Instagram, Messenger & WhatsApp, unified in one inbox." },
    n8n:    { label: "n8n",   name: "n8n",            cat: "ai",   color: "#ea4b71", note: "Orchestrating AI workflows and automations end to end." },
    gem:    { label: "Gem",   name: "Gemini",         cat: "ai",   color: "#7c8cff", note: "LLM power for conversational, automated features." },
    oai:    { label: "OAI",   name: "OpenAI",         cat: "ai",   color: "#19a37f", note: "LLMs for chat, lead qualification, and tooling." },
    mcp:    { label: "MCP",   name: "MCP",            cat: "ai",   color: "#d97757", note: "Model Context Protocol — giving AI real, safe tools." },
    code:   { label: "Code",  name: "VS Code",        cat: "tool", color: "#3f9bf0", note: "Where it all gets built, day to day." },
  };

  // helpers for normal + light keys
  const N = (label, w, fs) => ({ label, w: w || 1, type: "norm", fs });
  const L = (label, w, fs) => ({ label, w: w || 1, type: "light", fs });
  const K = (key, w, fs) => ({ ...T[key], w: w || 1, type: "tech", fs }); // tech key

  // complete ANSI 60% layout (15u wide). tech caps placed on letter keys.
  const ROWS = [
    [ L("Esc"), N("1"), N("2"), N("3"), N("4"), N("5"), N("6"), N("7"), N("8"), N("9"), N("0"), N("-"), N("="), N("Bksp", 2, ".5rem") ],
    [ N("Tab", 1.5, ".55rem"), K("skiq"), K("hot"), N("E"), K("ruby"), K("turbo"), N("Y"), N("U"), N("I"), K("oai"), K("psql"), N("["), N("]"), N("\\", 1.5) ],
    [ K("rails", 1.75), K("alp"), K("stim"), K("redis"), K("stripe"), K("gem"), K("html"), K("js"), K("git"), K("sql"), N(";"), N("'"), L("Enter", 2.25, ".55rem") ],
    [ N("Shift", 2.25, ".55rem"), N("Z"), N("X"), K("css"), K("code"), K("meta"), K("n8n"), K("mcp"), N(","), N("."), N("/"), L("Shift", 2.75, ".55rem") ],
    [ N("Ctrl", 1.25, ".52rem"), N("Cmd", 1.25, ".52rem"), N("Alt", 1.25, ".52rem"),
      { label: "ivanacalderon.com", sub: "space", w: 6.25, type: "light", fs: ".58rem" },
      N("Alt", 1.25, ".52rem"), N("Fn", 1.25, ".52rem"), N("Menu", 1.25, ".52rem"), N("Ctrl", 1.25, ".52rem") ],
  ];

  // luminance — pick readable text on a tech cap
  function txtOn(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    const L = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return L > 0.62 ? "#231f17" : "#ffffff";
  }
  const adjust = (hex, f) => {
    let r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    const c = v => Math.max(0, Math.min(255, Math.round(v * f))).toString(16).padStart(2, "0");
    return "#" + c(r) + c(g) + c(b);
  };

  const board = document.getElementById("board");
  const readout = document.getElementById("readout");
  if (!board || !readout) return;

  const rEls = {
    sw: readout.querySelector(".swatch"),
    tag: readout.querySelector(".tag"),
    name: readout.querySelector(".name"),
    note: readout.querySelector(".note"),
  };

  function paint(k) {
    const cc = CATCOLOR[k.cat] || "#888";
    rEls.sw.style.setProperty("--ro-color", k.color);
    rEls.tag.style.setProperty("--ro-tag", cc);
    rEls.tag.textContent = CATNAME[k.cat] || k.cat;
    rEls.name.textContent = k.name;
    rEls.note.textContent = k.note;
  }

  ROWS.forEach(row => {
    const r = document.createElement("div");
    r.className = "row";
    row.forEach(k => {
      const btn = document.createElement("button");
      btn.className = "key" + (k.type === "light" ? " light" : "") + (k.type === "tech" ? " tech" : "");
      btn.style.setProperty("--w", k.w || 1);
      if (k.fs) btn.style.setProperty("--fs", k.fs);
      if (k.type === "tech") {
        btn.style.setProperty("--top", k.color);
        btn.style.setProperty("--edge", adjust(k.color, 0.78));
        btn.style.setProperty("--label", txtOn(k.color));
        btn.style.setProperty("--glow", k.color);
        btn.setAttribute("aria-label", k.name);
      }
      const cap = document.createElement("span");
      cap.className = "cap";
      const lg = document.createElement("span");
      lg.className = "legend";
      lg.textContent = k.label;
      cap.appendChild(lg);
      if (k.sub) {
        const s = document.createElement("span");
        s.className = "sub-legend";
        s.textContent = k.sub;
        cap.appendChild(s);
      }
      btn.appendChild(cap);
      if (k.type === "tech") {
        const go = () => paint(k);
        btn.addEventListener("mouseenter", go);
        btn.addEventListener("focus", go);
        btn.addEventListener("click", go);
      }
      r.appendChild(btn);
    });
    board.appendChild(r);
  });

  // arrow navigation across all keys
  const keys = [...board.querySelectorAll(".key")];
  board.addEventListener("keydown", e => {
    const i = keys.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === "ArrowRight") { e.preventDefault(); keys[(i + 1) % keys.length].focus(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); keys[(i - 1 + keys.length) % keys.length].focus(); }
  });
})();
