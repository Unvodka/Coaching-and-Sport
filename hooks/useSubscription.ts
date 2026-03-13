"use client";

import { useState, useEffect } from "react";

export type SubscriptionStatus = "loading" | "active" | "none";

export function useSubscription(): SubscriptionStatus {
  const [status, setStatus] = useState<SubscriptionStatus>("loading");

  useEffect(() => {
    fetch("/api/portal/subscription")
      .then((r) => r.json())
      .then((data) => {
        const sub = data?.subscription;
        const isActive =
          sub &&
          (sub.status === "active" ||
            sub.status === "trialing" ||
            sub.status === "past_due");
        setStatus(isActive ? "active" : "none");
      })
      .catch(() => setStatus("none"));
  }, []);

  return status;
}
