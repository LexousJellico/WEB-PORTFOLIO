# Contributing

This is a personal portfolio project. Keep changes focused, clean, and easy to review.

## Local checks

Before committing, run:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Code style

- Keep reusable portfolio content in the focused files inside `data/` when possible.
- Keep components small and readable.
- Avoid hardcoded placeholder links such as `example.com`.
- Preserve responsive behavior for mobile, tablet, and desktop layouts.
