import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "../components/Icon";
import { links } from "../data/content";
import { play } from "../lib/sound";

const shortcuts: { n: string; i: IconName; h: string }[] = [
  { n: "GitHub", i: "github", h: links.github }, { n: "LinkedIn", i: "linkedin", h: links.linkedin },
  { n: "Facebook", i: "facebook", h: links.facebook }, { n: "Gmail", i: "mail", h: `mailto:${links.email}` },
];
export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(links.email); }
    catch { window.location.href = `mailto:${links.email}`; return; } // no clipboard access: open the mail app instead
    play("click"); setCopied(true);
    window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="mail">
      <h1>Let's get in touch!</h1>
      <p>Have a project in mind? Let's connect!</p>
      <div className="shortcuts">
        {shortcuts.map(({ n, i, h }) => (
          <a key={n} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><Icon name={i} size={44} /><span>{n}</span></a>
        ))}
      </div>
      <div className="mailrow">
        <code>{links.email}</code>
        <button className="btn alt" onClick={copy}><Icon name={copied ? "check" : "copy"} size={16} /> {copied ? "Copied!" : "Copy email"}</button>
        <span className="sr" role="status">{copied ? "Email address copied" : ""}</span>
      </div>
    </div>
  );
}
