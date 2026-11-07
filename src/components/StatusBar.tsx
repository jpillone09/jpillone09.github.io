import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { links } from "../data/content";

export function StatusBar({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 15000); return () => clearInterval(i); }, []);
  return (
    <header className="status">
      <div className="left">
        <b className="clock">{t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</b>
        <i className="dot" aria-label="New notification" />
        <span className="brand">Murphy's Page</span>
        <a className="ic" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
        <a className="ic" href={`mailto:${links.email}`} aria-label="Email"><Icon name="mail" /></a>
        <a className="ic" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
      </div>
      <div className="right">
        <button className="ic" onClick={onToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme"><Icon name={theme === "dark" ? "sun" : "moon"} /></button>
        <span className="ic" role="img" aria-label="Wi-Fi"><Icon name="wifi" /></span>
        <span className="ic" role="img" aria-label="Battery"><Icon name="battery" /></span>
      </div>
    </header>
  );
}
