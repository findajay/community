// Pronunciation scoring.
//
// The browser's speech recognition gives us a text transcript of what the
// learner said. We compare that transcript against the target sentence and
// produce a 0–100 score plus a per-target-word verdict for visual feedback.
//
// This is not phoneme-level acoustic scoring (which would need a paid service
// or a heavy on-device model), but transcript-vs-target alignment is a solid,
// free proxy: if the recognizer heard the right words, the pronunciation was
// close enough to be understood — which is exactly the goal for a learner.

import { editDistance, similarity, tokenize } from "./text";

export interface WordVerdict {
  word: string;
  correct: boolean;
}

export interface PronunciationResult {
  /** 0–100 overall score. */
  score: number;
  /** Per-target-word verdicts, in target order. */
  words: WordVerdict[];
  /** Convenience band for UI styling/messaging. */
  band: "great" | "good" | "tryAgain";
}

/** A target token counts as matched if a heard token is close enough. */
function tokenMatches(target: string, heard: string): boolean {
  if (target === heard) return true;
  // Allow a small edit distance for short morphological slips.
  const tol = target.length <= 4 ? 1 : 2;
  return editDistance(target, heard) <= tol;
}

/**
 * Score a recognized transcript against the target sentence.
 *
 * Strategy: greedily match each target token to an as-yet-unused heard token,
 * scanning forward so word order is loosely respected. The score blends the
 * fraction of target words matched with the overall string similarity, so both
 * "right words" and "roughly right shape" contribute.
 */
export function scorePronunciation(
  target: string,
  heard: string,
): PronunciationResult {
  const targetTokens = tokenize(target);
  const heardTokens = tokenize(heard);

  if (targetTokens.length === 0) {
    return { score: 0, words: [], band: "tryAgain" };
  }

  const used = new Array<boolean>(heardTokens.length).fill(false);
  const words: WordVerdict[] = [];
  let matched = 0;
  let searchFrom = 0;

  for (const t of targetTokens) {
    let found = -1;
    for (let i = searchFrom; i < heardTokens.length; i++) {
      if (!used[i] && tokenMatches(t, heardTokens[i])) {
        found = i;
        break;
      }
    }
    if (found >= 0) {
      used[found] = true;
      searchFrom = found + 1;
      matched += 1;
      words.push({ word: t, correct: true });
    } else {
      words.push({ word: t, correct: false });
    }
  }

  const wordFraction = matched / targetTokens.length;
  const shape = similarity(
    targetTokens.join(" "),
    heardTokens.join(" "),
  );
  // Weight word coverage more heavily than raw string shape.
  const score = Math.round((wordFraction * 0.7 + shape * 0.3) * 100);

  const band: PronunciationResult["band"] =
    score >= 85 ? "great" : score >= 60 ? "good" : "tryAgain";

  return { score, words, band };
}
