"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLanguage } from "@/lib/i18n/useLanguage";
import type { WeightLog } from "@/lib/supabase/database.types";

interface WeightChartProps {
  logs: WeightLog[];
}

type MetricKey = "weight" | "bodyFat" | "visceralFat" | "muscle" | "water";

interface MetricConfig {
  key: MetricKey;
  labelFr: string;
  labelEn: string;
  color: string;
  unit: string;
  yAxisId: string;
}

const METRICS: MetricConfig[] = [
  { key: "weight", labelFr: "Poids", labelEn: "Weight", color: "#2563eb", unit: " kg", yAxisId: "kg" },
  { key: "bodyFat", labelFr: "Masse graisseuse", labelEn: "Body fat", color: "#f59e0b", unit: " %", yAxisId: "pct" },
  { key: "visceralFat", labelFr: "Graisse viscérale", labelEn: "Visceral fat", color: "#ef4444", unit: "", yAxisId: "visc" },
  { key: "muscle", labelFr: "Masse musculaire", labelEn: "Muscle mass", color: "#10b981", unit: " kg", yAxisId: "kg" },
  { key: "water", labelFr: "Masse d'eau", labelEn: "Water mass", color: "#06b6d4", unit: " %", yAxisId: "pct" },
];

export default function WeightChart({ logs }: WeightChartProps) {
  const { locale } = useLanguage();
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(new Set(["weight"]));

  const hasCompositionData = logs.some(
    (l) => l.body_fat_pct || l.visceral_fat || l.muscle_mass_kg || l.water_pct
  );

  const data = [...logs]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      weight: Number(log.weight_kg),
      bodyFat: log.body_fat_pct ? Number(log.body_fat_pct) : null,
      visceralFat: log.visceral_fat ? Number(log.visceral_fat) : null,
      muscle: log.muscle_mass_kg ? Number(log.muscle_mass_kg) : null,
      water: log.water_pct ? Number(log.water_pct) : null,
    }));

  if (data.length === 0) return null;

  const toggleMetric = (key: MetricKey) => {
    setActiveMetrics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Calculate Y axis domain for weight/muscle (kg)
  const kgValues = data.flatMap((d) => {
    const vals: number[] = [];
    if (activeMetrics.has("weight")) vals.push(d.weight);
    if (activeMetrics.has("muscle") && d.muscle) vals.push(d.muscle);
    return vals;
  });
  const minKg = kgValues.length > 0 ? Math.floor(Math.min(...kgValues) - 2) : 0;
  const maxKg = kgValues.length > 0 ? Math.ceil(Math.max(...kgValues) + 2) : 100;

  const availableMetrics = METRICS.filter((m) => {
    if (m.key === "weight") return true;
    if (!hasCompositionData) return false;
    return logs.some((l) => {
      if (m.key === "bodyFat") return l.body_fat_pct;
      if (m.key === "visceralFat") return l.visceral_fat;
      if (m.key === "muscle") return l.muscle_mass_kg;
      if (m.key === "water") return l.water_pct;
      return false;
    });
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      {/* Metric toggles */}
      {availableMetrics.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableMetrics.map((m) => (
            <button
              key={m.key}
              onClick={() => toggleMetric(m.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeMetrics.has(m.key)
                  ? "text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              style={activeMetrics.has(m.key) ? { backgroundColor: m.color } : undefined}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: m.color }}
              />
              {locale === "fr" ? m.labelFr : m.labelEn}
            </button>
          ))}
        </div>
      )}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="kg"
            domain={[minKg, maxKg]}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
            unit=" kg"
            hide={!activeMetrics.has("weight") && !activeMetrics.has("muscle")}
          />
          <YAxis
            yAxisId="pct"
            orientation="right"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
            unit=" %"
            hide={!activeMetrics.has("bodyFat") && !activeMetrics.has("water")}
          />
          <YAxis
            yAxisId="visc"
            orientation="right"
            hide={true}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number, name: string) => {
              const metric = METRICS.find((m) => m.key === name);
              if (!metric) return [value, name];
              const label = locale === "fr" ? metric.labelFr : metric.labelEn;
              return [`${value}${metric.unit}`, label];
            }}
          />
          {availableMetrics.length > 1 && activeMetrics.size > 1 && <Legend />}
          {METRICS.map((m) =>
            activeMetrics.has(m.key) ? (
              <Line
                key={m.key}
                type="monotone"
                dataKey={m.key}
                yAxisId={m.yAxisId}
                stroke={m.color}
                strokeWidth={2.5}
                dot={{ fill: m.color, strokeWidth: 0, r: 4 }}
                activeDot={{ fill: m.color, strokeWidth: 0, r: 6 }}
                connectNulls
                name={m.key}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
