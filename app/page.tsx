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
      <h1 className="text-[28px] font-normal leading-tight">Today</h1>
      <p className="mb-8 mt-1 text-muted">
        Guten Tag! A little daily practice is how German sticks.
      </p>

      {/* Stat row */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <Stat label="Day streak" value={`${streak.count}`} suffix="🔥" />
        <Stat label="Reviews due" value={loading ? "—" : String(due)} />
        <Stat
          label="Lessons done"
          value={`${doneCount}`}
          suffix={`/ ${allLessons.length}`}
        />
      </div>

      {/* Primary actions */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {nextLesson ? (
          <ActionTile
            href={`/lesson/${nextLesson.id}`}
            eyebrow="Continue learning"
            title={nextLesson.title}
            cta="Start the loop"
            accent
            icon={<BookIcon />}
          />
        ) : (
          <div className="card">
            <p className="text-lg font-medium">All lessons complete 🎓</p>
            <p className="mt-1 text-sm text-muted">
              More units are on the way. Keep your reviews sharp!
            </p>
          </div>
        )}

        <ActionTile
          href="/review"
          eyebrow="Spaced repetition"
          title={due > 0 ? `${due} words to review` : "No reviews due"}
          cta={due > 0 ? "Review now" : "You're caught up"}
          accent={due > 0}
          icon={<CardsIcon />}
        />
      </div>

      {/* Curriculum */}
      <h2 className="mb-1 text-lg font-medium">Curriculum</h2>
      <p className="mb-4 text-sm text-muted">
        A2 → C1 across three mastery-gated phases.
      </p>
      <div className="space-y-4">
        {units.map((unit) => {
          const unlocked = isUnitUnlocked(unit, completed);
          return (
            <div key={unit.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="chip bg-brand-soft text-brand">
                    Phase {unit.phase} · {unit.level}
                  </span>
                  <h3 className="mt-2 text-base font-medium">{unit.title}</h3>
                  <p className="text-sm text-muted">{unit.summary}</p>
                </div>
                {!unlocked && <LockIcon />}
              </div>
              <ul className="mt-3 divide-y divide-line">
                {unit.lessons.map((lesson) => {
                  const isDone = completed.has(lesson.id);
                  return (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between py-2.5"
                    >
                      <span className="flex items-center gap-2.5">
                        <CheckDot done={isDone} />
                        <span className={isDone ? "text-muted" : ""}>
                          {lesson.title}
                        </span>
                      </span>
                      {unlocked && (
                        <Link
                          href={`/lesson/${lesson.id}`}
                          className="text-sm font-medium text-brand hover:underline"
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

      <p className="mt-8 text-center text-xs text-muted">
        Curriculum vocabulary target: {totalVocabCount} words and growing.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <div className="card py-4">
      <p className="text-[26px] font-normal leading-none">
        {value}
        {suffix && <span className="ml-1 text-base text-muted">{suffix}</span>}
      </p>
      <p className="mt-2 text-xs text-muted">{label}</p>
    </div>
  );
}

function ActionTile({
  href,
  eyebrow,
  title,
  cta,
  icon,
  accent,
}: {
  href: string;
  eyebrow: string;
  title: string;
  cta: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className="card group flex flex-col transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
            accent ? "bg-brand-soft text-brand" : "bg-surface text-muted"
          }`}
        >
          {icon}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            {eyebrow}
          </p>
          <p className="mt-0.5 text-lg font-medium">{title}</p>
        </div>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
        {cta}
        <ArrowIcon />
      </span>
    </Link>
  );
}

function CheckDot({ done }: { done: boolean }) {
  return done ? (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-success text-[11px] text-white">
      ✓
    </span>
  ) : (
    <span className="h-5 w-5 rounded-full border border-line" />
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 5a2 2 0 012-2h6v16H6a2 2 0 00-2 2zM20 5a2 2 0 00-2-2h-6v16h6a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function CardsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 4h12a2 2 0 012 2v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-muted">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
