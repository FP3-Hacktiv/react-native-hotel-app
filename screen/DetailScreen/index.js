import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "native-base";
import StarRating from "../../components/StarRating";
import { useDispatch } from "react-redux";
import { getReviewList } from "../../redux/hotel/hotelAction";

const HotelDetailScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { hotel } = route.params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetReviewHotel = async () => {
    try {
      const { payload } = await dispatch(
        getReviewList({ hotel_ids: hotel.hotel_id })
      );
      setReviews(payload.result);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReviewHotel();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center", padding: 16 }}>
          <Image
            source={{ uri: hotel.main_photo_url }}
            style={{ width: 200, height: 200, borderRadius: 8 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
            {hotel.hotel_name}
          </Text>
          <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
            {hotel.address}
          </Text>
          <StarRating rating={hotel.review_score} />
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Description:
          </Text>
          <Text>{/* Add hotel description here */}</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Facilities:
          </Text>
          <Text>{/* Add hotel facilities here */}</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Price: Rp.{" "}
            {hotel.price_breakdown.all_inclusive_price.toLocaleString("en-US")}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Reviews:
          </Text>
          <Text>Number of Reviews: {hotel.review_nr}</Text>
          {loading ? (
            <Text>Loading reviews...</Text>
          ) : (
            reviews.map((review) => (
              <View key={review.review_id} style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {review.title}
                </Text>
                <Text>{review.pros}</Text>
                <Text>{review.cons}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
      <Button small primary style={{ marginBottom: 16 }}>
        <Text>Book Now</Text>
      </Button>
    </View>
  );
};

export default HotelDetailScreen;
