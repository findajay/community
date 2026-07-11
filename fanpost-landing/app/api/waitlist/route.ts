import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendConfirmEmail } from "@/lib/email";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const PRICE_INTENTS = new Set(["founding_30_year", "monthly_5", "free_only"]);

// Errors are returned as codes; the client renders them in the visitor's language.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without storing anything.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }

  const locale: Locale =
    typeof body.locale === "string" && isLocale(body.locale)
      ? body.locale
      : DEFAULT_LOCALE;
  const clubs =
    typeof body.clubs === "string" ? body.clubs.trim().slice(0, 300) || null : null;
  const priceIntent =
    typeof body.priceIntent === "string" && PRICE_INTENTS.has(body.priceIntent)
      ? body.priceIntent
      : null;

  try {
    const sql = db();
    const rows = await sql`
      insert into waitlist_signups (email, clubs, price_intent, locale)
      values (${email}, ${clubs}, ${priceIntent}, ${locale})
      on conflict (email) do update
        set clubs = coalesce(excluded.clubs, waitlist_signups.clubs),
            price_intent = coalesce(excluded.price_intent, waitlist_signups.price_intent),
            locale = excluded.locale
      returning confirm_token, confirmed_at
    `;
    const { confirm_token, confirmed_at } = rows[0];
    if (!confirmed_at) {
      await sendConfirmEmail(email, confirm_token as string, locale);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist signup failed:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
