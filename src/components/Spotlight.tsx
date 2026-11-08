import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Icon, type IconName } from "./Icon";
import { mod } from "../lib/keys";

export interface SpotItem {
  id: string; label: string; kind: string; hint?: string; keywords?: string;
  icon?: IconName; img?: string;
  idle?: boolean; // shown before the visitor types anything
  run: () => void;
}

// Every word typed must match somewhere; a match at the start of the label ranks highest.
function score(it: SpotItem, q: string) {
  const label = it.label.toLowerCase();
  const hay = `${label} ${it.hint ?? ""} ${it.kind} ${it.keywords ?? ""}`.toLowerCase();
  let s = 0;
  for (const t of q.split(/\s+/).filter(Boolean)) {
    if (label.startsWith(t)) s += 100;
    else if (label.split(/[\s\-–_.]+/).some((w) => w.startsWith(t))) s += 60;
    else if (label.includes(t)) s += 40;
    else if (hay.includes(t)) s += 15;
    else return -1;
  }
  return s;
}

export function Spotlight({ items, onClose }: { items: SpotItem[]; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return items.filter((i) => i.idle);
    return items.map((it) => ({ it, s: score(it, t) })).filter((x) => x.s >= 0).sort((a, b) => b.s - a.s).map((x) => x.it);
  }, [items, q]);

  // Return focus to wherever the visitor was when they close the search.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    input.current?.focus();
    return () => { if (prev && document.contains(prev)) prev.focus(); };
  }, []);
  useEffect(() => { document.getElementById(`sp-${active}`)?.scrollIntoView({ block: "nearest" }); }, [active]);

  const choose = (it: SpotItem | undefined) => { if (!it) return; onClose(); it.run(); };
  const key = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    const n = results.length;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); onClose(); } // stop it here so the window underneath stays open
    else if (e.key === "ArrowDown") { e.preventDefault(); if (n) setActive((active + 1) % n); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (n) setActive((active - 1 + n) % n); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[active]); }
    else if (e.key === "Tab") e.preventDefault(); // keep focus in the search box
  };

  return (
    <motion.div className="spot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div className="sp" role="dialog" aria-modal="true" aria-label="Search"
        initial={{ opacity: 0, scale: 0.96, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -10 }} transition={{ duration: 0.16 }}
        onKeyDown={key} onMouseDown={(e) => { if (e.target !== input.current) e.preventDefault(); }}>
        <div className="spq">
          <Icon name="search" size={24} />
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setActive(0); }} placeholder="Search apps, projects, skills…"
            role="combobox" aria-expanded="true" aria-controls="sp-list" aria-activedescendant={results.length ? `sp-${active}` : undefined} aria-label="Search"
            autoComplete="off" autoCorrect="off" spellCheck={false} />
        </div>
        {results.length ? (
          <ul id="sp-list" role="listbox">
            {results.map((it, i) => (
              <li key={it.id} id={`sp-${i}`} role="option" aria-selected={i === active} onMouseMove={() => { if (i !== active) setActive(i); }}>
                <button tabIndex={-1} onClick={() => choose(it)}>
                  <span className="spi">{it.img ? <img src={it.img} alt="" /> : <Icon name={it.icon ?? "leaf"} size={24} />}</span>
                  <span className="spl"><b>{it.label}</b>{it.hint && <small>{it.hint}</small>}</span>
                  <span className="spk">{it.kind}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="spe" role="status">Nothing found for “{q.trim()}”</p>}
        <footer className="spf"><span><kbd>↑</kbd> <kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span><span className="r"><kbd>{mod}</kbd> <kbd>K</kbd></span></footer>
      </motion.div>
    </motion.div>
  );
}
