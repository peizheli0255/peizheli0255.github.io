const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "data", "content.json"), "utf8"));

const groups = {
  songs: {
    detailPrefix: "song",
    detailTitle: "Favorite Song",
    archiveFile: "songs.html",
    archiveTitle: "Favorite Songs",
    archiveHeadingKey: "albumsTitle",
    archiveHeadingFallback: "喜欢的歌曲",
    archiveKicker: "Music Archive",
    archiveIntroZh: "这里展示完整的歌曲列表。以后可以把封面、歌手、所属专辑和推荐理由替换成真实内容。",
    archiveIntroEn: "This page shows the full song list. Covers, artists, albums, and notes can later be replaced with real content.",
    listUrlFromDetail: "../songs.html",
    listUrlFromIndex: "songs.html",
    indexBlockSelector: /<div class="drag-rail song-rail" data-drag-scroll>[\s\S]*?<\/div>\s*<\/section>/,
    indexSectionEnd: "</div>\n    </section>",
    imageAlt: "Song cover",
    detailInfo(item) {
      return [
        ["Artist", item.artist],
        ["Year", item.year],
        ["Album", item.album]
      ];
    },
    detailExtra(item) {
      const href = item.qqMusicUrl || "#";
      const disabled = item.qqMusicUrl ? "" : " is-disabled";
      const attrs = item.qqMusicUrl ? ` href="${attr(href)}" target="_blank" rel="noreferrer"` : ` href="#" aria-disabled="true"`;
      return `<p class="music-link-row"><a class="music-platform-link${disabled}"${attrs}><img src="../icons/qqmusic.svg" alt="" aria-hidden="true"><span>QQ Music</span></a></p>`;
    },
    archiveMeta(item) {
      return `${item.artist} · ${item.album} · ${item.year}`;
    },
    indexMeta(item) {
      return `${item.artist} · ${item.year}`;
    }
  },
  anime: {
    detailPrefix: "anime",
    detailTitle: "Favorite Anime",
    archiveFile: "anime.html",
    archiveTitle: "Favorite Anime",
    archiveHeadingKey: "animeTitle",
    archiveHeadingFallback: "喜欢的动漫",
    archiveKicker: "Anime Archive",
    archiveIntroZh: "这里展示完整的动漫列表。以后可以把封面、年份、制作公司、角色和推荐理由替换成真实内容。",
    archiveIntroEn: "This page shows the full anime list. Covers, years, studios, characters, and notes can later be replaced with real content.",
    listUrlFromDetail: "../anime.html",
    listUrlFromIndex: "anime.html",
    indexBlockSelector: /<div class="horizontal-scroll vertical-mode anime-row" data-drag-y-scroll>[\s\S]*?<\/div>\s*<\/section>/,
    indexSectionEnd: "</div>\n    </section>",
    imageAlt: "Anime cover",
    detailInfo(item) {
      return [
        ["Year", item.year],
        ["Studio", item.studio],
        ["Category", item.category || item.favorite]
      ];
    },
    archiveMeta(item) {
      return `${item.year} · ${item.studio}`;
    },
    indexMeta(item) {
      return `${item.year} · ${item.studio}`;
    }
  },
  crafts: {
    detailPrefix: "craft",
    detailTitle: "Handmade Work",
    listUrlFromDetail: "../index.html#crafts",
    listUrlFromIndex: "gallery.html#crafts",
    indexBlockSelector: /<div class="vertical-scroll craft-list" data-drag-y-scroll>[\s\S]*?<\/div>\s*<\/section>/,
    indexSectionEnd: "</div>\n    </section>",
    imageAlt: "Handmade work",
    detailInfo(item) {
      return [
        ["Material", item.material],
        ["Time", item.time],
        ["Status", item.status]
      ];
    },
    indexMeta(item) {
      return `${item.material} · ${item.status} · ${item.time}`;
    }
  }
};

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attr(value) {
  return esc(value).replace(/'/g, "&#39;");
}

function detailImagePath(item) {
  return `../${item.image}`;
}

function topImagePath(item) {
  return item.image;
}

function header(prefix = "..") {
  return `<header class="site-header">
    <div class="wrap nav-shell">
      <a class="brand" href="${prefix}/index.html">Peizhe Li's Homepage</a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="${prefix}/index.html#about" data-i18n="navAbout">关于</a>
        <a href="${prefix}/index.html#research" data-i18n="navResearch">科研</a>
        <a href="${prefix}/index.html#life" data-i18n="navLife">博客</a>
        <a href="${prefix}/songs.html" data-i18n="navAlbums">歌曲</a>
        <a href="${prefix}/anime.html" data-i18n="navAnime">动漫</a>
        <a href="${prefix}/index.html#crafts" data-i18n="navCrafts">手作</a>
        <a href="${prefix}/gallery.html" data-i18n="navGallery">相册</a>
      </nav>
      <div class="control-row">
        <button class="icon-button language-button" id="languageButton" type="button" aria-label="Switch language" title="Switch language"><img src="${prefix}/assets/icons/earth.svg" alt="" aria-hidden="true"><span id="languageLabel">中</span></button>
        <button class="theme-switch" id="themeButton" type="button" aria-label="Toggle dark mode" title="Toggle dark mode"><span></span></button>
      </div>
    </div>
  </header>`;
}

function topHeader() {
  return header(".").replaceAll("./", "");
}

function infoList(rows) {
  return `<dl class="info-list">
${rows.map(([key, value]) => `        <dt>${esc(key)}</dt><dd>${esc(value)}</dd>`).join("\n")}
      </dl>`;
}

function pager(group, index, total) {
  const prefix = group.detailPrefix;
  const prev = index > 0
    ? `<a href="${prefix}-${index}.html" data-i18n="prevItem">上一页</a>`
    : `<span class="pager-disabled" data-i18n="prevItem" aria-disabled="true">上一页</span>`;
  const next = index < total - 1
    ? `<a href="${prefix}-${index + 2}.html" data-i18n="nextItem">下一页</a>`
    : `<span class="pager-disabled" data-i18n="nextItem" aria-disabled="true">下一页</span>`;
  return `<nav class="detail-pager" aria-label="Detail pagination">${prev}<a href="${group.listUrlFromDetail}" data-i18n="backToList">返回列表</a>${next}</nav>`;
}

function detailPage(group, item, index, total) {
  const prefix = group.detailPrefix;
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(item.title)} | Peizhe Li</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body class="detail-page">
  ${header("..")}
  <main class="wrap detail-layout">
    <img class="detail-cover" src="${attr(detailImagePath(item))}" alt="${attr(group.imageAlt)}">
    <article class="detail-content">
      <p class="kicker">${esc(group.detailTitle)}</p>
      <h1>${esc(item.title)}</h1>
      ${infoList(group.detailInfo(item))}
      ${group.detailExtra ? group.detailExtra(item) : ""}
      <div data-lang-panel="zh" class="active">
        <p>${esc(item.zh)}</p>
      </div>
      <div data-lang-panel="en">
        <p>${esc(item.en)}</p>
      </div>
      ${pager(group, index, total)}
    </article>
  </main>
  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function catalogItem(group, item) {
  const prefix = group.detailPrefix;
  const animeClass = prefix === "anime" ? " anime-catalog" : "";
  return `      <article class="catalog-item${animeClass}"><img src="${attr(topImagePath(item))}" alt="${attr(group.imageAlt)}"><div><h3>${esc(item.title)}</h3><p>${esc(group.archiveMeta(item))}</p></div><a class="expand-icon" href="details/${prefix}-${item.id}.html" aria-label="Open ${attr(item.title)} details">&rsaquo;</a></article>`;
}

function archivePage(group, items) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(group.archiveTitle)} | Peizhe Li</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  ${topHeader()}

  <main class="wrap">
    <section class="gallery-hero">
      <p class="kicker">${esc(group.archiveKicker)}</p>
      <h1 data-i18n="${group.archiveHeadingKey}">${esc(group.archiveHeadingFallback)}</h1>
      <div data-lang-panel="zh" class="active">
        <p>${esc(group.archiveIntroZh)}</p>
      </div>
      <div data-lang-panel="en">
        <p>${esc(group.archiveIntroEn)}</p>
      </div>
    </section>

    <section class="catalog-grid" aria-label="${esc(group.archiveTitle)}">
${items.map((item) => catalogItem(group, item)).join("\n")}
    </section>
  </main>

  <script src="js/main.js"></script>
</body>
</html>
`;
}

function songIndexCard(item) {
  return `        <a class="cover-card song-card" href="details/song-${item.id}.html" aria-label="Open ${attr(item.title)} details">
          <img src="${attr(topImagePath(item))}" alt="Song cover">
          <span><strong>${esc(item.title)}</strong><small>${esc(groups.songs.indexMeta(item))}</small></span>
        </a>`;
}

function animeIndexCard(item) {
  return `        <article class="anime-strip">
          <img src="${attr(topImagePath(item))}" alt="Anime cover">
          <span><strong>${esc(item.title)}</strong><small>${esc(groups.anime.indexMeta(item))}</small></span>
          <a class="expand-icon" href="details/anime-${item.id}.html" aria-label="Open ${attr(item.title)} details">&rsaquo;</a>
        </article>`;
}

function craftIndexCard(item) {
  return `        <a class="craft-entry" href="details/craft-${item.id}.html">
          <img src="${attr(topImagePath(item))}" alt="Handmade work">
          <div>
            <h3>${esc(item.title)}</h3>
            <p class="meta">${esc(groups.crafts.indexMeta(item))}</p>
            <p data-lang-panel="zh" class="active">${esc(item.zh)}</p>
            <p data-lang-panel="en">${esc(item.en)}</p>
          </div>
        </a>`;
}

function replaceIndexBlock(indexHtml, group, items, inner) {
  const match = indexHtml.match(group.indexBlockSelector);
  if (!match) throw new Error(`Could not find index block for ${group.detailPrefix}`);
  const firstLine = match[0].match(/<div class="[^"]+"[^>]*>/)[0];
  return indexHtml.replace(group.indexBlockSelector, `${firstLine}\n${inner}\n      ${group.indexSectionEnd}`);
}

function updateIndex() {
  let indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
  indexHtml = replaceIndexBlock(indexHtml, groups.songs, content.songs, content.songs.map(songIndexCard).join("\n"));
  indexHtml = replaceIndexBlock(indexHtml, groups.anime, content.anime, content.anime.map(animeIndexCard).join("\n"));
  indexHtml = replaceIndexBlock(indexHtml, groups.crafts, content.crafts, content.crafts.map(craftIndexCard).join("\n"));
  fs.writeFileSync(path.join(root, "index.html"), indexHtml);
}

function main() {
  for (const [name, items] of Object.entries(content)) {
    const group = groups[name];
    if (!group) continue;
    items.forEach((item, index) => {
      const file = path.join(root, "details", `${group.detailPrefix}-${item.id}.html`);
      fs.writeFileSync(file, detailPage(group, item, index, items.length));
    });
    if (group.archiveFile) {
      fs.writeFileSync(path.join(root, group.archiveFile), archivePage(group, items));
    }
  }
  updateIndex();
  console.log("Generated detail pages, archive pages, and homepage collection blocks.");
}

main();
