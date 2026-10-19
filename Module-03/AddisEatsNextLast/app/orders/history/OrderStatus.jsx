"use client";

import useSWR from "swr";
import { fetcher } from "../../../lib/fetcher";

export default function OrderStatus({ orderId, initialStatus }) {
  const { data, error } = useSWR(
    `/api/orders/${encodeURIComponent(orderId)}`,
    fetcher,
    {
      fallbackData: { id: orderId, status: initialStatus },
      refreshInterval: 5000,
      revalidateOnFocus: true,
      keepPreviousData: true,
    }
  );

  return (
    <p>
      Status: <strong>{data?.status || initialStatus}</strong>
      {error && <span className="muted"> (live update temporarily unavailable)</span>}
    </p>
  );
}
