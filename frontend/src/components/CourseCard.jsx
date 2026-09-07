import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { ClockIcon, BookOpenIcon, UsersIcon } from "./Icons";

export default function CourseCard({ course }) {
  const {
    id,
    title,
    category,
    level,
    rating,
    reviewCount,
    instructor,
    duration,
    lessonsCount,
    price,
    originalPrice,
    thumbnail,
    badge,
    organization
  } = course;

  return (
    <div className="course-card">
      <div className="course-card-image-wrap">
        <img src={thumbnail} alt={title} className="course-card-image" loading="lazy" />
        {badge && <span className={`course-badge badge-${badge.toLowerCase().replace(/[^a-z0-9]/g, "")}`}>{badge}</span>}
        <span className="course-level-pill">{level}</span>
      </div>

      <div className="course-card-content">
        <div className="course-card-meta-top">
          <span className="course-category-tag">{category}</span>
          {organization && <span className="course-org-tag">{organization}</span>}
        </div>

        <h3 className="course-card-title">
          <Link to={`/course/${id}`} className="course-title-link">
            {title}
          </Link>
        </h3>

        <p className="course-instructor-name">By {instructor?.name}</p>

        <div className="course-card-rating">
          <RatingStars rating={rating} reviewCount={reviewCount} />
        </div>

        <div className="course-card-details">
          <span className="course-detail-item">
            <ClockIcon size={14} />
            {duration}
          </span>
          <span className="course-detail-item">
            <BookOpenIcon size={14} />
            {lessonsCount} lessons
          </span>
        </div>

        <div className="course-card-footer">
          <div className="course-price-wrap">
            <span className="course-price">${price}</span>
            {originalPrice && (
              <span className="course-original-price">${originalPrice}</span>
            )}
          </div>
          <Link to={`/course/${id}`} className="btn-view-course">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
