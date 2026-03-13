"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { useAuth } from "@/lib/supabase/AuthContext";
import emailjs from "@emailjs/browser";

const SUBJECTS_FR = [
  "Planifier un nouveau programme",
  "Modifier mon programme actuel",
  "Question sur mon suivi",
  "Demande de cours particulier (natation)",
  "Autre question",
];
const SUBJECTS_EN = [
  "Plan a new program",
  "Modify my current program",
  "Question about my progress",
  "Request a private lesson (swimming)",
  "Other question",
];

export default function PortalContactPage() {
  const { locale } = useLanguage();
  const { profile } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name);
    if (profile?.email) setEmail(profile.email);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !subject) return;

    setSending(true);
    setError(null);

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      setError(locale === "fr" ? "Configuration email manquante." : "Email config missing.");
      setSending(false);
      return;
    }

    emailjs.init(publicKey);

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name || (locale === "fr" ? "Utilisateur portail" : "Portal user"),
        from_email: email,
        phone: locale === "fr" ? "Via portail" : "Via portal",
        formule: subject,
        message,
      });
      setSuccess(true);
      setMessage("");
      setSubject("");
    } catch {
      setError(locale === "fr" ? "Erreur d'envoi. Réessayez." : "Send error. Please retry.");
    } finally {
      setSending(false);
    }
  };

  const subjects = locale === "fr" ? SUBJECTS_FR : SUBJECTS_EN;

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="text-4xl mb-3">💬</div>
        <h2 className="text-xl font-bold text-heading">
          {locale === "fr" ? "Contacter le coach" : "Contact the coach"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {locale === "fr"
            ? "Planifiez ou ajustez votre programme directement avec Arnaud."
            : "Plan or adjust your program directly with Arnaud."}
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="font-semibold text-green-800 mb-1">
            {locale === "fr" ? "Message envoyé !" : "Message sent!"}
          </h3>
          <p className="text-sm text-green-700">
            {locale === "fr"
              ? "Arnaud vous répondra dans les plus brefs délais."
              : "Arnaud will get back to you as soon as possible."}
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 text-sm text-green-600 underline"
          >
            {locale === "fr" ? "Envoyer un autre message" : "Send another message"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Name + Email (pre-filled, read-only) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Nom" : "Name"}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {locale === "fr" ? "Email" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {locale === "fr" ? "Sujet" : "Subject"}
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    subject === s
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-white text-gray-600 border-gray-200 hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              {locale === "fr" ? "Message" : "Message"}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                locale === "fr"
                  ? "Décrivez votre objectif, vos disponibilités, vos questions..."
                  : "Describe your goal, availability, questions..."
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending || !message.trim() || !subject}
            className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-navy text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {sending
              ? (locale === "fr" ? "Envoi en cours..." : "Sending...")
              : (locale === "fr" ? "Envoyer le message" : "Send message")}
          </button>
        </form>
      )}
    </div>
  );
}
