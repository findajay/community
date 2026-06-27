// Content registry — the single import point for all learning content.
//
// Adding a new unit, scenario, or grammar note is a content-only change: add
// the data file and register it here. The app code never hard-codes content.

import type {
  CanDoStatement,
  GrammarNote,
  Lesson,
  Scenario,
  Unit,
} from "./schema";

import { unit01 } from "./units/unit-01";
import { a2Grammar } from "./grammar/a2";
import { cafeScenario } from "./scenarios/cafe";
import { vorstellenScenario } from "./scenarios/vorstellen";
import { canDoStatements } from "./cando";

export const units: Unit[] = [unit01];

export const grammarNotes: GrammarNote[] = [...a2Grammar];

export const scenarios: Scenario[] = [vorstellenScenario, cafeScenario];

export const canDo: CanDoStatement[] = canDoStatements;

// --- Lookup helpers ------------------------------------------------------

/** Every lesson across all units, in curriculum order. */
export const allLessons: Lesson[] = units.flatMap((u) => u.lessons);

const lessonById = new Map(allLessons.map((l) => [l.id, l]));
const unitByLessonId = new Map(
  units.flatMap((u) => u.lessons.map((l) => [l.id, u] as const)),
);
const unitById = new Map(units.map((u) => [u.id, u]));
const scenarioById = new Map(scenarios.map((s) => [s.id, s]));
const grammarById = new Map(grammarNotes.map((g) => [g.id, g]));
const canDoById = new Map(canDo.map((c) => [c.id, c]));

export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}
export function getUnit(id: string): Unit | undefined {
  return unitById.get(id);
}
export function getUnitForLesson(id: string): Unit | undefined {
  return unitByLessonId.get(id);
}
export function getScenario(id: string): Scenario | undefined {
  return scenarioById.get(id);
}
export function getGrammar(id: string): GrammarNote | undefined {
  return grammarById.get(id);
}
export function getCanDo(id: string): CanDoStatement | undefined {
  return canDoById.get(id);
}

/** Total distinct vocab items across the curriculum (for progress stats). */
export const totalVocabCount = new Set(
  allLessons.flatMap((l) => l.vocab.map((v) => v.id)),
).size;

/**
 * A unit is unlocked when all its prerequisite units are fully complete.
 * `completedLessonIds` is the set the learner has finished.
 */
export function isUnitUnlocked(
  unit: Unit,
  completedLessonIds: Set<string>,
): boolean {
  return unit.prerequisites.every((prereqId) => {
    const prereq = unitById.get(prereqId);
    if (!prereq) return true;
    return prereq.lessons.every((l) => completedLessonIds.has(l.id));
  });
}
