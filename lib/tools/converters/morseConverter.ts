const morseCode: Record<string, string>= {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', ' ': '/'
};

export function textToMorse(text: string): string{
  return text.toUpperCase()
             .split(" ")
             .map(word => (
              word.split("")
                  .map(char => morseCode[char] ?? "?")
                  .join(" ")
             ))
             .join(" / ")
}

export function morseToText(code: string): string{
  const reversedMorseCode: Record<string, string> = Object.fromEntries(Object.entries(morseCode).map(([l, c]) => [c, l]))

  return code.split(" / ")
             .map(c => (
              c.split(" ")
                  .map(char => (reversedMorseCode[char] ?? "?"))
                  .join("")
             ))
             .join(" ")
}

export function countWord(text: string): string{
  if (text === "") {
    return "0 words · 0 chars"
  }

  const words = text.split(/\s+/).length
  const letters = text.replace(/\s+/g, "").length

  return `${words} words · ${letters} chars`
}

// Playback

export type PlayerSettings = {
  speed: number   // 0.1–10, default 1
  pitch: number   // Hz, 300–800
  volume: number  // 0–100
}

export type PlayerOptions = {
  sound: boolean
  light: boolean
  onLight: (on: boolean) => void
  onDone: () => void
}

export class MorsePlayer {
  private ctx: AudioContext | null = null
  private stopFlag = false
  private pauseFlag = false
  private resumeResolve: (() => void) | null = null
  settings: PlayerSettings = { speed: 1, pitch: 600, volume: 60 }

  updateSettings(s: Partial<PlayerSettings>): void {
    Object.assign(this.settings, s)
  }

  play(morse: string, opts: PlayerOptions): void {
    this.stop()
    if (!morse.trim()) return
    this.stopFlag = false
    this.pauseFlag = false
    this.ctx = new AudioContext()
    this.run(morse, opts).catch(() => {})
  }

  pause(opts: PlayerOptions): void {
    if (this.stopFlag || this.pauseFlag) return
    this.pauseFlag = true
    if (opts.light) opts.onLight(false)
  }

  resume(): void {
    if (!this.pauseFlag) return
    this.pauseFlag = false
    this.resumeResolve?.()
    this.resumeResolve = null
  }

  stop(): void {
    this.stopFlag = true
    this.pauseFlag = false
    this.resumeResolve?.()
    this.resumeResolve = null
    this.ctx?.close()
    this.ctx = null
  }

  private async run(morse: string, opts: PlayerOptions): Promise<void> {
    for (let i = 0; i < morse.length; i++) {
      if (this.stopFlag) break

      // wait while paused
      if (this.pauseFlag) {
        await new Promise<void>(res => { this.resumeResolve = res })
      }
      if (this.stopFlag) break

      const unit = 100 / Math.max(0.1, this.settings.speed)
      const ch = morse[i]

      if (ch === ".") {
        if (opts.light) opts.onLight(true)
        if (opts.sound) this.tone(unit)
        await this.sleep(unit)
        if (opts.light) opts.onLight(false)
        await this.sleep(unit)
      } else if (ch === "-") {
        if (opts.light) opts.onLight(true)
        if (opts.sound) this.tone(3 * unit)
        await this.sleep(3 * unit)
        if (opts.light) opts.onLight(false)
        await this.sleep(unit)
      } else if (ch === " ") {
        await this.sleep(3 * unit)
      } else if (ch === "/") {
        await this.sleep(7 * unit)
      }
    }

    if (!this.stopFlag) {
      if (opts.light) opts.onLight(false)
      opts.onDone()
    }
    this.ctx?.close()
    this.ctx = null
  }

  private tone(ms: number): void {
    if (!this.ctx) return
    const { pitch, volume } = this.settings
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.connect(gain)
    gain.connect(this.ctx.destination)
    osc.type = "sine"
    osc.frequency.value = pitch
    // volume 0-100 → gain 0-2.0 so slider top is genuinely loud
    const vol = (volume / 100) * 2
    const dur = ms / 1000
    // small lookahead so scheduled times are never in the past
    const start = this.ctx.currentTime + 0.005
    const fade = Math.min(0.005, dur * 0.15)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(vol, start + fade)
    gain.gain.setValueAtTime(vol, start + dur - fade)
    gain.gain.linearRampToValueAtTime(0, start + dur)
    osc.start(start)
    osc.stop(start + dur)
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}