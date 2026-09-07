import EnrollmentGroups from "../../components/EnrollmentGroups";
import useBatches from "../../utils/useBatches";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Enrollments.css";

const columns = [["student", "Student"], ["studentId", "Student ID"], ["course", "Course"], ["batch", "Batch"], ["payment", "Payment"], ["enrollmentDate", "Enrollment Date"], ["status", "Status", row => <span className="sa-status" data-status={row.status}>{row.status}</span>]];
export default function Enrollments() {
  const { enrollments: rows } = useBatches();
  return <div className="sa-record-page"><AdminRecords paginate filters={[["course","Courses"],["batch","Batches"]]} title="Enrollments" subtitle="Manage student course enrollments, batch assignments, and access status." heading={<SubAdminHeading title="Enrollments" subtitle="Manage student course enrollments, batch assignments, and access status." icon="cap"/>} rows={rows} columns={columns}>
    <SubAdminSummary items={[["Total Enrollments", rows.length, "users"], ["Active", rows.filter(r => r.status === "Active").length, "check"], ["Pending", rows.filter(r => r.status === "Pending").length, "clock"], ["Completed", rows.filter(r => r.status === "Completed").length, "cap"]]}/>
  </AdminRecords><EnrollmentGroups role="subadmin" batchesOnly={false}/></div>;
}
