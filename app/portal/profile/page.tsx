"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import ProfileForm from "@/components/portal/ProfileForm";

export default function ProfilePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-2xl font-bold text-heading font-heading mb-6">
        {t("portal.profile")}
      </h2>
      <ProfileForm />
    </div>
  );
}
