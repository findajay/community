// SM-2 spaced-repetition scheduler (the classic SuperMemo-2 algorithm).
//
// Pure and deterministic: given a card's current state and a review grade,
// it returns the next state. No clock access here — the caller passes `now`
// so the function stays testable and side-effect free.

/** Learner self-grade after seeing the answer. */
export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export interface SrsCard {
  /** Repetition count (consecutive correct recalls). */
  repetitions: number;
  /** Ease factor; starts at 2.5, floored at 1.3. */
  easeFactor: number;
  /** Current interval in days. */
  interval: number;
  /** Epoch ms when this card is next due. */
  due: number;
}

export const MIN_EASE = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;

/** A brand-new card, due immediately. */
export function newCard(now: number): SrsCard {
  return { repetitions: 0, easeFactor: 2.5, interval: 0, due: now };
}

/**
 * Apply a review grade and return the updated card.
 *
 * Grades 0–2 are "failed" (reset repetitions, review again soon).
 * Grades 3–5 are "passed" (grow the interval, adjust ease).
 */
export function review(card: SrsCard, grade: Grade, now: number): SrsCard {
  let { repetitions, easeFactor, interval } = card;

  if (grade < 3) {
    // Lapse: reset the schedule, show again in ~1 day.
    repetitions = 0;
    interval = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Update the ease factor per the SM-2 formula and floor it.
  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < MIN_EASE) easeFactor = MIN_EASE;

  return {
    repetitions,
    easeFactor: Number(easeFactor.toFixed(4)),
    interval,
    due: now + interval * DAY_MS,
  };
}

/** Whether a card is due for review at the given time. */
export function isDue(card: SrsCard, now: number): boolean {
  return card.due <= now;
}

/**
 * Pick the due cards from a map, soonest-due first, capped at `limit`.
 * Returns the keys (e.g. vocab ids) of cards to review now.
 */
export function dueCards(
  cards: Record<string, SrsCard>,
  now: number,
  limit = Infinity,
): string[] {
  return Object.entries(cards)
    .filter(([, c]) => isDue(c, now))
    .sort((a, b) => a[1].due - b[1].due)
    .slice(0, limit)
    .map(([id]) => id);
}
