"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import DeleteAccountModal from "@/components/portal/DeleteAccountModal";

export default function ProfileForm() {
  const { user, profile } = useAuth();
  const { t, locale } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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

      // Reload after a short delay to update the name everywhere
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch {
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-6">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.full_name || ""}
            width={80}
            height={80}
            className="rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-brand-blue flex items-center justify-center text-white text-2xl font-bold">
            {(fullName || user?.email || "U").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="font-semibold text-heading">{fullName || user?.email}</p>
          <p className="text-sm text-gray-500">
            {profile?.role === "coach"
              ? "Coach"
              : locale === "fr"
              ? "Membre"
              : "Member"}
          </p>
        </div>
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

      {/* Danger Zone */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="border border-red-200 rounded-xl p-6 bg-red-50/30">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            {locale === "fr" ? "Zone de danger" : "Danger zone"}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {locale === "fr"
              ? "La suppression de votre compte est définitive. Toutes vos données (recettes, suivi de poids, journal, progression) seront supprimées."
              : "Deleting your account is permanent. All your data (recipes, weight tracking, journal, progress) will be deleted."}
          </p>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            {locale === "fr" ? "Supprimer mon compte" : "Delete my account"}
          </button>
        </div>
      </div>

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </form>
  );
}
