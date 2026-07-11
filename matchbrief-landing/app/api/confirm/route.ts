import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  if (!UUID_RE.test(token)) {
    return NextResponse.redirect(new URL("/?confirm=invalid", url.origin));
  }

  try {
    const sql = db();
    const rows = await sql`
      update waitlist_signups
      set confirmed_at = coalesce(confirmed_at, now())
      where confirm_token = ${token}
      returning id
    `;
    if (rows.length === 0) {
      return NextResponse.redirect(new URL("/?confirm=invalid", url.origin));
    }
    return NextResponse.redirect(new URL("/confirmed", url.origin));
  } catch (err) {
    console.error("confirm failed:", err);
    return NextResponse.redirect(new URL("/?confirm=error", url.origin));
  }
}
