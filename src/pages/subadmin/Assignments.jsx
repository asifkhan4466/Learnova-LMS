import { assignments as rows } from "../../data/operations";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Assignments.css";
const columns = [["title", "Assignment"], ["course", "Course"], ["batch", "Batch"], ["teacher", "Teacher"], ["dueDate", "Due Date"], ["submissions", "Submissions", r => <div>{r.submissions} / {r.totalStudents}<progress aria-label="Submission progress" value={r.submissions} max={Math.max(1,r.totalStudents)}/></div>], ["status", "Status", r => <span className="sa-status" data-status={r.status}>{r.status}</span>]];
export default function Assignments() {
  
  return <div className="sa-page sa-record-page"><AdminRecords paginate filters={[["course","Courses"],["batch","Batches"]]} title="Assignments" heading={<SubAdminHeading title="Assignments" subtitle="Manage assignments and monitor student submissions." icon="design"/>} rows={rows} columns={columns}><SubAdminSummary items={[["Total Assignments",rows.length,"design"],["Active",rows.filter(r=>r.status==="Active").length,"clock"],["Completed",rows.filter(r=>r.status==="Completed").length,"check"],["Submissions",rows.reduce((n,r)=>n+r.submissions,0),"book"]]}/></AdminRecords></div>;
}
