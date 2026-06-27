// On-device learner state, persisted in IndexedDB via Dexie.
//
// Everything the learner accumulates — spaced-repetition cards, completed
// lessons, unlocked can-do statements, streak, and settings — lives here.
// No server, no account. The whole store can be exported/imported as JSON.
//
// Browser-only: Dexie touches IndexedDB, so only call these from client code.

import Dexie, { type Table } from "dexie";
import { newCard, review as srsReview, type Grade, type SrsCard } from "./srs";

/** An SRS card augmented with the text needed to render it standalone. */
export interface StoredCard extends SrsCard {
  vocabId: string;
  de: string;
  en: string;
  example?: string;
}

interface KV {
  key: string;
  value: unknown;
}

export interface Settings {
  speechRate: number;
  voiceURI: string | null;
  dailyGoal: number; // target reviews/lessons per session
}

export interface Streak {
  count: number;
  lastDay: string | null; // YYYY-MM-DD
}

const DEFAULT_SETTINGS: Settings = {
  speechRate: 0.95,
  voiceURI: null,
  dailyGoal: 20,
};

class FliessendDB extends Dexie {
  cards!: Table<StoredCard, string>;
  lessons!: Table<{ id: string; completedAt: number }, string>;
  canDo!: Table<{ id: string; unlockedAt: number }, string>;
  kv!: Table<KV, string>;

  constructor() {
    super("fliessend");
    this.version(1).stores({
      cards: "vocabId, due",
      lessons: "id",
      canDo: "id",
      kv: "key",
    });
  }
}

// Guard so importing this module during SSR/build never instantiates Dexie.
let _db: FliessendDB | null = null;
function db(): FliessendDB {
  if (typeof window === "undefined") {
    throw new Error("progress store is only available in the browser");
  }
  if (!_db) _db = new FliessendDB();
  return _db;
}

// --- Spaced repetition ---------------------------------------------------

export async function getCards(): Promise<StoredCard[]> {
  return db().cards.toArray();
}

export async function getCardMap(): Promise<Record<string, StoredCard>> {
  const all = await getCards();
  return Object.fromEntries(all.map((c) => [c.vocabId, c]));
}

/** Add a vocab item to the SRS deck if it isn't already there. */
export async function addCard(item: {
  id: string;
  de: string;
  en: string;
  example?: string;
}): Promise<void> {
  const existing = await db().cards.get(item.id);
  if (existing) return;
  await db().cards.put({
    vocabId: item.id,
    de: item.de,
    en: item.en,
    example: item.example,
    ...newCard(Date.now()),
  });
}

/** Grade a card and persist its new schedule. */
export async function gradeCard(
  vocabId: string,
  grade: Grade,
): Promise<void> {
  const card = await db().cards.get(vocabId);
  if (!card) return;
  const updated = srsReview(card, grade, Date.now());
  await db().cards.put({ ...card, ...updated });
}

export async function countDue(now = Date.now()): Promise<number> {
  return db().cards.where("due").belowOrEqual(now).count();
}

// --- Lessons -------------------------------------------------------------

export async function getCompletedLessons(): Promise<string[]> {
  return (await db().lessons.toArray()).map((l) => l.id);
}

export async function isLessonComplete(id: string): Promise<boolean> {
  return Boolean(await db().lessons.get(id));
}

export async function markLessonComplete(id: string): Promise<void> {
  await db().lessons.put({ id, completedAt: Date.now() });
}

// --- Can-do statements ---------------------------------------------------

export async function getUnlockedCanDo(): Promise<string[]> {
  return (await db().canDo.toArray()).map((c) => c.id);
}

export async function unlockCanDo(ids: string[]): Promise<void> {
  const now = Date.now();
  await db().canDo.bulkPut(ids.map((id) => ({ id, unlockedAt: now })));
}

// --- Settings ------------------------------------------------------------

export async function getSettings(): Promise<Settings> {
  const row = await db().kv.get("settings");
  return { ...DEFAULT_SETTINGS, ...((row?.value as Partial<Settings>) ?? {}) };
}

export async function saveSettings(s: Settings): Promise<void> {
  await db().kv.put({ key: "settings", value: s });
}

// --- Streak --------------------------------------------------------------

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getStreak(): Promise<Streak> {
  const row = await db().kv.get("streak");
  return (row?.value as Streak) ?? { count: 0, lastDay: null };
}

/** Record activity today; increments the streak across consecutive days. */
export async function bumpStreak(): Promise<Streak> {
  const streak = await getStreak();
  const t = today();
  if (streak.lastDay === t) return streak; // already counted today

  const yesterday = new Date(Date.now() - 86_400_000)
    .toISOString()
    .slice(0, 10);
  const next: Streak = {
    count: streak.lastDay === yesterday ? streak.count + 1 : 1,
    lastDay: t,
  };
  await db().kv.put({ key: "streak", value: next });
  return next;
}

// --- Backup --------------------------------------------------------------

export async function exportData(): Promise<string> {
  const [cards, lessons, canDo, kv] = await Promise.all([
    db().cards.toArray(),
    db().lessons.toArray(),
    db().canDo.toArray(),
    db().kv.toArray(),
  ]);
  return JSON.stringify({ version: 1, cards, lessons, canDo, kv }, null, 2);
}

export async function importData(json: string): Promise<void> {
  const data = JSON.parse(json) as {
    cards?: StoredCard[];
    lessons?: { id: string; completedAt: number }[];
    canDo?: { id: string; unlockedAt: number }[];
    kv?: KV[];
  };
  await db().transaction(
    "rw",
    db().cards,
    db().lessons,
    db().canDo,
    db().kv,
    async () => {
      await Promise.all([
        db().cards.clear(),
        db().lessons.clear(),
        db().canDo.clear(),
        db().kv.clear(),
      ]);
      if (data.cards) await db().cards.bulkPut(data.cards);
      if (data.lessons) await db().lessons.bulkPut(data.lessons);
      if (data.canDo) await db().canDo.bulkPut(data.canDo);
      if (data.kv) await db().kv.bulkPut(data.kv);
    },
  );
}
