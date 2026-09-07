import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchIcon, StarIcon, ClockIcon, BookOpenIcon, PlayCircleIcon } from "../../components/Icons";
import { coursesData } from "../../data/coursesData";
import { enrolledCourses } from "../../data/studentData";

export default function StudentBrowseCoursesPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Artificial Intelligence", "Web Development", "Data Science", "Cloud & DevOps", "Cybersecurity", "UI/UX Design", "Software Engineering"];

  const enrolledIds = new Set(enrolledCourses.map((c) => c.id));

  const filtered = coursesData.filter((c) => {
    if (selectedCat !== "All" && c.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="student-browse-page">
      <div className="student-page-header">
        <div>
          <h1>Explore Platform Courses</h1>
          <p className="student-page-subtitle">
            Expand your learning roadmap with accredited curriculums across AI, Cloud, and Engineering.
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="browse-filter-bar">
        <div className="browse-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill-btn ${selectedCat === cat ? "active" : ""}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="browse-search-box">
          <SearchIcon size={16} className="search-icon-inline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, instructors, topics..."
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="student-browse-grid">
        {filtered.map((course) => {
          const isEnrolled = enrolledIds.has(course.id);
          return (
            <div key={course.id} className="student-catalog-card">
              <div className="catalog-media-wrap">
                <img src={course.thumbnail} alt={course.title} className="catalog-img" />
                {isEnrolled ? (
                  <span className="catalog-enrolled-badge">✓ Enrolled</span>
                ) : (
                  <span className="catalog-level-badge">{course.level}</span>
                )}
              </div>

              <div className="catalog-body">
                <span className="catalog-cat">{course.category}</span>
                <h3 className="catalog-title">
                  <Link to={`/course/${course.id}`}>{course.title}</Link>
                </h3>
                <p className="catalog-instructor">By {course.instructor.name}</p>

                <div className="catalog-meta-row">
                  <span className="catalog-rating">★ {course.rating}</span>
                  <span className="catalog-duration">
                    <ClockIcon size={13} /> {course.duration}
                  </span>
                  <span className="catalog-lessons">
                    <BookOpenIcon size={13} /> {course.lessonsCount} lessons
                  </span>
                </div>

                <div className="catalog-footer-row">
                  <span className="catalog-price">${course.price}</span>
                  {isEnrolled ? (
                    <Link to={`/student/course/${course.id}`} className="btn-catalog-primary resume">
                      <PlayCircleIcon size={15} /> Resume
                    </Link>
                  ) : (
                    <Link to={`/course/${course.id}`} className="btn-catalog-primary">
                      Course Details →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
