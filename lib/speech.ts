// Web Speech API wrappers — free, on-device speech recognition (STT) and
// synthesis (TTS). No paid service, no API key.
//
// Browser support varies: Chrome/Edge have the best German recognition; Safari
// is partial; Firefox lacks SpeechRecognition. Every function degrades
// gracefully and reports capability so the UI can fall back to text-only.
//
// This module is browser-only — guard all calls behind `typeof window`.

const DE = "de-DE";

// --- Minimal typings for the non-standard SpeechRecognition API ----------

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}
interface SpeechRecognitionResultLike {
  0: SpeechRecognitionAlternativeLike;
  isFinal: boolean;
  length: number;
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// --- Capability detection ------------------------------------------------

export function isRecognitionSupported(): boolean {
  return getRecognitionCtor() !== null;
}

export function isSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// --- Speech recognition (STT) -------------------------------------------

export interface RecognitionHandle {
  /** Stop listening early. */
  stop: () => void;
}

export interface RecognizeCallbacks {
  /** Fired with the best final transcript. */
  onResult: (transcript: string, confidence: number) => void;
  /** Fired with interim (in-progress) transcripts, if available. */
  onInterim?: (transcript: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

/**
 * Start a single recognition pass for German. Returns a handle to stop early,
 * or null if recognition is unsupported.
 */
export function recognize(cb: RecognizeCallbacks): RecognitionHandle | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) {
    cb.onError?.("unsupported");
    return null;
  }

  const rec = new Ctor();
  rec.lang = DE;
  rec.interimResults = Boolean(cb.onInterim);
  rec.maxAlternatives = 1;
  rec.continuous = false;

  rec.onresult = (e) => {
    const results = e.results;
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const alt = r[0];
      if (r.isFinal) {
        cb.onResult(alt.transcript.trim(), alt.confidence ?? 0);
      } else {
        cb.onInterim?.(alt.transcript);
      }
    }
  };
  rec.onerror = (e) => cb.onError?.(e.error);
  rec.onend = () => cb.onEnd?.();

  try {
    rec.start();
  } catch {
    cb.onError?.("start-failed");
    return null;
  }

  return { stop: () => rec.stop() };
}

// --- Speech synthesis (TTS) ---------------------------------------------

/** Voices can load asynchronously; resolve once they're available. */
export function getGermanVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isSynthesisSupported()) return resolve([]);
    const synth = window.speechSynthesis;

    const pick = () =>
      synth.getVoices().filter((v) => v.lang.toLowerCase().startsWith("de"));

    const initial = pick();
    if (initial.length > 0) return resolve(initial);

    // Voices may not be populated yet on first call.
    const handler = () => {
      synth.onvoiceschanged = null;
      resolve(pick());
    };
    synth.onvoiceschanged = handler;
    // Safety timeout in case the event never fires.
    setTimeout(() => resolve(pick()), 1000);
  });
}

export interface SpeakOptions {
  /** Playback rate, 0.5–2 (1 = normal). Slower helps comprehension. */
  rate?: number;
  /** Specific voice to use; defaults to the first German voice. */
  voice?: SpeechSynthesisVoice;
  onEnd?: () => void;
  onError?: () => void;
}

/** Speak German text aloud. Returns false if synthesis is unsupported. */
export async function speak(
  text: string,
  options: SpeakOptions = {},
): Promise<boolean> {
  if (!isSynthesisSupported()) {
    options.onError?.();
    return false;
  }
  const synth = window.speechSynthesis;
  synth.cancel(); // never overlap utterances

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = DE;
  utter.rate = options.rate ?? 0.95;
  const voice = options.voice ?? (await getGermanVoices())[0];
  if (voice) utter.voice = voice;
  utter.onend = () => options.onEnd?.();
  utter.onerror = () => options.onError?.();

  synth.speak(utter);
  return true;
}

/** Stop any in-progress speech. */
export function cancelSpeech(): void {
  if (isSynthesisSupported()) window.speechSynthesis.cancel();
}
