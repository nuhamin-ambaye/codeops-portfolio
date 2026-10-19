# Addis Eats — Module 3 Days 36–45

This is an extension of the existing Addis Eats project. The original routes, cart context, checkout flow, dish components, and mock data design are retained and extended with the concepts in the uploaded Days 40–45 modules.

## Routes

- `/` — home page
- `/menu` — server-rendered paged menu with debounced SWR search
- `/menu/[id]` — dish detail, generated metadata, Open Graph image, and MenuItem JSON-LD
- `/cart` — client-side cart
- `/checkout` — protected checkout form and Server Action
- `/signin`, `/signup`, `/account` — authentication and account screens
- `/orders/history`, `/orders/[id]` — signed-in user's order history and live status
- `/kitchen` — staff-only queue and guarded status actions
- `/about` — about page
- `GET /api/dishes` — paged dishes and optional search (`q`, `page`)
- `GET /api/dishes/[id]` — one dish or a 404 response
- `POST /api/orders` — authenticated, validated mock order creation
- `GET /api/orders/[id]` — authenticated status response scoped to the signed-in owner
- `/api/auth/*` — Auth.js handlers
- `POST /api/register` — validate and register an in-memory customer account with a bcrypt password hash
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image` — generated discovery and social-preview resources

## Module concepts used

- App Router, file-based routes, layouts, loading/error/not-found boundaries
- Server Components by default; client components only for interaction
- `generateStaticParams`, `generateMetadata`, `notFound`, `next/font`, and `next/og` image conventions
- Auth.js Credentials provider, JWT sessions, shared session helper, narrow middleware matcher, and server-side role/ownership checks
- SWR polling every five seconds, debounced search, `null` key when search is empty, `fallbackData`, and `keepPreviousData`
- Route Handlers, Zod validation, Server Actions, and `revalidatePath`
- `metadataBase`, title template, canonical URLs, Open Graph/Twitter metadata, JSON-LD, sitemap, and robots rules
- `.env.example`, `.gitignore`, and a performance report that does not claim unmeasured results

More detailed decisions are in `STRATEGY.md`, `BOUNDARY.md`, `DATA.md`, `AUTH.md`, and `PERF.md`.

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Generate an Auth.js secret and put it in `.env.local`. For example:

   ```bash
   node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
   ```

4. Keep `NEXT_PUBLIC_SITE_URL=http://localhost:3000` while developing locally.
5. Run `npm install`.
6. Run `npm run dev` and open the local URL printed by Next.js.
7. Create an account on `/signup`. Customer accounts are in memory and are cleared when the server process restarts.

To test `/kitchen`, configure a staff phone and a bcrypt hash as described in `AUTH.md`, then restart the server.

## Important limitations

- **The database is intentionally in memory.** Dish records are hard-coded, and orders and registered users are process-local. Restarting the server loses orders and registered accounts; multiple processes do not share the same data. Do not deploy this as a real ordering service.
- Auth.js manages the signed session cookie, but a persistent user store, account verification, password reset, rate limiting, and operational monitoring are not implemented.
- Checkout records mock orders only. It does not process payments or connect to a payment provider.
- The order schema models one dish per order, so checkout creates one mock order per cart line.
- **Image optimization is incomplete.** There are no actual food photographs in `public/`; the existing emoji placeholders remain. `PERF.md` explains the missing work.
- No Lighthouse scores or performance improvements are claimed until measured on a production build.
- This update is for local learning and testing. Deployment is deliberately postponed until persistent storage, production authentication configuration, and image assets are addressed.
