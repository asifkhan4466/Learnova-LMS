import "./Reports.css";
import PublicIcon from "../../components/PublicIcon";
import SuperAdminRecords from "../../components/SuperAdminRecords";
import { students, teachers, payments } from "../../data/operations";
import useBatches from "../../utils/useBatches";
import useCourses from "../../utils/useCourses";
import useCertificates from "../../utils/useCertificates";

const columns = [["status", "Course Status"], ["count", "Courses"]];
export default function Reports() {
  const courses = useCourses();
  const { batches } = useBatches();
  const { records } = useCertificates();
  const rows = [...new Set(courses.map(course => course.status))].map(status => ({ status, count: courses.filter(course => course.status === status).length }));
  const stats = [["Students", students.length], ["Teachers", teachers.length], ["Active Batches", batches.filter(batch => batch.status === "Active").length], ["Pending Payments", payments.filter(payment => payment.status === "Pending").length], ["Certificates Issued", records.filter(record => record.status === "Issued").length]];
  const categories = [...new Set(courses.map(course => course.category))].map(name => ({ name, count: courses.filter(course => course.category === name).length }));
  return <section className="admin-report-design"><header className="ar-banner"><div><h1>Reports &amp; Analytics</h1><p>Gain insights into your platform?s courses, learners, and operational activity.</p></div><blockquote>&ldquo;Data turns learning into<br/>a brighter tomorrow.&rdquo;<cite>&mdash; Learnova</cite></blockquote><PublicIcon name="cap"/></header>
    <div className="admin-report-stats">{stats.map(([label, value], index) => <article key={label} className={`ar-tone-${index}`}><span className="ar-icon"><PublicIcon name={index === 4 ? "award" : index === 3 ? "briefcase" : "users"}/></span><div><strong>{value}</strong><span>{label}</span></div></article>)}</div>
    <div className="ar-charts"><section className="ar-panel"><h2>Course Publication Overview</h2><p>Current course counts by status</p><div className="ar-bars">{rows.map((row,index) => <div className={`ar-bar ar-tone-${index}`} key={row.status}><strong>{row.count}</strong><div style={{height: `${Math.max(3, row.count / Math.max(1,...rows.map(item => item.count)) * 140)}px`}}/><small>{row.status}</small></div>)}</div></section><section className="ar-panel"><h2>Batch Lifecycle</h2><p>Current shared batch statuses</p>{["Upcoming","Active","Completed"].map((status,index) => { const count = batches.filter(batch => batch.status === status).length; return <div className={`ar-meter ar-tone-${index}`} key={status}><div><span>{status}</span><strong>{count}</strong></div><progress value={count} max={Math.max(1,batches.length)}/></div>; })}</section><section className="ar-panel"><h2>Payment Overview</h2><p>Submitted payment records by status</p>{["Pending","Approved","Rejected"].map((status,index) => { const count = payments.filter(payment => payment.status === status).length; return <div className={`ar-meter ar-tone-${index}`} key={status}><div><span>{status}</span><strong>{count}</strong></div><progress value={count} max={Math.max(1,payments.length)}/></div>; })}</section></div>
    <div className="ar-bottom"><SuperAdminRecords title="Course Status Report" subtitle="Frontend summaries from the current operational records and shared stores." rows={rows} columns={columns}/><section className="ar-panel"><h2>Course Categories</h2>{categories.map((category,index) => <div className={`ar-meter ar-tone-${index % 5}`} key={category.name}><div><span>{category.name}</span><strong>{category.count}</strong></div><progress value={category.count} max={Math.max(1,courses.length)}/></div>)}</section></div></section>;
}
