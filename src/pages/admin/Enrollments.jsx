import EnrollmentGroups from "../../components/EnrollmentGroups";
import "./Enrollments.css";
import PublicIcon from "../../components/PublicIcon";
import { useRef, useState } from "react";
import useBatches from "../../utils/useBatches";
import { assignBatch } from "../../utils/batchStorage";

const columns = [["student", "Student"], ["course", "Course"], ["batch", "Batch"], ["status", "Enrollment Status"], ["payment", "Payment Status"]];

export default function Enrollments() {
  const { enrollments, batches } = useBatches();
  const dialog = useRef(null);
  const detailsDialog = useRef(null);
  const [details, setDetails] = useState(null);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const visible = enrollments.filter(row => (!courseFilter || row.course === courseFilter) && (!paymentFilter || row.payment === paymentFilter) && (!statusFilter || row.status === statusFilter) && [row.student, row.course, row.id].some(value => String(value).toLowerCase().includes(search.trim().toLowerCase())));
  const stats = [["Total Enrollments", enrollments.length, "users"], ["Pending Approval", enrollments.filter(row => !row.approved && row.status !== "Rejected").length, "clock"], ["Approved Enrollments", enrollments.filter(row => row.approved).length, "check"], ["Rejected Requests", enrollments.filter(row => row.status === "Rejected").length, "close"], ["Awaiting Batch Assignment", enrollments.filter(row => !row.batchId).length, "users"]];
  const [selected, setSelected] = useState(null);
  const [batchId, setBatchId] = useState("");
  const [approved, setApproved] = useState(false);
  const [message, setMessage] = useState("");
  function edit(row) { setSelected(row); setBatchId(row.batchId || ""); setApproved(row.approved); setMessage(""); dialog.current.showModal(); }
  function save(event) {
    event.preventDefault();
    try { assignBatch(selected.id, batchId, approved, "admin"); dialog.current.close(); setMessage("Batch assignment saved."); }
    catch (error) { setMessage(error.message); }
  }
  return <section className="admin-enrollments">
    <header className="ae-banner"><div><h1>Enrollments</h1><p>Manage student enrollment requests, assign batches, and track enrollment status.</p></div><blockquote>&ldquo;A single learner can change a community.<br/>A community of learners can change the world.&rdquo;<cite>&mdash; Anonymous</cite></blockquote><PublicIcon name="cap"/></header>
    <div className="ae-stats">{stats.map(([label,value,icon],index) => <article className={`ae-tone-${index}`} key={label}><span className="ae-icon"><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</div>
    <div className="ae-filters"><label className="ae-search"><span>Search Enrollments</span><input type="search" placeholder="Search student, course, or enrollment ID..." value={search} onChange={event => setSearch(event.target.value)}/></label><label>Course<select value={courseFilter} onChange={event => setCourseFilter(event.target.value)}><option value="">All Courses</option>{[...new Set(enrollments.map(row => row.course))].map(value => <option key={value}>{value}</option>)}</select></label><label>Payment Status<select value={paymentFilter} onChange={event => setPaymentFilter(event.target.value)}><option value="">All Payments</option>{[...new Set(enrollments.map(row => row.payment))].map(value => <option key={value}>{value}</option>)}</select></label><label>Enrollment Status<select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}><option value="">All Statuses</option>{[...new Set(enrollments.map(row => row.status))].map(value => <option key={value}>{value}</option>)}</select></label><button onClick={() => { setSearch(""); setCourseFilter(""); setPaymentFilter(""); setStatusFilter(""); }}>Clear Filters</button></div>
    <section className="ae-panel"><h2>Enrollment Requests</h2><p role="status">Showing {visible.length} of {enrollments.length} results</p><div className="ae-table" tabIndex="0" aria-label="Enrollment records"><table><thead><tr><th>#</th><th>Student</th><th>Course</th><th>Batch</th><th>Payment Status</th><th>Approval</th><th>Enrollment Status</th><th>Actions</th></tr></thead><tbody>{visible.map((row,index) => <tr key={row.id}><td>{index + 1}</td><td><div className="ae-student"><span>{row.student.split(" ").map(part => part[0]).slice(0,2).join("")}</span><div><strong>{row.student}</strong><small>{row.id}</small></div></div></td><td>{row.course}</td><td>{row.batch || "Not Assigned"}</td><td><span className={`ae-badge ${["Paid", "Approved", "Verified"].includes(row.payment) ? "ae-good" : "ae-pending"}`}>{row.payment}</span></td><td><span className={`ae-badge ${row.approved ? "ae-good" : "ae-pending"}`}>{row.approved ? "Approved" : "Not approved"}</span></td><td><span className="ae-badge">{row.status}</span></td><td><div className="ae-actions"><button onClick={() => { setDetails(row); detailsDialog.current.showModal(); }}>View</button><button onClick={() => edit(row)}>Assign Batch</button></div></td></tr>)}{!visible.length && <tr><td colSpan="8">No matching enrollments.</td></tr>}</tbody></table></div></section>
    <dialog ref={detailsDialog} aria-labelledby="ae-details"><h2 id="ae-details">Enrollment Details</h2>{details && <dl>{columns.map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{details[key] || "Not provided"}</dd></div>)}</dl>}<form method="dialog"><button>Close</button></form></dialog>
    {!selected && message && <p role="status">{message}</p>}
    <dialog ref={dialog} className="admin-batch-assignment" aria-labelledby="assignment-title" onClose={() => setSelected(null)}><form onSubmit={save}>
      <h2 id="assignment-title">Batch Assignment</h2><p>{selected?.student} — {selected?.course}</p>
      <label>Batch<select required value={batchId} onChange={event => setBatchId(event.target.value)}><option value="">Select batch</option>{batches.filter(batch => batch.courseId === selected?.courseId && batch.status !== "Completed").map(batch => <option key={batch.id} value={batch.id}>{batch.name} — {batch.status}</option>)}</select></label>
      <label><input type="checkbox" checked={approved} onChange={event => setApproved(event.target.checked)} />Approved enrollment and active access</label>
      <p>Live access still requires Admin activation of the batch. Existing payment records are unchanged.</p>
      {message && <p role="status">{message}</p>}
      <button type="button" onClick={() => dialog.current.close()}>Cancel</button> <button type="submit">Save Assignment</button>
    </form></dialog>
  <EnrollmentGroups role="admin" batchesOnly={false}/></section>;
}
