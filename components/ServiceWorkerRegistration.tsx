"use client";

import { useEffect } from "react";
import { Workbox } from "workbox-window";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) return;

    const wb = new Workbox("/sw.js");

    // When a new SW is waiting, activate it immediately and reload
    wb.addEventListener("waiting", () => {
      wb.messageSkipWaiting();
      window.location.reload();
    });

    wb.register().catch((err) =>
      console.error("[SW] Registration failed:", err)
    );
  }, []);

  return null;
}
