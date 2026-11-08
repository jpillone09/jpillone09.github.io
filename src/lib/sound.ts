// Soft synthesized sounds (no audio files): pentatonic notes, gentle attack, low volume.
type Ctor = typeof AudioContext;
let ctx: AudioContext | null = null;
let muted = false;
try { muted = localStorage.getItem("muted") === "1"; } catch { /* ignore */ }

function ac() {
  if (!ctx) { const A: Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: Ctor }).webkitAudioContext; ctx = new A(); }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}
function tone(freq: number, at: number, dur: number, vol = 0.09, type: OscillatorType = "sine", glideTo?: number) {
  const c = ac(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.05);
}
const S = {
  click: () => tone(880, 0, 0.07, 0.05, "triangle", 660),
  open: () => { tone(659.25, 0, 0.18); tone(880, 0.07, 0.26); },
  close: () => { tone(880, 0, 0.14, 0.07); tone(587.33, 0.06, 0.22, 0.07); },
  min: () => tone(660, 0, 0.22, 0.07, "sine", 330),
  max: () => { tone(523.25, 0, 0.12, 0.07); tone(783.99, 0.06, 0.2, 0.07); },
  light: () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.06, 0.35, 0.06)),
  dark: () => [783.99, 659.25, 523.25, 392].forEach((f, i) => tone(f, i * 0.07, 0.4, 0.06)),
  boot: () => [392, 523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.16, 0.9, 0.07)),
};
export type SoundName = keyof typeof S;
export const isMuted = () => muted;
export function setMuted(m: boolean) { muted = m; try { localStorage.setItem("muted", m ? "1" : "0"); } catch { /* ignore */ } }
export function play(name: SoundName) {
  if (muted) return;
  // Browsers block audio until the visitor has interacted with the page.
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
  if (ua && !ua.hasBeenActive) return;
  try { S[name](); } catch { /* audio unavailable */ }
}
