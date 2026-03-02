import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";
import { isValidUUID } from "@/lib/config";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!isValidUUID(params.id)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  return withAuth(async ({ user, admin }) => {
    const [recipeRes, favRes, profileRes] = await Promise.all([
      admin.from("recipes").select("*").eq("id", params.id).single(),
      admin
        .from("recipe_favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("recipe_id", params.id)
        .maybeSingle(),
      admin.from("profiles").select("role").eq("id", user.id).single(),
    ]);

    if (recipeRes.error) {
      console.error("Recipe detail fetch error:", recipeRes.error);
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({
      recipe: recipeRes.data,
      isFavorited: !!favRes.data,
      userId: user.id,
      userRole: profileRes.data?.role || "user",
    });
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isValidUUID(params.id)) {
    return NextResponse.json({ error: "Invalid recipe ID" }, { status: 400 });
  }

  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "recipe-delete",
    { limit: 10, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const { error: deleteError } = await admin
      .from("recipes")
      .delete()
      .eq("id", params.id)
      .eq("author_id", user.id);

    if (deleteError) {
      console.error("Recipe delete error:", deleteError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  });
}
