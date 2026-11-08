import { useEffect, useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { projects } from "../data/content";

// n changes on every request, so searching for the same project twice still re-opens it.
export interface ProjectReq { id: string; n: number }

export function Workfolio({ request }: { request?: ProjectReq | null }) {
  const [sel, setSel] = useState<string | null>(() => request?.id ?? null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (request) setSel(request.id); }, [request]);
  // Start each view at the top instead of keeping the previous scroll position.
  useEffect(() => { ref.current?.closest(".body")?.scrollTo(0, 0); }, [sel]);
  const p = projects.find((x) => x.id === sel);
  if (p) return (
    <div className="proj" ref={ref}>
      <button className="back" onClick={() => setSel(null)}><Icon name="back" size={16} /> Projects</button>
      <h1>{p.name}</h1><span className="chip alt">{p.category}</span>
      <p>{p.summary}</p>
      <h3>Technologies</h3><div className="chips">{p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
      {p.features && <><h3>Features</h3><ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul></>}
      <h3>My contributions</h3><p>{p.role}</p>
      <h3>Preview</h3>{p.shots?.length ? <div className="gallery">{p.shots.map((s) => <figure key={s.src}><a href={s.src} target="_blank" rel="noreferrer"><img src={s.src} alt={s.caption} loading="lazy" /></a><figcaption>{s.caption}</figcaption></figure>)}</div> : <div className="shot">[Add a screenshot]</div>}
      <div className="row">
        {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noreferrer"><Icon name="github" size={16} /> Repository</a>}
        {p.demo && <a className="btn" href={p.demo} target="_blank" rel="noreferrer"><Icon name="external" size={16} /> Live demo</a>}
      </div>
    </div>
  );
  return (
    <div className="files" role="list" ref={ref}>
      {projects.map((x) => (
        <button role="listitem" key={x.id} className="file" onClick={() => setSel(x.id)} onDoubleClick={() => setSel(x.id)}>
          <Icon name="folder" size={64} /><span>{x.name}</span><small>{x.category}</small>
        </button>
      ))}
    </div>
  );
}
