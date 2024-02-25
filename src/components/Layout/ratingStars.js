import React from "react";

export default function ratingStars({ rating }) {
  const fullstar = "\u2605"; // Unicode character code for a filled star
  const emptyStar = "\u2606";
  return (
    <>
      <span style={{ color: "gold", fontSize: "large" }}>
        {fullstar.repeat(Math.round(rating))}
        {emptyStar.repeat(5 - rating)}{" "}
      </span>
    </>
  );
}
