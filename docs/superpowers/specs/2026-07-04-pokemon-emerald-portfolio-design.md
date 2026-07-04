# Pokemon Emerald–Inspired Portfolio Homepage

Date: 2026-07-04
Branch: `feature/pokemon-emerald-portfolio`

## Summary

Replace the current homepage (`pages/index.js`) with a small, playable, Pokemon
Emerald–style overworld: the visitor arrives as a top-down pixel character in a
single fixed-size town, can walk up to NPCs to learn about Vivaan and his
projects, and can wander into a patch of tall grass to randomly trigger a
"wild VIVAAN appeared" encounter that ends on a contact-info payoff screen.

The existing resume-style homepage content is not deleted — it moves to a new
`/resume` route and stays fully reachable via an always-visible skip link, so
recruiters who just want a quick read are never blocked by the game.

## Goals

- A fun, memorable, low-effort-to-build first impression for visitors on desktop.
- Preserve 100% of the existing professional content, just relocated.
- Zero new heavyweight dependencies; fits the existing Next.js + CSS Modules
  patterns already used in this repo (see `pages/components/stars.js` for a
  precedent of imperative client-side DOM work).
- No licensing risk: no Nintendo/Game Freak IP is used, only original
  open-licensed lookalike assets.

## Non-goals

- No scrolling/multi-screen map (single fixed-size town only).
- No real battle mechanics, fail states, or persistence (no save system,
  no localStorage-backed progress).
- No mobile/touch play experience — mobile visitors are redirected to `/resume`.
- No CMS or data-driven content system — NPC dialogue and map layout are
  hardcoded data files, consistent with the rest of the site.

## Architecture

**Rendering approach: DOM/React tile-grid**, not Canvas or a game framework
(e.g. Phaser). The map is a CSS grid of styled `div`s; the player and NPCs are
absolutely/grid positioned sprite `div`s moved via React state updates on
key-down. This was chosen over Canvas (more custom render-loop/camera/collision
code for no real benefit here) and Phaser (a large dependency and a new
paradigm, overkill for one static screen with a handful of NPCs) because the
project is intentionally small, fixed-size, and grid-snapped — exactly what
plain DOM positioning handles well, and it matches the codebase's existing
comfort with direct DOM manipulation.

### Routing

- `pages/index.js` — the game. On mount, does a client-side check
  (`window.innerWidth` below a mobile breakpoint, or a touch-capability check)
  and immediately redirects (`router.replace('/resume')`) if the visitor is on
  mobile/touch. Otherwise renders the game.
- `pages/resume.js` — the current homepage content (hero, skills, experience
  timeline, projects grid, education, footer), moved here verbatim from the
  current `pages/index.js`. This is what mobile visitors land on, and what the
  skip link points to.
- `pages/about.js`, `pages/experience.js`, `pages/projects.js` — untouched.

### Component structure

```
pages/components/game/
  Game.js                 — orchestrator: holds player {row, col, facing},
                            active dialogue (if any), active encounter state
                            (none | wild-appeared | throwing | caught)
  Map.js                  — renders the fixed tile grid from mapData.js
  Tile.js                 — single tile: grass / path / tree / building / sign /
                            tall-grass, rendered via background-sprite from
                            the Tuxemon tileset
  Player.js               — player sprite div; frame/orientation driven by
                            `facing` prop, sourced from the generated LPC sheet
  NPC.js                  — stationary sprite + tile-adjacency check that
                            triggers dialogue
  DialogueBox.js           — bottom-screen Game Boy–style text box, paginated,
                            dismissed via action key/click
  EncounterScene.js        — full-screen overlay sequence: "A wild VIVAAN
                            appeared!" -> throw-ball animation -> "Gotcha!"
                            payoff screen with resume/contact/social links
  SkipLink.js              — fixed-position link to /resume, always rendered
  useKeyboardMovement.js   — hook: arrow-key/WASD handling, one-tile-at-a-time
                            movement, collision against trees/buildings/NPCs,
                            and the random encounter roll when entering a
                            tall-grass tile
  mapData.js               — hardcoded: tile grid layout, NPC positions +
                            dialogue text, grass-patch bounds, encounter odds
styles/
  Game.module.css (+ per-component CSS modules as needed, following the
  existing per-component CSS Modules convention)
public/sprites/
  Tuxemon-derived tiles and NPC sprites, generated LPC player sheet,
  CREDITS.md (attribution for Tuxemon CC-BY-SA/GPL-3.0 and LPC CC-BY-SA 3.0)
```

## Behavior detail

### Map & movement

- Single fixed-size grid (~12x9 tiles), no camera/scrolling.
- Border of trees/fences prevents leaving the map.
- A couple of small building-shaped tiles for visual variety (no interiors).
- Player moves exactly one tile per key press (arrow keys / WASD), snapped to
  the grid — no free-pixel movement, no diagonal movement.
- Player sprite faces the direction of last movement (4-direction LPC sheet).
- Collision prevents moving into trees, buildings, or NPC tiles.

### NPCs & dialogue

Five stationary NPCs, one per existing homepage section, placed around the
town:

1. Professor — bio/intro
2. Skills Trainer — skills
3. Experience NPC — experience timeline
4. Projects NPC(s) — projects
5. Education NPC — education

Walking adjacent to an NPC and pressing the action key (or clicking/walking
into their tile) opens `DialogueBox`, showing that NPC's hardcoded dialogue
text (paginated if it doesn't fit in one box). Dismissed with the action key
or a click, returning control to movement.

### Catch minigame

- A tall-grass patch occupies one corner of the map, with an adjacent sign
  tile whose dialogue is a flavor-text warning (e.g. "Caution: rare sightings
  reported in this grass.").
- Each step onto a tall-grass tile rolls a chance (~1-in-4) of triggering an
  encounter. Not guaranteed on first step, mirrors real Pokemon-game feel.
- On trigger, `EncounterScene` takes over full-screen:
  1. "A wild VIVAAN appeared!" with a small pixel portrait of Vivaan (drawn in
     the LPC style, composed from LPC parts).
  2. A single "Throw Pokeball" action/button. Clicking it plays a short CSS
     animation (ball arcs in, wiggles 2-3 times).
  3. Always succeeds — no fail state. Ends on "Gotcha! VIVAAN was caught!"
     framed as "VIVAAN has been added to your team," showing the same contact
     channels already used in the current hero section (email, GitHub,
     LinkedIn). No resume PDF exists anywhere in the repo today, so it's out
     of scope here; a resume download link can be added later as a trivial
     follow-up once a PDF exists.
  4. Dismissing returns to the map, player standing where the encounter began.

### Skip link

A small, fixed-position "Skip to text version →" link/button is always
visible on the game screen (e.g. top-right corner), linking to `/resume`.
Present from the moment the game renders, not just after some interaction.

### Mobile handling

On mount, `pages/index.js` checks viewport width / touch capability
client-side and calls `router.replace('/resume')` if the visitor appears to be
on mobile. No on-screen D-pad or touch controls are built — mobile visitors
simply never see the game, landing directly on the text portfolio.

## Assets

- **Tuxemon** (github.com/Tuxemon/Tuxemon — GPL-3.0 code / CC-BY-SA art): a
  genuinely open-source Pokemon-style RPG. Its tileset (grass, path, tree,
  building, sign, tall-grass tiles) and NPC sprites are reused directly for
  the town and NPCs.
- **Liberated Pixel Cup (LPC) character generator**
  (`sanderfrenken/Universal-LPC-Spritesheet-Character-Generator`, CC-BY-SA 3.0):
  used to generate a custom 4-direction walk-cycle sprite sheet for the player
  character, and to compose the small "wild VIVAAN" portrait for the
  encounter scene.
- A `public/sprites/CREDITS.md` (or a small attribution line in the game
  screen/footer) credits both projects per their CC-BY-SA/GPL-3.0 licenses.
  No Nintendo/Game Freak assets are used anywhere.

## Testing / Verification

No lint or test scripts are configured in this repo (per `CLAUDE.md`), so
verification is manual, via `npm run dev` in-browser:

- Walk to all four map edges and confirm the player can't leave the grid.
- Attempt to walk into a tree/building tile and confirm collision blocks it.
- Talk to all 5 NPCs, confirm correct dialogue appears and dismisses properly.
- Walk into a building tile edge case: confirm NPC-tile collision also blocks
  movement (can't walk through an NPC).
- Walk back and forth through the tall-grass patch enough times to trigger an
  encounter, and complete the full "wild appeared -> throw -> gotcha" sequence,
  confirming the payoff screen's links are correct and functional.
- Click the skip link and confirm `/resume` renders all the content currently
  on the homepage, unchanged.
- Load the site on a narrow viewport (or with dev-tools mobile emulation) and
  confirm it redirects straight to `/resume` rather than showing the game.

## Open risks / things to watch

- Sourcing and lightly editing the Tuxemon tileset/sprites and generating the
  LPC sheet is manual asset-prep work that happens during implementation, not
  something fully specified here — the implementation plan should call out
  fetching/trimming these assets as an explicit early step, since the rest of
  the build depends on having sprite files in `public/sprites/` first.
- `CLAUDE.md` describes this site as hosted on GitHub Pages, but there is no
  `next.config.js` static-export setup, and a recent commit (`f359e61`, "Add
  Node.js server entry point for cPanel deployment") plus `npm run start`
  running `next start` indicate it's actually served via a Node.js server on
  cPanel. That's good news for this feature (client-side redirects and
  routing work normally under `next start`, unlike a static export), but
  `CLAUDE.md`'s deployment note is stale and should be corrected separately
  from this project.
