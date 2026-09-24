const categoryMeta = {
  academic: {
    id: "academic",
    title: "Academic Projects",
    icon: "▣",
    blurb: "Coursework and lab work turned into complete, documented applications.",
    intro:
      "Projects completed as part of my studies — structured around real requirements, deadlines, and clean implementation.",
  },
  personal: {
    id: "personal",
    title: "Personal Projects",
    icon: "◈",
    blurb: "Self-started builds I made because the idea wouldn’t leave me alone.",
    intro:
      "Independent work where I chose the problem, the stack, and the finish line. These are the projects I use to practice product thinking.",
  },
  learning: {
    id: "learning",
    title: "Learning Projects",
    icon: "◎",
    blurb: "Practice builds I used to lock in a concept, API, or new stack.",
    intro:
      "Focused experiments. Each one exists to lock in a skill — and still looks like a finished piece.",
  },
};

const domains = [
  {
    id: "ml",
    title: "Machine Learning",
    icon: "λ",
    image: "assets/ml_banner.jpg",
    blurb: "Model training, evaluation pipelines, and predictive algorithms.",
    intro: "Here are the machine learning projects in that category.",
    categories: {
      academic: [
        {
          title: "Iris Classifier Lab",
          description:
            "A classification pipeline with train/test split, metric report, and a short write-up of why the chosen model beat the baseline.",
          tags: ["Python", "scikit-learn", "Pandas"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      personal: [
        {
          title: "Movie Taste Matcher",
          description:
            "A small recommender that suggests titles from ratings and genres. Built to practice feature prep and a simple similarity model.",
          tags: ["Python", "NumPy", "Recommenders"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      learning: [
        {
          title: "Linear Regression Notebook",
          description:
            "A step-by-step notebook from raw CSV to fitted line, residual plots, and a plain-language reading of the coefficients.",
          tags: ["Jupyter", "Matplotlib", "ML basics"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
    },
  },
  {
    id: "ds",
    title: "Data Science",
    icon: "▤",
    image: "assets/ds_banner.jpg",
    blurb: "Data cleaning, exploratory analysis, and visualization dashboards.",
    intro: "Here are the data science projects in that category.",
    categories: {
      academic: [
        {
          title: "Traffic Data Analysis",
          description:
            "An exploratory data analysis (EDA) project on city traffic data to identify rush hour patterns and accident hotspots.",
          tags: ["Python", "Pandas", "Matplotlib"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      personal: [
        {
          title: "Real Estate Scraper & Dashboard",
          description:
            "A pipeline that scrapes local real estate listings daily and presents average price trends on an interactive Plotly dashboard.",
          tags: ["Python", "BeautifulSoup", "Plotly"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      learning: [
        {
          title: "A/B Testing Simulation",
          description:
            "A simulated A/B test analysis using SciPy to determine statistical significance between two marketing landing pages.",
          tags: ["Python", "SciPy", "StatsModels"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
    },
  },
  {
    id: "se",
    title: "Software Engineering",
    icon: "{}",
    image: "assets/se_banner.jpg",
    blurb: "Scalable apps, APIs, and backend systems with a clear structure.",
    intro: "Here are the software engineering projects in that category.",
    categories: {
      academic: [
        {
          title: "Campus Library System",
          description:
            "A desktop-style web app for catalog search, issue/return flow, and fine tracking. Built around a relational schema and role-based screens for students and librarians.",
          tags: ["Python", "SQLite", "HTML/CSS"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
        {
          title: "Student Result Portal",
          description:
            "CRUD portal for marks, attendance, and report generation. Focused on form validation, normalized tables, and a simple admin dashboard.",
          tags: ["Java", "MySQL", "JSP"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      personal: [
        {
          title: "This Portfolio",
          description:
            "A single-page site with field-first browsing, then academic / personal / learning, then project cards. Built to feel like a small product, not a long list.",
          tags: ["HTML", "CSS", "JavaScript"],
          live: "#home",
          code: "https://github.com/",
        },
        {
          title: "Habit Loop",
          description:
            "A lightweight habit tracker with streaks, weekly review, and local storage. Designed to stay fast and usable without an account.",
          tags: ["React", "LocalStorage", "UI"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
      learning: [
        {
          title: "Notes REST Client",
          description:
            "A notes frontend talking to a REST API: create, edit, filter, and optimistic updates. Used this to get comfortable with JSON APIs.",
          tags: ["Node.js", "Express", "REST"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
        {
          title: "Algorithm Visualizer",
          description:
            "Interactive visualizer for sorting and pathfinding. Step-through controls, speed slider, and explanations so classmates could see how each algorithm behaves.",
          tags: ["JavaScript", "Canvas", "DSA"],
          live: "https://github.com/",
          code: "https://github.com/",
        },
      ],
    },
  },
];

const domainGrid = document.getElementById("category-grid");
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalIntro = document.getElementById("modal-intro");
const modalGrid = document.getElementById("project-grid");
const year = document.getElementById("year");

let activeDomain = null;

year.textContent = new Date().getFullYear();

function projectCount(domain) {
  return Object.values(domain.categories).reduce((sum, list) => sum + list.length, 0);
}

domainGrid.innerHTML = domains
  .map(
    (domain) => `
    <button class="category-card" type="button" data-domain="${domain.id}">
      <img class="card-cover" src="${domain.image}" alt="${domain.title} Cover" />
      <div class="card-content">
        <span class="cat-icon" aria-hidden="true">${domain.icon}</span>
        <h3>${domain.title}</h3>
        <p>${domain.blurb}</p>
        <span class="cat-count">${projectCount(domain)} projects →</span>
      </div>
    </button>
  `
  )
  .join("");

function projectCard(project, categoryTitle) {
  const liveLabel = project.live.startsWith("#") ? "View site" : "Live / demo";
  return `
    <article class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tags">
        <span class="tag-category">${categoryTitle}</span>
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <div class="card-links">
        <a class="btn-link" href="${project.live}" ${
          project.live.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""
        }>${liveLabel}</a>
        <a class="btn-link" href="${project.code}" target="_blank" rel="noopener noreferrer">Code</a>
      </div>
    </article>
  `;
}

function showProjects(domain) {
  modalTitle.textContent = domain.title;
  modalIntro.textContent = domain.intro;
  modalGrid.classList.add("is-projects");
  
  let allProjectsHTML = "";
  for (const catId in domain.categories) {
    const projects = domain.categories[catId];
    if (projects && projects.length > 0) {
      const categoryTitle = categoryMeta[catId].title;
      allProjectsHTML += projects.map(p => projectCard(p, categoryTitle)).join("");
    }
  }
  
  modalGrid.innerHTML = allProjectsHTML || `<p class="empty-note">No projects in this bucket yet.</p>`;
}

function openDomain(id) {
  activeDomain = domains.find((item) => item.id === id);
  if (!activeDomain) return;
  showProjects(activeDomain);
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector("[data-close-modal].icon-btn").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  activeDomain = null;
}

domainGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-domain]");
  if (card) openDomain(card.dataset.domain);
});

modal.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-modal]")) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") {
    closeModal();
  }
});

const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "☾";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "☾";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀";
  }
});

const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
