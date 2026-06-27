import { describe, it, expect } from "vitest";
import { advance, getNode, patternMatches } from "../scenario-engine";
import type { Scenario } from "@/content/schema";

const scenario: Scenario = {
  id: "cafe",
  title: "Im Café",
  track: "personal",
  level: "A2",
  setup: "Order a coffee.",
  startNode: "greet",
  nodes: [
    {
      id: "greet",
      npc: "Guten Tag! Was möchten Sie?",
      npcEn: "Hello! What would you like?",
      hint: "Order a coffee: Ich hätte gern einen Kaffee.",
      sample: "Ich hätte gern einen Kaffee, bitte.",
      patterns: [
        { keywords: ["kaffee"], next: "askMilk", feedback: "Perfekt!" },
        { regex: "\\btee\\b", next: "askMilk" },
      ],
      fallback: "didntCatch",
    },
    {
      id: "didntCatch",
      npc: "Entschuldigung, was möchten Sie?",
      npcEn: "Sorry, what would you like?",
      patterns: [{ keywords: ["kaffee"], next: "askMilk" }],
    },
    {
      id: "askMilk",
      npc: "Mit Milch?",
      npcEn: "With milk?",
      patterns: [
        { keywords: ["ja"], next: "bye" },
        { keywords: ["nein"], next: "bye" },
      ],
      terminal: false,
    },
    {
      id: "bye",
      npc: "Kommt sofort. Danke!",
      npcEn: "Coming right up. Thanks!",
      patterns: [],
      terminal: true,
    },
  ],
};

describe("patternMatches", () => {
  it("matches required keywords regardless of order/case/umlaut", () => {
    expect(
      patternMatches({ keywords: ["kaffee"], next: "x" }, "Einen KAFFEE bitte"),
    ).toBe(true);
    expect(
      patternMatches({ keywords: ["kaffee"], next: "x" }, "Ich möchte Tee"),
    ).toBe(false);
  });

  it("matches a regex pattern", () => {
    expect(patternMatches({ regex: "\\btee\\b", next: "x" }, "einen Tee")).toBe(
      true,
    );
  });

  it("never throws on a malformed regex", () => {
    expect(patternMatches({ regex: "(", next: "x" }, "anything")).toBe(false);
  });
});

describe("advance", () => {
  it("follows the first matching pattern and carries feedback", () => {
    const node = getNode(scenario, "greet");
    const r = advance(scenario, node, "Ich hätte gern einen Kaffee");
    expect(r.nextNodeId).toBe("askMilk");
    expect(r.matched).toBe(true);
    expect(r.feedback).toBe("Perfekt!");
    expect(r.done).toBe(false);
  });

  it("routes to the fallback when nothing matches", () => {
    const node = getNode(scenario, "greet");
    const r = advance(scenario, node, "blah blah");
    expect(r.nextNodeId).toBe("didntCatch");
    expect(r.matched).toBe(false);
  });

  it("flags terminal nodes as done", () => {
    const node = getNode(scenario, "askMilk");
    const r = advance(scenario, node, "Ja, bitte");
    expect(r.nextNodeId).toBe("bye");
    expect(r.done).toBe(true);
  });

  it("stays on the node when no match and no fallback", () => {
    const node = getNode(scenario, "askMilk");
    const r = advance(scenario, node, "vielleicht");
    expect(r.nextNodeId).toBe("askMilk");
    expect(r.matched).toBe(false);
  });
});
