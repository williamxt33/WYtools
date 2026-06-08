"use client"

import { useState, useRef } from "react"
import { textToMorse, morseToText, countWord, MorsePlayer } from "@/lib/tools/converters/morseConverter"

export default function MorseCodeConverter() {
  const [textCount, setTextCount] = useState("0 words · 0 chars")
  const [text, setText] = useState("")
  const [morse, setMorse] = useState("")
  const [speedValue, setSpeedValue] = useState(1)
  const [pitchValue, setPitchValue] = useState(600)
  const [volumeValue, setVolumeValue] = useState(60)
  const [soundOn, setSoundOn] = useState(true)
  const [lightEnabled, setLightEnabled] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [lightOn, setLightOn] = useState(false)

  const playerRef = useRef(new MorsePlayer())

  const playOpts = {
    sound: soundOn,
    light: lightEnabled,
    onLight: (on: boolean) => setLightOn(on),
    onDone: () => { setIsPlaying(false); setIsPaused(false) },
  }

  function handlePlay() {
    playerRef.current.play(morse, playOpts)
    setIsPlaying(true)
    setIsPaused(false)
  }

  function handlePause() {
    playerRef.current.pause(playOpts)
    setIsPlaying(false)
    setIsPaused(true)
  }

  function handleResume() {
    playerRef.current.resume()
    setIsPlaying(true)
    setIsPaused(false)
  }

  function handleStop() {
    playerRef.current.stop()
    setIsPlaying(false)
    setIsPaused(false)
    setLightOn(false)
  }

  return (
    <section className="max-w-4xl mx-auto py-6 flex flex-col gap-6">

      {/* ── Converter ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">Text</span>
          <textarea
            value={text}
            rows={6}
            placeholder="Type text here..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            onChange={(e) => {
              const converted = textToMorse(e.target.value)
              setText(e.target.value)
              setMorse(converted)
              setTextCount(countWord(e.target.value))
            }}
          />
          <div className="flex items-center justify-between text-xs text-muted px-1">
            <span>{textCount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted">Morse Code</span>
          <textarea
            value={morse}
            rows={6}
            placeholder="Morse code appears here..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition font-mono"
            onChange={(e) => {
              const converted = morseToText(e.target.value)
              setMorse(e.target.value)
              setText(converted)
              setTextCount(countWord(converted))
            }}
          />
          <div className="flex items-center justify-between text-xs text-muted px-1">
            <span>{countWord(morse)}</span>
          </div>
        </div>
      </div>

      {/* ── Playback ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border bg-background px-5 py-4">
        <div className="flex flex-col items-center gap-1">
          <div className={`w-12 h-12 rounded-full border-2 transition-colors duration-75 ${lightOn && lightEnabled ? "bg-primary border-primary shadow-[0_0_12px_rgba(37,99,235,0.6)]" : "bg-[#f1f5f9] border-border shadow-inner"}`} />
          <span className="text-[0.65rem] uppercase tracking-widest text-muted">Light</span>
        </div>

        <div className="flex-1 flex flex-wrap justify-center sm:justify-start gap-2">
          <button
            onClick={!isPlaying && !isPaused ? handlePlay : isPaused ? handleResume : undefined}
            disabled={isPlaying || !morse.trim()}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-primary hover:bg-primary-hover"
          >
            ▶ {isPaused ? "Resume" : "Play"}
          </button>
          <button
            onClick={isPlaying ? handlePause : undefined}
            disabled={!isPlaying}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-sm font-medium text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-gray-100"
          >
            ⏸ Pause
          </button>
          <button
            onClick={isPlaying || isPaused ? handleStop : undefined}
            disabled={!isPlaying && !isPaused}
            className="flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-sm font-medium text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent hover:bg-gray-100"
          >
            ■ Stop
          </button>
        </div>
      </div>

      {/* ── Playback Options ──────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-background px-5 py-4 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-foreground">Playback Options</h2>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
            <input
              type="checkbox"
              checked={lightEnabled}
              onChange={(e) => setLightEnabled(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
            Light
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
            <input
              type="checkbox"
              checked={soundOn}
              onChange={(e) => setSoundOn(e.target.checked)}
              className="accent-primary w-4 h-4"
            />
            Sound
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-14 shrink-0">Speed</span>
            <input
              type="range" min={0.5} max={3} step={0.1} value={speedValue}
              onChange={(e) => { const v = Number(e.target.value); setSpeedValue(v); playerRef.current.updateSettings({ speed: v }) }}
              className="flex-1 accent-primary"
            />
            <span className="text-xs text-muted w-8 text-right">{speedValue}x</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-14 shrink-0">Pitch</span>
            <input
              type="range" min={300} max={800} step={10} value={pitchValue}
              onChange={(e) => { const v = Number(e.target.value); setPitchValue(v); playerRef.current.updateSettings({ pitch: v }) }}
              className="flex-1 accent-primary"
            />
            <span className="text-xs text-muted w-12 text-right">{pitchValue} Hz</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted w-14 shrink-0">Volume</span>
            <input
              type="range" min={0} max={100} value={volumeValue}
              onChange={(e) => { const v = Number(e.target.value); setVolumeValue(v); playerRef.current.updateSettings({ volume: v }) }}
              className="flex-1 accent-primary"
            />
            <span className="text-xs text-muted w-8 text-right">{volumeValue}%</span>
          </div>
        </div>
      </div>

      {/* ── Reference ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-background px-5 py-4 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-foreground">Reference</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Timing</h4>
            {["Dot (.) = 1 unit", "Dash (-) = 3 units", "Parts gap = 1 unit", "Letter gap = 3 units", "Word gap = 7 units"].map((t) => (
              <div key={t} className="text-xs text-foreground py-0.75">• {t}</div>
            ))}
          </div>

          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Letters A–I</h4>
            {[["A",".-"],["B","-..."],["C","-.-."],["D","-.."],["E","."],["F","..-."],["G","--."],["H","...."],["I",".."]].map(([l,c]) => (
              <div key={l} className="flex items-center justify-between px-2 py-0.75 rounded hover:bg-primary-light transition-colors">
                <span className="text-xs font-semibold text-foreground w-4">{l}</span>
                <span className="text-xs font-mono text-primary">{c}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Letters J–R</h4>
            {[["J",".---"],["K","-.-"],["L",".-.."],["M","--"],["N","-."],["O","---"],["P",".--."],["Q","--.-"],["R",".-."]].map(([l,c]) => (
              <div key={l} className="flex items-center justify-between px-2 py-0.75 rounded hover:bg-primary-light transition-colors">
                <span className="text-xs font-semibold text-foreground w-4">{l}</span>
                <span className="text-xs font-mono text-primary">{c}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Letters S–Z</h4>
            {[["S","..."],["T","-"],["U","..-"],["V","...-"],["W",".--"],["X","-..-"],["Y","-.--"],["Z","--.."]].map(([l,c]) => (
              <div key={l} className="flex items-center justify-between px-2 py-0.75 rounded hover:bg-primary-light transition-colors">
                <span className="text-xs font-semibold text-foreground w-4">{l}</span>
                <span className="text-xs font-mono text-primary">{c}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Numbers 0–9</h4>
            {[["0","-----"],["1",".----"],["2","..---"],["3","...--"],["4","....-"],["5","....."],["6","-...."],["7","--..."],["8","---.."],["9","----."]].map(([l,c]) => (
              <div key={l} className="flex items-center justify-between px-2 py-0.75 rounded hover:bg-primary-light transition-colors">
                <span className="text-xs font-semibold text-foreground w-4">{l}</span>
                <span className="text-xs font-mono text-primary">{c}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  )
}
