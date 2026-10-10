/* =========================================================
   Portfolio – Amuthapriya Chandrasekaran
   Single-file portfolio: renders the whole page from the
   `profile` object below and pulls your repos from GitHub.

   Usage: create index.html containing only
     <div id="app"></div>
     <script src="script.js"></script>
   and publish with GitHub Pages.
   ========================================================= */

const profile = {
  name: "Amuthapriya Chandrasekaran",
  title: "Full Stack Developer",
  tagline:
    "C# / .NET developer with a background in university teaching. I build clean, fast web applications and enjoy explaining how they work.",
  githubUser: "amusathish",
  email: "amuthapriya.c@gmail.com",
  linkedin:
    "https://linkedin.com/in/amuthapriyachandrasekaran077495217",
  about: [
    "I am a software developer with around 2 years of hands-on experience designing and building web applications with C#, .NET MVC, TypeScript, jQuery and SQL.",
    "Before moving into development I spent about 8 years teaching computer science at university level, which shaped how I communicate, mentor and break down complex problems.",
    "I am currently expanding into data analysis, Python, Docker/Kubernetes and DevOps.",
  ],
  skills: {
    "Back end": ["C#", "LINQ", ".NET MVC", "Entity Framework", "REST APIs"],
    "Front end": ["TypeScript", "JavaScript", "jQuery", "Angular", "HTML/CSS"],
    "Data": ["MS SQL", "Stored procedures", "Python (learning)"],
    "Tools": ["Visio", "TortoiseSVN", "Git/GitHub", "Docker (learning)"],
  },
  experience: [
    {
      role: "Development Specialist",
      org: "Foundever Sweden AB, Gothenburg",
      period: "02/2023 – 10/2024",
      points: [
        "Developed and maintained web applications with ASP.NET MVC and C#, across front end and back end.",
        "Built interactive client-side features with TypeScript and jQuery.",
        "Wrote SQL queries and stored procedures supporting application logic and data integrity.",
        "Worked with senior developers and project managers on requirements, scope and delivery.",
        "Tested and debugged applications against functional and performance requirements.",
      ],
    },
    {
      role: "Assistant Professor",
      org: "GKM College of Engineering and Technology",
      period: "05/2009 – 04/2012",
      points: [
        "Taught Data Structures, DBMS, Computer Architecture, AI and Mobile Computing.",
        "Created course materials, including the FOSS lab.",
        "Supervised and mentored student projects and research.",
      ],
    },
    {
      role: "Lecturer",
      org: "PSNA College of Engineering and Technology",
      period: "06/2004 – 04/2009",
      points: [
        "Taught introductory and intermediate courses to first-year students.",
        "Contributed to departmental meetings and academic programme development.",
      ],
    },
  ],
  education: [
    "Master's in Computer Science and Engineering, Anna University",
    "Bachelor of Computer Science Engineering, Madurai Kamaraj University",
    "Data Analysis, ReDI School of Digital Integration, Malmö (in progress)",
    "Introduction to Programming in Python, Chalmers University of Technology (in progress)",
  ],
  languages: ["Tamil", "English", "Swedish"],
  // Add your own highlighted projects here (shown above the live GitHub list).
  featuredProjects: [
    // { name: "Project name", description: "What it does", tech: ["C#", ".NET"], url: "https://github.com/amusathish/..." },
  ],
};

/* ---------- helpers ---------- */
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  children.flat().forEach((c) =>
    node.append(c instanceof Node ? c : document.createTextNode(c))
  );
  return node;
};

const section = (id, title, ...content) =>
  el("section", { id, class: "section" },
    el("h2", {}, title),
    ...content
  );

/* ---------- styles ---------- */
function injectStyles() {
  const css = `
  :root{--bg:#0f172a;--card:#1e293b;--text:#e2e8f0;--muted:#94a3b8;--accent:#38bdf8;--border:#334155}
  :root[data-theme="light"]{--bg:#f8fafc;--card:#fff;--text:#0f172a;--muted:#475569;--accent:#0284c7;--border:#e2e8f0}
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
  a{color:var(--accent);text-decoration:none} a:hover{text-decoration:underline}
  header.nav{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:.8rem 1.5rem;background:var(--bg);border-bottom:1px solid var(--border)}
  header.nav nav{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}
  button.theme{background:none;border:1px solid var(--border);color:var(--text);border-radius:8px;padding:.3rem .6rem;cursor:pointer}
  main{max-width:900px;margin:0 auto;padding:0 1.25rem 4rem}
  .hero{padding:5rem 0 3rem}
  .hero h1{font-size:clamp(2rem,6vw,3.2rem);margin:0}
  .hero .title{color:var(--accent);font-size:1.3rem;margin:.3rem 0 1rem}
  .hero p{color:var(--muted);max-width:60ch}
  .btns{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.2rem}
  .btn{padding:.55rem 1.1rem;border-radius:8px;border:1px solid var(--accent);color:var(--accent)}
  .btn.primary{background:var(--accent);color:var(--bg)} .btn:hover{text-decoration:none;opacity:.85}
  .section{padding:2.5rem 0;border-top:1px solid var(--border)}
  .section h2{margin-top:0}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1rem}
  .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:1rem 1.2rem}
  .card h3{margin:.1rem 0 .4rem} .card p{margin:.3rem 0;color:var(--muted)}
  .tags{display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.5rem}
  .tag{font-size:.78rem;padding:.15rem .6rem;border-radius:999px;background:var(--bg);border:1px solid var(--border);color:var(--muted)}
  .job{margin-bottom:1.5rem} .job .meta{color:var(--muted);font-size:.9rem}
  .job ul{margin:.5rem 0 0;padding-left:1.2rem}
  footer{text-align:center;padding:2rem;color:var(--muted);border-top:1px solid var(--border)}
  `;
  document.head.append(el("style", {}, css));
}

/* ---------- sections ---------- */
function renderNav() {
  const links = ["about", "skills", "experience", "projects", "education", "contact"];
  const themeBtn = el("button", { class: "theme", "aria-label": "Toggle theme" }, "🌓");
  themeBtn.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (_) {}
  });
  return el("header", { class: "nav" },
    el("strong", {}, profile.name.split(" ")[0]),
    el("nav", {},
      links.map((l) => el("a", { href: `#${l}` }, l[0].toUpperCase() + l.slice(1))),
      themeBtn
    )
  );
}

function renderHero() {
  return el("div", { class: "hero" },
    el("h1", {}, profile.name),
    el("div", { class: "title" }, profile.title),
    el("p", {}, profile.tagline),
    el("div", { class: "btns" },
      el("a", { class: "btn primary", href: `https://github.com/${profile.githubUser}`, target: "_blank", rel: "noopener" }, "GitHub"),
      el("a", { class: "btn", href: profile.linkedin, target: "_blank", rel: "noopener" }, "LinkedIn"),
      el("a", { class: "btn", href: `mailto:${profile.email}` }, "Email me")
    )
  );
}

const renderAbout = () =>
  section("about", "About", ...profile.about.map((t) => el("p", {}, t)));

const renderSkills = () =>
  section("skills", "Skills",
    el("div", { class: "grid" },
      Object.entries(profile.skills).map(([group, items]) =>
        el("div", { class: "card" },
          el("h3", {}, group),
          el("div", { class: "tags" }, items.map((s) => el("span", { class: "tag" }, s)))
        )
      )
    )
  );

const renderExperience = () =>
  section("experience", "Experience",
    profile.experience.map((j) =>
      el("div", { class: "job" },
        el("h3", {}, j.role),
        el("div", { class: "meta" }, `${j.org} · ${j.period}`),
        el("ul", {}, j.points.map((p) => el("li", {}, p)))
      )
    )
  );

function projectCard({ name, description, tech = [], url }) {
  return el("div", { class: "card" },
    el("h3", {}, el("a", { href: url, target: "_blank", rel: "noopener" }, name)),
    el("p", {}, description || "No description yet."),
    el("div", { class: "tags" }, tech.filter(Boolean).map((t) => el("span", { class: "tag" }, t)))
  );
}

function renderProjects() {
  const grid = el("div", { class: "grid" });
  profile.featuredProjects.forEach((p) => grid.append(projectCard(p)));
  const status = el("p", { class: "meta" }, "Loading repositories from GitHub…");
  loadRepos(grid, status);
  return section("projects", "Projects", grid, status);
}

async function loadRepos(grid, status) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=100`
    );
    if (!res.ok) throw new Error(res.status);
    const repos = (await res.json())
      .filter((r) => !r.fork && r.name.toLowerCase() !== `${profile.githubUser}.github.io`)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 9);
    repos.forEach((r) =>
      grid.append(projectCard({
        name: r.name,
        description: r.description,
        tech: [r.language, r.stargazers_count ? `★ ${r.stargazers_count}` : null],
        url: r.html_url,
      }))
    );
    status.textContent = repos.length || profile.featuredProjects.length
      ? ""
      : "No public repositories yet – add some projects on GitHub!";
  } catch (_) {
    status.innerHTML = `Could not load repositories. See them on <a href="https://github.com/${profile.githubUser}" target="_blank" rel="noopener">GitHub</a>.`;
  }
}

const renderEducation = () =>
  section("education", "Education & Languages",
    el("ul", {}, profile.education.map((e) => el("li", {}, e))),
    el("p", {}, el("strong", {}, "Languages: "), profile.languages.join(", "))
  );

const renderContact = () =>
  section("contact", "Contact",
    el("p", {}, "Open to full stack / .NET developer opportunities. Get in touch:"),
    el("p", {},
      el("a", { href: `mailto:${profile.email}` }, profile.email), " · ",
      el("a", { href: profile.linkedin, target: "_blank", rel: "noopener" }, "LinkedIn"), " · ",
      el("a", { href: `https://github.com/${profile.githubUser}`, target: "_blank", rel: "noopener" }, "GitHub")
    )
  );

/* ---------- boot ---------- */
function init() {
  document.title = `${profile.name} – ${profile.title}`;
  let theme = "dark";
  try { theme = localStorage.getItem("theme") || theme; } catch (_) {}
  document.documentElement.dataset.theme = theme;
  injectStyles();

  const app = document.getElementById("app") || document.body.appendChild(el("div", { id: "app" }));
  app.append(
    renderNav(),
    el("main", {},
      renderHero(), renderAbout(), renderSkills(), renderExperience(),
      renderProjects(), renderEducation(), renderContact()
    ),
    el("footer", {}, `© ${new Date().getFullYear()} ${profile.name}`)
  );
}

document.addEventListener("DOMContentLoaded", init);
