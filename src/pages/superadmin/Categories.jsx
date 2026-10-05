import useCategories from "../../utils/useCategories";
import "./Categories.css";
import { useRef, useState } from "react";
import PublicIcon from "../../components/PublicIcon";
import useCourses from "../../utils/useCourses";

export default function Categories() {
  const courses = useCourses();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("name");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const rows = useCategories().map(name => {
    const categoryCourses = courses.filter(course => course.category === name);
    const published = categoryCourses.filter(course => course.status === "Published").length;
    return { name, count: categoryCourses.length, published, status: published ? "Published" : "Not public" };
  });
  const visible = rows.filter(row => row.name.toLowerCase().includes(search.trim().toLowerCase()) && (!status || row.status === status)).sort((a,b) => sort === "count" ? b.count - a.count : a.name.localeCompare(b.name));
  const stats = [["Total Categories", rows.length, "database"], ["Public Categories", rows.filter(row => row.published).length, "book"], ["Published Courses", courses.filter(course => course.status === "Published").length, "globe"], ["Courses Mapped", courses.length, "cap"]];
  return <section className="admin-categories">
    <header className="ac-banner"><div><h1>Categories</h1><p>Organize course categories and discovery across your platform.</p></div><blockquote>&ldquo;A well-organized learning platform<br/>opens doors to endless possibilities.&rdquo;<cite>&mdash; Learnova</cite></blockquote><PublicIcon name="cap"/></header>
    <div className="ac-stats">{stats.map(([label,value,icon],index) => <article className={`ac-tone-${index}`} key={label}><span className="ac-icon"><PublicIcon name={icon}/></span><div><strong>{value}</strong><span>{label}</span><small>Shared course catalog</small></div></article>)}</div>
    <div className="ac-tools"><label className="ac-search"><PublicIcon name="search"/><input aria-label="Search categories" type="search" placeholder="Search categories, e.g. Development..." value={search} onChange={event => setSearch(event.target.value)}/></label><select aria-label="Filter category status" value={status} onChange={event => setStatus(event.target.value)}><option value="">All Statuses</option><option>Published</option><option>Not public</option></select><button onClick={() => { setSearch(""); setStatus(""); setSort("name"); }}>Reset Filters</button></div>
    <section className="ac-panel"><header><h2>All Categories ({rows.length})</h2><select aria-label="Sort categories" value={sort} onChange={event => setSort(event.target.value)}><option value="name">Sort by: Name</option><option value="count">Sort by: Most Courses</option></select></header><div className="ac-table" tabIndex="0" aria-label="Category records"><table><thead><tr><th>Category</th><th>Courses</th><th>Published Courses</th><th>Visibility</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visible.map((row,index) => <tr key={row.name}><td><div className={`ac-category ac-tone-${index % 4}`}><span className="ac-icon"><PublicIcon name="book"/></span><div><strong>{row.name}</strong><small>Explore {row.name.toLowerCase()} courses.</small></div></div></td><td><strong>{row.count}</strong><small>courses</small></td><td>{row.published}</td><td><span className="ac-visibility"><PublicIcon name="globe"/>{row.published ? "Public" : "Not public"}</span></td><td><span className={`ac-badge ${row.published ? "" : "ac-muted"}`}>{row.status}</span></td><td><button aria-label={`View ${row.name}`} onClick={() => { setSelected(row.name); dialog.current.showModal(); }}><PublicIcon name="search"/> View</button></td></tr>)}{!visible.length && <tr><td colSpan="6">No matching categories.</td></tr>}</tbody></table></div><footer><span role="status">Showing {visible.length} of {rows.length} categories</span></footer></section>
    <dialog ref={dialog} aria-labelledby="ac-details"><h2 id="ac-details">{selected}</h2><p>Courses in this category</p><ul>{courses.filter(course => course.category === selected).map(course => <li key={course.id}><strong>{course.title}</strong><small>{course.instructor} &middot; {course.status}</small></li>)}</ul><form method="dialog"><button>Close</button></form></dialog>
  </section>;
}
