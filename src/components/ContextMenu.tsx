import { useLayoutEffect, useRef, useState } from "react";

export interface MenuItem { label: string; hint?: string; run: () => void }

// Right-click menu. After it renders we measure it and shift it back inside the screen,
// so opening it near the right or bottom edge no longer pushes it off the page.
export function ContextMenu({ x, y, items }: { x: number; y: number; items: MenuItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState({ left: x, top: y });
  useLayoutEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ left: Math.max(8, Math.min(x, window.innerWidth - r.width - 8)), top: Math.max(8, Math.min(y, window.innerHeight - r.height - 8)) });
  }, [x, y]);
  return (
    <ul ref={ref} className="ctx" role="menu" style={pos}>
      {items.map((it) => <li key={it.label} role="none"><button role="menuitem" onClick={it.run}>{it.label}{it.hint && <small>{it.hint}</small>}</button></li>)}
    </ul>
  );
}
