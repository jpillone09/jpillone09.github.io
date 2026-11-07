import { Icon, type IconName } from "../components/Icon";
import { links } from "../data/content";

const shortcuts: { n: string; i: IconName; h: string }[] = [
  { n: "GitHub", i: "github", h: links.github }, { n: "LinkedIn", i: "linkedin", h: links.linkedin },
  { n: "Facebook", i: "facebook", h: links.facebook }, { n: "Gmail", i: "mail", h: `mailto:${links.email}` },
];
export function Contact() {
  return (
    <div className="mail">
      <h1>Let's get in touch!</h1>
      <p>Have a project in mind? Let's connect!</p>
      <div className="shortcuts">
        {shortcuts.map(({ n, i, h }) => (
          <a key={n} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><Icon name={i} size={44} /><span>{n}</span></a>
        ))}
      </div>
    </div>
  );
}
