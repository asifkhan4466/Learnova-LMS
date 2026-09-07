import { payments } from "../../data/operations";
import useBatches from "../../utils/useBatches";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./AuditLogs.css";
const columns=[["date","Date / Time"],["user","User"],["module","Module"],["action","Action"],["details","Details"],["status","Status"]];
export default function AuditLogs(){
 const { classes }=useBatches();
 const rows=[...payments.map(p=>({id:p.transactionId,date:p.date,user:p.student,module:"Payments",action:"Payment submitted",details:p.transactionId,status:p.status})),...classes.map(c=>({id:c.id,date:`${c.date} ${c.time}`,user:c.teacher,module:"Live Classes",action:"Class scheduled",details:c.title,status:c.status}))];
 return <section className="sa-page sa-record-page"><AdminRecords paginate filters={[["module","Modules"]]} title="Audit Logs" heading={<SubAdminHeading title="Audit Logs" subtitle="Review available payment and class activity records." icon="clock"/>} rows={rows} columns={columns}><SubAdminSummary items={[["Activity Records",rows.length,"clock"],["Users",new Set(rows.map(r=>r.user)).size,"users"],["Class Records",classes.length,"video"],["Payment Records",payments.length,"briefcase"]]}/><p className="sa-muted">Based on existing frontend records. Login, device, and permission-change history is not recorded.</p></AdminRecords></section>;
}
