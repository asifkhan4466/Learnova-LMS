import "./Profile.css";
import { Link } from "react-router-dom";
import ProfileManagement from "../subadmin/Profile";
import PublicIcon from "../../components/PublicIcon";
import { students, teachers } from "../../data/operations";
import { subAdmins } from "../../utils/adminPermissions";
import useCourses from "../../utils/useCourses";

const account = { name: "Admin", email: "admin@learnova.com", id: "ADM-1001", role: "Admin", initials: "A" };
export default function Profile() {
  const courses = useCourses();
  return <section className="admin-profile-design"><header className="apf-banner"><div><h1>My Profile</h1><p>View and update your administrator information and account details.</p></div><blockquote>&ldquo;Great leaders keep learning,<br/>so learning never stops.&rdquo;<cite>&mdash; Learnova</cite></blockquote><PublicIcon name="cap"/></header><div className="apf-stats">{[["Total Students",students.length,"users"],["Total Teachers",teachers.length,"users"],["Total Courses",courses.length,"book"],["Sub Admins",subAdmins.length,"target"]].map(([label,value,icon],index) => <article className={`apf-tone-${index}`} key={label}><span><PublicIcon name={icon}/></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</div><div className="apf-columns"><ProfileManagement account={account}/><aside><section className="apf-panel"><PublicIcon name="target"/><h2>Role &amp; Permissions</h2><p>System Administrator</p><span className="apf-access">Full Access</span><ul><li>Manage users, courses, and content</li><li>Review payments and enrollments</li><li>Manage platform settings</li><li>Assign Sub Admin permissions</li><li>View reports and audit logs</li></ul><Link to="/admin/permissions">View All Permissions <PublicIcon name="arrow"/></Link></section><section className="apf-panel"><PublicIcon name="check"/><h2>Account Overview</h2><span className="apf-access">Active Account</span><p>Admin has complete platform authority. Permissions do not need to be assigned to this account.</p><p>Use Edit Profile to update your name, phone number, and profile image.</p></section></aside></div></section>;
}
