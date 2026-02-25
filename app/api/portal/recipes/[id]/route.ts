import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();

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
  } catch (error) {
    console.error("Recipe detail GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();
    const { error: deleteError } = await admin
      .from("recipes")
      .delete()
      .eq("id", params.id)
      .eq("author_id", user.id);

    if (deleteError) {
      console.error("Recipe delete error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Recipe DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
