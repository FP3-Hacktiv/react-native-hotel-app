import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Button } from "native-base";
import StarRating from "../../components/StarRating";

const HotelDetailScreen = ({ route }) => {
  const { hotel } = route.params;

  return (
    <ScrollView>
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
        {/* Add more review details if needed */}
        <Button small primary style={{ marginTop: 16 }}>
          <Text>Book Now</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default HotelDetailScreen;
