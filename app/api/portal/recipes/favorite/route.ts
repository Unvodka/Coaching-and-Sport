import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { recipe_id, action } = await request.json();

    if (!recipe_id || !action) {
      return NextResponse.json({ error: "recipe_id and action required" }, { status: 400 });
    }

    const admin = createAdminClient();

    if (action === "add") {
      const { error } = await admin
        .from("recipe_favorites")
        .insert({ user_id: user.id, recipe_id });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else if (action === "remove") {
      const { error } = await admin
        .from("recipe_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("recipe_id", recipe_id);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Favorite API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
