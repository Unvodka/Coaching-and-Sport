import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";
import { DATE_REGEX } from "@/lib/api/validators";

export async function GET() {
  return withAuth(async ({ user, admin }) => {
    const { data, error } = await admin
      .from("weight_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    if (error) {
      console.error("Weight fetch error:", error);
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
    "weight-post",
    { limit: 30, windowSeconds: 60 }
  );
  if (rateLimitError) return rateLimitError;

  return withAuth(async ({ user, admin }) => {
    const body = await request.json();
    const { weight_kg, body_fat_pct, visceral_fat, muscle_mass_kg, water_pct, bone_mass_kg, bmr_kcal, daily_cal_kcal, bmi, date, notes } = body;

    if (!weight_kg) {
      return NextResponse.json({ error: "weight_kg is required" }, { status: 400 });
    }

    const parsedWeight = parseFloat(weight_kg);
    const parsedBodyFat = body_fat_pct ? parseFloat(body_fat_pct) : null;
    const parsedVisceralFat = visceral_fat ? parseFloat(visceral_fat) : null;
    const parsedMuscleMass = muscle_mass_kg ? parseFloat(muscle_mass_kg) : null;
    const parsedWater = water_pct ? parseFloat(water_pct) : null;
    const parsedBoneMass = bone_mass_kg ? parseFloat(bone_mass_kg) : null;
    const parsedBmr = bmr_kcal ? parseInt(bmr_kcal) : null;
    const parsedDailyCal = daily_cal_kcal ? parseInt(daily_cal_kcal) : null;
    const parsedBmi = bmi ? parseFloat(bmi) : null;

    if (isNaN(parsedWeight) || parsedWeight < 20 || parsedWeight > 350) {
      return NextResponse.json({ error: "Invalid weight value" }, { status: 400 });
    }
    if (parsedBodyFat !== null && (isNaN(parsedBodyFat) || parsedBodyFat < 1 || parsedBodyFat > 70)) {
      return NextResponse.json({ error: "Invalid body fat percentage" }, { status: 400 });
    }
    if (parsedVisceralFat !== null && (isNaN(parsedVisceralFat) || parsedVisceralFat < 0 || parsedVisceralFat > 60)) {
      return NextResponse.json({ error: "Invalid visceral fat value" }, { status: 400 });
    }
    if (parsedMuscleMass !== null && (isNaN(parsedMuscleMass) || parsedMuscleMass < 10 || parsedMuscleMass > 200)) {
      return NextResponse.json({ error: "Invalid muscle mass value" }, { status: 400 });
    }
    if (parsedWater !== null && (isNaN(parsedWater) || parsedWater < 20 || parsedWater > 80)) {
      return NextResponse.json({ error: "Invalid water percentage" }, { status: 400 });
    }
    if (parsedBoneMass !== null && (isNaN(parsedBoneMass) || parsedBoneMass < 0.5 || parsedBoneMass > 10)) {
      return NextResponse.json({ error: "Invalid bone mass value" }, { status: 400 });
    }
    if (parsedBmr !== null && (isNaN(parsedBmr) || parsedBmr < 500 || parsedBmr > 5000)) {
      return NextResponse.json({ error: "Invalid BMR value" }, { status: 400 });
    }
    if (parsedDailyCal !== null && (isNaN(parsedDailyCal) || parsedDailyCal < 500 || parsedDailyCal > 10000)) {
      return NextResponse.json({ error: "Invalid daily calorie value" }, { status: 400 });
    }
    if (parsedBmi !== null && (isNaN(parsedBmi) || parsedBmi < 10 || parsedBmi > 60)) {
      return NextResponse.json({ error: "Invalid BMI value" }, { status: 400 });
    }
    if (date && !DATE_REGEX.test(date)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }
    if (notes && (typeof notes !== "string" || notes.length > 5000)) {
      return NextResponse.json({ error: "Invalid notes" }, { status: 400 });
    }

    const { error: insertError } = await admin.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: parsedWeight,
      body_fat_pct: parsedBodyFat,
      visceral_fat: parsedVisceralFat,
      muscle_mass_kg: parsedMuscleMass,
      water_pct: parsedWater,
      bone_mass_kg: parsedBoneMass,
      bmr_kcal: parsedBmr,
      daily_cal_kcal: parsedDailyCal,
      bmi: parsedBmi,
      date: date || new Date().toISOString().split("T")[0],
      notes: notes || null,
    });

    if (insertError) {
      console.error("Weight insert error:", insertError);
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
    "weight-delete",
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
      .from("weight_logs")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Weight delete error:", deleteError);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  });
}
