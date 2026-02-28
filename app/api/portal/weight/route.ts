import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Verify user identity via cookies
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use admin client for data operations (bypasses RLS)
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("weight_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Weight fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Weight GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Verify user identity via cookies
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weight_kg, body_fat_pct, visceral_fat, muscle_mass_kg, water_pct, date, notes } = body;

    if (!weight_kg) {
      return NextResponse.json({ error: "weight_kg is required" }, { status: 400 });
    }

    // Use admin client for data operations (bypasses RLS)
    const admin = createAdminClient();
    const { error: insertError } = await admin.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: parseFloat(weight_kg),
      body_fat_pct: body_fat_pct ? parseFloat(body_fat_pct) : null,
      visceral_fat: visceral_fat ? parseFloat(visceral_fat) : null,
      muscle_mass_kg: muscle_mass_kg ? parseFloat(muscle_mass_kg) : null,
      water_pct: water_pct ? parseFloat(water_pct) : null,
      date: date || new Date().toISOString().split("T")[0],
      notes: notes || null,
    });

    if (insertError) {
      console.error("Weight insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Weight API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error: deleteError } = await admin
      .from("weight_logs")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Weight delete error:", deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Weight DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
