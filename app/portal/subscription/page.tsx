"use client";

import { useEffect, useState } from "react";

interface Subscription {
  id: string;
  status: string;
  program_title: string;
  amount_cents: number;
  currency: string;
  interval: string;
  minimum_months: number;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at: string | null;
  created_at: string;
}

interface Payment {
  id: string;
  amount_cents: number;
  currency: string;
  status: string;
  invoice_url: string | null;
  invoice_pdf: string | null;
  paid_at: string | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active:   { label: "Actif",        color: "bg-green-100 text-green-800" },
  canceled: { label: "Annulé",       color: "bg-red-100 text-red-800" },
  past_due: { label: "Paiement dû",  color: "bg-orange-100 text-orange-800" },
  trialing: { label: "Essai",        color: "bg-blue-100 text-blue-800" },
  unpaid:   { label: "Non payé",     color: "bg-red-100 text-red-800" },
};

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
  paid:   { label: "Payé",   color: "text-green-600" },
  failed: { label: "Échoué", color: "text-red-600" },
  open:   { label: "En attente", color: "text-orange-600" },
};

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [backfillMsg, setBackfillMsg] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/subscription");
      const data = await res.json();
      setSubscription(data.subscription ?? null);
      setPayments(data.payments ?? []);
    } catch {
      // silently fail — show empty state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCancel = async () => {
    if (!subscription) return;
    setCanceling(true);
    setCancelError(null);
    try {
      const res = await fetch("/api/portal/subscription/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCancelError(data.error ?? "Erreur lors de l'annulation");
      } else {
        setCancelSuccess(true);
        await fetchData();
      }
    } catch {
      setCancelError("Erreur réseau, veuillez réessayer.");
    } finally {
      setCanceling(false);
      setShowConfirm(false);
    }
  };

  const handleBackfill = async () => {
    setBackfilling(true);
    setBackfillMsg(null);
    try {
      const res = await fetch("/api/portal/subscription/backfill", { method: "POST" });
      const data = await res.json();
      const detail = data.error
        ? `Erreur : ${data.error}`
        : data.message ?? "Import terminé.";
      setBackfillMsg(detail);
      if (data.subscriptions > 0) await fetchData();
    } catch {
      setBackfillMsg("Erreur réseau lors de l&apos;import.");
    } finally {
      setBackfilling(false);
    }
  };

  // Compute months elapsed since subscription start
  const monthsElapsed = subscription
    ? (() => {
        const start = new Date(subscription.created_at);
        const now = new Date();
        return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
      })()
    : 0;

  const canCancel = subscription
    && subscription.status !== "canceled"
    && !subscription.cancel_at_period_end
    && monthsElapsed >= subscription.minimum_months;

  const monthsUntilCancel = subscription
    ? Math.max(0, subscription.minimum_months - monthsElapsed)
    : 0;

  const cancelAvailableDate = subscription
    ? (() => {
        const start = new Date(subscription.created_at);
        return new Date(start.getFullYear(), start.getMonth() + subscription.minimum_months, start.getDate());
      })()
    : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-heading font-heading">
        Mon abonnement
      </h2>

      {/* ── No subscription ── */}
      {!subscription && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </div>
          <p className="text-slate-600 text-lg font-medium mb-2">Aucun abonnement actif</p>
          <p className="text-slate-400 text-sm mb-6">Vous n&apos;avez pas encore souscrit à un programme mensuel.</p>
          <a
            href="/#offres"
            className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors no-underline"
          >
            Voir les offres
          </a>
          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400 mb-2">Vous avez déjà souscrit un abonnement&nbsp;?</p>
            {backfillMsg && <p className="text-xs text-green-600 mb-2">{backfillMsg}</p>}
            <button
              onClick={handleBackfill}
              disabled={backfilling}
              className="text-xs text-brand-blue underline hover:text-blue-700 disabled:opacity-50 cursor-pointer"
            >
              {backfilling ? "Import en cours..." : "Synchroniser depuis Stripe"}
            </button>
          </div>
        </div>
      )}

      {/* ── Active subscription card ── */}
      {subscription && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1a2a56] to-[#1e3a8a] p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Programme</p>
                <h3 className="text-xl font-bold">{subscription.program_title}</h3>
              </div>
              <span className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full ${STATUS_LABELS[subscription.status]?.color ?? "bg-slate-100 text-slate-700"}`}>
                {subscription.cancel_at_period_end ? "Annulation programmée" : (STATUS_LABELS[subscription.status]?.label ?? subscription.status)}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-extrabold">{formatAmount(subscription.amount_cents, subscription.currency)}</span>
              <span className="text-white/60 text-sm">/{subscription.interval === "month" ? "mois" : subscription.interval}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Début de période</p>
                <p className="text-sm font-semibold text-slate-700">
                  {subscription.current_period_start ? formatDate(subscription.current_period_start) : "—"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">
                  {subscription.cancel_at_period_end ? "Actif jusqu'au" : "Prochain renouvellement"}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {subscription.current_period_end ? formatDate(subscription.current_period_end) : "—"}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Engagement minimum</p>
                <p className="text-sm font-semibold text-slate-700">
                  {subscription.minimum_months} mois
                  {monthsElapsed >= subscription.minimum_months
                    ? " ✅ atteint"
                    : ` (encore ${monthsUntilCancel} mois)`}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400 font-medium mb-1">Abonné depuis</p>
                <p className="text-sm font-semibold text-slate-700">{formatDate(subscription.created_at)}</p>
              </div>
            </div>

            {/* Cancel section */}
            {subscription.status !== "canceled" && (
              <div className="pt-2 border-t border-slate-100">
                {subscription.cancel_at_period_end ? (
                  <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-orange-700">
                      Annulation programmée — votre accès se termine le <strong>{subscription.current_period_end ? formatDate(subscription.current_period_end) : "—"}</strong>
                    </p>
                  </div>
                ) : !canCancel ? (
                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-blue-800 mb-0.5">Engagement en cours</p>
                      <p className="text-xs text-blue-600">
                        L&apos;annulation sera disponible à partir du{" "}
                        <strong>{cancelAvailableDate ? formatDate(cancelAvailableDate.toISOString()) : "—"}</strong>
                        {" "}({monthsUntilCancel} mois restants).
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {cancelError && (
                      <p className="text-sm text-red-600 mb-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{cancelError}</p>
                    )}
                    {cancelSuccess && (
                      <p className="text-sm text-green-700 mb-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                        Annulation programmée — votre accès reste actif jusqu&apos;à la fin de la période.
                      </p>
                    )}
                    {!showConfirm ? (
                      <button
                        onClick={() => setShowConfirm(true)}
                        className="text-sm text-red-500 hover:text-red-700 underline transition-colors cursor-pointer"
                      >
                        Annuler l&apos;abonnement
                      </button>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                        <p className="text-sm font-semibold text-red-800">Confirmer l&apos;annulation ?</p>
                        <p className="text-xs text-red-600">
                          L&apos;abonnement se terminera à la fin de la période en cours ({subscription.current_period_end ? formatDate(subscription.current_period_end) : "—"}).
                          Vous conservez l&apos;accès jusqu&apos;à cette date.
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={handleCancel}
                            disabled={canceling}
                            className="flex-1 bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-60 transition-colors cursor-pointer"
                          >
                            {canceling ? "Annulation..." : "Confirmer l&apos;annulation"}
                          </button>
                          <button
                            onClick={() => { setShowConfirm(false); setCancelError(null); }}
                            className="flex-1 bg-white border border-slate-200 text-slate-700 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            Conserver l&apos;abonnement
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Payment history ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-heading font-heading">Historique des paiements</h3>
          <button
            onClick={handleBackfill}
            disabled={backfilling}
            className="text-xs text-slate-400 hover:text-brand-blue transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            {backfilling ? "Sync..." : "Synchroniser"}
          </button>
        </div>
        {backfillMsg && <p className="text-xs text-green-600 mb-3">{backfillMsg}</p>}

        {payments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
            <p className="text-slate-400 text-sm">Aucun paiement enregistré pour le moment.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Montant</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Facture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-600">
                      {p.paid_at ? formatDate(p.paid_at) : formatDate(p.created_at)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {formatAmount(p.amount_cents, p.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${PAYMENT_STATUS[p.status]?.color ?? "text-slate-500"}`}>
                        {PAYMENT_STATUS[p.status]?.label ?? p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {p.invoice_url ? (
                        <a
                          href={p.invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand-blue hover:underline text-xs font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Voir
                        </a>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
