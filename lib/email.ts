import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY environment variable");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const COACH_EMAIL = "chevallier.a06@gmail.com";

// Use verified domain in production — set RESEND_FROM_EMAIL in your env vars.
// Example: "Coach Bluewave <contact@coachbluewave.com>"
// Until your domain is verified on Resend, keep using onboarding@resend.dev
// (emails can only be sent to your own address in that case).
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Coach Bluewave <onboarding@resend.dev>";

interface PaymentEmailParams {
  customerEmail: string;
  amount: number; // in cents
  productTitle: string;
}

export async function sendPaymentConfirmation({
  customerEmail,
  amount,
  productTitle,
}: PaymentEmailParams) {
  const amountFormatted = (amount / 100).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Email to customer
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #1e40af; font-size: 24px; margin: 0;">Coach-Bluewave</h1>
      </div>
      <div style="background: #f8fafc; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0;">
        <h2 style="color: #1e293b; font-size: 20px; margin: 0 0 16px;">Merci pour votre achat !</h2>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 24px;">
          Votre paiement a bien été reçu. Voici le récapitulatif :
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Prestation</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right;">${productTitle}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #64748b;">Montant</td>
            <td style="padding: 12px 0; color: #1e293b; font-weight: 600; text-align: right;">${amountFormatted} €</td>
          </tr>
        </table>
        <p style="color: #475569; line-height: 1.6; margin: 24px 0 0;">
          Je vous contacterai très prochainement pour organiser la suite. N'hésitez pas à me contacter si vous avez des questions.
        </p>
      </div>
      <div style="text-align: center; margin-top: 32px; color: #94a3b8; font-size: 13px;">
        <p>Arnaud Chevallier — Coach Sportif & Maître-Nageur</p>
        <p>chevallier.a06@gmail.com</p>
      </div>
    </div>
  `;

  // Email to coach
  const coachHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <div style="background: #ecfdf5; border-radius: 12px; padding: 32px; border: 1px solid #a7f3d0;">
        <h2 style="color: #065f46; font-size: 20px; margin: 0 0 16px;">Nouveau paiement reçu !</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #047857;">Client</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #1e293b; font-weight: 600; text-align: right;">${customerEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #047857;">Prestation</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #d1fae5; color: #1e293b; font-weight: 600; text-align: right;">${productTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #047857;">Montant</td>
            <td style="padding: 10px 0; color: #1e293b; font-weight: 600; text-align: right;">${amountFormatted} €</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  const results = await Promise.allSettled([
    getResend().emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Confirmation de paiement — ${productTitle}`,
      html: customerHtml,
    }),
    getResend().emails.send({
      from: FROM_EMAIL,
      to: COACH_EMAIL,
      subject: `Nouveau paiement : ${productTitle} (${amountFormatted} €)`,
      html: coachHtml,
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Email send error:", result.reason);
    }
  }

  return results;
}
