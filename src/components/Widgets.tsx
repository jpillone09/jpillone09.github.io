import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { githubUser } from "../data/content";

type Day = { level: number; count: number; date: string };

function Calendar() {
  const [d, setD] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setD(new Date()), 60000); return () => clearInterval(i); }, []);
  const first = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
  const days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const cells = [...Array<null>(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <aside className="cal" aria-label="Calendar">
      <header>
        <span className="big">{d.getDate()}</span>
        <div><b>{d.toLocaleDateString([], { weekday: "long" })}</b><span>{d.toLocaleDateString([], { month: "long", year: "numeric" })}</span></div>
        <Icon name="leaf" size={28} />
      </header>
      <div className="grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((x, i) => <i key={i} className="dn">{x}</i>)}
        {cells.map((c, i) => <i key={i} className={c === d.getDate() ? "today" : ""}>{c}</i>)}
      </div>
    </aside>
  );
}

// Your GitHub contributions as a little garden: each square is a day, greener = more commits.
function Garden() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then((r) => r.json())
      .then((d: { contributions: Day[]; total?: Record<string, number> }) => {
        setDays(d.contributions.slice(-98));
        setTotal(Object.values(d.total ?? {}).reduce((a, b) => a + Number(b), 0));
      })
      .catch(() => setFailed(true));
  }, []);
  const cells: (Day | null)[] = days ? [...Array<null>(new Date(days[0].date).getDay()).fill(null), ...days] : Array.from({ length: 98 }, () => ({ level: 0, count: 0, date: "" }));
  return (
    <a className="garden" href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer" aria-label="Open my GitHub">
      <header><Icon name="leaf" size={20} /><b>My garden</b></header>
      <div className="gg" aria-hidden="true">
        {cells.map((c, i) => <i key={i} className={c ? `g${c.level}` : "gx"} title={c?.date ? `${c.count} contributions on ${c.date}` : undefined} />)}
      </div>
      <small>{failed ? "Open my GitHub to see my commits" : days ? `${total} contributions this year` : "Growing…"}</small>
    </a>
  );
}

export function Widgets() { return <div className="lw"><Calendar /><Garden /></div>; }
