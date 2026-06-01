# Peizhe Li's Homepage

Static personal website built with plain HTML, CSS, and JavaScript.

## Structure

- `index.html` - homepage with profile, research, blog, songs, anime, and crafts sections.
- `songs.html`, `anime.html`, `gallery.html` - archive pages for life collections.
- `details/` - generated detail pages for songs, anime, and handmade works.
- `posts/` - blog post pages.
- `css/styles.css` - shared layout, theme, typography, and component styles.
- `js/main.js` - language switching, dark mode, copy buttons, and custom drag scrolling.
- `data/content.json` - editable source data for songs, anime, and handmade works.
- `scripts/generate-content.js` - generator for detail pages, archive pages, and homepage collection blocks.
- `assets/` - profile image, icons, covers, gallery images, and placeholder asset notes.

## Editing Songs, Anime, and Crafts

Edit `data/content.json` first. Each item has an `id`, `title`, `image`, metadata fields, and `zh` / `en` descriptions.

For song detail pages, edit the `qqMusicUrl` field on each song item. Paste the exact QQ Music song page URL there, then run the generator. The detail page button uses `icons/qqmusic.svg` automatically.

Image paths should keep the current convention:

- Songs: `assets/songs/song-1.jpg`, `assets/songs/song-2.jpg`, ...
- Anime: `assets/anime/anime-1.jpg`, `assets/anime/anime-2.jpg`, ...
- Crafts: `assets/crafts/work-1.jpg`, `assets/crafts/work-2.jpg`, ...

After editing data or replacing images, regenerate the static pages:

```powershell
npm run generate
```

Equivalent direct command:

```powershell
node scripts\generate-content.js
```

The generator updates:

- `details/song-*.html`
- `details/anime-*.html`
- `details/craft-*.html`
- `songs.html`
- `anime.html`
- the homepage song, anime, and craft sections in `index.html`

## Local Preview

Open `index.html` directly in a browser. No build step is required.
