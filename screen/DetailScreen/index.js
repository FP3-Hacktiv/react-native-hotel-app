import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button, useToast } from "native-base";
import StarRating from "../../components/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { getReviewList } from "../../redux/hotel/hotelAction";
import { StyleSheet } from "react-native";
import { bookHotel } from "../../redux/hotel/hotelSlice";

const HotelDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const { hotel } = route.params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const user = useSelector((state) => state.user);
  const toast = useToast();

  const handleBooking = async () => {
    if (user) {
      const bookingHotel = {
        hotel_id: hotel.hotel_id,
        hotel_name: hotel.hotel_name,
        address: hotel.address,
        price:
          hotel.price_breakdown.all_inclusive_price.toLocaleString("en-US"),
        name: profile ? `${profile.firstName} ${profile.lastName}` : name,
        phone: phoneNumber,
        checkInDate,
        checkOutDate,
      };
      dispatch(bookHotel(bookingHotel));
      toast.show({
        title: "Success",
        status: "success",
        placement: "top",
      });
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("Login");
    }
  };
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
            style={{ width: 400, height: 300, borderRadius: 8 }}
          />
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.title}>{hotel.hotel_name}</Text>
              <Text style={styles.righttitle}>
                Rp.{" "}
                {hotel.price_breakdown.all_inclusive_price.toLocaleString(
                  "en-US"
                )}
              </Text>
            </View>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
              {hotel.address}
            </Text>
            <StarRating rating={hotel.review_score} />
          </View>
        </View>
        <View style={styles.containerReview}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Reviews:
          </Text>
          <Text>Number of Reviews: {hotel.review_nr}</Text>
          {loading ? (
            <Text>Loading reviews...</Text>
          ) : (
            reviews.map((review) => (
              <View
                key={review.review_id}
                style={{
                  marginTop: 8,
                  width: "100%",
                  height: "auto",
                  backgroundColor: "lightgrey",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderRadius: 8,
                }}
              >
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
      <Button
        small
        primary
        style={{ marginBottom: 16 }}
        onPress={() => {
          handleBooking();
        }}
      >
        <Text>Book Now</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 25,
    width: 400,
    marginTop: 15,
  },
  containerReview: {
    backgroundColor: "white",
    shadowColor: "#000",
    marginHorizontal: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    width: 220,
  },
  righttitle: {
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 16,
    textAlign: "right",
    width: 180,
  },
});

export default HotelDetailScreen;
