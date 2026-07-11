import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendConfirmEmail } from "@/lib/email";

const PRICE_INTENTS = new Set(["founding_30_year", "monthly_5", "free_only"]);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without storing anything.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }

  const clubs =
    typeof body.clubs === "string" ? body.clubs.trim().slice(0, 300) || null : null;
  const priceIntent =
    typeof body.priceIntent === "string" && PRICE_INTENTS.has(body.priceIntent)
      ? body.priceIntent
      : null;

  try {
    const sql = db();
    const rows = await sql`
      insert into waitlist_signups (email, clubs, price_intent)
      values (${email}, ${clubs}, ${priceIntent})
      on conflict (email) do update
        set clubs = coalesce(excluded.clubs, waitlist_signups.clubs),
            price_intent = coalesce(excluded.price_intent, waitlist_signups.price_intent)
      returning confirm_token, confirmed_at
    `;
    const { confirm_token, confirmed_at } = rows[0];
    if (!confirmed_at) {
      await sendConfirmEmail(email, confirm_token as string);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist signup failed:", err);
    return NextResponse.json(
      { error: "Could not save your signup. Please try again in a minute." },
      { status: 500 }
    );
  }
}
