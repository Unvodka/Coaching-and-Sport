"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Subscription {
  id: string;
  status: string;
  program_title: string;
  amount_cents: number;
  currency: string;
  minimum_months: number;
  created_at: string;
}

interface Payment {
  id: string;
  amount_cents: number;
  currency: string;
  status: string;
  invoice_url: string | null;
  paid_at: string | null;
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active:   { label: "Actif",       color: "bg-green-100 text-green-700" },
  canceled: { label: "Annulé",      color: "bg-red-100 text-red-700" },
  past_due: { label: "Paiement dû", color: "bg-orange-100 text-orange-700" },
  trialing: { label: "Essai",       color: "bg-blue-100 text-blue-700" },
  unpaid:   { label: "Non payé",    color: "bg-red-100 text-red-700" },
};

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
  paid:   { label: "Payé",       color: "text-green-600" },
  failed: { label: "Échoué",     color: "text-red-600" },
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

export default function ProfileSubscriptionSection() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/subscription")
      .then((r) => r.json())
      .then((data) => {
        setSubscription(data.subscription ?? null);
        setPayments(data.payments ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-6 h-6 border-4 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-heading font-heading">Abonnement & Paiements</h3>
        <Link
          href="/portal/subscription"
          className="text-xs text-brand-blue hover:underline font-medium"
        >
          Gérer →
        </Link>
      </div>

      {/* No subscription */}
      {!subscription ? (
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-sm text-slate-400">Aucun abonnement actif.</p>
        </div>
      ) : (
        <>
          {/* Subscription summary card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-slate-400 font-medium mb-0.5">Programme</p>
              <p className="text-sm font-semibold text-slate-800 truncate">{subscription.program_title}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {formatAmount(subscription.amount_cents, subscription.currency)}/mois · depuis {formatDate(subscription.created_at)}
              </p>
            </div>
            <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_LABELS[subscription.status]?.color ?? "bg-slate-100 text-slate-600"}`}>
              {STATUS_LABELS[subscription.status]?.label ?? subscription.status}
            </span>
          </div>

          {/* Payment history */}
          {payments.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Montant</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut</th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">
                        {p.paid_at ? formatDate(p.paid_at) : formatDate(p.created_at)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap text-xs">
                        {formatAmount(p.amount_cents, p.currency)}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        <span className={`font-medium ${PAYMENT_STATUS[p.status]?.color ?? "text-slate-500"}`}>
                          {PAYMENT_STATUS[p.status]?.label ?? p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right w-10">
                        {p.invoice_url ? (
                          <a href={p.invoice_url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-brand-blue hover:opacity-70"
                            title="Voir la facture">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
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

          {payments.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-3">Aucun paiement enregistré.</p>
          )}
        </>
      )}
    </div>
  );
}
