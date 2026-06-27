import type { Scenario } from "../schema";

export const vorstellenScenario: Scenario = {
  id: "sc-vorstellen",
  title: "Getting to know someone",
  track: "personal",
  level: "A2",
  setup:
    "You meet a new colleague, Lukas, at a language café. Introduce yourself and chat briefly.",
  startNode: "hello",
  nodes: [
    {
      id: "hello",
      npc: "Hallo! Ich heiße Lukas. Wie heißt du?",
      npcEn: "Hi! My name is Lukas. What's your name?",
      hint: "Say your name: Ich heiße … / Ich bin …",
      sample: "Hallo Lukas, ich heiße Anna.",
      patterns: [
        { keywords: ["heisse"], next: "where", feedback: "Schön!" },
        { keywords: ["ich", "bin"], next: "where", feedback: "Schön!" },
        { keywords: ["heisst"], next: "where" },
      ],
      fallback: "repeatName",
    },
    {
      id: "repeatName",
      npc: "Entschuldigung — wie heißt du?",
      npcEn: "Sorry — what's your name?",
      hint: "Try: Ich heiße Anna.",
      sample: "Ich heiße Anna.",
      patterns: [
        { keywords: ["heisse"], next: "where" },
        { keywords: ["ich", "bin"], next: "where" },
      ],
      fallback: "where",
    },
    {
      id: "where",
      npc: "Freut mich! Woher kommst du?",
      npcEn: "Nice to meet you! Where are you from?",
      hint: "Say where you're from: Ich komme aus …",
      sample: "Ich komme aus Indien.",
      patterns: [
        { keywords: ["komme", "aus"], next: "live", feedback: "Interessant!" },
        { keywords: ["aus"], next: "live" },
      ],
      fallback: "live",
    },
    {
      id: "live",
      npc: "Und wo wohnst du jetzt?",
      npcEn: "And where do you live now?",
      hint: "Say where you live: Ich wohne in …",
      sample: "Ich wohne in Berlin.",
      patterns: [
        { keywords: ["wohne", "in"], next: "bye", feedback: "Super!" },
        { keywords: ["in"], next: "bye" },
      ],
      fallback: "bye",
    },
    {
      id: "bye",
      npc: "Toll, schön dich kennenzulernen! Bis bald!",
      npcEn: "Great, nice to meet you! See you soon!",
      patterns: [],
      terminal: true,
    },
  ],
};
