import "./RoleSelection.css";
import { Link, useLocation } from "react-router-dom";
import { loginRoles } from "./loginRoles";

function RoleSelection() {
  const { search, state } = useLocation();
  const params = new URLSearchParams(search);
  const adminChoice = params.get("group") === "admin";
  params.delete("group");
  const query = params.toString() ? `?${params}` : "";
  const adminParams = new URLSearchParams(params);
  adminParams.set("group", "admin");
  const roles = loginRoles.filter(role => adminChoice ? ["admin", "subadmin"].includes(role.id) : role.id !== "subadmin");
  return (
    <div className="role-selection-page">
      <div className="role-selection-card">
        <div className="role-selection-header">
          <h1>{adminChoice ? "Admin Access" : "Welcome to Learnova"}</h1>
          <p>{adminChoice ? "Select Admin or Sub Admin to log in." : "Select your account type to continue."}</p>
        </div>
        <nav className="role-selection-options" aria-label="Account type">
          {roles.map(role => (
            <Link key={role.id} to={!adminChoice && role.id === "admin" ? `/login?${adminParams}` : `/login/${role.id}${query}`} state={state}>
              <span>{role.name}</span><span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
        {adminChoice && <Link className="role-selection-back" to={`/login${query}`} state={state}>Back to account types</Link>}
      </div>
    </div>
  );
}

export default RoleSelection;
