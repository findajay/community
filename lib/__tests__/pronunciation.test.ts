import { describe, it, expect } from "vitest";
import { scorePronunciation } from "../pronunciation";

describe("scorePronunciation", () => {
  it("scores a perfect transcript 100 with all words correct", () => {
    const r = scorePronunciation(
      "Ich hätte gern einen Kaffee",
      "Ich hätte gern einen Kaffee",
    );
    expect(r.score).toBe(100);
    expect(r.band).toBe("great");
    expect(r.words.every((w) => w.correct)).toBe(true);
  });

  it("tolerates umlaut spelling and punctuation differences", () => {
    const r = scorePronunciation("Grüße", "gruesse!");
    expect(r.score).toBe(100);
  });

  it("marks missing words as incorrect and lowers the score", () => {
    const r = scorePronunciation(
      "Ich hätte gern einen Kaffee",
      "Ich hätte Kaffee",
    );
    expect(r.score).toBeLessThan(85);
    const incorrect = r.words.filter((w) => !w.correct).map((w) => w.word);
    expect(incorrect).toContain("gern");
    expect(incorrect).toContain("einen");
  });

  it("returns a tryAgain band for an empty/garbage transcript", () => {
    const r = scorePronunciation("Guten Morgen", "xyz");
    expect(r.band).toBe("tryAgain");
  });

  it("handles an empty target gracefully", () => {
    const r = scorePronunciation("", "anything");
    expect(r.score).toBe(0);
    expect(r.words).toEqual([]);
  });

  it("allows a small recognition slip on a long word", () => {
    // recognizer dropped one letter of a long word
    const r = scorePronunciation("Entschuldigung", "entschuldigun");
    expect(r.words[0].correct).toBe(true);
  });
});
