import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { Widgets } from "./components/Widgets";
import { Leaves } from "./components/Leaves";
import { StatusBar } from "./components/StatusBar";
import { Note } from "./components/Note";
import { Dock } from "./components/Dock";
import { Window, type WS } from "./components/Window";
import { About } from "./apps/About";
import { Workfolio } from "./apps/Workfolio";
import { Skills } from "./apps/Skills";
import { Contact } from "./apps/Contact";

const apps: { id: string; title: string; img: string; node: ReactNode }[] = [
  { id: "about", title: "About Me", img: "/icons/about.png", node: <About /> },
  { id: "work", title: "Workfolio", img: "/icons/work.png", node: <Workfolio /> },
  { id: "skills", title: "Education & Skills", img: "/icons/skills.png", node: <Skills /> },
  { id: "contact", title: "Contact Me", img: "/icons/contact.png", node: <Contact /> },
];
const init = (): Record<string, WS> =>
  Object.fromEntries(apps.map((a, i) => [a.id, { open: false, min: false, max: false, z: 0, x: 150 + i * 44, y: 80 + i * 32 }]));

export default function App() {
  const [w, setW] = useState(init);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const zr = useRef(1);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try { const s = localStorage.getItem("theme"); if (s === "light" || s === "dark") return s; } catch { /* ignore */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const patch = (id: string, p: Partial<WS>) => setW((s) => ({ ...s, [id]: { ...s[id], ...p } }));
  const focus = (id: string) => patch(id, { z: ++zr.current });
  const launch = (id: string) => patch(id, { open: true, min: false, z: ++zr.current });
  const visible = apps.filter((a) => w[a.id].open && !w[a.id].min);
  const opened = apps.filter((a) => w[a.id].open);
  const top = visible.reduce<string | null>((t, a) => (t === null || w[a.id].z > w[t].z ? a.id : t), null);

  const pick = (id: string) => (top === id ? patch(id, { min: true }) : launch(id));
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape" && top) patch(top, { open: false, max: false }); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [top]);

  return (
    <div className="desktop" onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); }} onClick={() => setMenu(null)}>
      <Leaves />
      <StatusBar theme={theme} onToggle={toggle} />
      <Note />
      <Widgets />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" /></filter></svg>
      <div className="hint"><h1>Hi, I'm Murphy!</h1><p>Open an app from the dock below.</p></div>
      <AnimatePresence>
        {opened.map((a) => (
          <Window key={a.id} title={a.title} icon={<img src={a.img} alt="" width={20} height={20} />} s={w[a.id]} focused={top === a.id}
            onFocus={() => focus(a.id)} onClose={() => patch(a.id, { open: false, max: false })}
            onMin={() => patch(a.id, { min: true })} onMax={() => patch(a.id, { max: !w[a.id].max })}
            onMove={(x, y) => patch(a.id, { x, y })}>{a.node}</Window>
        ))}
      </AnimatePresence>
      <Dock items={apps.map((a) => ({ id: a.id, label: a.title, img: a.img }))} open={apps.filter((a) => w[a.id].open).map((a) => a.id)} active={top} onPick={pick} />
      {menu && (
        <ul className="ctx" style={{ left: menu.x, top: menu.y }}>
          {apps.map((a) => <li key={a.id}><button onClick={() => launch(a.id)}>Open {a.title}</button></li>)}
          <li><button onClick={toggle}>Switch to {theme === "dark" ? "light" : "dark"} mode</button></li>
        </ul>
      )}
    </div>
  );
}
