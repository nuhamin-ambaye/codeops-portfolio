"use client";

import { useState, useTransition } from "react";
import { cancelOrder } from "../../actions";

export default function CancelOrderButton({ orderId }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleCancel() {
    setError("");
    startTransition(async () => {
      try {
        await cancelOrder(orderId);
      } catch (caughtError) {
        setError(caughtError.message || "Could not cancel this order.");
      }
    });
  }

  return (
    <div>
      <button className="button button-secondary" onClick={handleCancel} disabled={pending}>
        {pending ? "Cancelling…" : "Cancel order"}
      </button>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}
