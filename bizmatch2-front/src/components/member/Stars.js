import React from "react";
export default function Stars({ averageRate }) {
  const fullStars = Math.floor(averageRate);
  const halfStar = averageRate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star"></i>
      ))}
    </div>
  );
}
