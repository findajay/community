"use client";

import Link from "next/link";
import type { Scenario } from "@/content/schema";
import { ScenarioChat } from "./ScenarioChat";

export function ScenarioPractice({ scenario }: { scenario: Scenario }) {
  return (
    <div>
      <Link href="/" className="text-sm text-ink/50 hover:text-ink">
        ← Back to Today
      </Link>
      <h1 className="mb-1 mt-1 text-2xl font-bold">{scenario.title}</h1>
      <p className="mb-4 text-sm text-ink/50">
        <span className="chip mr-2 bg-brand-soft text-ink">
          {scenario.level} · {scenario.track}
        </span>
        Free conversation practice — no script to follow, just respond.
      </p>
      <ScenarioChat scenario={scenario} />
    </div>
  );
}
