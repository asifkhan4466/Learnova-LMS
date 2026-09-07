import { useNavigate } from "react-router-dom";
import { classStatus } from "../../utils/batchStorage";
import useBatches from "../../utils/useBatches";
import AdminRecords from "../../components/AdminRecords";
import LiveNowPanel from "../../components/LiveNowPanel";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import ScheduleLiveClass from "../../components/ScheduleLiveClass";
import "./LiveClasses.css";

const columns = [["title", "Class"], ["course", "Course"], ["batch", "Batch"], ["teacher", "Teacher"], ["date", "Date"], ["time", "Time"], ["duration", "Duration"], ["students", "Students"], ["status", "Status", row => <span className="sa-status" data-status={row.status}>{row.status === "Live" ? "LIVE" : row.status}</span>]];

export default function LiveClasses() {
  const state = useBatches();
  const navigate = useNavigate();
  const rows = state.classes.map(item => ({ ...item, status: classStatus(item, state) }));
  return <div className="sa-page sa-record-page"><ScheduleLiveClass state={state} role="subadmin"/><LiveNowPanel classes={rows.filter(item => item.status === "Live")} routePrefix="/subadmin/live-classes"/><AdminRecords paginate filters={[["course", "Courses"], ["batch", "Batches"], ["teacher", "Teachers"]]} viewAction={row => navigate(`/subadmin/live-classes/${row.id}`)} viewLabel={row => row.status === "Live" ? "Monitor Live" : "View"} title="Live Classes" heading={<SubAdminHeading title="Live Classes" subtitle="Manage scheduled sessions and current batch live classes." icon="video"/>} rows={rows} columns={columns}><SubAdminSummary items={[["Total Classes", rows.length, "video"], ["Live Now", rows.filter(r => r.status === "Live").length, "play"], ["Scheduled", rows.filter(r => r.status === "Scheduled").length, "clock"], ["Completed", rows.filter(r => r.status === "Completed").length, "check"]]}/></AdminRecords></div>;
}
