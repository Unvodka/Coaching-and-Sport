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
  const [bodyFatPct, setBodyFatPct] = useState("");
  const [visceralFat, setVisceralFat] = useState("");
  const [muscleMassKg, setMuscleMassKg] = useState("");
  const [waterPct, setWaterPct] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showExtras, setShowExtras] = useState(false);

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
          body_fat_pct: bodyFatPct || null,
          visceral_fat: visceralFat || null,
          muscle_mass_kg: muscleMassKg || null,
          water_pct: waterPct || null,
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
      setBodyFatPct("");
      setVisceralFat("");
      setMuscleMassKg("");
      setWaterPct("");
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
          {locale === "fr" ? "Données enregistrées avec succès !" : "Data saved successfully!"}
        </div>
      )}

      {/* Row 1: Weight, Date */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("portal.weight.kg")} *
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
        <button
          type="button"
          onClick={() => setShowExtras(!showExtras)}
          className="px-4 py-2.5 text-sm font-medium text-brand-blue hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <svg
            className={`w-4 h-4 transition-transform ${showExtras ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {locale === "fr" ? "Composition corporelle" : "Body composition"}
        </button>
      </div>

      {/* Row 2: Body composition fields (collapsible) */}
      {showExtras && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Masse graisseuse (%)" : "Body fat (%)"}
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="70"
                value={bodyFatPct}
                onChange={(e) => setBodyFatPct(e.target.value)}
                placeholder="20.0"
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Graisse viscérale" : "Visceral fat"}
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="60"
                value={visceralFat}
                onChange={(e) => setVisceralFat(e.target.value)}
                placeholder="8.0"
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Masse musculaire (kg)" : "Muscle mass (kg)"}
              </label>
              <input
                type="number"
                step="0.1"
                min="10"
                max="150"
                value={muscleMassKg}
                onChange={(e) => setMuscleMassKg(e.target.value)}
                placeholder="30.0"
                className={`${inputClass} w-full`}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Masse d'eau (%)" : "Water mass (%)"}
              </label>
              <input
                type="number"
                step="0.1"
                min="20"
                max="80"
                value={waterPct}
                onChange={(e) => setWaterPct(e.target.value)}
                placeholder="55.0"
                className={`${inputClass} w-full`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Row 3: Notes + Submit */}
      <div className="flex flex-wrap gap-4 items-end mt-4">
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
