import StudentPayments from "./pages/student/Payments";
import SubAdminCategories from "./pages/subadmin/Categories";
import SubAdminReviews from "./pages/subadmin/Reviews";
import SubAdminPermissions from "./pages/subadmin/Permissions";
import SubAdminAuditLogs from "./pages/subadmin/AuditLogs";
import SubAdminSettings from "./pages/subadmin/Settings";
import SubAdminLogout from "./pages/subadmin/Logout";
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

import SubAdminLayout from "./layouts/SubAdminLayout";
import SubAdminDashboard from "./pages/subadmin/Dashboard";
import SubAdminStudents from "./pages/subadmin/Students";
import SubAdminTeachers from "./pages/subadmin/Teachers";
import SubAdminCourses from "./pages/subadmin/Courses";
import SubAdminBatches from "./pages/subadmin/Batches";
import SubAdminEnrollments from "./pages/subadmin/Enrollments";
import SubAdminPayments from "./pages/subadmin/Payments";
import SubAdminLiveClasses from "./pages/subadmin/LiveClasses";
import SubAdminContent from "./pages/subadmin/LecturesContent";
import SubAdminAssignments from "./pages/subadmin/Assignments";
import SubAdminCertificates from "./pages/subadmin/Certificates";
import SubAdminReports from "./pages/subadmin/Reports";
import SubAdminNotifications from "./pages/subadmin/Notifications";
import SubAdminProfile from "./pages/subadmin/Profile";
import SubAdminPublicContent from "./pages/subadmin/PublicContent";
import MonitorLiveRoom from "./pages/monitoring/LiveRoom";

import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPublicContent from "./pages/admin/PublicContent";
import AdminSubAdminPermissions from "./pages/admin/SubAdminPermissions";

import AdminHomepage from "./pages/admin/Homepage";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminSubAdmins from "./pages/admin/SubAdmins";
import AdminCourses from "./pages/admin/Courses";
import AdminCategories from "./pages/admin/Categories";
import AdminBatches from "./pages/admin/Batches";
import AdminEnrollments from "./pages/admin/Enrollments";
import AdminPayments from "./pages/admin/Payments";
import AdminLiveClasses from "./pages/admin/LiveClasses";
import AdminLecturesContent from "./pages/admin/LecturesContent";
import AdminAssignments from "./pages/admin/Assignments";
import AdminCertificates from "./pages/admin/Certificates";
import AdminReviews from "./pages/admin/Reviews";
import AdminNotifications from "./pages/admin/Notifications";
import AdminReports from "./pages/admin/Reports";
import AdminPermissions from "./pages/admin/Permissions";
import AdminAuditLogs from "./pages/admin/AuditLogs";
import AdminSettings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="homepage" element={<AdminHomepage />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="subadmins" element={<AdminSubAdmins />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="batches" element={<AdminBatches />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="live-classes" element={<AdminLiveClasses />} />
          <Route path="live-classes/:id" element={<MonitorLiveRoom role="Admin" />} />
          <Route path="live-classes/:classId" element={<MonitorLiveRoom role="Admin" />} />
          <Route path="content" element={<AdminLecturesContent />} />
          <Route path="assignments" element={<AdminAssignments />} />
          <Route path="certificates" element={<AdminCertificates />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="permissions" element={<AdminPermissions />} />
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />

          <Route path="public-content" element={<AdminPublicContent />} />
          <Route path="subadmin-permissions" element={<AdminSubAdminPermissions />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
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
          <Route key={role.id} path={`/login/${role.id}`} element={<><Navbar /><Login key={role.id} role={role} /><Footer /></>} />
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

        {/* Sub Admin Panel */}
        <Route path="/subadmin" element={<SubAdminLayout />}>
          <Route path="categories" element={<SubAdminCategories />} />
          <Route path="reviews" element={<SubAdminReviews />} />
          <Route path="permissions" element={<SubAdminPermissions />} />
          <Route path="audit-logs" element={<SubAdminAuditLogs />} />
          <Route path="settings" element={<SubAdminSettings />} />
          <Route path="logout" element={<SubAdminLogout />} />
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="notifications" element={<SubAdminNotifications />} />
          <Route path="profile" element={<SubAdminProfile />} />
          <Route path="certificates" element={<SubAdminCertificates subadminView />} />
          <Route
            path="dashboard"
            element={<SubAdminDashboard />}
          />
          <Route
            path="students"
            element={<SubAdminStudents />}
          />
          <Route
            path="teachers"
            element={<SubAdminTeachers />}
          />
          <Route
            path="courses"
            element={<SubAdminCourses />}
          />
          <Route
            path="batches"
            element={<SubAdminBatches />}
          />
          <Route
            path="enrollments"
            element={<SubAdminEnrollments />}
          />
          <Route 
            path="payments"
            element={<SubAdminPayments />}
          />
          <Route
            path="live-classes"
            element={<SubAdminLiveClasses />}
          />
          <Route path="live-classes/:id" element={<MonitorLiveRoom role="Sub Admin" />} />
          <Route path="live-classes/:classId" element={<MonitorLiveRoom role="Sub Admin" />} />
          <Route
            path="content"
            element={<SubAdminContent />}
          />
          <Route
            path="assignments"
            element={<SubAdminAssignments />}
          />
          <Route
            path="reports"
            element={<SubAdminReports />}
          />
          <Route
            path="public-content"
            element={<SubAdminPublicContent />}
          />
          <Route path="*" element={<Navigate to="/subadmin/dashboard" replace />} />
        </Route>

        {/* Catch-all fallback for unknown public routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      

    </BrowserRouter>
  );
}

export default App;
