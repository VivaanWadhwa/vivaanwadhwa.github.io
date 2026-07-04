# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

No lint or test scripts are configured.

## Architecture

This is a Next.js personal portfolio site (vivaanwadhwa.github.io).

**Page structure:** `pages/index.js` is a playable Pokemon Emerald–style overworld game (desktop only; mobile/touch visitors are client-side redirected to `/resume`). `pages/resume.js` holds the text portfolio (hero, skills, education, footer); `pages/about.js`, `pages/experience.js`, and `pages/projects.js` hold the remaining sections. Text pages wrap content in `Layout`, which renders a full-screen animated starfield before `{children}`. All content is hardcoded (no CMS or data files).

**Game:** lives in `components/game/` (kept outside `pages/` because `mapData.js` and `useKeyboardMovement.js` don't export React components and would break the pages router). `Game.js` orchestrates player state, dialogue, and the wild-encounter flow; `mapData.js` holds the tile grid, NPC dialogue, and encounter odds. Sprites in `public/sprites/` are derived from Tuxemon (CC-BY-SA — see `public/sprites/CREDITS.md`; keep the attribution link rendered under the game).

**Stars animation:** `pages/components/stars.js` imperatively generates 100 DOM elements on mount via `useEffect`, inserts dynamic `@keyframes` rules directly into `document.styleSheets[0]`, and animates each star with a unique random trajectory. This runs client-side only.

**Styling:** CSS Modules per component (`styles/Home.module.css`, `styles/Layout.module.css`, `styles/Stars.module.css`) plus `styles/global.css`. No inline `<style jsx>` blocks remain. Design uses a dark theme (black background from `Layout.module.css`) with teal (`#64ffda`) as the accent color and `#ccd6f6` / `#8892b0` for primary/secondary text.

**Deployment:** Hosted on GitHub Pages via the `main` branch (`vivaanwadhwa.github.io` repo).
