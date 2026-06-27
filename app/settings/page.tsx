"use client";

import { useEffect, useRef, useState } from "react";
import {
  exportData,
  getSettings,
  importData,
  saveSettings,
  type Settings,
} from "@/lib/progress";
import { getGermanVoices, isSynthesisSupported, speak } from "@/lib/speech";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [savedMsg, setSavedMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      setSettings(await getSettings());
      if (isSynthesisSupported()) setVoices(await getGermanVoices());
    })();
  }, []);

  if (!settings) return <p className="text-ink/50">Loading…</p>;

  function update(patch: Partial<Settings>) {
    setSettings((s) => (s ? { ...s, ...patch } : s));
  }

  async function persist() {
    if (!settings) return;
    await saveSettings(settings);
    setSavedMsg("Saved ✓");
    setTimeout(() => setSavedMsg(""), 1500);
  }

  function preview() {
    const voice = voices.find((v) => v.voiceURI === settings?.voiceURI);
    speak("Guten Tag! Ich helfe dir, Deutsch zu lernen.", {
      rate: settings?.speechRate,
      voice,
    });
  }

  async function doExport() {
    const json = await exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fliessend-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function doImport(file: File) {
    const text = await file.text();
    try {
      await importData(text);
      setSavedMsg("Imported ✓ — reload to see changes");
    } catch {
      setSavedMsg("Import failed — invalid file");
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-[28px] font-normal leading-tight">Settings</h1>

      <section className="card mb-5">
        <h2 className="mb-3 font-semibold">Voice</h2>

        {!isSynthesisSupported() ? (
          <p className="text-sm text-ink/50">
            Speech synthesis isn&apos;t available in this browser.
          </p>
        ) : (
          <>
            <label className="block text-sm">
              German voice
              <select
                value={settings.voiceURI ?? ""}
                onChange={(e) =>
                  update({ voiceURI: e.target.value || null })
                }
                className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2"
              >
                <option value="">Default</option>
                {voices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-sm">
              Speaking speed: {settings.speechRate.toFixed(2)}×
              <input
                type="range"
                min={0.5}
                max={1.3}
                step={0.05}
                value={settings.speechRate}
                onChange={(e) =>
                  update({ speechRate: Number(e.target.value) })
                }
                className="mt-1 w-full"
              />
            </label>

            <button onClick={preview} className="btn-secondary mt-3 text-sm">
              ▶︎ Preview voice
            </button>
          </>
        )}
      </section>

      <section className="card mb-5">
        <h2 className="mb-3 font-semibold">Daily goal</h2>
        <label className="block text-sm">
          Target items per session
          <input
            type="number"
            min={5}
            max={100}
            value={settings.dailyGoal}
            onChange={(e) => update({ dailyGoal: Number(e.target.value) })}
            className="mt-1 w-24 rounded-lg border border-ink/20 px-3 py-2"
          />
        </label>
      </section>

      <div className="mb-6 flex items-center gap-3">
        <button onClick={persist} className="btn-primary">
          Save settings
        </button>
        {savedMsg && <span className="text-sm text-success">{savedMsg}</span>}
      </div>

      <section className="card">
        <h2 className="mb-1 font-semibold">Your data</h2>
        <p className="mb-3 text-sm text-ink/50">
          Everything is stored on this device only. Back it up or move it to
          another device.
        </p>
        <div className="flex flex-wrap gap-2">
          <button onClick={doExport} className="btn-secondary text-sm">
            Export backup
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="btn-secondary text-sm"
          >
            Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) doImport(f);
            }}
          />
        </div>
      </section>
    </div>
  );
}
