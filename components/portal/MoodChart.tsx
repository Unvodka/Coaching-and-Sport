"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MoodEntry } from "@/lib/supabase/database.types";

interface MoodChartProps {
  entries: MoodEntry[];
}

export default function MoodChart({ entries }: MoodChartProps) {
  const data = useMemo(
    () =>
      [...entries]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((entry) => ({
          date: new Date(entry.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
          }),
          mood: entry.mood_score,
          energy: entry.energy_level,
          sleep: entry.sleep_quality ?? null,
          stress: entry.stress_level ?? null,
        })),
    [entries]
  );

  if (data.length < 2) return null;

  const hasSleeep = data.some((d) => d.sleep != null);
  const hasStress = data.some((d) => d.stress != null);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            interval="preserveStartEnd"
            padding={{ left: 16, right: 16 }}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            width={24}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Area
            type="monotone"
            dataKey="mood"
            name="Humeur"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="energy"
            name="Énergie"
            stroke="#9333ea"
            fill="#9333ea"
            fillOpacity={0.08}
            strokeWidth={2}
            dot={{ r: 3, fill: "#9333ea", strokeWidth: 0 }}
          />
          {hasSleeep && (
            <Area
              type="monotone"
              dataKey="sleep"
              name="Sommeil"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.08}
              strokeWidth={2}
              dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
              connectNulls
            />
          )}
          {hasStress && (
            <Area
              type="monotone"
              dataKey="stress"
              name="Stress"
              stroke="#f43f5e"
              fill="#f43f5e"
              fillOpacity={0.08}
              strokeWidth={2}
              dot={{ r: 3, fill: "#f43f5e", strokeWidth: 0 }}
              connectNulls
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
