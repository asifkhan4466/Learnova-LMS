import PeopleManager from "../../components/PeopleManager";
import { useSyncExternalStore } from "react";
import { subscribe } from "../../utils/useProfile";
import { readProfile } from "../../utils/profileStorage";
import { students } from "../../data/operations";
import AdminRecords from "../../components/AdminRecords";
import SubAdminSummary, { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Students.css";
const columns=[["name","Student",s=><div className="sa-person"><span>{s.image?<img src={s.image} alt=""/>:s.name.charAt(0)}</span><div><strong>{s.name}</strong><small>{s.email}</small></div></div>],["username","Username"],["course","Course"],["batch","Batch"],["progress","Progress",s=><div>{s.progress}%<progress aria-label="Course progress" value={s.progress} max="100"/></div>],["status","Status",s=><span className="sa-status" data-status={s.status}>{s.status}</span>]];
const snapshot = () => JSON.stringify(students.map(student => readProfile(student.id, {})));
export default function Students(){
 useSyncExternalStore(subscribe, snapshot);
 const rows = students.map(student => ({...student, ...readProfile(student.id, {}), username: readProfile(student.id, {}).username || student.email.split("@")[0]}));
 return <section className="sa-page sa-record-page"><PeopleManager kind="students"/><AdminRecords title="Students" heading={<SubAdminHeading title="Students" subtitle="Manage and view student information, enrollments, and progress." icon="users"/>} rows={rows} columns={columns} paginate filters={[["course","Courses"],["batch","Batches"]]}><SubAdminSummary items={[["Total Students",students.length,"users"],["Active Students",students.filter(s=>s.status==="Active").length,"check"],["Inactive Students",students.filter(s=>s.status==="Inactive").length,"users"],["Completed",students.filter(s=>s.status==="Completed").length,"cap"]]}/></AdminRecords></section>;}
