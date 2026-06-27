"use client";

import { useEffect, useState } from "react";
import {
  allLessons,
  canDo,
  totalVocabCount,
  units,
} from "@/content";
import type { Track } from "@/content/schema";
import {
  getCards,
  getCompletedLessons,
  getUnlockedCanDo,
} from "@/lib/progress";

const TRACK_LABEL: Record<Track, string> = {
  personal: "Personal",
  professional: "Professional",
  official: "Official",
};

export default function ProgressPage() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [vocabLearned, setVocabLearned] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [cd, comp, cards] = await Promise.all([
        getUnlockedCanDo(),
        getCompletedLessons(),
        getCards(),
      ]);
      setUnlocked(new Set(cd));
      setCompleted(new Set(comp));
      setVocabLearned(cards.length);
      setLoading(false);
    })();
  }, []);

  const lessonsDone = allLessons.filter((l) => completed.has(l.id)).length;

  // Group can-do statements by track.
  const byTrack = canDo.reduce<Record<Track, typeof canDo>>(
    (acc, c) => {
      (acc[c.track] ??= []).push(c);
      return acc;
    },
    { personal: [], professional: [], official: [] },
  );

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Your progress</h1>
      <p className="mb-6 text-ink/60">
        What you can actually <em>do</em> in German — not just a percentage.
      </p>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <Stat label="Lessons" value={`${lessonsDone}/${allLessons.length}`} />
        <Stat
          label="Words learned"
          value={loading ? "…" : `${vocabLearned}/${totalVocabCount}`}
        />
        <Stat
          label="Can-do unlocked"
          value={loading ? "…" : `${unlocked.size}/${canDo.length}`}
        />
      </div>

      <h2 className="mb-3 text-lg font-bold">Can-do statements</h2>
      <div className="space-y-5">
        {(Object.keys(byTrack) as Track[]).map((track) =>
          byTrack[track].length === 0 ? null : (
            <div key={track}>
              <p className="mb-2 text-sm font-semibold text-ink/60">
                {TRACK_LABEL[track]}
              </p>
              <ul className="space-y-2">
                {byTrack[track].map((c) => {
                  const got = unlocked.has(c.id);
                  return (
                    <li
                      key={c.id}
                      className={`flex items-start gap-3 rounded-lg border p-3 ${
                        got
                          ? "border-success/30 bg-success/5"
                          : "border-ink/10 bg-white"
                      }`}
                    >
                      <span className="mt-0.5">{got ? "✅" : "⬜️"}</span>
                      <span>
                        <span className="chip mr-2 bg-brand-soft text-ink">
                          {c.level}
                        </span>
                        <span className={got ? "" : "text-ink/60"}>
                          {c.text}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ),
        )}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-bold">The road to C1</h2>
      <div className="space-y-2">
        {[1, 2, 3].map((phase) => {
          const phaseUnits = units.filter((u) => u.phase === phase);
          const labels = ["A2 → B1", "B1 → B2", "B2 → C1"];
          return (
            <div
              key={phase}
              className="flex items-center justify-between rounded-lg border border-ink/10 bg-white p-3"
            >
              <span>
                <span className="font-semibold">Phase {phase}</span>{" "}
                <span className="text-ink/50">({labels[phase - 1]})</span>
              </span>
              <span className="text-sm text-ink/50">
                {phaseUnits.length} unit{phaseUnits.length === 1 ? "" : "s"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-ink/50">{label}</p>
    </div>
  );
}
