import postgres from "postgres";

// Neon/Supabase/Vercel Postgres all hand out a standard connection string.
// A single lazy client is enough at waitlist scale.
let client: ReturnType<typeof postgres> | null = null;

export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  if (!client) {
    client = postgres(url, { ssl: "require", max: 1 });
  }
  return client;
}
