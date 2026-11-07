import { Icon } from "../components/Icon";
import { certs, education as e, skills } from "../data/content";

export function Skills() {
  return (
    <div className="notes">
      <h2><Icon name="cap" size={22} /> Education</h2>
      <p><b>{e.school}</b><br />{e.degree}<br />{e.spec}<br />{e.grad}</p>
      <h2>Skills</h2>
      {Object.entries(skills).map(([k, v]) => (
        <div key={k}><h3>{k}</h3><div className="chips">{v.map((s) => <span className="chip" key={s}>{s}</span>)}</div></div>
      ))}
      <h2><Icon name="award" size={22} /> Certifications</h2>
      <ul>{certs.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}
