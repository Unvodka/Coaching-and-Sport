import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";
import { DATE_REGEX } from "@/lib/api/validators";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const { data, error } = await admin
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Mood fetch error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] }, {
      headers: { "Cache-Control": "private, max-age=30" },
    });
  });
}

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "mood-post",
    { limit: 30, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const body = await request.json();
    const { mood_score, energy_level, notes, tags, date } = body;

    if (mood_score === undefined || energy_level === undefined) {
      return NextResponse.json({ error: "mood_score and energy_level are required" }, { status: 400 });
    }

    const parsedMood = Number(mood_score);
    const parsedEnergy = Number(energy_level);

    if (isNaN(parsedMood) || parsedMood < 1 || parsedMood > 10 || !Number.isInteger(parsedMood)) {
      return NextResponse.json({ error: "mood_score must be an integer between 1 and 10" }, { status: 400 });
    }
    if (isNaN(parsedEnergy) || parsedEnergy < 1 || parsedEnergy > 10 || !Number.isInteger(parsedEnergy)) {
      return NextResponse.json({ error: "energy_level must be an integer between 1 and 10" }, { status: 400 });
    }
    if (notes && (typeof notes !== "string" || notes.length > 5000)) {
      return NextResponse.json({ error: "Invalid notes" }, { status: 400 });
    }
    if (tags) {
      if (!Array.isArray(tags) || tags.length > 20 || !tags.every((t: unknown) => typeof t === "string" && t.length <= 50)) {
        return NextResponse.json({ error: "Invalid tags" }, { status: 400 });
      }
    }
    if (date && !DATE_REGEX.test(date)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const { error: insertError } = await admin.from("mood_entries").insert({
      user_id: user.id,
      mood_score: parsedMood,
      energy_level: parsedEnergy,
      notes: notes || null,
      tags: tags || [],
      date: date || new Date().toISOString().split("T")[0],
    });

    if (insertError) {
      console.error("Mood insert error:", insertError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  });
}

export async function DELETE(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const rateLimitError = rateLimit(
    request.headers.get("x-forwarded-for"),
    "mood-delete",
    { limit: 20, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const { error: deleteError } = await admin
      .from("mood_entries")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Mood delete error:", deleteError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  });
}
