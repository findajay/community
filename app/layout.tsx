import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fließend — German A2 → C1",
  description:
    "Learn German from hesitant A2 to confident C1 with the Immersion Spiral method: input, drills, real speaking practice, spaced repetition, and simulated conversations.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#b5451f",
  width: "device-width",
  initialScale: 1,
};

const nav = [
  { href: "/", label: "Today" },
  { href: "/review", label: "Review" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-4">
          <header className="flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Fließend<span className="text-brand">.</span>
            </Link>
            <nav className="flex gap-1 text-sm">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-1.5 text-ink/70 hover:bg-brand-soft/50 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main className="flex-1 pb-16">{children}</main>
          <footer className="py-6 text-center text-xs text-ink/40">
            Fließend · the Immersion Spiral method · works offline
          </footer>
        </div>
      </body>
    </html>
  );
}
