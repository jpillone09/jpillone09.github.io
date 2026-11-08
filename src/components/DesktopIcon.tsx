import { useState } from "react";
import { Icon, type IconName } from "./Icon";
import { play } from "../lib/sound";

export function DesktopIcon({ label, icon, onOpen }: { label: string; icon: IconName; onOpen: () => void }) {
  const [sel, setSel] = useState(false);
  return (
    <button className={`dicon ${sel ? "sel" : ""}`} aria-label={`Open ${label}`}
      onClick={() => { if (matchMedia("(pointer: coarse)").matches) onOpen(); else { play("click"); setSel(true); } }}
      onDoubleClick={onOpen} onBlur={() => setSel(false)}
      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onOpen(); } }}>
      <Icon name={icon} size={52} /><span>{label}</span>
    </button>
  );
}
