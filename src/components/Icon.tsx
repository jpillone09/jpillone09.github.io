// Custom duotone icon set. Strokes use currentColor (ink) and "acc" shapes use --accent,
// so every icon re-colors automatically in light and dark mode.
const P = {
  user: <><circle className="acc" cx="12" cy="8" r="4" /><path className="acc" d="M4 20.5c0-3.8 3.6-6 8-6s8 2.2 8 6z" /></>,
  briefcase: <><path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" /><rect className="acc" x="3" y="8" width="18" height="12" rx="3" /><path d="M3 13.5h18" /><rect x="10.5" y="12" width="3" height="3" rx="1" fill="currentColor" stroke="none" /></>,
  book: <><path className="acc" d="M12 7c-1.6-1.4-3.8-2-7-2v13c3.2 0 5.4.6 7 2z" /><path className="acc" d="M12 7c1.6-1.4 3.8-2 7-2v13c-3.2 0-5.4.6-7 2z" /></>,
  mail: <><rect className="acc" x="3" y="5.5" width="18" height="13" rx="3" /><path d="M4.5 8.5l7.5 5.5 7.5-5.5" /></>,
  github: <path className="acc" d="M5 4.5l3 2.2a8 8 0 0 1 8 0l3-2.2c.4 1.4.4 2.8 0 4 .8 1 1.2 2.1 1.2 3.4 0 4.6-3.3 6.4-6.2 6.8.3.4.5 1 .5 1.8V21H9.5v-.3c0-.8.2-1.4.5-1.8C7.1 18.5 3.8 16.7 3.8 12.1c0-1.3.4-2.4 1.2-3.4-.4-1.2-.4-2.6 0-4.2z" />,
  linkedin: <><rect className="acc" x="3" y="3" width="18" height="18" rx="4.5" /><circle cx="8" cy="8.2" r="1.2" fill="currentColor" stroke="none" /><rect x="7" y="10.5" width="2" height="6.5" fill="currentColor" stroke="none" /><path d="M11.5 17v-6.5h2v1c.5-.8 1.4-1.2 2.4-1.2 1.8 0 2.6 1.1 2.6 3V17h-2v-3.4c0-.9-.4-1.4-1.2-1.4s-1.4.5-1.4 1.5V17z" fill="currentColor" stroke="none" /></>,
  facebook: <><rect className="acc" x="3" y="3" width="18" height="18" rx="4.5" /><path d="M13.5 20v-6.5h2.2l.4-2.6h-2.6V9.3c0-.8.3-1.3 1.4-1.3h1.3V5.7c-.3 0-1.1-.1-2-.1-2 0-3.3 1.2-3.3 3.4v2h-2.2v2.6h2.2V20z" fill="currentColor" stroke="none" /></>,
  wifi: <><path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.500 8.500 0 0 1 12 0M9 16.500a4 4 0 0 1 6 0" /><circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" /></>,
  battery: <><rect x="2.5" y="7.5" width="17" height="9" rx="2.5" /><rect className="acc" x="4.5" y="9.5" width="10" height="5" rx="1" /><path d="M21.5 11v2" /></>,
  sun: <><circle className="acc" cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>,
  moon: <path className="acc" d="M20 14.4A8.500 8.500 0 1 1 9.600 4 7 7 0 0 0 20 14.400z" />,
  folder: <path className="acc" d="M3 7.500A2.500 2.500 0 0 1 5.500 5H10l2 2.500h6.500A2.500 2.500 0 0 1 21 10v7.500a2.500 2.500 0 0 1-2.500 2.500h-13A2.500 2.500 0 0 1 3 17.500z" />,
  award: <><path d="M8.500 13.500L7 21l5-2.500 5 2.500-1.500-7.500" /><circle className="acc" cx="12" cy="9" r="5.500" /></>,
  cap: <><path className="acc" d="M12 5L2.500 10 12 15l9.500-5z" /><path d="M6 12.500V17c0 1.500 3 3 6 3s6-1.500 6-3v-4.500" /></>,
  leaf: <><path className="acc" d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" /><path d="M5 19l8-8" /></>,
  music: <><path d="M9 17V6l10-2v11" /><circle className="acc" cx="7" cy="17" r="2.5" /><circle className="acc" cx="17" cy="15" r="2.5" /></>,
  doc: <><path className="acc" d="M6 3.5h8.5L19 8v12.5H6z" /><path d="M14.5 3.5V8H19M9 13h7M9 16.5h5" /></>,
  download: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
  volume: <><path className="acc" d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z" /><path d="M15.500 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11" /></>,
  mute: <><path className="acc" d="M4 9.5v5h3.5l4.5 4v-13l-4.5 4z" /><path d="M16 9.500l5 5M21 9.500l-5 5" /></>,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
  search: <><circle className="acc" cx="11" cy="11" r="6.500" /><path d="M16 16l4.500 4.500" /></>,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
};
export type IconName = keyof typeof P;
export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{P[name]}</svg>;
}
