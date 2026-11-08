import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { StatusBar } from "./components/StatusBar";
import { Dock } from "./components/Dock";
import { Window, type WS } from "./components/Window";
import { Widgets } from "./components/Widgets";
import { Leaves } from "./components/Leaves";
import { Note } from "./components/Note";
import { Boot } from "./components/Boot";
import { DesktopIcon } from "./components/DesktopIcon";
import { Icon, type IconName } from "./components/Icon";
import { About } from "./apps/About";
import { Workfolio } from "./apps/Workfolio";
import { Skills } from "./apps/Skills";
import { Contact } from "./apps/Contact";
import { Cv } from "./apps/Cv";
import { isMuted, play, setMuted } from "./lib/sound";

interface AppDef { id: string; title: string; img?: string; icon?: IconName; dock?: boolean; node: ReactNode }
const apps: AppDef[] = [
  { id: "about", title: "About Me", img: "/icons/about.png", node: <About /> },
  { id: "work", title: "Workfolio", img: "/icons/work.png", node: <Workfolio /> },
  { id: "skills", title: "Education & Skills", img: "/icons/skills.png", node: <Skills /> },
  { id: "contact", title: "Contact Me", img: "/icons/contact.png", node: <Contact /> },
  { id: "cv", title: "Murphy_CV.pdf", icon: "doc", dock: false, node: <Cv /> },
];
const init = (): Record<string, WS> =>
  Object.fromEntries(apps.map((a, i) => [a.id, { open: false, min: false, max: false, z: 0, x: 150 + i * 44, y: 80 + i * 32 }]));

export default function App() {
  const [w, setW] = useState(init);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [muted, setMutedState] = useState(isMuted());
  const [booting, setBooting] = useState(() => {
    try { if (sessionStorage.getItem("booted")) return false; } catch { /* ignore */ }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const zr = useRef(1);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try { const s = localStorage.getItem("theme"); if (s === "light" || s === "dark") return s; } catch { /* ignore */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);

  const toggle = () => { const next = theme === "dark" ? "light" : "dark"; play(next); setTheme(next); };
  const toggleMute = () => { const m = !muted; setMuted(m); setMutedState(m); if (!m) play("click"); };
  const finishBoot = () => { try { sessionStorage.setItem("booted", "1"); } catch { /* ignore */ } setBooting(false); };

  const patch = (id: string, p: Partial<WS>) => setW((s) => ({ ...s, [id]: { ...s[id], ...p } }));
  const focus = (id: string) => patch(id, { z: ++zr.current });
  const launch = (id: string) => { if (!w[id].open || w[id].min) play("open"); patch(id, { open: true, min: false, z: ++zr.current }); };
  const minimize = (id: string) => { play("min"); patch(id, { min: true }); };
  const closeWin = (id: string) => { play("close"); patch(id, { open: false, max: false }); };
  const opened = apps.filter((a) => w[a.id].open);
  const visible = opened.filter((a) => !w[a.id].min);
  const top = visible.reduce<string | null>((t, a) => (t === null || w[a.id].z > w[t].z ? a.id : t), null);
  const pick = (id: string) => (top === id ? minimize(id) : launch(id));

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape" && top) closeWin(top); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [top]);

  const docked = apps.filter((a) => a.dock !== false);
  return (
    <div className="desktop" onContextMenu={(e) => { e.preventDefault(); play("click"); setMenu({ x: e.clientX, y: e.clientY }); }} onClick={() => setMenu(null)}>
      <Leaves />
      <StatusBar theme={theme} onToggle={toggle} muted={muted} onMute={toggleMute} />
      <Note />
      <Widgets />
      <div className="dicons"><DesktopIcon label="Murphy_CV.pdf" icon="doc" onOpen={() => launch("cv")} /></div>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" /></filter></svg>
      <div className="hint"><h1>Hi, I'm Murphy!</h1><p>Open an app from the dock below.</p></div>
      <AnimatePresence>
        {opened.map((a) => (
          <Window key={a.id} title={a.title} icon={a.img ? <img src={a.img} alt="" width={20} height={20} /> : <Icon name={a.icon!} size={18} />}
            s={w[a.id]} focused={top === a.id} onFocus={() => focus(a.id)} onClose={() => closeWin(a.id)}
            onMin={() => minimize(a.id)} onMax={() => { play("max"); patch(a.id, { max: !w[a.id].max }); }}
            onMove={(x, y) => patch(a.id, { x, y })}>{a.node}</Window>
        ))}
      </AnimatePresence>
      <Dock items={docked.map((a) => ({ id: a.id, label: a.title, img: a.img! }))} open={docked.filter((a) => w[a.id].open).map((a) => a.id)} active={top} onPick={pick} />
      {menu && (
        <ul className="ctx" style={{ left: menu.x, top: menu.y }}>
          {apps.map((a) => <li key={a.id}><button onClick={() => launch(a.id)}>Open {a.title}</button></li>)}
          <li><button onClick={toggle}>Switch to {theme === "dark" ? "light" : "dark"} mode</button></li>
        </ul>
      )}
      <AnimatePresence>{booting && <Boot onDone={finishBoot} />}</AnimatePresence>
    </div>
  );
}
