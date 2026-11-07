import { note } from "../data/content";
export function Note() {
  return (
    <aside className="note" aria-label="Sticky note">
      <b>{note.title}</b>
      <ul>{note.items.map((i) => <li key={i}>{i}</li>)}</ul>
    </aside>
  );
}
