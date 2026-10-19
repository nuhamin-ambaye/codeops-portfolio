# Authentication and authorization notes (Day 42)

## Authentication approach

- Auth.js Credentials provider handles sign-in and signed JWT session cookies.
- Passwords submitted during account creation are hashed with bcryptjs; plaintext passwords are not stored.
- The shared `getSession()` helper in `lib/session.js` is used by server pages, Server Actions, and protected Route Handlers.
- The session lifetime is configured for eight hours. Auth.js manages the session cookie flags; in production over HTTPS its secure cookie is used. Local HTTP development uses the framework's local-development cookie behaviour.
- Sign-out is handled through Auth.js and clears the session cookie.

## Route protection

| Surface | Checks |
|---|---|
| `/checkout` | Narrow middleware redirect, page-level session check, `placeOrder` session check. |
| `/orders/history`, `/orders/[id]` | Narrow middleware redirect, page-level session check, query scoped by `user.id`. |
| `GET /api/orders/[id]` | Session check and query by both order id and session user id; missing and other-user orders return the same 404 response. |
| `POST /api/orders` | Session check, schema validation, required dish check, server-side dish lookup. |
| `cancelOrder` | Session check, scoped order lookup, pending-status check. |
| `/kitchen` | Middleware role check, page-level role check, and role check inside `setKitchenOrderStatus`. |
| `/signin?next=...` and `/signup?next=...` | `safeNextPath()` rejects external, protocol-relative, and backslash-containing destinations. |

Middleware is a fast first layer, not the security boundary. A request that bypasses the UI must still be refused by the page, handler, or action that performs the operation.

## Local staff account setup

To enable the staff role, create a bcrypt hash for a local demo password, then place the phone, name, and hash in `.env.local`. Example hash-generation command after installing dependencies:

```bash
node -e "require('bcryptjs').hash('ReplaceThisWithYourOwnPassword', 12).then(console.log)"
```

Use the output as `DEMO_STAFF_PASSWORD_HASH`; do not put the plaintext password in an environment file. The example phone number is `0911000001`. Restart the dev server after editing `.env.local`.

## Important limitations

The selected database is intentionally in memory. Registered accounts are stored in a process-local Map, while dishes and orders are held in process memory. Accounts and orders can disappear on restart, and multiple server processes would not share the same state. There is no password reset, email/SMS verification, rate limiting, or persistent session/user store. This is a local course project and is not ready for real customers or deployment as-is.
