import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Student LMS Layout and Pages
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import MyLearningPage from "./pages/student/MyLearningPage";
import StudentBrowseCoursesPage from "./pages/student/StudentBrowseCoursesPage";
import StudentCoursePlayerPage from "./pages/student/StudentCoursePlayerPage";
import ProgressPage from "./pages/student/ProgressPage";
import AssignmentsPage from "./pages/student/AssignmentsPage";
import QuizzesPage from "./pages/student/QuizzesPage";
import CertificatesPage from "./pages/student/CertificatesPage";
import ProfilePage from "./pages/student/ProfilePage";

// Teacher Studio Layout and Pages
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboardPage from "./pages/teacher/TeacherDashboardPage";
import TeacherCoursesPage from "./pages/teacher/TeacherCoursesPage";
import CreateCoursePage from "./pages/teacher/CreateCoursePage";
import CourseBuilderPage from "./pages/teacher/CourseBuilderPage";
import TeacherStudentsPage from "./pages/teacher/TeacherStudentsPage";
import TeacherAssignmentsPage from "./pages/teacher/TeacherAssignmentsPage";
import TeacherQuizzesPage from "./pages/teacher/TeacherQuizzesPage";
import TeacherGradebookPage from "./pages/teacher/TeacherGradebookPage";
import TeacherLiveClassesPage from "./pages/teacher/TeacherLiveClassesPage";
import TeacherRecordingsPage from "./pages/teacher/TeacherRecordingsPage";
import TeacherProfilePage from "./pages/teacher/TeacherProfilePage";

// Admin Console Layout and Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";
import AdminTeachersPage from "./pages/admin/AdminTeachersPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AdminEnrollmentsPage from "./pages/admin/AdminEnrollmentsPage";
import AdminDepartmentsPage from "./pages/admin/AdminDepartmentsPage";
import AdminProgramsPage from "./pages/admin/AdminProgramsPage";
import AdminLiveClassesPage from "./pages/admin/AdminLiveClassesPage";
import AdminRecordingsPage from "./pages/admin/AdminRecordingsPage";
import AdminAssignmentsPage from "./pages/admin/AdminAssignmentsPage";
import AdminQuizzesPage from "./pages/admin/AdminQuizzesPage";
import AdminGradebookPage from "./pages/admin/AdminGradebookPage";
import AdminCertificatesPage from "./pages/admin/AdminCertificatesPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminAnnouncementsPage from "./pages/admin/AdminAnnouncementsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";

import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Pages with Standard Header & Footer */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="course/:id" element={<CourseDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Student LMS Routes with Sidebar Layout */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="my-learning" element={<MyLearningPage />} />
          <Route path="courses" element={<StudentBrowseCoursesPage />} />
          <Route path="course" element={<StudentBrowseCoursesPage />} />
          <Route path="course/:courseId" element={<StudentCoursePlayerPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Teacher Studio Routes with Dedicated TeacherLayout */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<TeacherDashboardPage />} />
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="courses" element={<TeacherCoursesPage />} />
          <Route path="courses/create" element={<CreateCoursePage />} />
          <Route path="courses/:courseId/edit" element={<CourseBuilderPage />} />
          <Route path="students" element={<TeacherStudentsPage />} />
          <Route path="assignments" element={<TeacherAssignmentsPage />} />
          <Route path="quizzes" element={<TeacherQuizzesPage />} />
          <Route path="gradebook" element={<TeacherGradebookPage />} />
          <Route path="live-classes" element={<TeacherLiveClassesPage />} />
          <Route path="recordings" element={<TeacherRecordingsPage />} />
          <Route path="profile" element={<TeacherProfilePage />} />
        </Route>

        {/* Admin Console Routes with Dedicated AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="teachers" element={<AdminTeachersPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="enrollments" element={<AdminEnrollmentsPage />} />
          <Route path="departments" element={<AdminDepartmentsPage />} />
          <Route path="programs" element={<AdminProgramsPage />} />
          <Route path="live-classes" element={<AdminLiveClassesPage />} />
          <Route path="recordings" element={<AdminRecordingsPage />} />
          <Route path="assignments" element={<AdminAssignmentsPage />} />
          <Route path="quizzes" element={<AdminQuizzesPage />} />
          <Route path="gradebook" element={<AdminGradebookPage />} />
          <Route path="certificates" element={<AdminCertificatesPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="announcements" element={<AdminAnnouncementsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="audit-logs" element={<AdminAuditLogsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
