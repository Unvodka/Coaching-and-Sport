'use client';

/**
 * Analytics.tsx
 * Centralise GA4, Google Ads et Meta Pixel.
 *
 * Variables d'environnement requises dans Vercel :
 *   NEXT_PUBLIC_GA_ID          → G-GEJXN9BH9R  (déjà configuré)
 *   NEXT_PUBLIC_GADS_ID        → AW-XXXXXXXXXX  (à ajouter quand tu crées ton compte Google Ads)
 *   NEXT_PUBLIC_META_PIXEL_ID  → XXXXXXXXXXXXXXX (à ajouter quand tu crées ton Meta Business)
 */

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-GEJXN9BH9R';
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || '';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

export default function Analytics() {
  return (
    <>
      {/* ── Consent Mode v2 default (denied until user accepts) ────────── */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage:    'denied',
            ad_storage:           'denied',
            ad_user_data:         'denied',
            ad_personalization:   'denied',
            wait_for_update:      500,
          });
          window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        `}
      </Script>

      {/* ── Google Analytics 4 ──────────────────────────────────────────── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: true,
          });
          ${GADS_ID ? `gtag('config', '${GADS_ID}');` : '// Google Ads ID not set yet'}
        `}
      </Script>

      {/* ── Meta Pixel ─────────────────────────────────────────────────── */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}

// ── Helpers exportés pour tracker les conversions depuis n'importe quel composant ──

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Appeler quand le formulaire de contact est soumis avec succès.
 * Utilisé dans ContactSection.tsx
 */
export function trackContactFormSubmit(formule?: string) {
  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'contact',
      event_label: formule || 'contact_form',
      value: 1,
    });
    // Google Ads conversion (si configuré)
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    const gadsConversionId = process.env.NEXT_PUBLIC_GADS_CONTACT_CONVERSION;
    if (gadsId && gadsConversionId) {
      window.gtag('event', 'conversion', {
        send_to: `${gadsId}/${gadsConversionId}`,
      });
    }
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: formule || 'contact_form' });
  }
}

/**
 * Appeler sur la page /checkout/success après un paiement Stripe.
 * Utilisé dans CheckoutSuccess.tsx
 */
export function trackPurchase(value: number, currency = 'EUR', transactionId?: string) {
  // GA4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId || `stripe_${Date.now()}`,
      value,
      currency,
      items: [{ item_name: 'Coaching Pack', quantity: 1, price: value }],
    });
    // Google Ads conversion achat (si configuré)
    const gadsId = process.env.NEXT_PUBLIC_GADS_ID;
    const gadsPurchaseId = process.env.NEXT_PUBLIC_GADS_PURCHASE_CONVERSION;
    if (gadsId && gadsPurchaseId) {
      window.gtag('event', 'conversion', {
        send_to: `${gadsId}/${gadsPurchaseId}`,
        value,
        currency,
        transaction_id: transactionId,
      });
    }
  }
  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', { value, currency });
  }
}

/**
 * Appeler quand le consentement est accepté (CookieConsent.tsx).
 * Active ad_storage pour Google Ads et Meta.
 */
export function grantFullConsent() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage:  'granted',
      ad_storage:         'granted',
      ad_user_data:       'granted',
      ad_personalization: 'granted',
    });
  }
}

/**
 * Consentement partiel (analytics seulement, pas ads).
 */
export function grantAnalyticsConsent() {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage:        'denied',
      ad_user_data:      'denied',
      ad_personalization:'denied',
    });
  }
}
