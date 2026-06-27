"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  allLessons,
  isUnitUnlocked,
  totalVocabCount,
  units,
} from "@/content";
import {
  countDue,
  getCompletedLessons,
  getStreak,
  type Streak,
} from "@/lib/progress";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [due, setDue] = useState(0);
  const [streak, setStreak] = useState<Streak>({ count: 0, lastDay: null });

  useEffect(() => {
    (async () => {
      const [comp, dueCount, s] = await Promise.all([
        getCompletedLessons(),
        countDue(),
        getStreak(),
      ]);
      setCompleted(new Set(comp));
      setDue(dueCount);
      setStreak(s);
      setLoading(false);
    })();
  }, []);

  const nextLesson = allLessons.find((l) => !completed.has(l.id));
  const doneCount = allLessons.filter((l) => completed.has(l.id)).length;

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Today</h1>
      <p className="mb-6 text-ink/60">
        Guten Tag! Ready for a session? Do a little, daily — that&apos;s how
        German sticks.
      </p>

      {/* Stat row */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat label="Streak" value={`${streak.count}🔥`} />
        <Stat label="Reviews due" value={loading ? "…" : String(due)} />
        <Stat label="Lessons done" value={`${doneCount}/${allLessons.length}`} />
      </div>

      {/* Primary actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        {nextLesson ? (
          <Link href={`/lesson/${nextLesson.id}`} className="card block hover:border-brand">
            <p className="text-sm text-ink/50">Continue learning</p>
            <p className="mt-1 text-lg font-semibold">{nextLesson.title}</p>
            <span className="mt-2 inline-block text-brand">Start the loop →</span>
          </Link>
        ) : (
          <div className="card">
            <p className="text-lg font-semibold">All lessons complete 🎓</p>
            <p className="text-sm text-ink/50">
              More units are on the way. Keep your reviews sharp!
            </p>
          </div>
        )}

        <Link
          href="/review"
          className={`card block ${due > 0 ? "border-brand hover:bg-brand-soft/30" : ""}`}
        >
          <p className="text-sm text-ink/50">Spaced repetition</p>
          <p className="mt-1 text-lg font-semibold">
            {due > 0 ? `${due} words to review` : "No reviews due"}
          </p>
          <span className="mt-2 inline-block text-brand">
            {due > 0 ? "Review now →" : "You're caught up ✓"}
          </span>
        </Link>
      </div>

      {/* Curriculum */}
      <h2 className="mb-3 text-lg font-bold">Curriculum</h2>
      <div className="space-y-4">
        {units.map((unit) => {
          const unlocked = isUnitUnlocked(unit, completed);
          return (
            <div key={unit.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <span className="chip bg-brand-soft text-ink">
                    Phase {unit.phase} · {unit.level}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold">{unit.title}</h3>
                  <p className="text-sm text-ink/50">{unit.summary}</p>
                </div>
                {!unlocked && <span className="text-ink/30">🔒</span>}
              </div>
              <ul className="mt-3 divide-y divide-ink/5">
                {unit.lessons.map((lesson) => {
                  const isDone = completed.has(lesson.id);
                  return (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="flex items-center gap-2">
                        <span>{isDone ? "✅" : "•"}</span>
                        <span className={isDone ? "text-ink/50" : ""}>
                          {lesson.title}
                        </span>
                      </span>
                      {unlocked && (
                        <Link
                          href={`/lesson/${lesson.id}`}
                          className="text-sm text-brand hover:underline"
                        >
                          {isDone ? "Repeat" : "Start"}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-ink/40">
        Curriculum vocabulary target: {totalVocabCount} words and growing.
      </p>
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
