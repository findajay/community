// Content schema for Fließend.
//
// All learning content is authored as typed data conforming to these types.
// There is no runtime AI: lessons, drills, and conversations are pre-authored
// and interpreted by the deterministic engines in `lib/`.
//
// These types are intentionally framework-free so a future React Native/Expo
// app can import them unchanged.

export type CEFRLevel = "A2" | "B1" | "B2" | "C1";

export type Track = "personal" | "professional" | "official";

export type Phase = 1 | 2 | 3;

/** A single vocabulary item or fixed chunk (Wortschatz). */
export interface VocabItem {
  id: string;
  /** German headword or chunk, e.g. "der Termin" or "Es tut mir leid". */
  de: string;
  /** English gloss. */
  en: string;
  /** Part of speech / category (noun, verb, phrase, …). */
  pos?: string;
  /** A natural example sentence in German. */
  example?: string;
  /** English translation of the example. */
  exampleEn?: string;
  level: CEFRLevel;
}

/** One line of a dialogue or story used as comprehensible input. */
export interface DialogueLine {
  /** Speaker label, e.g. "Anna", "Kellner", "Narrator". */
  speaker: string;
  de: string;
  en: string;
  /** Vocab ids introduced or reinforced by this line. */
  vocab?: string[];
}

/** A short reference note explaining a grammar point. */
export interface GrammarNote {
  id: string;
  title: string;
  level: CEFRLevel;
  /** Plain-text/markdown-ish explanation. */
  body: string;
  /** Worked examples: [German, English]. */
  examples: Array<[string, string]>;
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export type DrillType = "gap-fill" | "reorder" | "conjugate" | "case-choice";

interface DrillBase {
  id: string;
  type: DrillType;
  /** Optional instruction override; engines provide a sensible default. */
  prompt?: string;
}

/** Fill the blank. `text` contains a single "___" placeholder. */
export interface GapFillDrill extends DrillBase {
  type: "gap-fill";
  text: string;
  answer: string;
  /** Optional multiple-choice options; if omitted, free text input. */
  options?: string[];
  translation?: string;
}

/** Put the shuffled tokens back into correct order. */
export interface ReorderDrill extends DrillBase {
  type: "reorder";
  /** Correct sentence as ordered tokens. */
  tokens: string[];
  translation?: string;
}

/** Provide the correct conjugated form of a verb. */
export interface ConjugateDrill extends DrillBase {
  type: "conjugate";
  infinitive: string;
  person: string; // e.g. "ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"
  tense: string; // e.g. "Präsens", "Perfekt", "Präteritum"
  answer: string;
}

/** Choose the correct article/case form. */
export interface CaseChoiceDrill extends DrillBase {
  type: "case-choice";
  /** Sentence with "___" where the article belongs. */
  text: string;
  options: string[];
  answer: string;
  /** Which case is being practised, for feedback. */
  caseName: string; // "Nominativ" | "Akkusativ" | "Dativ" | "Genitiv"
  translation?: string;
}

export type Drill =
  | GapFillDrill
  | ReorderDrill
  | ConjugateDrill
  | CaseChoiceDrill;

// ---------------------------------------------------------------------------
// Scenarios (branching conversations)
// ---------------------------------------------------------------------------

/** A pattern the learner's reply is matched against. */
export interface ResponsePattern {
  /**
   * Required keywords/lemmas (all must appear, order-independent) OR a regex.
   * Matching is done on a normalized (lowercased, de-accented, de-punctuated)
   * version of the learner's reply.
   */
  keywords?: string[];
  regex?: string;
  /** Node to advance to when this pattern matches. */
  next: string;
  /** Optional short feedback shown when this branch is taken. */
  feedback?: string;
}

export interface ScenarioNode {
  id: string;
  /** What the other person says (German), spoken via TTS. */
  npc: string;
  npcEn: string;
  /** Optional hint shown if the learner is stuck. */
  hint?: string;
  /** Example of an acceptable reply, shown after success or on giving up. */
  sample?: string;
  /** Ordered patterns; first match wins. */
  patterns: ResponsePattern[];
  /** Node used when nothing matches (re-prompt / clarification). */
  fallback?: string;
  /** When true this node ends the conversation. */
  terminal?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  track: Track;
  level: CEFRLevel;
  /** Sets the scene for the learner (English). */
  setup: string;
  startNode: string;
  nodes: ScenarioNode[];
}

// ---------------------------------------------------------------------------
// Lessons & Units
// ---------------------------------------------------------------------------

export interface Lesson {
  id: string;
  title: string;
  level: CEFRLevel;
  track: Track;
  /** Comprehensible-input dialogue/story (step 1–2 of the loop). */
  dialogue: DialogueLine[];
  /** New vocab introduced by this lesson (added to SRS on completion). */
  vocab: VocabItem[];
  /** Grammar note ids referenced by this lesson. */
  grammar: string[];
  /** Drills (step 3). */
  drills: Drill[];
  /** Sentences to shadow aloud (step 4). Defaults to dialogue lines. */
  shadow?: string[];
  /** Scenario id for the conversation step (step 5). */
  scenario?: string;
  /** Can-do statement ids this lesson contributes toward. */
  canDo: string[];
}

export interface Unit {
  id: string;
  title: string;
  phase: Phase;
  level: CEFRLevel;
  /** Short description of what this unit covers. */
  summary: string;
  /** Unit ids that must be completed before this one unlocks. */
  prerequisites: string[];
  lessons: Lesson[];
}

/** A CEFR "can-do" statement the learner unlocks by completing lessons. */
export interface CanDoStatement {
  id: string;
  level: CEFRLevel;
  track: Track;
  /** e.g. "I can order food and drink in a café." */
  text: string;
}
