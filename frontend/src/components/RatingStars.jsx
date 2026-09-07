import React from "react";
import { StarIcon } from "./Icons";

export default function RatingStars({ rating = 0, reviewCount, showCount = true, size = 15 }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalf ? 1 : 0));

  return (
    <div className="rating-stars-wrapper">
      <span className="rating-score">{rating.toFixed(1)}</span>
      <div className="stars-group" aria-label={`Rating ${rating} out of 5 stars`}>
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} size={size} filled={true} />
        ))}
        {hasHalf && <StarIcon size={size} half={true} />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} size={size} filled={false} />
        ))}
      </div>
      {showCount && reviewCount && (
        <span className="rating-count">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
