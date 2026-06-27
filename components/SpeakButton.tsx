"use client";

import { useEffect, useState } from "react";
import {
  cancelSpeech,
  getGermanVoices,
  isSynthesisSupported,
  speak,
} from "@/lib/speech";
import { getSettings } from "@/lib/progress";

// Cache voices/settings across button instances so we don't refetch per click.
let cachedRate = 0.95;
let cachedVoiceURI: string | null = null;
let voicesLoaded: SpeechSynthesisVoice[] | null = null;
let settingsLoaded = false;

async function ensureSettings() {
  if (settingsLoaded) return;
  try {
    const s = await getSettings();
    cachedRate = s.speechRate;
    cachedVoiceURI = s.voiceURI;
  } catch {
    /* defaults are fine */
  }
  settingsLoaded = true;
}

export function SpeakButton({
  text,
  label = "Listen",
  className = "btn-secondary",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(isSynthesisSupported());
    return () => cancelSpeech();
  }, []);

  async function play() {
    await ensureSettings();
    if (!voicesLoaded) voicesLoaded = await getGermanVoices();
    const voice =
      voicesLoaded.find((v) => v.voiceURI === cachedVoiceURI) ??
      voicesLoaded[0];
    setSpeaking(true);
    await speak(text, {
      rate: cachedRate,
      voice,
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={play}
      className={className}
      aria-label={`${label}: ${text}`}
    >
      <span aria-hidden>{speaking ? "🔊" : "▶︎"}</span>
      {label}
    </button>
  );
}
