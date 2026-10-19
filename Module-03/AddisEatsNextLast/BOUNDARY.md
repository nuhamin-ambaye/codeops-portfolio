# Server and Client Component boundaries (Day 40)

## Server-side files

- `app/layout.js`: shared page shell, global metadata, and `next/font`.
- `app/menu/page.js` and `app/menu/[id]/page.js`: read dish data on the server.
- `app/checkout/page.js`, `app/orders/**/page.js`, `app/account/page.js`, and `app/kitchen/page.js`: read and verify the current session on the server.
- `app/actions.js`: server-only writes for placing, cancelling, and advancing orders; each action re-checks the session and permission.
- `app/api/**/route.js`: HTTP handlers; order handlers check the session and scope reads by user id.
- `lib/db.js`, `lib/session.js`, `lib/users.js`: in-memory records, authentication helper, and password hashing. These must not be imported into browser-only components except the fetcher, which is a separate safe module.

## Client-side files

- `app/providers.js`: cart context and state.
- `app/checkout/CheckoutForm.jsx`: form pending/error state and cart interaction.
- `components/MenuSearch.jsx`: input debounce, SWR query, and pagination interaction.
- `app/orders/history/OrderStatus.jsx`: SWR polling every five seconds.
- `app/orders/history/CancelOrderButton.jsx` and `app/kitchen/KitchenOrderActions.jsx`: button interactions that call guarded Server Actions.
- `components/SignInForm.jsx`, `components/SignUpForm.jsx`, and `components/SignOutButton.jsx`: browser authentication controls.

Avoid adding `"use client"` to an entire page just to support one interactive component. Keep database, session, role, and ownership checks on the server; browser checks only improve the interface and are not security.
