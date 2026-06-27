"use client";

// Diagnostic page — de-risks the Web Speech API end to end. Confirms German
// TTS plays and German STT returns a transcript. Linked from nowhere in the
// main flow; visit /voice-test directly.

import { useEffect, useState } from "react";
import {
  isRecognitionSupported,
  isSynthesisSupported,
} from "@/lib/speech";
import { SpeakButton } from "@/components/SpeakButton";
import { MicButton } from "@/components/MicButton";
import { scorePronunciation } from "@/lib/pronunciation";

const TARGET = "Ich hätte gern einen Kaffee, bitte.";

export default function VoiceTest() {
  const [tts, setTts] = useState(false);
  const [stt, setStt] = useState(false);
  const [heard, setHeard] = useState("");

  useEffect(() => {
    setTts(isSynthesisSupported());
    setStt(isRecognitionSupported());
  }, []);

  const result = heard ? scorePronunciation(TARGET, heard) : null;

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-2xl font-bold">Voice diagnostics</h1>

      <ul className="mb-6 space-y-1 text-sm">
        <li>{tts ? "✅" : "❌"} Speech synthesis (TTS) supported</li>
        <li>{stt ? "✅" : "❌"} Speech recognition (STT) supported</li>
      </ul>

      <section className="card mb-4">
        <p className="mb-2 font-semibold">1. Hear German</p>
        <p className="mb-2 text-lg">{TARGET}</p>
        <SpeakButton text={TARGET} label="Play" />
      </section>

      <section className="card">
        <p className="mb-2 font-semibold">2. Say it back</p>
        <p className="mb-3 text-sm text-ink/50">
          Tap the mic, grant permission, and read the sentence aloud.
        </p>
        <MicButton onTranscript={setHeard} label="Record" />
        {heard && (
          <div className="mt-3">
            <p className="text-sm text-ink/60">
              Heard: <span className="italic">“{heard}”</span>
            </p>
            {result && (
              <p className="mt-1 text-sm">
                Pronunciation score:{" "}
                <span className="font-bold">{result.score}/100</span> (
                {result.band})
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
