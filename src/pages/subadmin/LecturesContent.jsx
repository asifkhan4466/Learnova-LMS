import { content as rows } from "../../data/operations";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./LecturesContent.css";

const columns = [["title", "Content"], ["course", "Course"], ["batch", "Batch"], ["teacher", "Teacher"], ["type", "Type"], ["module", "Module"], ["materials", "Materials"], ["status", "Status", row => <span className="sa-status" data-status={row.status}>{row.status}</span>]];
export default function LecturesContent() {
  
  return <div className="sa-record-page"><AdminRecords paginate filters={[["course","Courses"],["type","Types"]]} title="Course & Content" subtitle="Manage lectures, modules, recordings, notes, and learning materials." heading={<SubAdminHeading title="Course & Content" subtitle="Manage lectures, modules, recordings, notes, and learning materials." icon="book"/>} rows={rows} columns={columns}>
    <SubAdminSummary items={[["Total Content", rows.length, "book"], ["Published", rows.filter(r => r.status === "Published").length, "check"], ["Drafts", rows.filter(r => r.status === "Draft").length, "design"], ["Materials", rows.reduce((sum,r) => sum + Number(r.materials || 0),0), "database"]]}/>
  </AdminRecords></div>;
}
