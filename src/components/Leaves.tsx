import type { CSSProperties } from "react";
import { Icon } from "./Icon";

// A handful of leaves, kept sparse on purpose. Deterministic values keep the layout stable.
const leaves = Array.from({ length: 9 }, (_, i) => ({
  x: (i * 11 + 6) % 92, size: 16 + ((i * 5) % 13), dur: 20 + ((i * 7) % 14),
  delay: -((i * 6.3) % 30), sway: (i % 2 ? 1 : -1) * (40 + ((i * 13) % 50)),
}));

export function Leaves() {
  return (
    <div className="leaves" aria-hidden="true">
      {leaves.map((l, i) => (
        <span key={i} className="leaf" style={{ "--x": `${l.x}%`, "--dur": `${l.dur}s`, "--delay": `${l.delay}s`, "--sway": `${l.sway}px` } as CSSProperties}>
          <Icon name="leaf" size={l.size} />
        </span>
      ))}
    </div>
  );
}
