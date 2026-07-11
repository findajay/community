"use client";

import { useState } from "react";
import type { FormDict, Locale } from "@/lib/i18n";

export default function SignupForm({
  locale,
  f,
}: {
  locale: Locale;
  f: FormDict;
}) {
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
        body: JSON.stringify({ ...data, locale }),
      });
      const body = await res.json();
      if (!res.ok) {
        const code = body.error as keyof FormDict["errors"];
        throw new Error(f.errors[code] ?? f.errors.server_error);
      }
      setStatus("ok");
      setMessage(f.success);
      form.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : f.errors.server_error);
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h3>{f.title}</h3>
      <p className="hint">{f.hint}</p>

      <div className="field">
        <label htmlFor="email">{f.emailLabel}</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={f.emailPlaceholder}
          autoComplete="email"
        />
      </div>

      <div className="field">
        <label htmlFor="clubs">{f.clubsLabel}</label>
        <input
          id="clubs"
          name="clubs"
          type="text"
          placeholder={f.clubsPlaceholder}
          maxLength={300}
        />
      </div>

      <div className="field">
        <label>{f.intentLabel}</label>
        <div className="intent">
          <label>
            <input type="radio" name="priceIntent" value="founding_30_year" />
            <span>
              {f.intentFounding}
              <small>{f.intentFoundingSub}</small>
            </span>
          </label>
          <label>
            <input type="radio" name="priceIntent" value="monthly_5" />
            <span>
              {f.intentMonthly}
              <small>{f.intentMonthlySub}</small>
            </span>
          </label>
          <label>
            <input type="radio" name="priceIntent" value="free_only" />
            <span>
              {f.intentFree}
              <small>{f.intentFreeSub}</small>
            </span>
          </label>
        </div>
      </div>

      {/* honeypot: bots fill this, humans never see it */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          {f.consent1}
          <a href={`/${locale}/datenschutz`}>{f.consentLink}</a>
          {f.consent2}
        </span>
      </label>

      <button className="btn" type="submit" disabled={status === "busy"}>
        {status === "busy" ? f.submitting : f.submit}
      </button>

      {message && (
        <p className={`form-msg ${status === "ok" ? "ok" : "err"}`}>{message}</p>
      )}
    </form>
  );
}
