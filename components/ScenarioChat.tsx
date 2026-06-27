"use client";

import { useEffect, useRef, useState } from "react";
import type { Scenario, ScenarioNode } from "@/content/schema";
import { advance, getNode } from "@/lib/scenario-engine";
import { SpeakButton } from "./SpeakButton";
import { MicButton } from "./MicButton";

interface Turn {
  who: "npc" | "me";
  text: string;
  sub?: string; // English subtitle / feedback
}

export function ScenarioChat({
  scenario,
  onDone,
}: {
  scenario: Scenario;
  onDone?: () => void;
}) {
  const [node, setNode] = useState<ScenarioNode>(() =>
    getNode(scenario, scenario.startNode),
  );
  const [turns, setTurns] = useState<Turn[]>(() => [
    {
      who: "npc",
      text: getNode(scenario, scenario.startNode).npc,
      sub: getNode(scenario, scenario.startNode).npcEn,
    },
  ]);
  const [reply, setReply] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [turns]);

  function submit(text: string) {
    if (!text.trim() || done) return;
    const result = advance(scenario, node, text);
    const next = getNode(scenario, result.nextNodeId);

    setTurns((t) => {
      const added: Turn[] = [{ who: "me", text }];
      if (result.feedback) added.push({ who: "npc", text: result.feedback });
      // Only show the next NPC prompt when we actually moved on.
      if (result.matched || node.fallback) {
        added.push({ who: "npc", text: next.npc, sub: next.npcEn });
      }
      return [...t, ...added];
    });

    setReply("");
    setShowHint(false);

    if (result.matched) {
      setAttempts(0);
    } else {
      setAttempts((a) => a + 1);
      setShowHint(true);
    }

    if (result.done) {
      setDone(true);
      onDone?.();
    } else {
      setNode(next);
    }
  }

  return (
    <div className="card">
      <p className="mb-3 rounded-lg bg-brand-soft/40 p-3 text-sm text-ink/70">
        {scenario.setup}
      </p>

      <div className="mb-4 max-h-80 space-y-3 overflow-y-auto pr-1">
        {turns.map((turn, i) => (
          <div
            key={i}
            className={`flex ${turn.who === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                turn.who === "me"
                  ? "bg-brand text-white"
                  : "bg-paper border border-ink/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{turn.text}</span>
                {turn.who === "npc" && (
                  <SpeakButton
                    text={turn.text}
                    label=""
                    className="text-base"
                  />
                )}
              </div>
              {turn.sub && (
                <p
                  className={`mt-0.5 text-xs ${
                    turn.who === "me" ? "text-white/70" : "text-ink/40"
                  }`}
                >
                  {turn.sub}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {!done ? (
        <>
          {showHint && node.hint && (
            <p className="mb-2 text-sm text-warn">💡 {node.hint}</p>
          )}
          {attempts >= 2 && node.sample && (
            <p className="mb-2 text-sm text-ink/50">
              Try saying:{" "}
              <span className="font-medium text-ink">{node.sample}</span>
            </p>
          )}

          <div className="flex flex-col gap-2">
            <MicButton onTranscript={(t) => submit(t)} label="Speak your reply" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(reply);
              }}
              className="flex gap-2"
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="…or type your reply in German"
                autoComplete="off"
                className="flex-1 rounded-lg border border-ink/20 px-3 py-2"
              />
              <button type="submit" className="btn-primary">
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <p className="rounded-lg bg-success/10 p-3 text-center font-medium text-success">
          ✓ Conversation complete — well done!
        </p>
      )}
    </div>
  );
}
