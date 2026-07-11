export default function Datenschutz() {
  return (
    <main className="wrap legal">
      <h1>Datenschutzerklärung / Privacy Notice</h1>
      <p>
        This page summarises how the FanPost waitlist handles personal data.
        Deutsche Fassung auf Anfrage; verantwortlich im Sinne der DSGVO ist die
        a2welt UG (haftungsbeschränkt) — siehe <a href="impressum">Impressum</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Your email address (required)</li>
        <li>The clubs you follow and your pricing preference (optional)</li>
        <li>Timestamps of signup and confirmation</li>
      </ul>

      <h2>Why and on what legal basis</h2>
      <p>
        We use your email exclusively to send you updates about the FanPost
        launch. Legal basis is your consent (Art. 6 (1)(a) GDPR), which you give
        at signup and confirm via a confirmation email (double opt-in).
      </p>

      <h2>Where it's stored</h2>
      <p>
        Signups are stored in a managed PostgreSQL database and confirmation
        emails are sent through a transactional email provider. Both are bound
        by data-processing agreements (Art. 28 GDPR).
        {/* TODO: name the actual providers and hosting regions once chosen, e.g. Neon (EU region) and Resend. */}
      </p>

      <h2>How long we keep it</h2>
      <p>
        Until you unsubscribe or ask us to delete it. Unconfirmed signups are
        deleted after 30 days.
      </p>

      <h2>Your rights</h2>
      <p>
        You can withdraw consent, and request access, correction or deletion at
        any time — every email contains an unsubscribe link, or write to the
        address in the <a href="impressum">Impressum</a>. You also have the
        right to lodge a complaint with a supervisory authority.
      </p>
    </main>
  );
}
