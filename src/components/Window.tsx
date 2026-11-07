import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";

export interface WS { open: boolean; min: boolean; max: boolean; z: number; x: number; y: number }
interface Props { title: string; icon: ReactNode; s: WS; focused: boolean; onFocus: () => void; onClose: () => void; onMin: () => void; onMax: () => void; onMove: (x: number, y: number) => void; children: ReactNode }

export function Window({ title, icon, s, focused, onFocus, onClose, onMin, onMax, onMove, children }: Props) {
  const d = useRef<{ dx: number; dy: number } | null>(null);
  const down = (e: PointerEvent<HTMLElement>) => {
    if (s.max || window.innerWidth <= 760 || (e.target as HTMLElement).closest("button")) return;
    d.current = { dx: e.clientX - s.x, dy: e.clientY - s.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLElement>) => {
    if (d.current) onMove(Math.min(window.innerWidth - 140, Math.max(0, e.clientX - d.current.dx)), Math.min(window.innerHeight - 70, Math.max(44, e.clientY - d.current.dy)));
  };
  return (
    <motion.section className={`win ${s.max ? "max" : ""} ${focused ? "focus" : ""}`} style={{ left: s.x, top: s.y, zIndex: s.z, pointerEvents: s.min ? "none" : "auto" }} aria-hidden={s.min}
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
    </motion.section>
  );
}
