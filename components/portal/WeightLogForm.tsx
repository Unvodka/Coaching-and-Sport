"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";

interface WeightLogFormProps {
  userId?: string;
  onAdded: () => void;
}

export default function WeightLogForm({ onAdded }: WeightLogFormProps) {
  const { t, locale } = useLanguage();
  const [weightKg, setWeightKg] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightKg) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/portal/weight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight_kg: weightKg,
          date,
          notes: notes || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          locale === "fr"
            ? `Erreur: ${data.error || "Une erreur est survenue"}`
            : `Error: ${data.error || "Something went wrong"}`
        );
        setSaving(false);
        return;
      }

      setWeightKg("");
      setNotes("");
      setSuccess(true);
      setSaving(false);
      onAdded();
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error("Weight submit error:", err);
      setError(locale === "fr" ? "Erreur de connexion" : "Connection error");
      setSaving(false);
    }
  };

  const inputClass =
    "px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all text-gray-800";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-100 p-6"
    >
      <h3 className="font-semibold text-heading mb-4">
        {t("portal.weight.add")}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
          {locale === "fr" ? "Poids enregistré avec succès !" : "Weight saved successfully!"}
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.weight.kg")}
          </label>
          <input
            type="number"
            step="0.1"
            min="20"
            max="300"
            required
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="75.0"
            className={`${inputClass} w-28`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.weight.date")}
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.weight.notes")}
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={locale === "fr" ? "Notes optionnelles..." : "Optional notes..."}
            className={`${inputClass} w-full`}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving
            ? (locale === "fr" ? "Enregistrement..." : "Saving...")
            : locale === "fr"
            ? "Ajouter"
            : "Add"}
        </button>
      </div>
    </form>
  );
}
