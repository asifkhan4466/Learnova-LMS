import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Dynamic document title based on portal & section
    if (pathname.startsWith("/admin")) {
      const sub = pathname.replace("/admin/", "").replace("/admin", "");
      const formatted = sub ? sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, " ") : "Dashboard";
      document.title = `Learnova Admin | ${formatted}`;
    } else if (pathname.startsWith("/teacher")) {
      const sub = pathname.replace("/teacher/", "").replace("/teacher", "");
      const formatted = sub ? sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, " ") : "Dashboard";
      document.title = `Learnova Teacher Studio | ${formatted}`;
    } else if (pathname.startsWith("/student")) {
      const sub = pathname.replace("/student/", "").replace("/student", "");
      const formatted = sub ? sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, " ") : "Dashboard";
      document.title = `Learnova Student | ${formatted}`;
    } else if (pathname === "/courses") {
      document.title = "Explore Courses | Learnova";
    } else if (pathname.startsWith("/course/")) {
      document.title = "Course Details | Learnova";
    } else if (pathname === "/about") {
      document.title = "About Us | Learnova";
    } else if (pathname === "/contact") {
      document.title = "Contact & Support | Learnova";
    } else if (pathname === "/login") {
      document.title = "Sign In | Learnova";
    } else if (pathname === "/register") {
      document.title = "Join Learnova | Create Account";
    } else if (pathname === "/forgot-password") {
      document.title = "Reset Password | Learnova";
    } else {
      document.title = "Learnova - Modern Learning Platform";
    }
  }, [pathname, search]);

  return null;
}
