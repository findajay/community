"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const sections: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Learn",
    items: [
      { href: "/", label: "Today", icon: <HomeIcon /> },
      { href: "/review", label: "Review", icon: <ReviewIcon /> },
      { href: "/progress", label: "Progress", icon: <ProgressIcon /> },
    ],
  },
  {
    heading: "More",
    items: [
      { href: "/settings", label: "Settings", icon: <GearIcon /> },
      { href: "/voice-test", label: "Voice check", icon: <MicIcon /> },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen">
      {/* Top app bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 shadow-bar">
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full p-2 text-muted hover:bg-surface md:hidden"
        >
          <MenuIcon />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-semibold italic text-white">
            F
          </span>
          <span className="text-lg font-medium tracking-tight">Fließend</span>
        </Link>
        <span className="ml-auto hidden text-sm text-muted sm:block">
          German · A2 → C1
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-6xl">
        {/* Left navigation rail */}
        <aside
          className={`fixed inset-y-0 left-0 top-16 z-40 w-64 shrink-0 overflow-y-auto border-r border-line bg-white p-3 transition-transform md:static md:top-0 md:z-0 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.heading}>
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  {section.heading}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`nav-item ${
                          isActive(item.href) ? "nav-item-active" : ""
                        }`}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile backdrop */}
        {open && (
          <div
            className="fixed inset-0 top-16 z-30 bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">
          <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-10">
            {children}
          </main>
          <footer className="px-4 py-8 text-center text-xs text-muted md:px-10">
            Fließend · the Immersion Spiral method · works offline
          </footer>
        </div>
      </div>
    </div>
  );
}

// --- Minimal Material-style line icons (20px, currentColor) --------------

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-7 8 7M6 10v9a1 1 0 001 1h3v-6h4v6h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ReviewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M20 12a8 8 0 10-2.3 5.6M20 7v5h-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ProgressIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
