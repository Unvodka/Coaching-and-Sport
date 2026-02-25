"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/supabase/AuthContext";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { createClient } from "@/lib/supabase/client";
import WeightChart from "@/components/portal/WeightChart";
import WeightLogForm from "@/components/portal/WeightLogForm";
import WeightLogList from "@/components/portal/WeightLogList";
import type { WeightLog } from "@/lib/supabase/database.types";

export default function WeightPage() {
  const { user } = useAuth();
  const { t, locale } = useLanguage();
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("weight_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    setLogs((data as WeightLog[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const latestWeight = logs.length > 0 ? Number(logs[0].weight_kg) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Summary */}
      {latestWeight && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm text-gray-500">
                {t("portal.weight.current")}
              </p>
              <p className="text-3xl font-bold text-heading">
                {latestWeight} kg
              </p>
            </div>
            {logs.length >= 2 && (
              <div>
                <p className="text-sm text-gray-500">
                  {t("portal.weight.progress")}
                </p>
                {(() => {
                  const oldest = Number(logs[logs.length - 1].weight_kg);
                  const diff = latestWeight - oldest;
                  const isLoss = diff < 0;
                  return (
                    <p
                      className={`text-lg font-semibold ${
                        isLoss ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {diff > 0 ? "+" : ""}
                      {diff.toFixed(1)} kg
                    </p>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Chart */}
      {!loading && <WeightChart logs={logs} />}

      {/* Add form */}
      <WeightLogForm onAdded={fetchLogs} />

      {/* History */}
      <div>
        <h3 className="font-semibold text-heading mb-3">
          {locale === "fr" ? "Historique" : "History"}
        </h3>
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        ) : (
          <WeightLogList logs={logs} onDeleted={fetchLogs} />
        )}
      </div>
    </div>
  );
}
