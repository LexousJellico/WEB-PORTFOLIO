# Lexus_ji Portfolio

A polished, production-ready portfolio template built with **Next.js 16**, **React**, **Tailwind CSS**, **Framer Motion**, **Swiper**, and **tsParticles**.

## What was fixed and improved

- Updated the project for the current Next.js 16 build flow and fixed the previous trace-collection build hang.
- Replaced the old ESLint setup with an ESLint 9 flat config.
- Removed deprecated particle packages and migrated to `@tsparticles/react` + `@tsparticles/slim`.
- Added a validated `/api/contact` POST endpoint with honeypot spam protection, IP-based rate limiting, strict field-length rejection, optional webhook delivery, JSON responses, and no-JavaScript form redirect handling.
- Removed old template identity, fake placeholder content, and broken placeholder social links from the live UI.
- Split portfolio content into focused files inside `data/` for cleaner editing and lighter client bundles.
- Improved SEO defaults, page-specific metadata, canonical URL support, Open Graph/Twitter metadata, generated robots.txt, generated sitemap.xml, generated site.webmanifest, custom 404 page, and custom 500 page.
- Added a custom document with `<html lang="en">` for better accessibility and SEO.
- Added a screen-fit route layout so each page fills the viewport cleanly, avoids unnecessary body scrolling, and only uses internal scroll areas when content truly needs it.
- Improved project grid responsiveness, image sizing, hover/focus states, keyboard accessibility, and about-page tab semantics with stable editable tab IDs.
- Improved accessibility for navigation, buttons, decorative images, active route state, form feedback, skip-to-content behavior, reduced-motion preferences, and focus outlines.
- Cleaned global CSS, Swiper styling, Tailwind configuration, package metadata, and reusable template structure.
- Added a neon LJ logo mark from the provided image and used it for the header identity, generated manifest icon, animated loading screen, favicon, Apple touch icon, and Open Graph preview image.
- Aligned the important portfolio content with the provided resume: summary, skills, work experience, education, services, and featured projects.
- Fixed the mobile home/avatar layout so the avatar is visible on small devices and still works as a larger desktop visual.
- Improved responsive spacing across home, about, services, work, portfolio highlights, contact, sliders, and bottom navigation clearance.
- Cleaned package-lock registry URLs and added an automatic lockfile sanitizer to prevent private/internal registry URLs from being shipped.
- Reworked the old testimonials screen into factual portfolio highlights so the site does not show fake client feedback before you add real testimonials.

## Requirements

- Node.js 20.9+ or newer
- npm 10+ or newer

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Full check

```bash
npm run check
npm run check:routes
npm run verify
npm audit --omit=dev
```


## Useful scripts

```bash
npm run sanitize:lock          # Cleans accidental private/internal registry URLs from package-lock.json
npm run validate:content      # Checks missing public assets, core config values, URLs, project images, env notes, and lockfile safety
npm run generate:public-assets # Regenerates robots.txt, sitemap.xml, and site.webmanifest from data/siteConfig.js
npm run clean                 # Removes the local .next build folder
npm run check                 # Runs content validation, lint, and production build
npm run check:routes          # Starts the production build and checks routes/API behavior
npm run verify                # Runs the full build check and production route/API check
```

## Project structure

```bash
PORTFOLIO-main/
  components/              Reusable UI components
  data/                    Main editable portfolio content and SEO config
  pages/                   Next.js pages, contact API, and error pages
  pages/_document.jsx      HTML language and document shell
  pages/api/contact.js     Contact form API endpoint
  public/                  Images, logo mark, avatar, favicon, generated SEO assets, and static files
  styles/globals.css       Tailwind and global styling
  eslint.config.mjs        ESLint 9 flat config using Next core web vitals
  next.config.js           Next.js production configuration and headers
  package.json             Scripts and dependencies
```

## Editing portfolio content

Most portfolio text, project names, service cards, skills, stats, portfolio highlights, social links, and SEO defaults are inside focused files in `data/`:

```bash
data/siteConfig.js    Site identity, page metadata, and sitemap routes
data/socials.js       Header social links
data/services.js      Services slider content
data/about.js         About tabs and stats
data/projects.js      Work slider projects aligned with resume highlights
data/testimonials.js  Portfolio highlights / testimonial-style content
```

Update these data files first before editing individual components.

## Environment variables

Copy `.env.example` to `.env.local` when you need local environment settings.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
CONTACT_WEBHOOK_URL=https://your-webhook-endpoint.com
CONTACT_WEBHOOK_TOKEN=optional-token
NEXT_PUBLIC_CONTACT_ENDPOINT=
```

`NEXT_PUBLIC_SITE_URL` is used for canonical URLs and for the generated robots.txt, sitemap.xml, and site.webmanifest files. These public SEO files are regenerated automatically during `npm run build`.

`CONTACT_WEBHOOK_URL` is optional. Without it, the contact API still validates form submissions locally and returns a safe response, but it does not deliver messages to an inbox.

## Contact form delivery

The contact form submits to `/api/contact` by default. JavaScript submissions receive JSON responses. Browser fallback submissions without JavaScript are redirected back to `/contact` with a clean status query.

For live delivery, set `CONTACT_WEBHOOK_URL` to an endpoint from your email, automation, or form backend provider. The API sends this JSON payload:

```json
{
  "name": "Sender name",
  "email": "sender@example.com",
  "subject": "Message subject",
  "message": "Message body",
  "submittedAt": "ISO timestamp",
  "source": "Lexus_ji portfolio contact form"
}
```

## Verified commands

```bash
npm ci
npm run validate:content
npm run lint
npm run build
npm audit --omit=dev
npm run start
```

All checks pass with `0 vulnerabilities`. The production route checker also verifies page status codes, generated SEO assets, contact API validation, over-length field rejection, and the no-JavaScript contact redirect. The package lock is also sanitized so it uses public npm registry URLs.


## Deployment note

Deploy this project to a host that supports Next.js server/API routes, such as Netlify or Vercel. A static-only host can render the public pages, but `/api/contact` will not run unless the host supports Next.js server functions.

## v1.9.0 Animation and Scrollable Project UX Notes

This version adds a cooler visual layer without changing the core content structure:

- Animated aurora/grid background across the site.
- Top scroll-progress indicator.
- Enhanced neon LJ loading screen with animated rings.
- Homepage skill ticker and floating tech badges.
- Fully scrollable project showcase for easier browsing when there are many projects.
- Improved project cards with tags, hover shine, custom scrollbar, and mobile-friendly actions.

To add more projects later, edit `data/projects.js`. The project page will remain scrollable automatically.

## v2.0.0 Programmer/Game Theme Animation Notes

This version adds a stronger programmer-inspired, game-style interface layer while keeping the portfolio functional and responsive:

- Added animated code-rain background tokens with Laravel, React, RFID, SQL, Git, build, lint, and audit cues.
- Added a fixed game HUD overlay with corner brackets, build/audit status chips, and a radar scanner on large screens.
- Added a mouse-follow glow layer for desktop devices.
- Added a cyber terminal window on the homepage with animated command/status lines.
- Added game-style stat cards, XP/progress meters, holographic borders, and subtle glitch text effects.
- Reworked services into power-level cards with animated meters and cyber panels.
- Upgraded the Work page into a mission-board style scrollable project list with quest numbers, rank badges, completion meters, tags, and stronger hover/focus effects.
- Kept reduced-motion support so users who prefer less animation are not forced into heavy motion effects.
- Preserved the existing verified route/API checks, SEO assets, contact form behavior, mobile avatar fix, and scrollable project UX.

## v2.1.0 Responsive Game Polish Notes

This version adds another polish pass focused on smoother responsiveness, better mobile spacing, and a cooler programmer/game interface without breaking the working portfolio flow:

- Added a floating desktop quick-access command panel for Projects, About, and Contact.
- Added an animated achievement-style portfolio toast on larger screens.
- Converted the bottom mobile navigation into a safer glass/HUD navigation bar with active orbit effects and safe-area spacing.
- Improved the fixed header with a compact glass bar so it stays cleaner while scrolling.
- Optimized the mouse-follow glow so it updates CSS variables through `requestAnimationFrame` instead of re-rendering React state on every pointer move.
- Added a mobile HUD status chip while keeping heavier radar/HUD effects on desktop.
- Upgraded the Work page mission board with category filters, scroll progress, project scanline effects, and full-width mobile project buttons.
- Improved mobile section spacing with `100dvh` and safe-area bottom padding so content is not covered by phone browser bars or the bottom nav.
- Kept reduced-motion support for the new orbit, scanline, toast, and quick-panel animations.


## v2.2.0 Screen-Fit Page Polish Notes

This version focuses on making the portfolio feel like a polished page-by-page game interface where each route fits the visible screen as much as possible:

- Added a reusable `ScreenFrame` layout wrapper for consistent full-viewport pages.
- Locked route-level overflow so the browser body does not scroll when the page content fits.
- Added internal scroll areas only where needed, especially the Work mission board and About tab panel.
- Rebalanced Home, About, Services, Work, Highlights, Contact, 404, and 500 pages to fit better inside one viewport.
- Added compact-height rules for shorter laptop screens so non-critical decorative blocks hide before the layout overflows.
- Improved project mission-board height, card spacing, filter panel spacing, and internal scroll behavior.
- Compact-polished services, contact form, and highlights slider so they fit cleaner without losing content.
- Added a subtle top screen scan line and loadout HUD panel for an extra game/programmer feel.
- Preserved mobile safe-area spacing, avatar visibility, reduced-motion support, SEO assets, route checks, and the validated contact API.

## v2.3.0 Desktop Layout Cleanup Notes

This version cleans the large-screen layout after the screen-fit game polish:

- Removed the duplicated desktop quick-access command menu so the right-side primary navigation is the only fixed menu.
- Removed the extra fixed loadout panel from the homepage to reduce desktop clutter.
- Rebalanced desktop content width so pages stay centered and avoid the right navigation rail.
- Reduced heavy HUD clutter on medium desktop and short laptop screens.
- Adjusted homepage desktop avatar sizing and content spacing for a cleaner one-screen layout.
- Kept the screen-fit behavior, internal project scrolling, mobile bottom navigation, contact API, SEO assets, reduced-motion support, and full verification scripts working.

## v2.4.0 Split-Load Reveal and Layout Polish Notes

This version adds the requested loading reveal behavior and another visual polish pass:

- Rebuilt the loading screen so it opens horizontally into two halves after loading completes.
- The home page is now visible behind the loader as the top and bottom panels split away.
- Added glowing center split line, cyber-grid loader panels, and a smoother LJ logo fade-out during reveal.
- Preserved reduced-motion support so the loader still exits safely for users who prefer less animation.
- Kept the cleaner desktop layout from v2.3.0 without reintroducing the duplicated quick menu.
- Kept route-level screen-fit behavior, internal project scrolling, responsive avatar display, contact API validation, SEO assets, route checks, and audit checks working.

## Version 2.5.0 polish notes

- Rebuilt the home page into one matched cyber/game interface instead of mixed floating elements.
- Added a cleaner hero briefing panel, cockpit avatar panel, mission CTAs, responsive mobile avatar frame, stack chips, and balanced desktop spacing.
- Kept the horizontal split loading animation, screen-fit route behavior, scrollable project mission board, contact API validation, SEO assets, and reduced-motion support.


## Version 2.7.0 Home/Avatar Fix Notes

This version focuses on the exact homepage issue reported during local testing:

- Rebuilt the homepage hero into a full-screen layout with no large content cards, no cockpit border frame, and no duplicated quick-menu clutter.
- Blended `bg-explosion.png` directly into the background behind the avatar using glow, mask, ring, scan-beam, and energy animations.
- Kept the old clean hero direction: text and actions on the left, avatar visual on the right, mobile avatar still visible.
- Changed the avatar renderer to use `/api/avatar`, which redirects to the latest `public/avatar.png` with a fresh cache-busting version every request. This prevents the old avatar from coming back after you replace the image.
- Added production route checks for `/api/avatar` so the avatar fallback is tested together with the contact API.
- Added a safe Next production build wrapper for environments where the final trace-collection step can stall after the runnable production output is already complete.

To replace your picture, overwrite `public/avatar.png`, then restart the dev server or rebuild. The site now avoids the Next image optimizer cache for the avatar, so your new image should appear instead of the old one.
