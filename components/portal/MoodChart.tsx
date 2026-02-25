"use client";

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
  const data = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((entry) => ({
      date: new Date(entry.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      mood: entry.mood_score,
      energy: entry.energy_level,
    }));

  if (data.length < 2) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="mood"
            name="Humeur"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="energy"
            name="Énergie"
            stroke="#9333ea"
            fill="#9333ea"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
