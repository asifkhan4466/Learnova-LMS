import PeopleManager from "../../components/PeopleManager";
import { usePeople } from "../../utils/peopleStorage";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Teachers.css";

const columns = [
  ["name", "Teacher", teacher => <div className="sa-person"><span>{teacher.image ? <img src={teacher.image} alt=""/> : teacher.name.charAt(0)}</span><div><strong>{teacher.name}</strong><small>{teacher.email}</small></div></div>],
  ["id", "Teacher ID"], ["specialization", "Specialization"], ["courses", "Courses"], ["students", "Students"],
  ["status", "Status", teacher => <span className="sa-status" data-status={teacher.status}>{teacher.status}</span>],
];
export default function Teachers() {
 const teachers = usePeople("teachers");
  return <div className="sa-record-page"><PeopleManager kind="teachers"/><AdminRecords paginate filters={[["specialization","Specializations"]]} title="Teachers" subtitle="Manage and view teacher information, assigned courses, and students." heading={<SubAdminHeading title="Teachers" subtitle="Manage and view teacher information, assigned courses, and students." icon="users"/>} rows={teachers} columns={columns}>
    <SubAdminSummary items={[
      ["Total Teachers", teachers.length, "users"],
      ["Active Teachers", teachers.filter(t => t.status === "Active").length, "check"],
      ["Inactive Teachers", teachers.filter(t => t.status === "Inactive").length, "users"],
      ["Course Assignments", teachers.reduce((sum, t) => sum + t.courses, 0), "book"],
    ]}/>
  </AdminRecords></div>;
}
