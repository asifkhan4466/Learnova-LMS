import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="container not-found-page">
      <div className="not-found-card">
        <span className="error-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page or course you are looking for doesn't exist or has been moved. Let's get you back on track!
        </p>
        <div className="not-found-buttons">
          <Link to="/" className="btn-primary-join">
            Back to Home
          </Link>
          <Link to="/courses" className="btn-text-auth">
            Browse All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
