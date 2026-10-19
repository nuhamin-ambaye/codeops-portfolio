# Client data fetching decisions (Day 41)

## SWR queries

| Feature | Key | Refresh / stale rule | Why |
|---|---|---|---|
| Order status | `/api/orders/{encodedOrderId}` | `refreshInterval: 5000`; revalidate on focus | A status may change while the order page remains open. The API uses `no-store` and scopes the order to the signed-in user. Server-provided `fallbackData` shows the first status without a loading flash. |
| Menu search | `/api/dishes?q={encodedDebouncedTerm}&page={page}` | No timed polling; SWR revalidates the active key and keeps previous data during key changes | Search results change when the debounced term or page changes. A `null` key is used when the search term is empty, so the server-rendered paged result is used without an unnecessary fetch. |

The menu input waits 300 ms before changing its query key. The query string includes the page number, and `keepPreviousData: true` avoids clearing the list between searches. The initial server result is passed as `fallbackData`.

## Current scope and limitation

The mock menu has only four dishes and uses emoji placeholders. Paging is implemented with a page size of three so the behaviour can be exercised locally. No browser Network-tab observation is claimed here; confirm the request frequency manually when running the project.
