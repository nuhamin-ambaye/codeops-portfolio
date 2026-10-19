"use client";

import { useState, useTransition } from "react";
import { setKitchenOrderStatus } from "../actions";

export default function KitchenOrderActions({ orderId, status }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const nextStatus = status === "PENDING" ? "PREPARING" : status === "PREPARING" ? "READY" : status === "READY" ? "COMPLETED" : null;

  if (!nextStatus) return <p className="muted">No further kitchen action.</p>;

  function updateStatus() {
    setError("");
    startTransition(async () => {
      try {
        await setKitchenOrderStatus(orderId, nextStatus);
      } catch (caughtError) {
        setError(caughtError.message || "Could not update this order.");
      }
    });
  }

  return (
    <div>
      <button className="button" type="button" disabled={pending} onClick={updateStatus}>
        {pending ? "Updating…" : `Mark ${nextStatus.toLowerCase()}`}
      </button>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}
