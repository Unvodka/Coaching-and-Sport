"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({
  open,
  onClose,
}: DeleteAccountModalProps) {
  const { locale } = useLanguage();
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const expectedText = locale === "fr" ? "SUPPRIMER" : "DELETE";
  const isConfirmed = confirmText === expectedText;

  const handleDelete = async () => {
    if (!isConfirmed) return;
    setDeleting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/delete-account", {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "An error occurred");
        setDeleting(false);
        return;
      }

      // Sign out locally and redirect
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch {
      setError(
        locale === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again."
      );
      setDeleting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {locale === "fr"
              ? "Supprimer mon compte"
              : "Delete my account"}
          </h3>
        </div>

        {/* Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 font-medium mb-2">
            {locale === "fr"
              ? "Cette action est irréversible. Toutes vos données seront supprimées :"
              : "This action is irreversible. All your data will be deleted:"}
          </p>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            <li>{locale === "fr" ? "Votre profil" : "Your profile"}</li>
            <li>{locale === "fr" ? "Vos recettes" : "Your recipes"}</li>
            <li>
              {locale === "fr"
                ? "Votre suivi de poids"
                : "Your weight tracking data"}
            </li>
            <li>
              {locale === "fr"
                ? "Votre journal bien-être"
                : "Your wellness journal entries"}
            </li>
            <li>
              {locale === "fr"
                ? "Votre progression d'entraînement"
                : "Your workout progress"}
            </li>
          </ul>
        </div>

        {/* Confirmation input */}
        <div>
          <p className="text-sm text-gray-600 mb-2">
            {locale === "fr"
              ? `Pour confirmer, tapez "${expectedText}" ci-dessous :`
              : `To confirm, type "${expectedText}" below:`}
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={expectedText}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all text-gray-800"
            autoComplete="off"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => {
              setConfirmText("");
              setError("");
              onClose();
            }}
            disabled={deleting}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {locale === "fr" ? "Annuler" : "Cancel"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmed || deleting}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deleting
              ? locale === "fr"
                ? "Suppression..."
                : "Deleting..."
              : locale === "fr"
              ? "Supprimer définitivement"
              : "Delete permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
