"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthContext";

/**
 * Silently redirects authenticated users from the landing page to /portal.
 * Renders nothing — purely a behaviour component.
 * Wrapped defensively so it never triggers the error boundary.
 */
export default function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    try {
      if (!isLoading && user) {
        router.replace("/portal");
      }
    } catch {
      // Never crash — a failed redirect is non-fatal
    }
  }, [user, isLoading, router]);

  return null;
}
