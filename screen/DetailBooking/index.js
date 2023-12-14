import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button, useToast } from "native-base";
import StarRating from "../../components/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { getReviewList } from "../../redux/hotel/hotelAction";
import { StyleSheet } from "react-native";
import { bookHotel } from "../../redux/hotel/hotelSlice";

const HotelDetailBooking = ({ route, navigation }) => {
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
      navigation.navigate("Booking", {
        hotel_id: hotel.hotel_id,
        hotel_name: hotel.hotel_name,
        address: hotel.address,
        price:
          hotel.price.toLocaleString("en-US"),
      });
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
                {hotel.price.toLocaleString(
                  "en-US"
                )}
              </Text>
            </View>
            <View style={{
              paddingVertical:15,
            }}>
            <Text style={{ fontSize: 16, color: "gray", marginTop: 8 }}>
              {hotel.address}
            </Text>
            <StarRating rating={hotel.review_score} />
            </View>
          </View>
        </View>
        <View style={styles.containerReview}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
            Booked on:
          </Text>
          <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "white",
            padding: 0,
            borderRadius: 10,
            marginBottom:15,
          }}
          >
            <Text>CheckIn Date: {hotel.selected}</Text>
            <Text>Checkout Date: {hotel.checkOut}</Text>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom:10,
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

export default HotelDetailBooking;
