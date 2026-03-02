import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/api/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limit: 3 delete attempts per 10 minutes per IP
  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "delete-account",
    { limit: 3, windowSeconds: 600 }
  );
  if (rateLimitError) return rateLimitError;

  try {
    // Verify the caller is authenticated
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Use centralized admin client
    const admin = createAdminClient();

    // Delete the user (cascades to all related data)
    const { error: deleteError } = await admin.auth.admin.deleteUser(
      user.id
    );

    if (deleteError) {
      console.error("Delete user error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete account" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
