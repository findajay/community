import { describe, it, expect } from "vitest";
import {
  gradeDrill,
  reorderTokens,
  seededShuffle,
  drillPrompt,
} from "../drills";
import type {
  CaseChoiceDrill,
  ConjugateDrill,
  GapFillDrill,
  ReorderDrill,
} from "@/content/schema";

const gap: GapFillDrill = {
  id: "g1",
  type: "gap-fill",
  text: "Ich ___ einen Kaffee.",
  answer: "möchte",
};

const reorder: ReorderDrill = {
  id: "r1",
  type: "reorder",
  tokens: ["Ich", "hätte", "gern", "einen", "Kaffee"],
};

const conj: ConjugateDrill = {
  id: "c1",
  type: "conjugate",
  infinitive: "sein",
  person: "ich",
  tense: "Präsens",
  answer: "bin",
};

const caseDrill: CaseChoiceDrill = {
  id: "k1",
  type: "case-choice",
  text: "Ich sehe ___ Mann.",
  options: ["der", "den", "dem"],
  answer: "den",
  caseName: "Akkusativ",
};

describe("gradeDrill", () => {
  it("grades gap-fill forgivingly (umlaut spelling)", () => {
    expect(gradeDrill(gap, "möchte").correct).toBe(true);
    expect(gradeDrill(gap, "moechte").correct).toBe(true);
    expect(gradeDrill(gap, "will").correct).toBe(false);
  });

  it("grades conjugation and case choice", () => {
    expect(gradeDrill(conj, "bin").correct).toBe(true);
    expect(gradeDrill(conj, "ist").correct).toBe(false);
    expect(gradeDrill(caseDrill, "den").correct).toBe(true);
    expect(gradeDrill(caseDrill, "der").correct).toBe(false);
  });

  it("grades reorder on token order", () => {
    expect(gradeDrill(reorder, [...reorder.tokens]).correct).toBe(true);
    expect(
      gradeDrill(reorder, ["hätte", "Ich", "gern", "einen", "Kaffee"]).correct,
    ).toBe(false);
  });
});

describe("seededShuffle", () => {
  it("is deterministic for the same seed", () => {
    const a = seededShuffle([1, 2, 3, 4, 5], 42);
    const b = seededShuffle([1, 2, 3, 4, 5], 42);
    expect(a).toEqual(b);
  });
  it("preserves the multiset of items", () => {
    const out = seededShuffle([1, 2, 3, 4, 5], 7);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe("reorderTokens", () => {
  it("returns the same multiset but not already solved", () => {
    const shown = reorderTokens(reorder);
    expect([...shown].sort()).toEqual([...reorder.tokens].sort());
    expect(shown.join(" ")).not.toBe(reorder.tokens.join(" "));
  });
});

describe("drillPrompt", () => {
  it("falls back to a sensible default per type", () => {
    expect(drillPrompt(gap)).toMatch(/blank/i);
    expect(drillPrompt(conj)).toMatch(/sein/);
  });
});
