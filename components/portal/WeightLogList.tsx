"use client";

import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WeightLog } from "@/lib/supabase/database.types";

interface WeightLogListProps {
  logs: WeightLog[];
  onDeleted: () => void;
}

export default function WeightLogList({ logs, onDeleted }: WeightLogListProps) {
  const { locale, t } = useLanguage();

  const hasComposition = logs.some(
    (l) => l.body_fat_pct || l.visceral_fat || l.muscle_mass_kg || l.water_pct
  );

  const handleDelete = async (id: string) => {
    if (!confirm(locale === "fr" ? "Supprimer cette entrée ?" : "Delete this entry?")) return;
    try {
      await fetch(`/api/portal/weight?id=${id}`, { method: "DELETE" });
      onDeleted();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        {locale === "fr" ? "Aucune pesée enregistrée" : "No entries yet"}
      </div>
    );
  }

  const formatVal = (val: number | null, unit: string) => {
    if (val === null || val === undefined) return "—";
    return `${Number(val)}${unit}`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
              {t("portal.weight.date")}
            </th>
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
              {t("portal.weight.kg")}
            </th>
            {hasComposition && (
              <>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  {locale === "fr" ? "Graisse" : "Fat"}
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  {locale === "fr" ? "Viscérale" : "Visceral"}
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  {locale === "fr" ? "Muscles" : "Muscle"}
                </th>
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                  {locale === "fr" ? "Eau" : "Water"}
                </th>
              </>
            )}
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase">
              {t("portal.weight.notes")}
            </th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-800 whitespace-nowrap">
                {new Date(log.date).toLocaleDateString(
                  locale === "fr" ? "fr-FR" : "en-US",
                  { day: "numeric", month: "short", year: "numeric" }
                )}
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-heading">
                {Number(log.weight_kg)} kg
              </td>
              {hasComposition && (
                <>
                  <td className="px-4 py-3 text-sm text-amber-600">
                    {formatVal(log.body_fat_pct, " %")}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-500">
                    {formatVal(log.visceral_fat, "")}
                  </td>
                  <td className="px-4 py-3 text-sm text-emerald-600">
                    {formatVal(log.muscle_mass_kg, " kg")}
                  </td>
                  <td className="px-4 py-3 text-sm text-cyan-600">
                    {formatVal(log.water_pct, " %")}
                  </td>
                </>
              )}
              <td className="px-4 py-3 text-sm text-gray-500">
                {log.notes || "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
