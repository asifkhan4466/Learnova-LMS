import StudentPayments from "./pages/student/Payments";
import AdminCategories from "./pages/admin/Categories";
import AdminReviews from "./pages/admin/Reviews";
import AdminPermissions from "./pages/admin/Permissions";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminSettings from "./pages/admin/Settings";
import AdminLogout from "./pages/admin/Logout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/public/Home";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";
import { loginRoles } from "./pages/auth/loginRoles";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Courses from "./pages/public/Courses";
import CourseDetail from "./pages/public/CourseDetail";
import Categories from "./pages/public/Categories";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

import StudentLayout from "./layouts/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import MyCourses from "./pages/student/MyCourses";
import BrowseCourses from "./pages/student/BrowseCourses";
import LiveClasses from "./pages/student/LiveClasses";
import Assignments from "./pages/student/Assignments";
import Progress from "./pages/student/Progress";
import Certificates from "./pages/student/Certificates";
import Notifications from "./pages/student/Notifications";
import StudentLiveRoom from "./pages/student/LiveRoom";
import Settings from "./pages/student/Settings";

import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherProfile from "./pages/teacher/Profile";
import TeacherCourses from "./pages/teacher/MyCourses";
import TeacherBatches from "./pages/teacher/MyBatches";
import TeacherContent from "./pages/teacher/LecturesContent";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherStudents from "./pages/teacher/Students";
import TeacherSchedule from "./pages/teacher/Schedule";
import TeacherLiveClasses from "./pages/teacher/LiveClasses";
import TeacherLiveRoom from "./pages/teacher/LiveRoom";
import TeacherRecordings from "./pages/teacher/RecordingsNotes";
import TeacherProgress from "./pages/teacher/StudentProgress";
import TeacherNotifications from "./pages/teacher/Notifications";
import TeacherSettings from "./pages/teacher/Settings";
import TeacherLogout from "./pages/teacher/Logout";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminCourses from "./pages/admin/Courses";
import AdminBatches from "./pages/admin/Batches";
import AdminEnrollments from "./pages/admin/Enrollments";
import AdminPayments from "./pages/admin/Payments";
import AdminLiveClasses from "./pages/admin/LiveClasses";
import AdminContent from "./pages/admin/LecturesContent";
import AdminAssignments from "./pages/admin/Assignments";
import AdminCertificates from "./pages/admin/Certificates";
import AdminReports from "./pages/admin/Reports";
import AdminNotifications from "./pages/admin/Notifications";
import AdminProfile from "./pages/admin/Profile";
import AdminPublicContent from "./pages/admin/PublicContent";
import MonitorLiveRoom from "./pages/monitoring/LiveRoom";

import "./App.css";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import SuperAdminPublicContent from "./pages/superadmin/PublicContent";
import SuperAdminSubAdminPermissions from "./pages/superadmin/AdminPermissions";

import SuperAdminHomepage from "./pages/superadmin/Homepage";
import SuperAdminStudents from "./pages/superadmin/Students";
import SuperAdminTeachers from "./pages/superadmin/Teachers";
import SuperAdminSubAdmins from "./pages/superadmin/Admins";
import SuperAdminCourses from "./pages/superadmin/Courses";
import SuperAdminCategories from "./pages/superadmin/Categories";
import SuperAdminBatches from "./pages/superadmin/Batches";
import SuperAdminEnrollments from "./pages/superadmin/Enrollments";
import SuperAdminPayments from "./pages/superadmin/Payments";
import SuperAdminLiveClasses from "./pages/superadmin/LiveClasses";
import SuperAdminLecturesContent from "./pages/superadmin/LecturesContent";
import SuperAdminAssignments from "./pages/superadmin/Assignments";
import SuperAdminCertificates from "./pages/superadmin/Certificates";
import SuperAdminReviews from "./pages/superadmin/Reviews";
import SuperAdminNotifications from "./pages/superadmin/Notifications";
import SuperAdminReports from "./pages/superadmin/Reports";
import SuperAdminPermissions from "./pages/superadmin/Permissions";
import SuperAdminAuditLogs from "./pages/superadmin/AuditLogs";
import SuperAdminSettings from "./pages/superadmin/Settings";
import SuperAdminProfile from "./pages/superadmin/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="homepage" element={<SuperAdminHomepage />} />
          <Route path="students" element={<SuperAdminStudents />} />
          <Route path="teachers" element={<SuperAdminTeachers />} />
          <Route path="subadmins" element={<SuperAdminSubAdmins />} />
          <Route path="courses" element={<SuperAdminCourses />} />
          <Route path="categories" element={<SuperAdminCategories />} />
          <Route path="batches" element={<SuperAdminBatches />} />
          <Route path="enrollments" element={<SuperAdminEnrollments />} />
          <Route path="payments" element={<SuperAdminPayments />} />
          <Route path="live-classes" element={<SuperAdminLiveClasses />} />
          <Route path="live-classes/:id" element={<MonitorLiveRoom role="Super Admin" />} />
          <Route path="content" element={<SuperAdminLecturesContent />} />
          <Route path="assignments" element={<SuperAdminAssignments />} />
          <Route path="certificates" element={<SuperAdminCertificates />} />
          <Route path="reviews" element={<SuperAdminReviews />} />
          <Route path="notifications" element={<SuperAdminNotifications />} />
          <Route path="reports" element={<SuperAdminReports />} />
          <Route path="permissions" element={<SuperAdminPermissions />} />
          <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
          <Route path="settings" element={<SuperAdminSettings />} />
          <Route path="profile" element={<SuperAdminProfile />} />

          <Route path="public-content" element={<SuperAdminPublicContent />} />
          <Route path="subadmin-permissions" element={<SuperAdminSubAdminPermissions />} />
          <Route path="*" element={<Navigate to="/superadmin/dashboard" replace />} />
        </Route>

        {/* Public Pages */}

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <RoleSelection />
              <Footer />
            </>
          }
        />

        {loginRoles.map(role => (
          <Route key={role.id} path={`/login/${role.path || role.id}`} element={<><Navbar /><Login key={role.id} role={role} /><Footer /></>} />
        ))}

        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
              <Footer />
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <Navbar />
              <ForgotPassword />
              <Footer />
            </>
          }
        />

        <Route
          path="/courses"
          element={
            <>
              <Navbar />
              <Courses />
              <Footer />
            </>
          }
        />

        <Route
          path="/course/:id"
          element={
            <>
              <Navbar />
              <CourseDetail />
              <Footer />
            </>
          }
        />

        <Route
          path="/categories"
          element={
            <>
              <Navbar />
              <Categories />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Student Panel */}

        <Route path="/student" element={<StudentLayout />}>
          <Route path="payments" element={<StudentPayments />} />
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />
          <Route
            path="courses"
            element={<MyCourses />}
          />
          <Route
            path="browse-courses"
            element={<BrowseCourses />}
          />
          <Route
            path="live-classes"
            element={<LiveClasses />}
          />
          <Route path="live-classes/:id" element={<StudentLiveRoom />} />
          <Route
            path="assignments"
            element={<Assignments />}
          />
          <Route
            path="progress"
            element={<Progress />}
          />
          <Route
            path="certificates"
            element={<Certificates />}
          />
          <Route
            path="notifications"
            element={<Notifications />}
          />
          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
        
          {/* Teacher Panel */}
        
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route path="logout" element={<TeacherLogout />} />
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route
           path="dashboard"
           element={<TeacherDashboard />}
            />
          <Route
            path="profile"
            element={<TeacherProfile />}
          />
          <Route
            path="courses"
            element={<TeacherCourses />}
          />
          <Route
            path="batches"
            element={<TeacherBatches />}
          />
          <Route
            path="content"
            element={<TeacherContent />}
          />
          <Route
            path="assignments"
            element={<TeacherAssignments />}
          />
          <Route
            path="students"
            element={<TeacherStudents />}
          />
          <Route
            path="schedule"
            element={<TeacherSchedule />}
          />
          <Route
            path="live-classes"
            element={<TeacherLiveClasses />}
          />
          <Route path="live-classes/:id" element={<TeacherLiveRoom />} />
          <Route
            path="recordings"
            element={<TeacherRecordings />}
          />
          <Route
            path="progress"
            element={<TeacherProgress />}
          />
          <Route
            path="notifications"
            element={<TeacherNotifications />}
          />
          <Route
            path="settings"
            element={<TeacherSettings />}
          />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="permissions" element={<AdminPermissions />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="logout" element={<AdminLogout />} />
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="certificates" element={<AdminCertificates subadminView />} />
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="students"
            element={<AdminStudents />}
          />
          <Route
            path="teachers"
            element={<AdminTeachers />}
          />
          <Route
            path="courses"
            element={<AdminCourses />}
          />
          <Route
            path="batches"
            element={<AdminBatches />}
          />
          <Route
            path="enrollments"
            element={<AdminEnrollments />}
          />
          <Route 
            path="payments"
            element={<AdminPayments />}
          />
          <Route
            path="live-classes"
            element={<AdminLiveClasses />}
          />
          <Route path="live-classes/:id" element={<MonitorLiveRoom role="Admin" />} />
          <Route
            path="content"
            element={<AdminContent />}
          />
          <Route
            path="assignments"
            element={<AdminAssignments />}
          />
          <Route
            path="reports"
            element={<AdminReports />}
          />
          <Route
            path="public-content"
            element={<AdminPublicContent />}
          />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Catch-all fallback for unknown public routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      

    </BrowserRouter>
  );
}

export default App;
