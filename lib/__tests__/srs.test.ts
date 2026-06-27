import { describe, it, expect } from "vitest";
import { newCard, review, isDue, dueCards, MIN_EASE } from "../srs";

const DAY = 24 * 60 * 60 * 1000;

describe("newCard", () => {
  it("is due immediately with default ease", () => {
    const c = newCard(1000);
    expect(c.due).toBe(1000);
    expect(c.easeFactor).toBe(2.5);
    expect(c.repetitions).toBe(0);
    expect(isDue(c, 1000)).toBe(true);
  });
});

describe("review", () => {
  it("schedules 1 day after first pass, 6 days after second", () => {
    const now = 0;
    const c1 = review(newCard(now), 4, now);
    expect(c1.repetitions).toBe(1);
    expect(c1.interval).toBe(1);
    expect(c1.due).toBe(1 * DAY);

    const c2 = review(c1, 4, c1.due);
    expect(c2.repetitions).toBe(2);
    expect(c2.interval).toBe(6);
    expect(c2.due).toBe(c1.due + 6 * DAY);
  });

  it("grows the interval by the ease factor after the second pass", () => {
    let c = newCard(0);
    c = review(c, 5, 0); // rep 1, interval 1
    c = review(c, 5, c.due); // rep 2, interval 6
    const beforeInterval = c.interval;
    const easeUsed = c.easeFactor; // SM-2 uses the ease as it stands now
    c = review(c, 5, c.due); // rep 3, interval = round(6 * easeUsed)
    expect(c.interval).toBe(Math.round(beforeInterval * easeUsed));
    expect(c.interval).toBeGreaterThan(beforeInterval);
  });

  it("resets repetitions on a lapse (grade < 3)", () => {
    let c = newCard(0);
    c = review(c, 5, 0);
    c = review(c, 5, c.due);
    expect(c.repetitions).toBe(2);
    c = review(c, 1, c.due); // fail
    expect(c.repetitions).toBe(0);
    expect(c.interval).toBe(1);
  });

  it("never lets ease drop below the floor", () => {
    let c = newCard(0);
    for (let i = 0; i < 10; i++) c = review(c, 0, c.due);
    expect(c.easeFactor).toBeGreaterThanOrEqual(MIN_EASE);
  });
});

describe("dueCards", () => {
  it("returns due card ids soonest-first, respecting the limit", () => {
    const now = 10_000;
    const cards = {
      a: { ...newCard(0), due: now - 100 },
      b: { ...newCard(0), due: now - 5 },
      c: { ...newCard(0), due: now + 1000 }, // not due
    };
    expect(dueCards(cards, now)).toEqual(["a", "b"]);
    expect(dueCards(cards, now, 1)).toEqual(["a"]);
  });
});
