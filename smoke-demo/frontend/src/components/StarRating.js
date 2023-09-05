import React, { useState } from "react";

function StarRating() {
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (starIndex) => {
    setSelectedStar(starIndex);
    console.log(starIndex);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const starStyle = {
        color: i < selectedStar ? "yellow" : "gray",
        cursor: "pointer",
      };

      stars.push(
        <span
          key={i}
          style={starStyle}
          onMouseEnter={() => handleStarClick(i + 1)}
          onMouseLeave={() => handleStarClick(null)}
          onClick={() => handleStarClick(i + 1)}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default StarRating;
