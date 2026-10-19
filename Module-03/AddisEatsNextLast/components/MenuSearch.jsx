"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import DishCard from "./DishCard";
import { fetcher } from "../lib/fetcher";

export default function MenuSearch({ initialPage, initialQuery = "" }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery.trim());
  const [page, setPage] = useState(initialPage.page || 1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    setPage(initialPage.page || 1);
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery.trim());
  }, [initialPage.page, initialQuery]);

  const key = debouncedQuery
    ? `/api/dishes?q=${encodeURIComponent(debouncedQuery)}&page=${page}`
    : null;
  const { data, error, isLoading } = useSWR(key, fetcher, {
    fallbackData: initialPage,
    keepPreviousData: true,
  });

  // An empty query uses the Server Component's paged result; null prevents an
  // unnecessary browser request until the visitor enters a search term.
  const result = debouncedQuery ? (data || initialPage) : initialPage;
  const dishes = result.dishes || [];

  function changePage(nextPage) {
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    params.set("page", String(nextPage));
    router.push(`/menu?${params.toString()}`);
  }

  return (
    <section aria-label="Search dishes">
      <label className="search-label" htmlFor="menu-search">Search the menu</label>
      <input
        id="menu-search"
        className="menu-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search dishes or ingredients"
      />

      {error && <p className="field-error" role="alert">Menu search could not be loaded. Please try again.</p>}
      {isLoading && <p className="muted" aria-live="polite">Searching…</p>}
      {!dishes.length ? <p>No dishes matched your search.</p> : (
        <div className="grid">
          {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
        </div>
      )}

      <div className="pagination" aria-label="Menu pages">
        <button className="button button-secondary" type="button" onClick={() => changePage(Math.max(1, result.page - 1))} disabled={result.page <= 1}>Previous</button>
        <span>Page {result.page} of {result.totalPages} · {result.total} dishes</span>
        <button className="button button-secondary" type="button" onClick={() => changePage(Math.min(result.totalPages, result.page + 1))} disabled={result.page >= result.totalPages}>Next</button>
      </div>
      <p className="muted"><Link href="/menu">Clear page and search URL</Link></p>
    </section>
  );
}
