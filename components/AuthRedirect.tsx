"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthContext";

/**
 * Silently redirects authenticated users from the landing page to /portal.
 * Renders nothing — purely a behaviour component.
 */
export default function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/portal");
    }
  }, [user, isLoading, router]);

  return null;
}
