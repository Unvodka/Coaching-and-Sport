"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface WeightLogFormProps {
  onAdded: () => void;
}

export default function WeightLogForm({ onAdded }: WeightLogFormProps) {
  const { t, locale } = useLanguage();
  const { user } = useAuth();
  const [weightKg, setWeightKg] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !weightKg) return;

    setSaving(true);
    const supabase = createClient();
    await supabase.from("weight_logs").insert({
      user_id: user.id,
      weight_kg: parseFloat(weightKg),
      date,
      notes: notes || null,
    });

    setWeightKg("");
    setNotes("");
    setSaving(false);
    onAdded();
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
            ? "..."
            : locale === "fr"
            ? "Ajouter"
            : "Add"}
        </button>
      </div>
    </form>
  );
}
