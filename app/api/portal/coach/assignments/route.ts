import { NextRequest, NextResponse } from "next/server";
import { withCoach } from "@/lib/api/auth";
import { validateOrigin } from "@/lib/api/csrf";
import { rateLimit } from "@/lib/api/rate-limit";

export const dynamic = 'force-dynamic';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const limited = rateLimit(request.headers.get("x-forwarded-for"), "coach-assignments-create", { limit: 30 });
  if (limited) return limited;

  return withCoach(async ({ user, admin }) => {
    const body = await request.json();
    const { program_id, user_ids, message } = body;

    if (!program_id || !UUID_REGEX.test(program_id)) {
      return NextResponse.json({ error: "Invalid program_id" }, { status: 400 });
    }
    if (!Array.isArray(user_ids) || user_ids.length === 0 || user_ids.length > 50) {
      return NextResponse.json({ error: "Invalid user_ids" }, { status: 400 });
    }
    if (!user_ids.every((id: string) => UUID_REGEX.test(id))) {
      return NextResponse.json({ error: "Invalid user_id format" }, { status: 400 });
    }
    if (message && (typeof message !== "string" || message.length > 1000)) {
      return NextResponse.json({ error: "Message too long" }, { status: 400 });
    }

    const rows = user_ids.map((uid: string) => ({
      program_id,
      user_id: uid,
      assigned_by: user.id,
      message: message?.trim() || null,
    }));

    const { error } = await admin
      .from("program_assignments")
      .upsert(rows, { onConflict: "program_id,user_id" });

    if (error) {
      console.error("Assignment create error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  });
}

export async function DELETE(request: NextRequest) {
  const originError = validateOrigin(request);
  if (originError) return originError;

  const limited = rateLimit(request.headers.get("x-forwarded-for"), "coach-assignments-delete", { limit: 30 });
  if (limited) return limited;

  return withCoach(async ({ admin }) => {
    const body = await request.json();
    const { program_id, user_id } = body;

    if (!program_id || !UUID_REGEX.test(program_id)) {
      return NextResponse.json({ error: "Invalid program_id" }, { status: 400 });
    }
    if (!user_id || !UUID_REGEX.test(user_id)) {
      return NextResponse.json({ error: "Invalid user_id" }, { status: 400 });
    }

    const { error } = await admin
      .from("program_assignments")
      .delete()
      .eq("program_id", program_id)
      .eq("user_id", user_id);

    if (error) {
      console.error("Assignment delete error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  });
}
