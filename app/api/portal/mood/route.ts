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
    const { mood_score, energy_level, notes, tags, date } = body;

    if (mood_score === undefined || energy_level === undefined) {
      return NextResponse.json({ error: "mood_score and energy_level are required" }, { status: 400 });
    }

    const { error: insertError } = await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood_score,
      energy_level,
      notes: notes || null,
      tags: tags || [],
      date: date || new Date().toISOString().split("T")[0],
    });

    if (insertError) {
      console.error("Mood insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mood API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
