import PublicIcon from "./PublicIcon";
import "./AdminSummary.css";

export default function AdminSummary({ items }) {
  return <div className="sa-summary">{items.map(([label, value, icon], index) =>
    <article key={label} className={`sa-summary-tone-${index % 4}`}>
      <span><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p></div>
    </article>
  )}</div>;
}

export function AdminHeading({title, subtitle, icon = "book", children}) {
  return <header className="sa-page-heading"><span className="sa-heading-icon"><PublicIcon name={icon}/></span><div><h1>{title}</h1><p>{subtitle}</p></div>{children}</header>;
}
