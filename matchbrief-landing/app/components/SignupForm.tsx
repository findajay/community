"use client";

import { useState } from "react";

export default function SignupForm() {
  const [status, setStatus] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("busy");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("ok");
      setMessage(
        "Almost there — check your inbox and click the confirmation link to secure your spot."
      );
      form.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h3>Join the waitlist</h3>
      <p className="hint">
        Free to join. Founding-member pricing is offered to the waitlist first.
      </p>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="field">
        <label htmlFor="clubs">Which clubs do you follow? (optional)</label>
        <input
          id="clubs"
          name="clubs"
          type="text"
          placeholder="e.g. Union Berlin, Arsenal, SV Babelsberg 03"
          maxLength={300}
        />
      </div>

      <div className="field">
        <label>If MatchBrief existed today, you would…</label>
        <div className="intent">
          <label>
            <input type="radio" name="priceIntent" value="founding_30_year" />
            <span>
              Grab the founding deal — €30/year
              <small>Everything, locked in forever</small>
            </span>
          </label>
          <label>
            <input type="radio" name="priceIntent" value="monthly_5" />
            <span>
              Subscribe monthly — €5/month
              <small>Everything, cancel anytime</small>
            </span>
          </label>
          <label>
            <input type="radio" name="priceIntent" value="free_only" />
            <span>
              Use the free tier only
              <small>One club, monthly brief</small>
            </span>
          </label>
        </div>
      </div>

      {/* honeypot — bots fill this, humans never see it */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          I'd like to receive the launch updates by email. Consent is confirmed
          via a confirmation email (double opt-in) and can be withdrawn anytime.
          See the <a href="/datenschutz">privacy notice</a>.
        </span>
      </label>

      <button className="btn" type="submit" disabled={status === "busy"}>
        {status === "busy" ? "Joining…" : "Join the waitlist →"}
      </button>

      {message && (
        <p className={`form-msg ${status === "ok" ? "ok" : "err"}`}>{message}</p>
      )}
    </form>
  );
}
