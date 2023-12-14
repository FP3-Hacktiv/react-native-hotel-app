import React, { useState } from "react";
import { View, Text, Input, Button, useToast, ScrollView } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { bookHotel } from "../../redux/hotel/hotelSlice";
import darkColors from "react-native-elements/dist/config/colorsDark";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Alert, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BookingScreen = ({ navigation }) => {
  const route = useRoute();
  const { hotel_id, hotel_name, address, price, main_photo_url, review_score } = route.params;
  const profile = useSelector((state) => state.profile);
  const [name, setName] = useState(
    profile ? `${profile.firstName} ${profile.lastName}` : ""
  );
  const [checkOut, setCheckOut] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  const [selected, setSelected] = useState("");
  const calendar = <Icon name="calendar" size={10} color="black" />;
  const dispatch = useDispatch();
  const onDayPress = (day) => {
    setSelected(day.dateString);
  };
  const onCheckout = (day) => {
    if (new Date(day.dateString) >= new Date(selected)) {
      setCheckOut(day.dateString);
    } else {
      Alert.alert("Waktu Invalid");
    }
  };
  const toast = useToast();
  const handleBooking = async () => {
    if (!selected || !checkOut) {
      toast.show({
        title: "Please select check-in and check-out dates",
        status: "warning",
        placement: "top",
      });
      return;
    }

    const bookingHotel = {
      hotel_id,
      hotel_name,
      address,
      main_photo_url,
      review_score,
      price,
      name,
      email,
      phoneNumber,
      selected,
      checkOut,
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
    <ScrollView style={{ paddingVertical:10 ,flex: 1, padding: 15, backgroundColor: "#f5f5f5", marginBottom:10 }}>
      <View
        style={{
          marginTop: 5,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Choose Dates
        </Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#555", marginBottom: 8 }}>
            Check-in:{" "}
            {selected ? selected : "Not selected"}
          </Text>
          <Text style={{ color: "#555", marginBottom: 16 }}>
            Check-out:{" "}
            {checkOut ? checkOut : "Not selected"}
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={{
                    [selected]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: "orange",
                    },
                  }}
                />
                <Button
                  title="Close Calendar"
                  onPress={() => setModalVisible(false)}
                >
                  Finish
                </Button>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={outVisible}
            onRequestClose={() => {
              setOutVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Calendar
                  onDayPress={onCheckout}
                  markedDates={{
                    [checkOut]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: "orange",
                    },
                  }}
                />
                <Button
                  title="Close Calendar"
                  onPress={() => setOutVisible(false)}
                >
                  Finish
                </Button>
              </View>
            </View>
          </Modal>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: 0,
              borderRadius: 10,
            }}
          >
            <Button
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "#3498db",
                borderRadius: 8,
                marginRight: 8,
              }}
            >
              <Text style={{ color: "white" }}>Select Check-in Date</Text>
            </Button>
            <Button
              onPress={() => setOutVisible(true)}
              style={{
                backgroundColor: "#3498db",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white" }}>Select Check-out Date</Text>
            </Button>
          </View>
        </View>
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
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
})
export default BookingScreen;
