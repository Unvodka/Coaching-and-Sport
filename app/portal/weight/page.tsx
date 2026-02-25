"use client";

import { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import WeightChart from "@/components/portal/WeightChart";
import WeightLogForm from "@/components/portal/WeightLogForm";
import WeightLogList from "@/components/portal/WeightLogList";
import type { WeightLog } from "@/lib/supabase/database.types";

export default function WeightPage() {
  const { t, locale } = useLanguage();
  const { user: authUser } = useAuth();
  const [logs, setLogs] = useState<WeightLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch("/api/portal/weight");
      const json = await res.json();

      if (!res.ok) {
        console.error("Weight fetch error:", json.error);
        return;
      }

      setLogs(json.data as WeightLog[]);
    } catch (err) {
      console.error("Weight page error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Safety timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const latestWeight = logs.length > 0 ? Number(logs[0].weight_kg) : null;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-40 mb-3" />
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Empty state */}
      {logs.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <h3 className="text-lg font-semibold text-heading mb-2">
            {locale === "fr"
              ? "Commencez votre suivi de poids !"
              : "Start tracking your weight!"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            {locale === "fr"
              ? "Ajoutez votre première pesée ci-dessous pour commencer à suivre votre progression."
              : "Add your first weight entry below to start tracking your progress."}
          </p>
        </div>
      )}

      {/* Summary — only when we have data */}
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

      {/* Chart — only when we have data */}
      {logs.length > 0 && <WeightChart logs={logs} />}

      {/* Add form — always rendered */}
      <WeightLogForm userId={authUser?.id} onAdded={fetchLogs} />

      {/* History — only when we have data */}
      {logs.length > 0 && (
        <div>
          <h3 className="font-semibold text-heading mb-3">
            {locale === "fr" ? "Historique" : "History"}
          </h3>
          <WeightLogList logs={logs} onDeleted={fetchLogs} />
        </div>
      )}
    </div>
  );
}
