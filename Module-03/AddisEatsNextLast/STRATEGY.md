# Addis Eats rendering and route strategy (Day 40)

The app keeps the App Router and existing route structure. Server Components are the default; `"use client"` is kept only for interactions that need browser state or event handlers.

| Route | Rendering / data decision | Reason |
|---|---|---|
| `/` | Server Component | Static landing copy and links. |
| `/about` | Server Component | Static explanatory content. |
| `/menu` | Server Component for the initial paged result; client SWR for typing searches | First render is available from the server; browser requests happen only for a non-empty debounced search. |
| `/menu/[id]` | Server Component with `generateStaticParams`, `generateMetadata`, and `notFound()` | Public dish content is data-driven and indexable. |
| `/cart` | Client Component | Cart state is held in React context in the browser. |
| `/checkout` | Dynamic Server Component plus Client Component form and Server Action | Reads the session; the write is validated and authenticated on the server. |
| `/orders/history` and `/orders/[id]` | Dynamic Server Components plus SWR status client | Session-dependent data must not be shared between users; live status is polled in the browser. |
| `/account` and `/kitchen` | Dynamic Server Components | Session and role are checked on the server. |
| `/signin` and `/signup` | Server page plus client form | The page validates the return path; the form handles browser submission. |
| `/api/*` | Route Handlers | Used by browser polling/search and external callers; protected handlers check the session themselves. |

`middleware.js` has a narrow matcher for `/checkout`, `/orders`, and `/kitchen`. It redirects early but is not treated as the security boundary. Every protected page, action, and order-status handler repeats the relevant server-side check.

The shared root layout intentionally does not read the session. That keeps public pages from becoming dynamic solely to show account links.
