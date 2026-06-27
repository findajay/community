import { describe, it, expect } from "vitest";
import { normalize, tokenize, editDistance, similarity } from "../text";

describe("normalize", () => {
  it("lowercases and expands umlauts/ß", () => {
    expect(normalize("Grüße")).toBe("gruesse");
    expect(normalize("Schön!")).toBe("schoen");
    expect(normalize("Straße")).toBe("strasse");
  });

  it("strips punctuation and collapses whitespace", () => {
    expect(normalize("Hallo,   Welt!!!")).toBe("hallo welt");
  });

  it("treats umlaut and ASCII spelling identically", () => {
    expect(normalize("Gruesse")).toBe(normalize("Grüße"));
  });
});

describe("tokenize", () => {
  it("splits into normalized tokens", () => {
    expect(tokenize("Ich hätte gern!")).toEqual(["ich", "haette", "gern"]);
  });
  it("returns empty array for empty input", () => {
    expect(tokenize("   ")).toEqual([]);
  });
});

describe("editDistance", () => {
  it("is zero for identical strings", () => {
    expect(editDistance("haus", "haus")).toBe(0);
  });
  it("counts single edits", () => {
    expect(editDistance("haus", "maus")).toBe(1);
    expect(editDistance("haus", "hause")).toBe(1);
  });
});

describe("similarity", () => {
  it("is 1 for identical and lower for different", () => {
    expect(similarity("hallo", "hallo")).toBe(1);
    expect(similarity("hallo", "hallx")).toBeLessThan(1);
    expect(similarity("", "")).toBe(1);
  });
});
