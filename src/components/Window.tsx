import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, type MotionStyle } from "framer-motion";

// w / h stay undefined until the visitor resizes, so the CSS default size applies.
export interface WS { open: boolean; min: boolean; max: boolean; z: number; x: number; y: number; w?: number; h?: number }
export interface Box { x: number; y: number; w: number; h: number }
interface Props { title: string; icon: ReactNode; s: WS; focused: boolean; onFocus: () => void; onClose: () => void; onMin: () => void; onMax: () => void; onMove: (x: number, y: number) => void; onResize: (b: Box) => void; children: ReactNode }

const MIN_W = 320, MIN_H = 220, TOP = 44; // TOP = status bar height
const DIRS = ["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const;
type Dir = (typeof DIRS)[number];
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function Window({ title, icon, s, focused, onFocus, onClose, onMin, onMax, onMove, onResize, children }: Props) {
  const d = useRef<{ dx: number; dy: number } | null>(null);
  const el = useRef<HTMLElement>(null);
  const r = useRef<{ dir: Dir; px: number; py: number; x: number; y: number; w: number; h: number } | null>(null);

  const down = (e: PointerEvent<HTMLElement>) => {
    if (s.max || window.innerWidth <= 760 || (e.target as HTMLElement).closest("button")) return;
    d.current = { dx: e.clientX - s.x, dy: e.clientY - s.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLElement>) => {
    if (d.current) onMove(Math.min(window.innerWidth - 140, Math.max(0, e.clientX - d.current.dx)), Math.min(window.innerHeight - 70, Math.max(44, e.clientY - d.current.dy)));
  };

  // Resizing: each handle knows which edges it moves. Left/top handles also shift x/y so the opposite edge stays put.
  const rdown = (dir: Dir) => (e: PointerEvent<HTMLElement>) => {
    if (!el.current || e.button !== 0) return;
    e.preventDefault();
    r.current = { dir, px: e.clientX, py: e.clientY, x: s.x, y: s.y, w: el.current.offsetWidth, h: el.current.offsetHeight };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const rmove = (e: PointerEvent<HTMLElement>) => {
    const a = r.current;
    if (!a) return;
    const dx = e.clientX - a.px, dy = e.clientY - a.py;
    const maxW = window.innerWidth - 16; // matches .win { max-width: calc(100vw - 16px) }
    let { x, y, w, h } = a;
    if (a.dir.includes("e")) w = clamp(a.w + dx, MIN_W, Math.min(maxW, window.innerWidth - 8 - a.x));
    if (a.dir.includes("w")) { const right = a.x + a.w; w = clamp(a.w - dx, MIN_W, Math.min(maxW, right)); x = right - w; }
    if (a.dir.includes("s")) h = clamp(a.h + dy, MIN_H, window.innerHeight - a.y);
    if (a.dir.includes("n")) { const bottom = a.y + a.h; h = clamp(a.h - dy, MIN_H, bottom - TOP); y = bottom - h; }
    onResize({ x, y, w, h });
  };
  const rend = () => { r.current = null; };

  const style = { left: s.x, top: s.y, zIndex: s.z, pointerEvents: s.min ? "none" : "auto", ...(s.w ? { "--w": `${s.w}px` } : {}), ...(s.h ? { "--h": `${s.h}px` } : {}) } as MotionStyle;
  return (
    <motion.section ref={el} className={`win ${s.max ? "max" : ""} ${focused ? "focus" : ""}`} style={style} aria-hidden={s.min}
      initial={{ opacity: 0, scale: 0.92, y: 16 }} animate={s.min ? { opacity: 0, scale: 0.85, y: 60, transitionEnd: { visibility: "hidden" } } : { opacity: 1, scale: 1, y: 0, visibility: "visible" }} exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.18 }} onPointerDown={onFocus} role="dialog" aria-label={title}>
      <header className="bar" onPointerDown={down} onPointerMove={move} onPointerUp={() => (d.current = null)} onDoubleClick={onMax}>
        <div className="lights">
          <button className="l red" aria-label="Close" onClick={onClose} />
          <button className="l yellow" aria-label="Minimize" onClick={onMin} />
          <button className="l green" aria-label="Maximize or restore" onClick={onMax} />
        </div>
        <span className="ttl">{icon}{title}</span>
      </header>
      <div className="body">{children}</div>
      {!s.max && DIRS.map((dir) => <i key={dir} className={`rz ${dir}`} aria-hidden="true" onPointerDown={rdown(dir)} onPointerMove={rmove} onPointerUp={rend} onPointerCancel={rend} />)}
    </motion.section>
  );
}
