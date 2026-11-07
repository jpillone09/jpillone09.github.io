export interface DockItem { id: string; label: string; img: string }
export function Dock({ items, open, active, onPick }: { items: DockItem[]; open: string[]; active: string | null; onPick: (id: string) => void }) {
  return (
    <nav className="dock" aria-label="Applications">
      {items.map(({ id, label, img }) => (
        <button key={id} className={`dk ${active === id ? "active" : ""}`} onClick={() => onPick(id)} aria-label={label} title={label}>
          <img src={img} alt="" width={42} height={42} draggable={false} />
          {open.includes(id) && <i className="pip" />}
        </button>
      ))}
    </nav>
  );
}
