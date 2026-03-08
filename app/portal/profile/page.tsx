"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import ProfileForm from "@/components/portal/ProfileForm";
import ProfileSubscriptionSection from "@/components/portal/ProfileSubscriptionSection";

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8 pt-5">
      <div>
        <h2 className="text-2xl font-bold text-heading font-heading mb-6">
          {t("portal.profile")}
        </h2>
        <ProfileForm />
      </div>

      <hr className="border-slate-200" />

      <ProfileSubscriptionSection />
    </div>
  );
}
