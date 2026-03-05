import { Metadata } from "next";
import PortalLayoutClient from "@/components/portal/PortalLayout";

export const metadata: Metadata = {
  title: "Mon Espace | Coach-Bluewave",
  robots: { index: false, follow: false },
};

// Auth is enforced by middleware (lib/supabase/middleware.ts).
// Unauthenticated requests never reach here — middleware redirects to /?login=required.
// We do NOT call supabase.auth.getUser() here to avoid a second redundant
// server-side auth check that can race with the middleware cookie write and
// cause an incorrect redirect loop.
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PortalLayoutClient>{children}</PortalLayoutClient>;
}
