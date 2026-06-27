// Shared text-normalization helpers used by pronunciation scoring and the
// scenario matcher. Kept pure and dependency-free.

/**
 * Normalize German text for comparison:
 * - lowercase
 * - expand umlauts/ß to ASCII equivalents (ä→ae, ö→oe, ü→ue, ß→ss)
 * - strip punctuation
 * - collapse whitespace
 *
 * Expansion (rather than diacritic stripping) means a learner who types/says
 * "Gruesse" is treated the same as "Grüße", which is the forgiving behaviour
 * we want for self-study.
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip any remaining combining marks
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalize then split into tokens. Empty input yields an empty array. */
export function tokenize(input: string): string[] {
  const n = normalize(input);
  return n.length === 0 ? [] : n.split(" ");
}

/** Levenshtein edit distance between two strings (iterative DP). */
export function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let curr = new Array<number>(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1, // deletion
        curr[j - 1] + 1, // insertion
        prev[j - 1] + cost, // substitution
      );
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

/** Similarity ratio in [0, 1] derived from edit distance. */
export function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - editDistance(a, b) / maxLen;
}
