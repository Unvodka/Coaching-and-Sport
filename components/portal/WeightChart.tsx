"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { WeightLog } from "@/lib/supabase/database.types";

interface WeightChartProps {
  logs: WeightLog[];
}

export default function WeightChart({ logs }: WeightChartProps) {
  const data = [...logs]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      weight: Number(log.weight_kg),
    }));

  if (data.length === 0) return null;

  const weights = data.map((d) => d.weight);
  const minWeight = Math.floor(Math.min(...weights) - 2);
  const maxWeight = Math.ceil(Math.max(...weights) + 2);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
          />
          <YAxis
            domain={[minWeight, maxWeight]}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickLine={false}
            unit=" kg"
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number) => [`${value} kg`, "Poids"]}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ fill: "#2563eb", strokeWidth: 0, r: 4 }}
            activeDot={{ fill: "#2563eb", strokeWidth: 0, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
