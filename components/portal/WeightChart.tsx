"use client";

import { useState, useMemo, useEffect } from "react";
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

type MetricKey = "weight" | "bodyFat" | "visceralFat" | "muscle" | "water" | "boneMass" | "bmr" | "dailyCal" | "bmi";

interface MetricConfig {
  key: MetricKey;
  labelFr: string;
  labelEn: string;
  color: string;
  unit: string;
}

const KG_METRICS: MetricConfig[] = [
  { key: "weight", labelFr: "Poids", labelEn: "Weight", color: "#2563eb", unit: " kg" },
  { key: "muscle", labelFr: "Masse musculaire", labelEn: "Muscle mass", color: "#10b981", unit: " kg" },
  { key: "boneMass", labelFr: "Masse osseuse", labelEn: "Bone mass", color: "#8b5cf6", unit: " kg" },
];

const PCT_METRICS: MetricConfig[] = [
  { key: "bodyFat", labelFr: "Masse graisseuse", labelEn: "Body fat", color: "#f59e0b", unit: " %" },
  { key: "water", labelFr: "Masse d'eau", labelEn: "Water mass", color: "#06b6d4", unit: " %" },
  { key: "visceralFat", labelFr: "Graisse viscérale", labelEn: "Visceral fat", color: "#ef4444", unit: "" },
  { key: "bmi", labelFr: "IMC", labelEn: "BMI", color: "#ec4899", unit: "" },
];

const KCAL_METRICS: MetricConfig[] = [
  { key: "bmr", labelFr: "Métabolisme de base", labelEn: "BMR", color: "#f97316", unit: " kcal" },
  { key: "dailyCal", labelFr: "Apport calorique", labelEn: "Daily calories", color: "#14b8a6", unit: " kcal" },
];

const ALL_METRICS = [...KG_METRICS, ...PCT_METRICS, ...KCAL_METRICS];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

export default function WeightChart({ logs }: WeightChartProps) {
  const { locale } = useLanguage();

  const data = useMemo(
    () =>
      [...logs]
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
          boneMass: log.bone_mass_kg ? Number(log.bone_mass_kg) : null,
          bmr: log.bmr_kcal ? Number(log.bmr_kcal) : null,
          dailyCal: log.daily_cal_kcal ? Number(log.daily_cal_kcal) : null,
          bmi: log.bmi ? Number(log.bmi) : null,
        })),
    [logs]
  );

  // Determine which metrics have data
  const availableKg = useMemo(
    () =>
      KG_METRICS.filter((m) => {
        if (m.key === "weight") return true;
        if (m.key === "muscle") return logs.some((l) => l.muscle_mass_kg);
        if (m.key === "boneMass") return logs.some((l) => l.bone_mass_kg);
        return false;
      }),
    [logs]
  );

  const availablePct = useMemo(
    () =>
      PCT_METRICS.filter((m) => {
        if (m.key === "bodyFat") return logs.some((l) => l.body_fat_pct);
        if (m.key === "water") return logs.some((l) => l.water_pct);
        if (m.key === "visceralFat") return logs.some((l) => l.visceral_fat);
        if (m.key === "bmi") return logs.some((l) => l.bmi);
        return false;
      }),
    [logs]
  );

  const availableKcal = useMemo(
    () =>
      KCAL_METRICS.filter((m) => {
        if (m.key === "bmr") return logs.some((l) => l.bmr_kcal);
        if (m.key === "dailyCal") return logs.some((l) => l.daily_cal_kcal);
        return false;
      }),
    [logs]
  );

  const [activeKg, setActiveKg] = useState<Set<MetricKey>>(() => {
    const set = new Set<MetricKey>(["weight"]);
    if (logs.some((l) => l.muscle_mass_kg)) set.add("muscle");
    if (logs.some((l) => l.bone_mass_kg)) set.add("boneMass");
    return set;
  });

  const [activePct, setActivePct] = useState<Set<MetricKey>>(() => {
    const set = new Set<MetricKey>();
    if (logs.some((l) => l.body_fat_pct)) set.add("bodyFat");
    if (logs.some((l) => l.water_pct)) set.add("water");
    if (logs.some((l) => l.visceral_fat)) set.add("visceralFat");
    if (logs.some((l) => l.bmi)) set.add("bmi");
    return set;
  });

  const [activeKcal, setActiveKcal] = useState<Set<MetricKey>>(() => {
    const set = new Set<MetricKey>();
    if (logs.some((l) => l.bmr_kcal)) set.add("bmr");
    if (logs.some((l) => l.daily_cal_kcal)) set.add("dailyCal");
    return set;
  });

  // Auto-activate new metrics when data becomes available
  useEffect(() => {
    setActiveKg((prev) => {
      const next = new Set(prev);
      if (logs.some((l) => l.muscle_mass_kg)) next.add("muscle");
      if (logs.some((l) => l.bone_mass_kg)) next.add("boneMass");
      return next.size !== prev.size ? next : prev;
    });
  }, [logs]);

  useEffect(() => {
    setActivePct((prev) => {
      const next = new Set(prev);
      if (logs.some((l) => l.body_fat_pct)) next.add("bodyFat");
      if (logs.some((l) => l.water_pct)) next.add("water");
      if (logs.some((l) => l.visceral_fat)) next.add("visceralFat");
      if (logs.some((l) => l.bmi)) next.add("bmi");
      return next.size !== prev.size ? next : prev;
    });
  }, [logs]);

  useEffect(() => {
    setActiveKcal((prev) => {
      const next = new Set(prev);
      if (logs.some((l) => l.bmr_kcal)) next.add("bmr");
      if (logs.some((l) => l.daily_cal_kcal)) next.add("dailyCal");
      return next.size !== prev.size ? next : prev;
    });
  }, [logs]);

  const toggleMetric = (key: MetricKey, group: "kg" | "pct" | "kcal") => {
    const setter = group === "kg" ? setActiveKg : group === "pct" ? setActivePct : setActiveKcal;
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const { minKg, maxKg } = useMemo(() => {
    const kgValues = data.flatMap((d) => {
      const vals: number[] = [];
      if (activeKg.has("weight")) vals.push(d.weight);
      if (activeKg.has("muscle") && d.muscle) vals.push(d.muscle);
      if (activeKg.has("boneMass") && d.boneMass) vals.push(d.boneMass);
      return vals;
    });
    return {
      minKg: kgValues.length > 0 ? Math.floor(Math.min(...kgValues) - 2) : 0,
      maxKg: kgValues.length > 0 ? Math.ceil(Math.max(...kgValues) + 2) : 100,
    };
  }, [data, activeKg]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTooltip = (value: any, name: any) => {
    const metric = ALL_METRICS.find((m) => m.key === name);
    if (!metric) return [`${value}`, name];
    const label = locale === "fr" ? metric.labelFr : metric.labelEn;
    return [`${value}${metric.unit}`, label];
  };

  // Custom label renderer for data points
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLabel = (color: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DataLabel = (props: any) => {
      const { x, y, value } = props;
      if (value == null) return null;
      return (
        <text
          x={x}
          y={y - 10}
          fill={color}
          fontSize={11}
          fontWeight={600}
          textAnchor="middle"
        >
          {value}
        </text>
      );
    };
    DataLabel.displayName = "DataLabel";
    return DataLabel;
  };

  if (data.length === 0) return null;

  const hasPctData = availablePct.length > 0;
  const hasKcalData = availableKcal.length > 0;

  const renderToggles = (metrics: MetricConfig[], active: Set<MetricKey>, group: "kg" | "pct" | "kcal") => (
    <div className="flex flex-wrap gap-2 mb-4">
      {metrics.map((m) => (
        <button
          key={m.key}
          onClick={() => toggleMetric(m.key, group)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            active.has(m.key)
              ? "text-white shadow-sm"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          style={active.has(m.key) ? { backgroundColor: m.color } : undefined}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
          {locale === "fr" ? m.labelFr : m.labelEn}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* KG Chart */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-heading mb-3">
          {locale === "fr" ? "Poids (kg)" : "Weight (kg)"}
        </h3>

        {availableKg.length > 1 && renderToggles(availableKg, activeKg, "kg")}

        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} />
            <YAxis
              domain={[minKg, maxKg]}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickLine={false}
              unit=" kg"
            />
            <Tooltip contentStyle={tooltipStyle} formatter={formatTooltip} />
            {activeKg.size > 1 && <Legend />}
            {KG_METRICS.map((m) =>
              activeKg.has(m.key) ? (
                <Line
                  key={m.key}
                  type="monotone"
                  dataKey={m.key}
                  stroke={m.color}
                  strokeWidth={2.5}
                  dot={{ fill: m.color, strokeWidth: 0, r: 4 }}
                  activeDot={{ fill: m.color, strokeWidth: 0, r: 6 }}
                  connectNulls
                  name={m.key}
                  label={renderLabel(m.color)}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* % Chart */}
      {hasPctData && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-heading mb-3">
            {locale === "fr" ? "Composition (%)" : "Composition (%)"}
          </h3>

          {availablePct.length > 1 && renderToggles(availablePct, activePct, "pct")}

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                unit=" %"
              />
              <Tooltip contentStyle={tooltipStyle} formatter={formatTooltip} />
              {activePct.size > 1 && <Legend />}
              {PCT_METRICS.map((m) =>
                activePct.has(m.key) ? (
                  <Line
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    stroke={m.color}
                    strokeWidth={2.5}
                    dot={{ fill: m.color, strokeWidth: 0, r: 4 }}
                    activeDot={{ fill: m.color, strokeWidth: 0, r: 6 }}
                    connectNulls
                    name={m.key}
                    label={renderLabel(m.color)}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Kcal Chart */}
      {hasKcalData && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-heading mb-3">
            {locale === "fr" ? "Métabolisme (kcal)" : "Metabolism (kcal)"}
          </h3>

          {availableKcal.length > 1 && renderToggles(availableKcal, activeKcal, "kcal")}

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                tickLine={false}
                unit=" kcal"
              />
              <Tooltip contentStyle={tooltipStyle} formatter={formatTooltip} />
              {activeKcal.size > 1 && <Legend />}
              {KCAL_METRICS.map((m) =>
                activeKcal.has(m.key) ? (
                  <Line
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    stroke={m.color}
                    strokeWidth={2.5}
                    dot={{ fill: m.color, strokeWidth: 0, r: 4 }}
                    activeDot={{ fill: m.color, strokeWidth: 0, r: 6 }}
                    connectNulls
                    name={m.key}
                    label={renderLabel(m.color)}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
