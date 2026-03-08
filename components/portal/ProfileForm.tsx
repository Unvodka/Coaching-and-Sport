"use client";

import { useState, useEffect } from "react";
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

  // Sync with profile when it loads (only once)
  useEffect(() => {
    if (profile && !initialized) {
      setFullName(profile.full_name || "");
      setInitialized(true);
    }
  }, [profile, initialized]);

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
        setError(
          locale === "fr"
            ? `Erreur : ${data.error || "Impossible de mettre à jour le profil"}`
            : `Error: ${data.error || "Could not update profile"}`
        );
        setSaving(false);
        return;
      }

      setSaving(false);
      setSuccess(true);

      // Refresh the profile in auth context so the name updates everywhere
      await refreshProfile();
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      {/* Avatar top-right */}
      <div className="flex justify-end">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || ""}
            width={56}
            height={56}
            className="rounded-full"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center text-white text-xl font-bold">
            {(fullName || user?.email || "U").charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* First Name */}
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
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
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
