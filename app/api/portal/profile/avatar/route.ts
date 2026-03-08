import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return withAuth(async ({ user, admin }) => {
    const formData = await request.formData();
    const file = formData.get("avatar") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Format non supporté. Utilisez JPG, PNG ou WebP." }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Fichier trop volumineux (max 2 Mo)." }, { status: 400 });
    }

    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const path = `${user.id}/avatar.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await admin.storage
      .from("avatars")
      .upload(path, bytes, { contentType: file.type, upsert: true });

    if (uploadError) {
      console.error("Avatar upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = admin.storage.from("avatars").getPublicUrl(path);
    const avatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await admin
      .from("profiles")
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ avatar_url: avatarUrl });
  });
}
