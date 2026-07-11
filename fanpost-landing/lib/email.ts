import type { Locale } from "@/lib/i18n";

// Sends the double opt-in confirmation email via Resend's REST API, in the
// language the visitor signed up in. Without RESEND_API_KEY (local dev), the
// confirm link is logged instead so the flow stays testable end-to-end.

const MAILS: Record<Locale, { subject: string; body: (url: string) => string }> = {
  de: {
    subject: "Bestätige deinen Platz auf der FanPost-Warteliste",
    body: (url) =>
      [
        "Hallo,",
        "",
        "bitte bestätige, dass du auf die FanPost-Warteliste möchtest:",
        "",
        url,
        "",
        "Wenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach, es wird nichts gespeichert.",
      ].join("\n"),
  },
  en: {
    subject: "Confirm your FanPost waitlist spot",
    body: (url) =>
      [
        "Hi,",
        "",
        "please confirm you want to join the FanPost waitlist:",
        "",
        url,
        "",
        "If you didn't sign up, just ignore this email, nothing will be stored.",
      ].join("\n"),
  },
  fr: {
    subject: "Confirme ta place sur la liste d'attente FanPost",
    body: (url) =>
      [
        "Bonjour,",
        "",
        "merci de confirmer ton inscription à la liste d'attente FanPost :",
        "",
        url,
        "",
        "Si tu ne t'es pas inscrit(e), ignore simplement cet e-mail, rien ne sera conservé.",
      ].join("\n"),
  },
  es: {
    subject: "Confirma tu plaza en la lista de espera de FanPost",
    body: (url) =>
      [
        "Hola:",
        "",
        "confirma que quieres unirte a la lista de espera de FanPost:",
        "",
        url,
        "",
        "Si no te has registrado, ignora este correo: no se guardará nada.",
      ].join("\n"),
  },
  it: {
    subject: "Conferma il tuo posto nella lista d'attesa di FanPost",
    body: (url) =>
      [
        "Ciao,",
        "",
        "conferma di volerti iscrivere alla lista d'attesa di FanPost:",
        "",
        url,
        "",
        "Se non ti sei iscritto/a, ignora questa email: non verrà salvato nulla.",
      ].join("\n"),
  },
};

const SIGNATURE = "\n\nFanPost · a2welt UG (haftungsbeschränkt)";

export async function sendConfirmEmail(to: string, token: string, locale: Locale) {
  const baseUrl = process.env.PUBLIC_BASE_URL ?? "http://localhost:3000";
  const confirmUrl = `${baseUrl}/api/confirm?token=${token}`;
  const mail = MAILS[locale];

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[dev] confirm link for ${to} (${locale}): ${confirmUrl}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "FanPost <hello@example.com>",
      to: [to],
      subject: mail.subject,
      text: mail.body(confirmUrl) + SIGNATURE,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
}
