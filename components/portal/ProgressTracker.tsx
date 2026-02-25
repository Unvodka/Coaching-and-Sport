"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";

interface ProgressTrackerProps {
  completed: number;
  total: number;
}

export default function ProgressTracker({ completed, total }: ProgressTrackerProps) {
  const { t } = useLanguage();
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          {t("portal.workouts.progress")}
        </span>
        <span className="text-sm font-bold text-heading">
          {completed}/{total} ({percentage}%)
        </span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-blue to-green-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
