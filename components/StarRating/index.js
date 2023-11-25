import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= filledStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={20} color="gold" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={20} color="gold" />
      );
    }

    const remainingStars = 5 - (filledStars + (hasHalfStar ? 1 : 0));

    for (let i = 1; i <= remainingStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={20}
          color="gold"
        />
      );
    }

    return stars;
  };

  return <View style={{ flexDirection: "row" }}>{renderStars()}</View>;
};

export default StarRating;
