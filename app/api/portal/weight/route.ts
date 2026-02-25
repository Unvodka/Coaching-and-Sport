import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { weight_kg, date, notes } = body;

    if (!weight_kg) {
      return NextResponse.json({ error: "weight_kg is required" }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: parseFloat(weight_kg),
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
