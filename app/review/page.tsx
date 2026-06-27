"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { dueCards } from "@/lib/srs";
import type { Grade } from "@/lib/srs";
import { getCardMap, gradeCard, type StoredCard } from "@/lib/progress";
import { SpeakButton } from "@/components/SpeakButton";

export default function ReviewPage() {
  const [queue, setQueue] = useState<StoredCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);

  useEffect(() => {
    (async () => {
      const map = await getCardMap();
      const dueIds = dueCards(map, Date.now());
      setQueue(dueIds.map((id) => map[id]));
      setLoading(false);
    })();
  }, []);

  const card = queue[pos];

  async function grade(g: Grade) {
    if (!card) return;
    await gradeCard(card.vocabId, g);
    setReviewed((n) => n + 1);
    setRevealed(false);
    setPos((p) => p + 1);
  }

  if (loading) {
    return <p className="text-ink/50">Loading your review deck…</p>;
  }

  if (queue.length === 0 || pos >= queue.length) {
    return (
      <div className="card mx-auto max-w-md text-center">
        <p className="text-5xl">✓</p>
        <h1 className="mt-2 text-xl font-bold">
          {reviewed > 0 ? "Review done!" : "Nothing due right now"}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          {reviewed > 0
            ? `You reviewed ${reviewed} word${reviewed === 1 ? "" : "s"}. They'll resurface at the perfect moment.`
            : "Your spaced-repetition deck is empty or not due yet. Complete a lesson to add words."}
        </p>
        <Link href="/" className="btn-primary mt-5">
          Back to Today
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between text-sm text-ink/50">
        <Link href="/" className="hover:text-ink">
          ← Exit
        </Link>
        <span>
          {pos + 1} / {queue.length}
        </span>
      </div>

      <div className="card text-center">
        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-bold">{card.de}</p>
          <SpeakButton text={card.de} label="" />
        </div>

        {revealed ? (
          <div className="mt-4">
            <p className="text-lg text-ink/70">{card.en}</p>
            {card.example && (
              <p className="mt-2 text-sm italic text-ink/50">{card.example}</p>
            )}
            <p className="mt-5 text-sm text-ink/50">How well did you recall it?</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              <GradeBtn label="Again" tone="brand" onClick={() => grade(1)} />
              <GradeBtn label="Hard" tone="warn" onClick={() => grade(3)} />
              <GradeBtn label="Good" tone="ink" onClick={() => grade(4)} />
              <GradeBtn label="Easy" tone="success" onClick={() => grade(5)} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="btn-primary mt-6 w-full"
          >
            Show answer
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-ink/40">
        Tip: say the word aloud before revealing — active recall beats
        recognition.
      </p>
    </div>
  );
}

function GradeBtn({
  label,
  tone,
  onClick,
}: {
  label: string;
  tone: "brand" | "warn" | "ink" | "success";
  onClick: () => void;
}) {
  const toneClass = {
    brand: "border-brand text-brand",
    warn: "border-warn text-warn",
    ink: "border-ink/30 text-ink",
    success: "border-success text-success",
  }[tone];
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border py-2 text-sm font-medium hover:bg-paper ${toneClass}`}
    >
      {label}
    </button>
  );
}
