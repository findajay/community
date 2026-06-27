// Branching-conversation engine.
//
// A scenario is a graph of nodes. At each node the NPC says something and the
// learner replies (typed or spoken). We match the reply against the node's
// ordered patterns; the first match advances the conversation. If nothing
// matches we go to the node's fallback (a re-prompt) or stay put with a hint.
//
// All matching is on normalized text — no AI, fully deterministic.

import type { ResponsePattern, Scenario, ScenarioNode } from "@/content/schema";
import { normalize, tokenize } from "./text";

export interface MatchResult {
  /** The node to display next. */
  nextNodeId: string;
  /** Whether a real pattern matched (vs. falling back / staying). */
  matched: boolean;
  /** Optional feedback to show from the matched pattern. */
  feedback?: string;
  /** True when the conversation has reached a terminal node. */
  done: boolean;
}

export function getNode(scenario: Scenario, nodeId: string): ScenarioNode {
  const node = scenario.nodes.find((n) => n.id === nodeId);
  if (!node) {
    throw new Error(`Scenario "${scenario.id}" has no node "${nodeId}"`);
  }
  return node;
}

/** Does a single pattern match the (raw) learner reply? */
export function patternMatches(
  pattern: ResponsePattern,
  reply: string,
): boolean {
  const norm = normalize(reply);
  if (norm.length === 0) return false;

  if (pattern.regex) {
    try {
      if (new RegExp(pattern.regex, "i").test(norm)) return true;
    } catch {
      // A malformed authored regex should never crash the lesson.
    }
  }

  if (pattern.keywords && pattern.keywords.length > 0) {
    const tokens = new Set(tokenize(reply));
    // Every keyword must be present (each keyword may itself be multi-word).
    return pattern.keywords.every((kw) => {
      const kwTokens = tokenize(kw);
      return kwTokens.every((t) => tokens.has(t));
    });
  }

  return false;
}

/**
 * Advance the conversation from `node` given the learner's `reply`.
 *
 * Returns where to go next and whether a genuine branch matched. When no
 * pattern matches, the result points at the fallback node if defined,
 * otherwise it stays on the same node so the UI can show a hint.
 */
export function advance(
  scenario: Scenario,
  node: ScenarioNode,
  reply: string,
): MatchResult {
  for (const pattern of node.patterns) {
    if (patternMatches(pattern, reply)) {
      const nextNode = getNode(scenario, pattern.next);
      return {
        nextNodeId: pattern.next,
        matched: true,
        feedback: pattern.feedback,
        done: Boolean(nextNode.terminal),
      };
    }
  }

  if (node.fallback) {
    const fb = getNode(scenario, node.fallback);
    return {
      nextNodeId: node.fallback,
      matched: false,
      done: Boolean(fb.terminal),
    };
  }

  // No match and no fallback: stay on this node (UI surfaces the hint).
  return { nextNodeId: node.id, matched: false, done: false };
}
