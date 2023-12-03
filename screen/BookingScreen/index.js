import React, { useState } from "react";
import { View, Text, Input, Button, useToast } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { bookHotel } from "../../redux/hotel/hotelSlice";

const BookingScreen = ({ navigation }) => {
  const route = useRoute();
  const { hotel_id, hotel_name, address, price } = route.params;
  const profile = useSelector((state) => state.profile);
  const [name, setName] = useState(
    profile ? `${profile.firstName} ${profile.lastName}` : ""
  );
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const roomDetails = {
  //   days: 5,
  //   roomType: "Deluxe Room",
  //   numberOfPeople: 2,
  //   pricePerNight: 100,
  // };

  // const totalCost = roomDetails.days * roomDetails.pricePerNight;
  const dispatch = useDispatch();
  const toast = useToast();
  const handleBooking = async () => {
    const bookingHotel = {
      hotel_id,
      hotel_name,
      address,
      price,
      name,
      phoneNumber,
      // checkInDate,
      // checkOutDate,
    };
    dispatch(bookHotel(bookingHotel));
    toast.show({
      title: "Success",
      status: "success",
      placement: "top",
    });
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#333",
          }}
        >
          Contact Information
        </Text>
        <Input
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          mb={2}
          style={{ backgroundColor: "#eee", borderRadius: 5 }}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          mb={2}
          style={{ backgroundColor: "#eee", borderRadius: 5 }}
        />
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          mb={2}
          style={{ backgroundColor: "#eee", borderRadius: 5 }}
        />
      </View>

      {/* <View
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#333",
          }}
        >
          Price Summary
        </Text>
        <Text style={{ color: "#555" }}>
          Number of Days: {roomDetails.days}
        </Text>
        <Text style={{ color: "#555" }}>
          Number of People: {roomDetails.numberOfPeople}
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 8, color: "#333" }}>
          Total Cost: ${totalCost}
        </Text>
      </View> */}

      <View
        style={{
          marginTop: 15,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 16,
            color: "#333",
          }}
        >
          Total Room Cost
        </Text>
        <Text style={{ color: "#555" }}>Rp. {price}</Text>
        <Button
          onPress={handleBooking}
          disabled={!name || !email || !phoneNumber}
          mt={4}
          style={{ backgroundColor: "#3498db", borderRadius: 5 }}
        >
          <Text style={{ color: "white" }}>Pay Now</Text>
        </Button>
      </View>
    </View>
  );
};

export default BookingScreen;
