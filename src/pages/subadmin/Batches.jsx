import EnrollmentGroups from "../../components/EnrollmentGroups";
import useBatches from "../../utils/useBatches";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Batches.css";

const columns = [["name", "Batch"], ["course", "Course"], ["teacher", "Teacher"], ["students", "Students"], ["startDate", "Start Date"], ["endDate", "End Date"], ["status", "Status", batch => <span className="sa-status" data-status={batch.status}>{batch.status}</span>]];
export default function Batches() {
  const { batches } = useBatches();
  return <div className="sa-record-page"><EnrollmentGroups role="subadmin" batchesOnly={true}/><AdminRecords paginate filters={[["course","Courses"],["teacher","Teachers"]]} title="Batches" subtitle="Manage and view course batches, students, and schedules." heading={<SubAdminHeading title="Batches" subtitle="Manage and view course batches, students, and schedules." icon="users"/>} rows={batches} columns={columns}>
    <SubAdminSummary items={[
      ["Total Batches", batches.length, "users"],
      ["Active Batches", batches.filter(b => b.status === "Active").length, "play"],
      ["Upcoming Batches", batches.filter(b => b.status === "Upcoming").length, "clock"],
      ["Completed Batches", batches.filter(b => b.status === "Completed").length, "check"],
    ]}/>
  </AdminRecords></div>;
}
