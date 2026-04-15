/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { trackContactFormSubmit } from '@/components/Analytics';

/* ─── Types ────────────────────────────────────────────────────── */
type ToastType = { message: string; type: 'success' | 'error' } | null;

/* ─── Constants ─────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '33749486203';
const WHATSAPP_MSG = encodeURIComponent(
  'Bonjour Arnaud, je suis intéressé(e) par le Pack 10 Séances à 499€. Pouvez-vous me donner plus d\'informations ?'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const BENEFITS = [
  { icon: '🏊', title: 'Natation, fitness ou aquafitness', desc: 'Tu choisis l\'activité selon tes envies et objectifs.' },
  { icon: '📍', title: 'À domicile ou en extérieur', desc: 'Je me déplace sur toute la Côte d\'Azur — Valbonne, Sophia, Antibes, Mougins.' },
  { icon: '🎯', title: 'Programme 100% sur mesure', desc: 'Bilan initial gratuit, objectifs définis ensemble, progression garantie.' },
  { icon: '💪', title: 'Résultats visibles en 4 semaines', desc: 'Mes clients voient des changements dès le 1er mois d\'entraînement régulier.' },
  { icon: '🏅', title: 'Coach diplômé d\'État', desc: 'BPJEPS AAN, carte pro N°07520ED0375 — assurance incluse.' },
  { icon: '💶', title: '50% remboursé via crédit d\'impôt', desc: 'Service à la personne (SAP) : 499€ → seulement 249,50€ net.' },
];

const TESTIMONIALS = [
  {
    name: 'Sophie M.',
    location: 'Valbonne',
    text: 'En 10 séances de natation avec Arnaud, j\'ai perdu 4kg et retrouvé confiance en moi. Sa pédagogie est bienveillante et efficace.',
    stars: 5,
  },
  {
    name: 'Thomas R.',
    location: 'Sophia Antipolis',
    text: 'Arnaud a totalement transformé ma condition physique. Les séances outdoor au bord de ma piscine sont incroyables. Je recommande à 100%.',
    stars: 5,
  },
  {
    name: 'Marie-Claire D.',
    location: 'Mougins',
    text: 'Professionnel, ponctuel et à l\'écoute. J\'ai enfin trouvé un coach qui adapte vraiment le programme à mes douleurs articulaires.',
    stars: 5,
  },
];

const FAQ = [
  {
    q: 'Les séances se déroulent où ?',
    a: 'Je me déplace chez vous (piscine privée, domicile) ou dans un espace extérieur de la région — Valbonne, Sophia Antipolis, Antibes, Mougins, Grasse et alentours.',
  },
  {
    q: 'Comment fonctionne le crédit d\'impôt ?',
    a: 'En tant que prestataire agréé Service à la Personne (SAP), 50% du montant est déductible de vos impôts. Vous payez 499€ et récupérez 249,50€ sur votre déclaration. Coût réel : 249,50€.',
  },
  {
    q: 'Quelle activité pour le pack 10 séances ?',
    a: 'Natation, aquafitness, fitness en plein air, musculation, HIIT — ou un mix selon vos envies. On définit ça ensemble lors du bilan initial gratuit.',
  },
  {
    q: 'Est-ce que les séances ont une durée fixe ?',
    a: 'Chaque séance dure 1 heure. Pour les cours de natation ou d\'aquafitness en piscine, comptez 45 min d\'eau effective.',
  },
  {
    q: 'Est-ce que je dois être sportif pour commencer ?',
    a: 'Absolument pas. Je travaille avec des débutants complets comme avec des sportifs confirmés. L\'essentiel c\'est votre motivation — je m\'occupe du reste.',
  },
];

/* ─── Sub-components ─────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg">★</span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex justify-between items-center gap-4 font-semibold text-gray-800 hover:text-brand-blue transition-colors text-[0.95rem]"
      >
        <span>{q}</span>
        <span className={`text-brand-blue text-xl transition-transform duration-300 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-60 pb-4' : 'max-h-0'}`}>
        <p className="text-gray-600 leading-relaxed text-[0.93rem]">{a}</p>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function LandingPageClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);

  }, []);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    setSubmitting(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      setToast({ message: 'Service non configuré. Contactez-nous via WhatsApp.', type: 'error' });
      setSubmitting(false);
      return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        phone: phone || 'Non renseigné',
        formule: 'Pack 10 Séances — Landing Page',
        message: message || 'Intéressé(e) par le Pack 10 Séances',
      });
      trackContactFormSubmit('pack-10-seances-landing');
      setToast({ message: '✅ Message envoyé ! Je vous contacte sous 24h.', type: 'success' });
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch {
      setToast({ message: 'Erreur d\'envoi. Contactez-nous via WhatsApp.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Sticky top bar ───────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="https://coach-bluewave.com" aria-label="Retour au site principal" className="shrink-0">
            <Image src="/images/logo-bluewave.png" alt="Coach Bluewave" width={110} height={36} className="h-8 w-auto object-contain" />
          </a>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* WhatsApp — icône seule sur mobile, texte sur sm+ */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-600 hover:text-green-700 transition-colors font-semibold text-sm"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Divider */}
            <span className="hidden sm:block w-px h-5 bg-gray-200" />

            {/* CTA */}
            <a
              href="https://coach-bluewave.com"
              className="bg-brand-blue text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Voir le site complet
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col justify-between overflow-hidden"
        style={{ minHeight: '100dvh' }}
      >
        <Image
          src="/images/arnaud-pushup-pool.jpg"
          alt="Arnaud Chevallier coach sportif Valbonne"
          fill
          className="object-cover object-[center_40%]"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/80" />

        {/* ── Haut : titre ── */}
        <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto w-full pt-28 md:pt-32">
          <h1 className="font-heading text-[2.2rem] md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Transformez votre corps<br />en 10 séances
          </h1>
        </div>

        {/* ── Bas : prix + CTA ── */}
        <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto w-full pb-8">
          {/* Prix */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl md:text-5xl font-extrabold">499€</span>
            <div className="text-left border-l border-white/30 pl-3">
              <p className="text-green-300 font-bold text-sm leading-tight">→ 249,50€ net</p>
              <p className="text-white/55 text-xs">après crédit d&apos;impôt SAP</p>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto bg-brand-blue hover:bg-blue-700 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(37,99,235,0.4)] active:scale-95 mb-2"
          >
            Je veux mes 10 séances →
          </button>

          {/* WhatsApp discret */}
          <div className="flex items-center justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors py-1"
            >
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ou contacter par WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll indicator — desktop uniquement */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-white/60 text-xs animate-bounce z-10">
          <span className="tracking-widest uppercase text-[10px]">Découvrir</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Social proof bar ─────────────────────────────────────── */}
      <div className="bg-brand-blue text-white py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-medium text-center">
          <span>⭐ 5/5 sur Google</span>
          <span className="hidden sm:block opacity-40">|</span>
          <span>🏅 Diplômé d&apos;État BPJEPS AAN</span>
          <span className="hidden sm:block opacity-40">|</span>
          <span>📍 Valbonne · Sophia · Antibes · Mougins</span>
          <span className="hidden sm:block opacity-40">|</span>
          <span>💶 -50% crédit d&apos;impôt SAP</span>
        </div>
      </div>

      {/* ── Benefits ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-3">
            Pourquoi choisir ce pack ?
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">
            10 séances pour ancrer de vraies habitudes et voir de vrais résultats.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl shrink-0">{b.icon}</span>
                  <h3 className="font-bold text-gray-900 text-[1rem] leading-snug">{b.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed pl-9">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coach section ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="shrink-0">
            <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/arnaud-stretch.jpg"
                alt="Arnaud Chevallier — Coach sportif Valbonne"
                fill
                className="object-cover object-top"
                sizes="224px"
              />
            </div>
          </div>
          <div>
            <p className="text-brand-blue font-semibold text-sm uppercase tracking-widest mb-2">Votre coach</p>
            <h2 className="font-heading text-3xl font-extrabold text-gray-900 mb-4">Arnaud Chevallier</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Maître-nageur et éducateur sportif diplômé d&apos;État, je suis passionné par le sport et la transmission.
              Basé à Valbonne, j&apos;interviens sur toute la Côte d&apos;Azur — au bord d&apos;un bassin, en plein air ou à domicile.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Mon approche : bienveillance, progressivité et résultats concrets. Pas de méthode générique — 
              chaque programme est construit autour de <strong>vous</strong>, vos contraintes et vos objectifs.
            </p>
            <div className="flex flex-wrap gap-2">
              {['BPJEPS AAN', 'Carte Pro N°07520ED0375', 'PSE2', 'Pilates Mat', 'SAP Agréé'].map((c) => (
                <span key={c} className="bg-blue-50 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-100">
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Ils ont transformé leur corps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Stars count={t.stars} />
                <p className="text-gray-600 leading-relaxed mt-3 mb-4 text-sm italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-extrabold text-gray-900 text-center mb-10">
            Questions fréquentes
          </h2>
          <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl px-6">
            {FAQ.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────── */}
      <section id="contact-form" ref={formRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-3">
            Réserver mon pack 10 séances
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Je vous réponds sous 24h pour organiser votre bilan initial gratuit.
          </p>

          {/* Toast */}
          {toast && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {toast.message}
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot */}
              <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} aria-hidden="true" />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom et prénom *</label>
                <input
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="Marie Dupont"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="marie@exemple.fr"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Téléphone</label>
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="06 xx xx xx xx"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Votre objectif (optionnel)</label>
                <textarea
                  value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Perte de poids, remise en forme, apprendre à nager..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors resize-none"
                />
              </div>

              <button
                type="submit" disabled={submitting}
                className="w-full bg-brand-blue text-white font-extrabold text-lg py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer ma demande →'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-3">Ou contactez-moi directement sur WhatsApp</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                07 49 48 62 03
              </a>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-4">
            🔒 Vos données sont confidentielles et ne seront jamais partagées.
          </p>
        </div>
      </section>

      {/* ── Footer minimal ────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-white py-8 px-6 text-center text-sm">
        <Image src="/images/logo-bluewave-white.png" alt="Coach Bluewave" width={100} height={32} className="h-7 w-auto object-contain mx-auto mb-4 opacity-80" />
        <p className="text-gray-400 mb-2">© {new Date().getFullYear()} Coach-Bluewave — Arnaud Chevallier, Éducateur Sportif & Maître-Nageur</p>
        <p className="text-gray-500 text-xs">
          <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
          {' · '}
          <a href="/politique-de-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</a>
          {' · '}
          <a href="/cgv" className="hover:text-white transition-colors">CGV</a>
        </p>
      </footer>

    </div>
  );
}
