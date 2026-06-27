"use client";

import { useState } from "react";
import { scorePronunciation, type PronunciationResult } from "@/lib/pronunciation";
import { SpeakButton } from "./SpeakButton";
import { MicButton } from "./MicButton";

/**
 * Shadowing practice: the learner hears a target sentence, repeats it aloud,
 * and gets a pronunciation score with per-word highlighting. They advance once
 * each line has been attempted (any score) so a flaky recognizer never blocks.
 */
export function ShadowStep({
  lines,
  onComplete,
}: {
  lines: string[];
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const target = lines[index];
  const last = index === lines.length - 1;

  function handleTranscript(transcript: string) {
    setResult(scorePronunciation(target, transcript));
  }

  function next() {
    setResult(null);
    if (last) onComplete();
    else setIndex((i) => i + 1);
  }

  return (
    <div className="card">
      <p className="mb-1 text-sm font-semibold text-brand">
        Shadow it — sentence {index + 1} of {lines.length}
      </p>
      <p className="mb-3 text-sm text-ink/50">
        Listen, then say it aloud. Aim to be understood, not perfect.
      </p>

      <div className="mb-4 flex items-center gap-3">
        <p className="text-xl">
          {result
            ? result.words.map((w, i) => (
                <span
                  key={i}
                  className={
                    w.correct ? "text-success" : "text-brand underline"
                  }
                >
                  {w.word}{" "}
                </span>
              ))
            : target}
        </p>
        <SpeakButton text={target} label="Listen" />
      </div>

      {result && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{result.score}</span>
            <span className="text-sm text-ink/50">/ 100</span>
            <span
              className={`chip ${
                result.band === "great"
                  ? "bg-success/15 text-success"
                  : result.band === "good"
                    ? "bg-warn/15 text-warn"
                    : "bg-brand/15 text-brand"
              }`}
            >
              {result.band === "great"
                ? "Sehr gut!"
                : result.band === "good"
                  ? "Gut — almost"
                  : "Try again"}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <MicButton onTranscript={handleTranscript} label="Repeat aloud" />
        {result && (
          <button onClick={next} className="btn-primary">
            {last ? "Finish speaking" : "Next sentence"}
          </button>
        )}
        {!result && (
          <button onClick={next} className="btn-secondary text-sm">
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
