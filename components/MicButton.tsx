"use client";

import { useEffect, useRef, useState } from "react";
import {
  isRecognitionSupported,
  recognize,
  type RecognitionHandle,
} from "@/lib/speech";

/**
 * A microphone button that captures one German utterance and returns the
 * recognized transcript. Falls back to nothing (renders a hint) when the
 * browser lacks speech recognition — callers should also offer a text input.
 */
export function MicButton({
  onTranscript,
  label = "Speak",
}: {
  onTranscript: (transcript: string) => void;
  label?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handle = useRef<RecognitionHandle | null>(null);

  useEffect(() => {
    setSupported(isRecognitionSupported());
    return () => handle.current?.stop();
  }, []);

  function start() {
    setError(null);
    setInterim("");
    setListening(true);
    handle.current = recognize({
      onResult: (transcript) => {
        setInterim("");
        onTranscript(transcript);
      },
      onInterim: (t) => setInterim(t),
      onError: (e) => {
        setError(
          e === "not-allowed"
            ? "Microphone permission denied."
            : e === "no-speech"
              ? "Didn't catch that — try again."
              : "Speech recognition error.",
        );
        setListening(false);
      },
      onEnd: () => setListening(false),
    });
  }

  function stop() {
    handle.current?.stop();
    setListening(false);
  }

  if (!supported) {
    return (
      <p className="text-xs text-ink/50">
        🎤 Voice input isn&apos;t available in this browser — type your answer
        instead. (Chrome or Edge give the best German recognition.)
      </p>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={listening ? stop : start}
        className={listening ? "btn-primary animate-pulse" : "btn-secondary"}
      >
        <span aria-hidden>🎤</span>
        {listening ? "Listening… (tap to stop)" : label}
      </button>
      {interim && <p className="text-sm italic text-ink/50">“{interim}”</p>}
      {error && <p className="text-sm text-brand">{error}</p>}
    </div>
  );
}
