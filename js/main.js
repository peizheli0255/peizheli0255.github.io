const text = {
  zh: {
    navAbout: "关于我",
    navResearch: "科研",
    navLife: "博客",
    navAlbums: "歌曲",
    navAnime: "动漫",
    navCrafts: "手作",
    navGallery: "相册",
    galleryTitle: "相册",
    galleryIntro: "这里是独立相册页。你可以从首页进入指定栏目，也可以从顶部相册入口查看全部照片分类。",
    galleryCrafts: "手工作品",
    galleryOther: "其它照片",
    introTitle: "你好，我是李培哲。",
    educationTitle: "教育经历",
    educationMaster: "硕士阶段",
    educationMasterText: "西安交通大学 · 信息与通信工程学院 · 通信工程 · 2025.09 - 至今",
    educationBachelor: "本科阶段",
    educationBachelorText: "西北农林科技大学 · 机械与电子工程学院 · 电子信息工程 · 2021.09 - 2025.06",
    emailButton: "邮箱",
    newsTitle: "近况",
    newsItem1: "完成个人网页的初步创建，之后会继续补充科研、博客、相册与个人作品内容。",
    researchTitle: "科研",
    researchDesc1: "一句话说明这个项目解决的问题、使用的方法，以及你最想让别人记住的贡献。",
    researchDesc2: "如果暂时没有正式论文，也可以把课程项目、读书报告、实验复现或正在探索的问题放在这里。",
    lifeTitle: "博客",
    viewAllPosts: "展示全部",
    showAll: "展示全部",
    blogTitle1: "把个人网站当作一个长期的房间",
    blogDesc1: "记录为什么想建这个网站，以及科研与生活怎样在同一页里共存。",
    blogTitle2: "最近听到的一张专辑",
    blogDesc2: "一篇可以逐渐替换成真实内容的听歌札记。",
    blogTitle3: "手作过程记录",
    blogDesc3: "材料、失败、修正，以及最后留下来的细节。",
    albumsTitle: "喜欢的歌曲",
    animeTitle: "喜欢的动漫",
    craftsTitle: "手工作品",
    showGallery: "打开相册",
    craftNote1: "描述作品的材料、制作时间、过程，以及最后最满意的细节。",
    craftNote2: "这里可以放第二件作品，列表会在固定高度内上下滚动。",
    footerCopyright: "(c) 2026 Peizhe Li",
    footerUpdated: "Last updated: May 2026",
    footerPowered: "Powered by Codex",
    prevItem: "上一页",
    backToList: "返回列表",
    nextItem: "下一页",
    backTop: "回到顶部"
  },
  en: {
    navAbout: "About Me",
    navResearch: "Research",
    navLife: "Blog",
    navAlbums: "Songs",
    navAnime: "Anime",
    navCrafts: "Crafts",
    navGallery: "Gallery",
    galleryTitle: "Gallery",
    galleryIntro: "This is an independent gallery page. You can jump to a specific category from the homepage, or enter from the top navigation to browse all categories.",
    galleryCrafts: "Handmade Works",
    galleryOther: "Other Photos",
    introTitle: "Hi, I am Peizhe Li.",
    educationTitle: "Education",
    educationMaster: "Master's Program",
    educationMasterText: "Xi'an Jiaotong University · School of Information and Communications Engineering · Communication Engineering · Sep. 2025 - Present",
    educationBachelor: "Bachelor's Program",
    educationBachelorText: "Northwest A&F University · College of Mechanical and Electronic Engineering · Electronic Information Engineering · Sep. 2021 - Jun. 2025",
    emailButton: "Email",
    newsTitle: "News",
    newsItem1: "Finished the first version of my personal website. Research, blog posts, galleries, and personal works will be added gradually.",
    researchTitle: "Research",
    researchDesc1: "A one-sentence summary of the problem, method, and contribution of this project.",
    researchDesc2: "If there is no formal paper yet, course projects, reading notes, replications, or ongoing ideas can live here.",
    lifeTitle: "Blog",
    viewAllPosts: "Show all",
    showAll: "Show all",
    blogTitle1: "A Personal Website as a Long-Term Room",
    blogDesc1: "Why I want to build this website, and how research and life can coexist on one page.",
    blogTitle2: "An Album I Have Been Listening To",
    blogDesc2: "A music note that can later become real content.",
    blogTitle3: "A Craft Process Note",
    blogDesc3: "Materials, failures, revisions, and the details that remain.",
    albumsTitle: "Favorite Songs",
    animeTitle: "Favorite Anime",
    craftsTitle: "Handmade Works",
    showGallery: "Open gallery",
    craftNote1: "Describe the material, time, process, and the detail you like most.",
    craftNote2: "A second work can go here. This list scrolls vertically within a fixed height.",
    footerCopyright: "(c) 2026 Peizhe Li",
    footerUpdated: "Last updated: May 2026",
    footerPowered: "Powered by Codex",
    prevItem: "Previous",
    backToList: "Back to list",
    nextItem: "Next",
    backTop: "Back to top"
  }
};

function setLanguage(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (text[lang] && text[lang][key]) node.textContent = text[lang][key];
  });
  document.querySelectorAll("[data-lang-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.langPanel === lang);
  });
  const label = document.querySelector("#languageLabel");
  if (label) label.textContent = lang === "zh" ? "中" : "EN";
  localStorage.setItem("site-language", lang);
}

function toggleLanguage() {
  const current = localStorage.getItem("site-language") || "zh";
  setLanguage(current === "zh" ? "en" : "zh");
}

function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("site-theme", theme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
}

function setupEmailDropdown() {
  const toggle = document.querySelector("#emailToggle");
  const panel = document.querySelector("#emailPanel");
  if (!toggle || !panel) return;
  const dropdown = toggle.closest(".email-dropdown");

  const closePanel = () => {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  panel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", (event) => {
    if (!panel.classList.contains("open")) return;
    if (dropdown && dropdown.contains(event.target)) return;
    closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });
}

function setupCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        button.classList.add("copied");
        window.setTimeout(() => button.classList.remove("copied"), 180);
      } catch {
        const temp = document.createElement("textarea");
        temp.value = value;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
      }
    });
  });
}

function enableDragScroll() {
  document.querySelectorAll("[data-drag-scroll]").forEach((rail) => {
    if (rail.classList.contains("song-rail")) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasDragged = false;
    let startedOnLink = false;
    let nextScrollLeft = 0;
    let frameId = 0;

    const updateScroll = () => {
      rail.scrollLeft = nextScrollLeft;
      frameId = 0;
    };

    rail.addEventListener("pointerdown", (event) => {
      isDown = true;
      hasDragged = false;
      startedOnLink = Boolean(event.target.closest("a"));
      rail.classList.add("dragging");
      startX = event.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      if (!startedOnLink) rail.setPointerCapture(event.pointerId);
    });

    rail.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const x = event.pageX - rail.offsetLeft;
      const distance = Math.abs(x - startX);
      if (distance <= 14) return;
      hasDragged = true;
      event.preventDefault();
      nextScrollLeft = scrollLeft - (x - startX);
      if (!frameId) frameId = window.requestAnimationFrame(updateScroll);
    });

    rail.addEventListener("pointerup", () => {
      isDown = false;
      startedOnLink = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        updateScroll();
      }
      rail.classList.remove("dragging");
    });

    rail.addEventListener("pointerleave", () => {
      isDown = false;
      startedOnLink = false;
      if (frameId) {
        window.cancelAnimationFrame(frameId);
        updateScroll();
      }
      rail.classList.remove("dragging");
    });

    rail.addEventListener("click", (event) => {
      if (!hasDragged) return;
      event.preventDefault();
      event.stopPropagation();
      hasDragged = false;
    }, true);
  });
}

function enableVerticalDragScroll() {
  document.querySelectorAll("[data-drag-y-scroll]").forEach((rail) => {
    let isDown = false;
    let startY = 0;
    let scrollTop = 0;
    let hasDragged = false;
    let startedOnLink = false;

    rail.addEventListener("pointerdown", (event) => {
      isDown = true;
      hasDragged = false;
      startedOnLink = Boolean(event.target.closest("a"));
      rail.classList.add("dragging");
      startY = event.pageY - rail.offsetTop;
      scrollTop = rail.scrollTop;
      if (!startedOnLink) rail.setPointerCapture(event.pointerId);
    });

    rail.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const y = event.pageY - rail.offsetTop;
      const distance = Math.abs(y - startY);
      if (distance <= 14) return;
      hasDragged = true;
      event.preventDefault();
      rail.scrollTop = scrollTop - (y - startY);
    });

    rail.addEventListener("pointerup", () => {
      isDown = false;
      startedOnLink = false;
      rail.classList.remove("dragging");
    });

    rail.addEventListener("pointerleave", () => {
      isDown = false;
      startedOnLink = false;
      rail.classList.remove("dragging");
    });

    rail.addEventListener("click", (event) => {
      if (!hasDragged) return;
      event.preventDefault();
      event.stopPropagation();
      hasDragged = false;
    }, true);
  });
}

function setupCustomScrollbars() {
  const scrollables = document.querySelectorAll(".vertical-scroll, .horizontal-scroll, .drag-rail");

  scrollables.forEach((node) => {
    const isHorizontal = node.classList.contains("drag-rail") || (node.classList.contains("horizontal-scroll") && !node.classList.contains("vertical-mode"));
    const bar = document.createElement("span");
    bar.className = `custom-scrollbar ${isHorizontal ? "horizontal" : "vertical"}`;
    bar.setAttribute("aria-hidden", "true");
    node.appendChild(bar);

    let hideTimer;

    const update = () => {
      if (isHorizontal) {
        const ratio = node.clientWidth / node.scrollWidth;
        const width = Math.max(34, node.clientWidth * ratio);
        const left = node.scrollLeft + (node.scrollLeft / Math.max(1, node.scrollWidth - node.clientWidth)) * (node.clientWidth - width);
        bar.style.width = `${width}px`;
        bar.style.transform = `translateX(${left}px)`;
      } else {
        const ratio = node.clientHeight / node.scrollHeight;
        const height = Math.max(34, node.clientHeight * ratio);
        const top = node.scrollTop + (node.scrollTop / Math.max(1, node.scrollHeight - node.clientHeight)) * (node.clientHeight - height);
        bar.style.height = `${height}px`;
        bar.style.transform = `translateY(${top}px)`;
      }
    };

    const show = () => {
      window.clearTimeout(hideTimer);
      update();
      node.classList.add("scrollbar-visible");
    };

    const hide = () => {
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => node.classList.remove("scrollbar-visible"), 420);
    };

    if (isHorizontal && node.classList.contains("song-rail")) {
      let isDraggingBar = false;
      let startX = 0;
      let startScrollLeft = 0;

      const stopBarDrag = () => {
        if (!isDraggingBar) return;
        isDraggingBar = false;
        bar.classList.remove("dragging");
        hide();
      };

      bar.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        isDraggingBar = true;
        startX = event.clientX;
        startScrollLeft = node.scrollLeft;
        bar.classList.add("dragging");
        node.classList.add("scrollbar-visible");
        bar.setPointerCapture(event.pointerId);
      });

      bar.addEventListener("pointermove", (event) => {
        if (!isDraggingBar) return;
        event.preventDefault();
        node.scrollLeft = startScrollLeft + (event.clientX - startX) * 2.4;
        update();
      });

      bar.addEventListener("pointerup", stopBarDrag);
      bar.addEventListener("pointercancel", stopBarDrag);
      bar.addEventListener("lostpointercapture", stopBarDrag);

    }

    node.addEventListener("mouseenter", show);
    node.addEventListener("mousemove", show);
    node.addEventListener("mouseleave", hide);
    node.addEventListener("scroll", () => {
      show();
      hide();
    });
    window.addEventListener("resize", update);
    update();
  });
}

function setupSongWheelScroll() {
  const rail = document.querySelector(".song-rail");
  if (!rail) return;

  const wheelArea = document.querySelector("#albums") || rail;
  const getWheelDistance = (event) => {
    const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
    return (event.deltaY || event.deltaX) * unit * 3.2;
  };

  wheelArea.addEventListener("wheel", (event) => {
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    if (maxScroll <= 0) return;

    const nextScrollLeft = Math.min(Math.max(rail.scrollLeft + getWheelDistance(event), 0), maxScroll);
    if (nextScrollLeft === rail.scrollLeft) return;

    event.preventDefault();
    rail.scrollLeft = nextScrollLeft;
  }, { passive: false });
}

function setupCurrentPageTopNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  const currentPageKeys = {
    "songs.html": "navAlbums",
    "anime.html": "navAnime",
    "gallery.html": "navGallery"
  };
  const currentKey = currentPageKeys[page];
  if (!currentKey) return;

  const link = document.querySelector(`.nav-links a[data-i18n="${currentKey}"]`);
  if (!link) return;

  link.setAttribute("href", "#top");
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupBrandHomeLink() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page !== "index.html") return;

  const brandLink = document.querySelector(".brand");
  if (!brandLink) return;

  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.querySelector("#languageButton")?.addEventListener("click", toggleLanguage);
document.querySelector("#themeButton")?.addEventListener("click", toggleTheme);

setTheme(localStorage.getItem("site-theme") || "light");
setLanguage(localStorage.getItem("site-language") || "zh");
setupEmailDropdown();
setupCopyButtons();
enableDragScroll();
enableVerticalDragScroll();
setupCustomScrollbars();
setupSongWheelScroll();
setupBrandHomeLink();
setupCurrentPageTopNav();
