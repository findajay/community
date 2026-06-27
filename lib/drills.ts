// Drill presentation + grading.
//
// Drills are authored as data (see content/schema.ts). This module turns a
// drill into something the UI can present (e.g. a deterministically shuffled
// token list for "reorder") and grades the learner's answer. Grading is
// forgiving about case, umlaut spelling, and punctuation via `normalize`.

import type {
  CaseChoiceDrill,
  ConjugateDrill,
  Drill,
  GapFillDrill,
  ReorderDrill,
} from "@/content/schema";
import { normalize } from "./text";

export interface GradeResult {
  correct: boolean;
  /** The canonical correct answer, for display after grading. */
  expected: string;
}

/** A small deterministic PRNG (mulberry32) so shuffles are reproducible. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string to a stable 32-bit seed (so a drill id → fixed shuffle). */
function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic Fisher–Yates shuffle seeded by `seed`. */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items];
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Tokens for a reorder drill, shuffled deterministically by drill id.
 * Guarantees the presented order differs from the answer when possible.
 */
export function reorderTokens(drill: ReorderDrill): string[] {
  if (drill.tokens.length < 2) return [...drill.tokens];
  const seed = seedFrom(drill.id);
  let shuffled = seededShuffle(drill.tokens, seed);
  if (shuffled.join("") === drill.tokens.join("")) {
    // Re-seed once so the puzzle isn't already solved.
    shuffled = seededShuffle(drill.tokens, seed + 1);
  }
  return shuffled;
}

/** Default instruction text per drill type. */
export function drillPrompt(drill: Drill): string {
  if (drill.prompt) return drill.prompt;
  switch (drill.type) {
    case "gap-fill":
      return "Fill in the blank.";
    case "reorder":
      return "Put the words in the correct order.";
    case "conjugate":
      return `Conjugate "${drill.infinitive}" (${drill.tense}, ${drill.person}).`;
    case "case-choice":
      return `Choose the correct form (${drill.caseName}).`;
  }
}

function gradeText(answer: string, expected: string): GradeResult {
  return { correct: normalize(answer) === normalize(expected), expected };
}

export function gradeGapFill(
  drill: GapFillDrill,
  answer: string,
): GradeResult {
  return gradeText(answer, drill.answer);
}

export function gradeConjugate(
  drill: ConjugateDrill,
  answer: string,
): GradeResult {
  return gradeText(answer, drill.answer);
}

export function gradeCaseChoice(
  drill: CaseChoiceDrill,
  answer: string,
): GradeResult {
  return gradeText(answer, drill.answer);
}

export function gradeReorder(
  drill: ReorderDrill,
  answerTokens: string[],
): GradeResult {
  const expected = drill.tokens.join(" ");
  const got = answerTokens.join(" ");
  return { correct: normalize(got) === normalize(expected), expected };
}

/** Grade any drill given the learner's answer (string or token list). */
export function gradeDrill(
  drill: Drill,
  answer: string | string[],
): GradeResult {
  switch (drill.type) {
    case "gap-fill":
      return gradeGapFill(drill, answer as string);
    case "conjugate":
      return gradeConjugate(drill, answer as string);
    case "case-choice":
      return gradeCaseChoice(drill, answer as string);
    case "reorder":
      return gradeReorder(drill, answer as string[]);
  }
}
