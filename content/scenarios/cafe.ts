import type { Scenario } from "../schema";

export const cafeScenario: Scenario = {
  id: "sc-cafe",
  title: "Ordering in a café",
  track: "personal",
  level: "A2",
  setup:
    "You sit down at a café in Vienna. The waiter comes to take your order. Order a drink, decide on milk, and ask for the bill.",
  startNode: "greet",
  nodes: [
    {
      id: "greet",
      npc: "Grüß Gott! Was darf es sein?",
      npcEn: "Hello! What can I get you?",
      hint: "Order politely: Ich hätte gern einen Kaffee / einen Tee.",
      sample: "Ich hätte gern einen Kaffee, bitte.",
      patterns: [
        { keywords: ["kaffee"], next: "milk", feedback: "Gerne!" },
        { keywords: ["tee"], next: "milk", feedback: "Gerne!" },
        { keywords: ["wasser"], next: "anything", feedback: "Gerne!" },
      ],
      fallback: "again",
    },
    {
      id: "again",
      npc: "Entschuldigung, was möchten Sie trinken?",
      npcEn: "Sorry, what would you like to drink?",
      hint: "Try: Ich möchte einen Kaffee.",
      sample: "Ich möchte einen Kaffee.",
      patterns: [
        { keywords: ["kaffee"], next: "milk" },
        { keywords: ["tee"], next: "milk" },
        { keywords: ["wasser"], next: "anything" },
      ],
      fallback: "anything",
    },
    {
      id: "milk",
      npc: "Mit Milch und Zucker?",
      npcEn: "With milk and sugar?",
      hint: "Answer yes or no: Ja, bitte. / Nein, danke.",
      sample: "Nein, danke. Nur schwarz.",
      patterns: [
        { keywords: ["ja"], next: "anything", feedback: "In Ordnung." },
        { keywords: ["nein"], next: "anything", feedback: "In Ordnung." },
        { keywords: ["danke"], next: "anything" },
      ],
      fallback: "anything",
    },
    {
      id: "anything",
      npc: "Sonst noch etwas?",
      npcEn: "Anything else?",
      hint: "Ask for the bill: Die Rechnung, bitte. (or: Nein, danke.)",
      sample: "Nein danke, die Rechnung bitte.",
      patterns: [
        { keywords: ["rechnung"], next: "pay", feedback: "Sofort!" },
        { keywords: ["zahlen"], next: "pay", feedback: "Sofort!" },
        { keywords: ["nein"], next: "pay" },
      ],
      fallback: "pay",
    },
    {
      id: "pay",
      npc: "Das macht 3,80 €. Danke und schönen Tag!",
      npcEn: "That's €3.80. Thank you and have a nice day!",
      patterns: [],
      terminal: true,
    },
  ],
};
