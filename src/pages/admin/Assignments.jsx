import { assignments as rows } from "../../data/operations";
import SuperAdminRecords from "../../components/SuperAdminRecords";
import AdminSummary, { AdminHeading } from "../../components/AdminSummary";
import "./Assignments.css";
const columns = [["title", "Assignment"], ["course", "Course"], ["batch", "Batch"], ["teacher", "Teacher"], ["dueDate", "Due Date"], ["submissions", "Submissions", r => <div>{r.submissions} / {r.totalStudents}<progress aria-label="Submission progress" value={r.submissions} max={Math.max(1,r.totalStudents)}/></div>], ["status", "Status", r => <span className="sa-status" data-status={r.status}>{r.status}</span>]];
export default function Assignments() {
  
  return <div className="sa-page sa-record-page"><SuperAdminRecords paginate filters={[["course","Courses"],["batch","Batches"]]} title="Assignments" heading={<AdminHeading title="Assignments" subtitle="Manage assignments and monitor student submissions." icon="design"/>} rows={rows} columns={columns}><AdminSummary items={[["Total Assignments",rows.length,"design"],["Active",rows.filter(r=>r.status==="Active").length,"clock"],["Completed",rows.filter(r=>r.status==="Completed").length,"check"],["Submissions",rows.reduce((n,r)=>n+r.submissions,0),"book"]]}/></SuperAdminRecords></div>;
}
