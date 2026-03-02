import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const { data, error } = await admin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Profile GET error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ profile: data });
  });
}

export async function PUT(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "profile-put",
    { limit: 10, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const body = await request.json();
    const { full_name } = body;

    if (typeof full_name !== "string") {
      return NextResponse.json({ error: "full_name is required" }, { status: 400 });
    }

    const trimmed = full_name.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      return NextResponse.json({ error: "full_name must be 1-100 characters" }, { status: 400 });
    }

    const { data, error: updateError } = await admin
      .from("profiles")
      .update({ full_name: trimmed, updated_at: new Date().toISOString() })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Profile update error:", updateError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, profile: data });
  });
}
