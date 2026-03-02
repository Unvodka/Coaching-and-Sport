import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";
import { isValidUUID } from "@/lib/config";

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "recipe-favorite",
    { limit: 30, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const { recipe_id, action } = await request.json();

    if (!recipe_id || !isValidUUID(recipe_id)) {
      return NextResponse.json({ error: "Valid recipe_id is required" }, { status: 400 });
    }

    if (action !== "add" && action !== "remove") {
      return NextResponse.json({ error: "action must be 'add' or 'remove'" }, { status: 400 });
    }

    if (action === "add") {
      const { error } = await admin
        .from("recipe_favorites")
        .insert({ user_id: user.id, recipe_id });
      if (error) {
        console.error("Favorite add error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    } else {
      const { error } = await admin
        .from("recipe_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", recipe_id);
      if (error) {
        console.error("Favorite remove error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  });
}
