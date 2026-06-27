"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/content/schema";
import { getGrammar, getScenario } from "@/content";
import {
  addCard,
  bumpStreak,
  markLessonComplete,
  unlockCanDo,
} from "@/lib/progress";
import { SpeakButton } from "./SpeakButton";
import { DrillCard } from "./DrillCard";
import { ShadowStep } from "./ShadowStep";
import { ScenarioChat } from "./ScenarioChat";

type Step = "input" | "decode" | "drill" | "speak" | "converse" | "done";

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const scenario = lesson.scenario ? getScenario(lesson.scenario) : undefined;
  const steps: Step[] = [
    "input",
    "decode",
    "drill",
    "speak",
    ...(scenario ? (["converse"] as Step[]) : []),
    "done",
  ];
  const [stepIdx, setStepIdx] = useState(0);
  const step = steps[stepIdx];
  const next = () => setStepIdx((i) => Math.min(i + 1, steps.length - 1));

  const progressPct = Math.round((stepIdx / (steps.length - 1)) * 100);

  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="text-sm text-ink/50 hover:text-ink">
          ← Exit lesson
        </Link>
        <h1 className="mt-1 text-2xl font-medium">{lesson.title}</h1>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {step === "input" && <InputStep lesson={lesson} onNext={next} />}
      {step === "decode" && <DecodeStep lesson={lesson} onNext={next} />}
      {step === "drill" && <DrillStep lesson={lesson} onNext={next} />}
      {step === "speak" && (
        <ShadowStep
          lines={lesson.shadow ?? lesson.dialogue.map((d) => d.de)}
          onComplete={next}
        />
      )}
      {step === "converse" && scenario && (
        <div>
          <ScenarioChat scenario={scenario} onDone={() => undefined} />
          <button onClick={next} className="btn-primary mt-4">
            Continue →
          </button>
        </div>
      )}
      {step === "done" && <DoneStep lesson={lesson} />}
    </div>
  );
}

// --- Step 1: Input -------------------------------------------------------

function InputStep({ lesson, onNext }: { lesson: Lesson; onNext: () => void }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <section>
      <StepHeading
        n={1}
        title="Listen & read"
        blurb="Hear the conversation first. Tap a line to reveal the English."
      />
      <div className="space-y-3">
        {lesson.dialogue.map((line, i) => (
          <div key={i} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="chip mb-1 bg-brand-soft text-ink">
                  {line.speaker}
                </span>
                <p className="text-lg">{line.de}</p>
                {revealed.has(i) && (
                  <p className="mt-1 text-sm text-ink/50">{line.en}</p>
                )}
              </div>
              <SpeakButton text={line.de} label="" />
            </div>
            {!revealed.has(i) && (
              <button
                onClick={() =>
                  setRevealed((r) => new Set(r).add(i))
                }
                className="mt-2 text-xs text-brand hover:underline"
              >
                Show English
              </button>
            )}
          </div>
        ))}
      </div>
      <NextButton onClick={onNext} label="I've read it →" />
    </section>
  );
}

// --- Step 2: Decode ------------------------------------------------------

function DecodeStep({ lesson, onNext }: { lesson: Lesson; onNext: () => void }) {
  return (
    <section>
      <StepHeading
        n={2}
        title="New words & grammar"
        blurb="The building blocks from this conversation."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {lesson.vocab.map((v) => (
          <div key={v.id} className="card">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{v.de}</p>
              <SpeakButton text={v.de} label="" />
            </div>
            <p className="text-sm text-ink/60">{v.en}</p>
            {v.example && (
              <p className="mt-2 text-sm italic text-ink/50">
                {v.example}
                {v.exampleEn ? ` — ${v.exampleEn}` : ""}
              </p>
            )}
          </div>
        ))}
      </div>

      {lesson.grammar.length > 0 && (
        <div className="mt-5 space-y-3">
          {lesson.grammar.map((gid) => {
            const g = getGrammar(gid);
            if (!g) return null;
            return (
              <div key={gid} className="card border-l-4 border-l-brand">
                <p className="font-semibold">{g.title}</p>
                <p className="mt-1 text-sm text-ink/70">{g.body}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {g.examples.map(([de, en], i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="font-medium">{de}</span>
                      <span className="text-ink/40">— {en}</span>
                      <SpeakButton text={de} label="" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
      <NextButton onClick={onNext} label="Got it — let's practise →" />
    </section>
  );
}

// --- Step 3: Drill -------------------------------------------------------

function DrillStep({ lesson, onNext }: { lesson: Lesson; onNext: () => void }) {
  const [idx, setIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const drill = lesson.drills[idx];
  const last = idx === lesson.drills.length - 1;
  const [answered, setAnswered] = useState(false);

  return (
    <section>
      <StepHeading
        n={3}
        title="Drill it"
        blurb={`Exercise ${idx + 1} of ${lesson.drills.length}`}
      />
      <DrillCard
        key={drill.id}
        drill={drill}
        onGraded={(c) => {
          setAnswered(true);
          if (c) setCorrectCount((n) => n + 1);
        }}
      />
      {answered && (
        <NextButton
          onClick={() => {
            if (last) onNext();
            else {
              setIdx((i) => i + 1);
              setAnswered(false);
            }
          }}
          label={last ? `Done (${correctCount}/${lesson.drills.length}) →` : "Next exercise →"}
        />
      )}
    </section>
  );
}

// --- Step 6: Done / Consolidate -----------------------------------------

function DoneStep({ lesson }: { lesson: Lesson }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Add new vocab to the SRS deck, record completion, unlock can-dos,
      // and keep the streak alive.
      await Promise.all(
        lesson.vocab.map((v) =>
          addCard({ id: v.id, de: v.de, en: v.en, example: v.example }),
        ),
      );
      await markLessonComplete(lesson.id);
      if (lesson.canDo.length) await unlockCanDo(lesson.canDo);
      await bumpStreak();
      if (!cancelled) setSaved(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [lesson]);

  return (
    <section className="text-center">
      <div className="card mx-auto max-w-md">
        <p className="text-5xl">🎉</p>
        <h2 className="mt-2 text-xl font-bold">Lesson complete!</h2>
        <p className="mt-2 text-sm text-ink/60">
          {saved
            ? `${lesson.vocab.length} new words added to your review deck. They'll come back at the right time so they stick.`
            : "Saving your progress…"}
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Link href="/review" className="btn-primary">
            Review now
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Today
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Small shared bits ---------------------------------------------------

function StepHeading({
  n,
  title,
  blurb,
}: {
  n: number;
  title: string;
  blurb: string;
}) {
  return (
    <div className="mb-4">
      <span className="chip bg-brand text-white">Step {n}</span>
      <h2 className="mt-2 text-xl font-bold">{title}</h2>
      <p className="text-sm text-ink/50">{blurb}</p>
    </div>
  );
}

function NextButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button onClick={onClick} className="btn-primary mt-6 w-full">
      {label}
    </button>
  );
}
