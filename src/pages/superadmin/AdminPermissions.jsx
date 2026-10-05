import "./AdminPermissions.css";
import { useOutletContext } from "react-router-dom";
import { subAdmins, operationalPermissions } from "../../utils/adminPermissions";

function AdminPermissions() {
  const { permissions, updatePermission, message } = useOutletContext();
  return <div className="admin-permissions-page">
    <header><h1>Admin Permissions</h1><p>Assign or revoke permissions for Admin accounts.</p></header>
    {message && <p role="status">{message}</p>}
    <div className="admin-permissions-list">{subAdmins.map(person => <fieldset key={person.id} className="admin-permission-account"><legend>{person.name}</legend><p>{person.id} · {person.status}</p><div className="admin-permission-options">{operationalPermissions.map(([key, label]) => <label key={key}><input type="checkbox" checked={permissions[person.id]?.[key] === true} onChange={event => updatePermission(person.id, key, event.target.checked)} />{label}</label>)}</div></fieldset>)}</div>
  </div>;
}
export default AdminPermissions;
