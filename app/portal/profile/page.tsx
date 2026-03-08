"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import ProfileForm from "@/components/portal/ProfileForm";
import ProfileSubscriptionSection from "@/components/portal/ProfileSubscriptionSection";
import DeleteAccountModal from "@/components/portal/DeleteAccountModal";

export default function ProfilePage() {
  const { t, locale } = useLanguage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-8 pt-5">
      {/* Profile form */}
      <div>
        <h2 className="text-2xl font-bold text-heading font-heading mb-6">
          {t("portal.profile")}
        </h2>
        <ProfileForm />
      </div>

      <hr className="border-slate-200" />

      {/* Subscription & Payments */}
      <ProfileSubscriptionSection />

      <hr className="border-slate-200" />

      {/* Danger zone — always last */}
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

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
