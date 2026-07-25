# Hero Cartel Cruzado — Design Spec

**Date:** 2026-07-25  
**Surface:** Home hero (`web/src/HomePage.tsx` + `web/src/index.css`)  
**Problem:** The current hero reads as a generic portfolio template — name, small portrait, and tagline feel stacked rather than composed.  
**Goal:** A memorable first viewport with editorial tension (exhibition-poster energy) while staying inside the existing gallery language (plaster / wine, Bricolage, angular mounts).

## Decisions locked

| Topic | Choice |
| --- | --- |
| Pain | Looks generic / not memorable (not layout bugs) |
| Memorable signal | Name × portrait diagonal overlap (“cartel cruzado”) |
| Approach | Option 1 — crossed poster composition |
| Out of scope | JSON copy, header, other sections, palette, global fonts, new photo assets |

## Composition

Full viewport under the sticky header. Four layers, one job:

1. **Back type** — `LUIS DE`, monumental, upper-left, sits *behind* the portrait (slightly reduced opacity ~0.88 for depth).
2. **Portrait mount** — existing hero photo in a vertical parallelogram / trapezoid clip (~3:4), center-right, hung-piece shadow (`--shadow-mount`).
3. **Front type** — `LEÓN`, monumental, lower-right, sits *in front of* the portrait (real z-index overlap).
4. **Wall label** — `focus` + thin rule + two-line `tagline`, lower-left. No cards, badges, stats, or CTAs in the hero.

Brand-first test: with the nav removed, the viewport must still read as “Luis De León”.

## Typography

- **Name lines:** `var(--font-display)`, weight 800, uppercase, `line-height ≈ 0.8`, strong negative tracking. `LEÓN` scales slightly larger than `LUIS DE`.
- **Focus:** wall-label size (~1rem), medium weight, `wine-deep`.
- **Tagline:** dense display (~`clamp` into ~2–2.5rem), weight 700, two lines from existing `\n` split.
- **Color:** `wine-deep` on plaster. No new accent colors.

## Motion

Three intentional CSS beats only:

1. Portrait mount fade-up (~0.9s, `--ease-out`).
2. Name lines fade with staggered delay (back → front).
3. Wall label fade last.

Respect `prefers-reduced-motion` (disable hero entrance animations). No loops, glow, or continuous motion.

## Responsive

- **Desktop (≥960px):** full crossed poster; portrait large enough for the surname to clearly overlap the image edge.
- **Mobile:** same layering concept; narrower mount; type scales so `LEÓN` remains uncut and the overlap stays intentional, not accidental collision.

## Technical scope

### Change

- Hero markup in `HomePage.tsx`: split name into back/front layers around the portrait so overlap is structural, not a CSS hack on a single absolute stack.
- Hero styles in `index.css`: replace current hero layout with cartel-cruzado positioning, z-index, scales, breakpoints, and motion.
- Remove the Impeccable variants wrapper / scoped variant CSS for the hero (superseded by this design).

### Do not change

- Copy in `web/src/content/principal.*.json` (`brand`, `focus`, `tagline`).
- `SiteHeader`, below-fold sections, tokens in `:root`, display/body font families.
- Portrait source asset (keep current `me.png` / existing import).

### Accessibility

- Keep a real `h1` (visually hidden or equivalent) with `t.brand`.
- Decorative name layers and portrait remain `aria-hidden` where they duplicate the `h1`.
- Focus ring and reduced-motion behavior unchanged site-wide.

## Done when

- [ ] Desktop and mobile: name + portrait + wall label all legible; intentional overlap; `LEÓN` not clipped.
- [ ] First viewport passes brand-first test.
- [ ] Motion plays once on load; disabled under reduced motion.
- [ ] Impeccable hero variants removed; no leftover dead CSS for discarded variants.
- [ ] `DESIGN.md` hero composition note updated to “cartel cruzado” (name layers + mount overlap).

## Non-goals

- Rewriting tagline/focus copy.
- Adding CTA buttons, social chips, or stats to the hero.
- Changing site-wide theme or typefaces.
- Building alternative hero variants in parallel.
