# Performance record (Day 43)

## Status: not measured yet

No Lighthouse or throttled-network run has been performed in this update. Therefore this file intentionally contains no invented LCP, CLS, INP, byte-size, or score values.

| Area | Current status | Evidence still needed |
|---|---|---|
| `next/font` | Inter is configured in the root layout using `next/font/google` with `display: "swap"`. | Run a production build and Lighthouse, then record actual before/after metrics if a baseline is available. |
| Dish images | **Incomplete.** The project currently has no actual food image assets; existing emoji placeholders are retained as requested. | Add real dish images, then use `next/image` with truthful `alt`, `width`, `height`, and `sizes`. Only use `priority` for the single largest above-the-fold image, if one exists. |
| Third-party scripts | None added by this update. | Revisit if an external script is introduced. |
| Environment variables | `.env.example` added and `.env*` local files ignored by Git, except `.env.example`. | Verify local ignore status in the user's Git checkout. |

## Measurement procedure

1. Configure local environment values and install dependencies.
2. Run `npm run build` and `npm run start`.
3. Use Chrome Lighthouse with a consistent mobile/throttled profile on the same routes.
4. Record actual LCP, CLS, and INP values, plus the main opportunities Lighthouse reports.
5. Add real dish images and repeat the same measurement before claiming an improvement.
