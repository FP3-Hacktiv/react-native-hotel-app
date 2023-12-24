import React from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import hotel from "../../assets/image/hotel.jpg";
import { Pressable } from "native-base";

const BookingHistoryPage = ({navigation}) => {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const booked = useSelector((state) => state.booked);
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
  const onDay = days[today.getDay()];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Name : {profile ? profile.firstName : user.username}
        </Text>
        <Text style={styles.dateText}>
          {onDay} {formattedDate}
        </Text>
      </View>
      <Text style={styles.historyHeader}>Booking History</Text>
      <ScrollView style={styles.historyContainer}>
        {booked && booked.length > 0 ? (
        booked.map((item, index) => (
        <Pressable 
        onPress={()=>
          navigation.navigate("DetailBooking",{
            hotel:item,
          })
          
        }
        key={index}
        >
        <View style={styles.historyItem}>
          <Image
            style={{
              width: 180,
              height: 120,
              marginRight: 10,
            }}
            source={hotel}
          />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              {item.hotel_name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "300",
                marginTop: 5,
              }}
            >
              {item.address}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                marginTop: 5,
              }}
            >
              Rp. {item.price}
            </Text>
          </View>
        </View>
        </Pressable>
        ))
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Belum ada melakukan booking</Text>
        </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical: 20,
  },
  header: {
    marginBottom: 20,
    width: "100%",
    height: 100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "normal",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "300",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryBox: {
    width: "48%",
    height: 100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "normal",
  },
  historyContainer: {},
  historyItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  historyHeader: {
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center",
  },
});

export default BookingHistoryPage;
