export const ADMIN_PERMISSION_KEY = "learnova_admin_permissions";
export const subAdmins = [
  { id: "SA-1001", name: "Sub Admin", email: "subadmin@learnova.com", status: "Active" },
  { id: "SA-1002", name: "Operations Sub Admin", email: "operations@learnova.com", status: "Active" },
];
export const operationalPermissions = [
  ["students", "Manage Students"], ["teachers", "Manage Teachers"],
  ["courses", "Manage Courses"], ["batches", "Manage Batches"],
  ["enrollments", "Manage Enrollments"], ["payments", "Verify Payments"],
  ["liveClasses", "Manage Live Classes", "live-classes"], ["content", "Manage Lectures & Content"], ["assignments", "Manage Assignments"],
  ["certificates", "Manage Certificates"],
  ["reports", "View Reports"], ["publicWebsite", "Manage Public Website", "public-content"],
];
export const publicPermissions = [
  ["homepage", "Manage Homepage Content"], ["publicCourses", "Manage Public Courses"],
  ["banners", "Manage Banners"], ["announcements", "Manage Announcements / Posts"],
  ["instructorProfiles", "Manage Instructor Public Profiles"],
];

export const currentSubAdminId = "SA-1001"; // Existing frontend demo account.
const permissionEvent = "learnova:permissions-changed";

export function permissionSnapshot() {
  try { return localStorage.getItem(ADMIN_PERMISSION_KEY) || "{}"; }
  catch { return "{}"; }
}

export function subscribePermissions(listener) {
  const onStorage = event => {
    if (event.key === ADMIN_PERMISSION_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(permissionEvent, listener);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(permissionEvent, listener);
  };
}

export function readAdminPermissions(snapshot = permissionSnapshot()) {
  try {
    const saved = JSON.parse(snapshot);
    return Object.fromEntries(subAdmins.map(person => [person.id, Object.fromEntries([...operationalPermissions, ...publicPermissions].map(([key]) => [key, saved?.[person.id]?.[key] === true]))]));
  } catch { return {}; }
}

export function changeAdminPermission(id, key, enabled) {
  const permissions = readAdminPermissions();
  if (!subAdmins.some(person => person.id === id) || ![...operationalPermissions, ...publicPermissions].some(([name]) => name === key)) throw new Error("Unknown permission or Sub Admin.");
  if (publicPermissions.some(([name]) => name === key) && !permissions[id]?.publicWebsite) throw new Error("Enable Manage Public Website first.");
  const next = { ...permissions, [id]: { ...permissions[id], [key]: enabled === true } };
  if (key === "publicWebsite" && !enabled) for (const [name] of publicPermissions) next[id][name] = false;
  try { localStorage.setItem(ADMIN_PERMISSION_KEY, JSON.stringify(next)); }
  catch { throw new Error("Permissions could not be saved in this browser."); }
  window.dispatchEvent(new Event(permissionEvent));
  return next;
}

// Frontend visibility policy only, not authentication or server-side authorization.
export function canManagePublicContent(role, subAdminId, permission, permissions = readAdminPermissions()) {
  if (permission && !publicPermissions.some(([key]) => key === permission)) return false;
  return hasPermission(role, subAdminId, "publicWebsite", permissions)
    && (!permission || hasPermission(role, subAdminId, permission, permissions));
}

export function hasPermission(role, id, key, permissions = readAdminPermissions()) {
  if (role === "admin") return true;
  return role === "subadmin" && subAdmins.some(person => person.id === id && person.status === "Active")
    && permissions[id]?.[key] === true;
}

export function canAccessSubAdminRoute(pathname, permissions, id = currentSubAdminId) {
  const page = pathname.replace(/\/+$/, "").split("/")[2];
  if (["dashboard", "notifications", "profile", "permissions", "settings", "logout"].includes(page)) return true;
  const permission = operationalPermissions.find(([key, , route = key]) => route === ({ categories: "courses", reviews: "reports", "audit-logs": "reports" }[page] || page));
  return !!permission && hasPermission("subadmin", id, permission[0], permissions);
}
