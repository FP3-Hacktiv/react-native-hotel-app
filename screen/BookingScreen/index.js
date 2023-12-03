import React, { useState } from "react";
import { View, Text, Input, Button } from "native-base";
import { useRoute } from "@react-navigation/native";

const BookingScreen = () => {
  const route = useRoute();

  const profile = {
    firstName: "John",
    lastName: "Doe",
  };

  const [name, setName] = useState(`${profile.firstName} ${profile.lastName}`);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const roomDetails = {
    days: 5,
    roomType: "Deluxe Room",
    numberOfPeople: 2,
    pricePerNight: 100,
  };

  const totalCost = roomDetails.days * roomDetails.pricePerNight;

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
      </View>

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
          Payable Now
        </Text>
        <Text style={{ color: "#555" }}>Payable Amount: ${totalCost}</Text>
        <Button
          onPress={() => {
            console.log("Payment logic goes here");
          }}
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
