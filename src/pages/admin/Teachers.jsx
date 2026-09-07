import PeopleManager from "../../components/PeopleManager";
import "./Teachers.css";
import { useRef, useState } from "react";
import { usePeople } from "../../utils/peopleStorage";
import useCourses from "../../utils/useCourses";
import useBatches from "../../utils/useBatches";
import PublicIcon from "../../components/PublicIcon";

export default function Teachers() {
 const teachers = usePeople("teachers");
  const courses = useCourses();
  const state = useBatches();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const rows = teachers.filter(teacher => `${teacher.name} ${teacher.email} ${teacher.specialization}`.toLowerCase().includes(search.toLowerCase()) && (!status || teacher.status === status));
  const live = state.classes.filter(item => item.status === "Live" && state.batches.some(batch => batch.id === item.batchId && batch.status === "Active")).length;
  const stats = [["Total Teachers", teachers.length, "users", 2], ["Active Instructors", teachers.filter(item => item.status === "Active").length, "users", 1], ["Live Now", live, "video", 0], ["Pending Assignments", courses.filter(item => !item.instructor).length, "clock", 5]];
  function view(teacher) { setSelected(teacher); dialog.current.showModal(); }
  return <div className="admin-teachers"><PeopleManager kind="teachers"/>
    <header className="as-banner"><div><h1>Teachers</h1><p>Manage your instructors, view their performance, and assigned courses.</p></div><div className="as-banner-art"><span>“Great teachers inspire<br />great learners.”<small>— Unknown</small></span><PublicIcon name="cap" /></div></header>
    <div className="as-stats">{stats.map(([label,value,icon,tone]) => <article key={label} className={`as-tone-${tone}`}><span className="as-stat-icon"><PublicIcon name={icon} /></span><div><strong>{value}</strong><span>{label}</span><small>Platform overview</small></div></article>)}</div>
    <section className="at-panel"><div className="at-heading"><div><h2>All Teachers</h2><p>View and manage all instructors on your platform.</p></div><label className="as-search"><PublicIcon name="search" /><input aria-label="Search teachers" placeholder="Search teachers by name, email or subject..." value={search} onChange={event => setSearch(event.target.value)} /></label><button onClick={() => setFiltersOpen(!filtersOpen)} aria-expanded={filtersOpen}>Filter</button></div>
      {filtersOpen && <div className="at-filter"><label>Status <select value={status} onChange={event => setStatus(event.target.value)}><option value="">All Statuses</option>{[...new Set(teachers.map(item => item.status))].map(value => <option key={value}>{value}</option>)}</select></label><button onClick={() => { setSearch(""); setStatus(""); }}>Reset</button></div>}
      <div className="as-table-wrap"><table><thead><tr>{["Teacher", "Specialization", "Assigned Courses", "Live Classes", "Rating", "Status", "Joined Date", "Actions"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{rows.map(teacher => {
        const assigned = courses.filter(course => course.instructorId === teacher.id || (!course.instructorId && course.instructor === teacher.name));
        const rated = assigned.filter(course => course.rating > 0);
        const rating = rated.length ? (rated.reduce((total,course) => total + course.rating,0)/rated.length).toFixed(1) : "Not rated";
        return <tr key={teacher.id}><td><div className="as-student"><span className="as-avatar">{teacher.image ? <img src={teacher.image} alt={teacher.name} /> : teacher.name.split(" ").map(part => part[0]).join("")}</span><div><strong>{teacher.name}</strong><small>{teacher.email}</small></div></div></td><td>{teacher.specialization}</td><td><div className="at-tags">{assigned.slice(0,2).map(course => <span key={course.id}>{course.title}</span>)}{assigned.length > 2 && <span>+{assigned.length-2}</span>}{!assigned.length && <span>{teacher.courses} assigned</span>}</div></td><td>{state.classes.filter(item => item.teacherId === teacher.id).length}</td><td><span className="at-rating"><PublicIcon name="star" />{rating}</span><small>Course ratings</small></td><td><span className={`as-badge ${teacher.status === "Active" ? "as-good" : "as-neutral"}`}>● {teacher.status}</span></td><td>{teacher.joinedDate || "Not recorded"}</td><td><button className="at-view" onClick={() => view(teacher)}>View</button></td></tr>;
      })}{!rows.length && <tr><td colSpan="8" className="as-empty">No matching teachers.</td></tr>}</tbody></table></div>
      <footer className="as-pagination"><span>Showing {rows.length} of {teachers.length} teachers</span><nav aria-label="Teacher pages"><button disabled aria-label="Previous page">‹</button><button aria-current="page">1</button><button disabled aria-label="Next page">›</button></nav></footer>
    </section>
    <dialog ref={dialog} className="as-details" aria-labelledby="teacher-detail-title"><h2 id="teacher-detail-title">Teacher Details</h2>{selected && <dl>{[["Name",selected.name],["User ID",selected.id],["Email",selected.email],["Specialization",selected.specialization],["Assigned Courses",selected.courses],["Status",selected.status]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}<form method="dialog"><button>Close</button></form></dialog>
  </div>;
}
