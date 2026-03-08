"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";

export default function ProfileForm() {
  const { user, profile, refreshProfile } = useAuth();
  const { t, locale } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile && !initialized) {
      setFullName(profile.full_name || "");
      setInitialized(true);
    }
  }, [profile, initialized]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError(null);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarUploading(true);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("/api/portal/profile/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setAvatarError(data.error || "Erreur upload");
        setAvatarPreview(null);
      } else {
        await refreshProfile();
      }
    } catch {
      setAvatarError("Erreur de connexion");
      setAvatarPreview(null);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !fullName.trim()) return;

    setSaving(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch("/api/portal/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(locale === "fr"
          ? `Erreur : ${data.error || "Impossible de mettre à jour le profil"}`
          : `Error: ${data.error || "Could not update profile"}`);
        setSaving(false);
        return;
      }

      setSaving(false);
      setSuccess(true);
      await refreshProfile();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  const currentAvatar = avatarPreview || profile?.avatar_url;
  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">

      {/* Avatar upload */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          {currentAvatar ? (
            <Image
              src={currentAvatar}
              alt="Avatar"
              width={72}
              height={72}
              className="rounded-full object-cover w-18 h-18"
            />
          ) : (
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-brand-blue flex items-center justify-center text-white text-2xl font-bold">
              {(fullName || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          {/* Overlay on hover */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarUploading}
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            {avatarUploading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarUploading}
            className="text-sm text-brand-blue font-medium hover:underline disabled:opacity-50"
          >
            {avatarUploading
              ? (locale === "fr" ? "Envoi en cours..." : "Uploading...")
              : (locale === "fr" ? "Changer la photo" : "Change photo")}
          </button>
          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG ou WebP · max 2 Mo</p>
          {avatarError && <p className="text-xs text-red-500 mt-0.5">{avatarError}</p>}
        </div>
      </div>

      {/* Full name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("portal.profile.name")}
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={locale === "fr" ? "Votre prénom" : "Your first name"}
          className={inputClass}
        />
      </div>

      {/* Email (read-only) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("portal.profile.email")}
        </label>
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
        />
      </div>

      {/* Member since */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {locale === "fr" ? "Membre depuis" : "Member since"}
        </label>
        <input
          type="text"
          value={
            profile?.created_at
              ? new Date(profile.created_at).toLocaleDateString(
                  locale === "fr" ? "fr-FR" : "en-US",
                  { day: "numeric", month: "long", year: "numeric" }
                )
              : ""
          }
          readOnly
          className={`${inputClass} bg-gray-50 text-gray-500 cursor-not-allowed`}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {locale === "fr" ? "Profil mis à jour !" : "Profile updated!"}
        </div>
      )}

      <button
        type="submit"
        disabled={saving || !fullName.trim()}
        className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving
          ? locale === "fr" ? "Enregistrement..." : "Saving..."
          : t("portal.profile.update")}
      </button>
    </form>
  );
}
