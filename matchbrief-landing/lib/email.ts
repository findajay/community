// Sends the double opt-in confirmation email via Resend's REST API.
// Without RESEND_API_KEY (local dev), the confirm link is logged instead
// so the flow stays testable end-to-end.

export async function sendConfirmEmail(to: string, token: string) {
  const baseUrl = process.env.PUBLIC_BASE_URL ?? "http://localhost:3000";
  const confirmUrl = `${baseUrl}/api/confirm?token=${token}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[dev] confirm link for ${to}: ${confirmUrl}`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "MatchBrief <hello@example.com>",
      to: [to],
      subject: "Confirm your MatchBrief waitlist spot",
      text: [
        "Hi,",
        "",
        "please confirm you want to join the MatchBrief waitlist:",
        "",
        confirmUrl,
        "",
        "If you didn't sign up, just ignore this email — nothing will be stored.",
        "",
        "MatchBrief · a2welt UG (haftungsbeschränkt)",
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body}`);
  }
}
