import { GoldenFilled } from "@ant-design/icons";
import React from "react";
import StarRating from "react-star-ratings";

export const averageRating = (product) => {
  if (product && product.ratings) {
    let ratingsArray = product && product.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);

    let highest = length * 5;
    console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    console.log("result", result);

    return (
      <div className="text-center pt-1 pb-3">
        <span className="star-rating">
          <StarRating
            rating={result}
            starDimension="20px"
            starRatedColor="#cb9b51 "
            editing={false}
          />
          ({product.ratings.length})
        </span>
      </div>
    );
  }
};
