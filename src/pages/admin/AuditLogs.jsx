import "./AuditLogs.css";
import PublicIcon from "../../components/PublicIcon";
import AdminRecords from "../../components/AdminRecords";
import { payments, classes } from "../../data/operations";

const columns = [["user", "User"], ["role", "Role"], ["action", "Action"], ["module", "Module"], ["date", "Date / Time"]];
const rows = [
  ...payments.map(payment => ({ id: payment.transactionId, user: payment.student, role: "Student", action: `Submitted payment ${payment.transactionId}`, module: "Payments", date: `${payment.date} · Time not recorded` })),
  ...classes.map((lesson, index) => ({ id: `class-${index}`, user: lesson.teacher, role: "Teacher", action: `Assigned to ${lesson.title}`, module: "Live Classes", date: `${lesson.date} ${lesson.time} (scheduled)` })),
];
export default function AuditLogs() {
  return <section className="admin-audit-design"><header className="aal-banner"><div><h1>Audit Logs</h1><p>Review recorded platform activity across payments and live classes.</p></div><PublicIcon name="clock"/></header><div className="aal-stats">{[["Activity Records",rows.length,"book"],["Payment Records",payments.length,"briefcase"],["Class Assignments",classes.length,"video"]].map(([label,value,icon],index) => <article className={`aal-tone-${index}`} key={label}><span><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</div><AdminRecords title="Audit Logs" subtitle="Illustrative frontend activity based on demo records; not a live audit trail." rows={rows} columns={columns} /></section>;
}
