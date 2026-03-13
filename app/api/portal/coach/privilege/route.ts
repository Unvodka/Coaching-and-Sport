import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export async function POST(request: Request) {
  return withAuth(async ({ user, admin }) => {
    // Verify caller is a coach
    const { data: callerProfile } = await admin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (callerProfile?.role !== "coach") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { user_id, is_privileged } = await request.json();

    if (!user_id || typeof is_privileged !== "boolean") {
      return NextResponse.json({ error: "Missing user_id or is_privileged" }, { status: 400 });
    }

    const { error } = await admin
      .from("profiles")
      .update({ is_privileged })
      .eq("id", user_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, user_id, is_privileged });
  });
}
