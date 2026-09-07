import { Link } from "react-router-dom";
import useProfile from "../../utils/useProfile";
import PublicIcon from "../../components/PublicIcon";
import { SubAdminHeading } from "../../components/SubAdminSummary";
import "./Logout.css";
export default function Logout(){
 const profile=useProfile("SA-1001");
 return <section className="sa-page"><SubAdminHeading title="Logout" subtitle="Leave your Sub Admin portal and return to login." icon="arrow"/><div className="sa-logout-grid"><section className="sa-panel sa-logout-confirm"><span className="sa-logout-icon"><PublicIcon name="arrow"/></span><h2>Are you sure you want to log out?</h2><p>You will be redirected to the login page.</p><Link className="sa-button sa-primary" to="/login" replace>Logout</Link><Link className="sa-button" to="/subadmin/dashboard">Cancel</Link></section><div><section className="sa-panel"><h2>Current Account</h2><div className="sa-list-row"><span>User</span><div/><strong>{profile.name||"Sub Admin"}</strong></div><div className="sa-list-row"><span>Role</span><div/><strong>Sub Administrator</strong></div><div className="sa-list-row"><span>Account ID</span><div/><strong>SA-1001</strong></div></section><section className="sa-panel"><h2>Security Tips</h2><p>Keep your account details private and use your own device when possible.</p><p>Contact your administrator if your profile or assigned access looks incorrect.</p></section></div></div></section>;
}
