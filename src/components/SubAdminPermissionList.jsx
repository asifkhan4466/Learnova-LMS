import { operationalPermissions, currentSubAdminId, hasPermission } from "../utils/adminPermissions";
import usePermissions from "../utils/usePermissions";
import "./SubAdminPermissionList.css";
export default function SubAdminPermissionList(){
 const permissions=usePermissions();
 return <div className="sa-permission-list">{operationalPermissions.map(([key,label])=><div key={key}><span>{label}</span><span className="sa-status" data-status={hasPermission("subadmin",currentSubAdminId,key,permissions)?"Active":"Inactive"}>{hasPermission("subadmin",currentSubAdminId,key,permissions)?"Allowed":"Restricted"}</span></div>)}</div>;
}
