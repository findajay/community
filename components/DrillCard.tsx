"use client";

import { useMemo, useState } from "react";
import type { Drill } from "@/content/schema";
import { drillPrompt, gradeDrill, reorderTokens } from "@/lib/drills";
import { SpeakButton } from "./SpeakButton";

export function DrillCard({
  drill,
  onGraded,
}: {
  drill: Drill;
  /** Called once the learner has checked their answer. */
  onGraded: (correct: boolean) => void;
}) {
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [expected, setExpected] = useState("");

  // Free-text / choice answer.
  const [answer, setAnswer] = useState("");
  // Reorder: tokens picked so far + the remaining pool.
  const shuffled = useMemo(
    () => (drill.type === "reorder" ? reorderTokens(drill) : []),
    [drill],
  );
  const [picked, setPicked] = useState<number[]>([]);

  function check(value: string | string[]) {
    const result = gradeDrill(drill, value);
    setCorrect(result.correct);
    setExpected(result.expected);
    setChecked(true);
    onGraded(result.correct);
  }

  const translation =
    "translation" in drill ? drill.translation : undefined;

  return (
    <div className="card">
      <p className="mb-1 text-sm font-semibold text-brand">
        {drillPrompt(drill)}
      </p>
      {translation && (
        <p className="mb-3 text-sm text-ink/50">{translation}</p>
      )}

      {/* --- Prompt body per type --- */}
      {drill.type === "gap-fill" && (
        <p className="mb-3 text-lg">{drill.text.replace("___", "_____")}</p>
      )}
      {drill.type === "case-choice" && (
        <p className="mb-3 text-lg">{drill.text.replace("___", "_____")}</p>
      )}
      {drill.type === "conjugate" && (
        <p className="mb-3 text-lg">
          {drill.person} … <span className="italic">({drill.infinitive})</span>
        </p>
      )}

      {/* --- Answer input per type --- */}
      {(drill.type === "gap-fill" || drill.type === "conjugate") &&
        (("options" in drill && drill.options) ? (
          <ChoiceButtons
            options={drill.options!}
            disabled={checked}
            selected={answer}
            onSelect={(o) => {
              setAnswer(o);
              check(o);
            }}
          />
        ) : (
          <TextAnswer
            value={answer}
            disabled={checked}
            onChange={setAnswer}
            onSubmit={() => check(answer)}
          />
        ))}

      {drill.type === "case-choice" && (
        <ChoiceButtons
          options={drill.options}
          disabled={checked}
          selected={answer}
          onSelect={(o) => {
            setAnswer(o);
            check(o);
          }}
        />
      )}

      {drill.type === "reorder" && (
        <ReorderAnswer
          shuffled={shuffled}
          picked={picked}
          disabled={checked}
          onPick={(i) => setPicked((p) => [...p, i])}
          onReset={() => setPicked([])}
          onSubmit={() => check(picked.map((i) => shuffled[i]))}
        />
      )}

      {/* --- Feedback --- */}
      {checked && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm ${
            correct
              ? "bg-success/10 text-success"
              : "bg-brand/10 text-brand"
          }`}
        >
          {correct ? "✓ Richtig!" : `Not quite. Correct answer: `}
          {!correct && (
            <span className="font-semibold">{expected}</span>
          )}
          {!correct && (
            <span className="ml-2 inline-block align-middle">
              <SpeakButton
                text={expected}
                label="Hear it"
                className="btn-secondary !px-2 !py-1 !text-xs"
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function ChoiceButtons({
  options,
  selected,
  disabled,
  onSelect,
}: {
  options: string[];
  selected: string;
  disabled: boolean;
  onSelect: (o: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(o)}
          className={`btn-secondary ${
            selected === o ? "ring-2 ring-brand" : ""
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function TextAnswer({
  value,
  disabled,
  onChange,
  onSubmit,
}: {
  value: string;
  disabled: boolean;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit();
      }}
      className="flex gap-2"
    >
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        autoCapitalize="off"
        className="flex-1 rounded-lg border border-ink/20 px-3 py-2"
        placeholder="Type your answer…"
      />
      <button type="submit" className="btn-primary" disabled={disabled}>
        Check
      </button>
    </form>
  );
}

function ReorderAnswer({
  shuffled,
  picked,
  disabled,
  onPick,
  onReset,
  onSubmit,
}: {
  shuffled: string[];
  picked: number[];
  disabled: boolean;
  onPick: (i: number) => void;
  onReset: () => void;
  onSubmit: () => void;
}) {
  const pickedSet = new Set(picked);
  return (
    <div>
      <div className="mb-2 min-h-[2.5rem] rounded-lg border border-dashed border-ink/20 p-2">
        {picked.length === 0 ? (
          <span className="text-sm text-ink/40">Tap words in order…</span>
        ) : (
          picked.map((i) => (
            <span
              key={i}
              className="chip mr-1 bg-brand-soft text-ink"
            >
              {shuffled[i]}
            </span>
          ))
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {shuffled.map((tok, i) => (
          <button
            key={i}
            type="button"
            disabled={disabled || pickedSet.has(i)}
            onClick={() => onPick(i)}
            className="btn-secondary disabled:opacity-30"
          >
            {tok}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={disabled}
          className="btn-secondary text-sm"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || picked.length !== shuffled.length}
          className="btn-primary text-sm"
        >
          Check
        </button>
      </div>
    </div>
  );
}
