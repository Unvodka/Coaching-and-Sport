import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PortalLayoutClient from "@/components/portal/PortalLayout";

export const metadata: Metadata = {
  title: "Mon Espace | Coach-Bluewave",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?login=required");
  }

  return <PortalLayoutClient>{children}</PortalLayoutClient>;
}
