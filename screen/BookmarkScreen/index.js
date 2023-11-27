import React from "react";
import { Button, Image, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import hotel from "../../assets/image/hotel.jpg";

const BookmarkScreen = () => {
  const { user } = useSelector((state) => state.hotels);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
  const onDay = days[today.getDay()];

  const bookingHistory = [
    { id: 1, title: "Pemesanan 1", status: "Sedang dibooking" },
    { id: 2, title: "Pemesanan 2", status: "Pernah dibooking" },
    { id: 3, title: "Pemesanan 3", status: "Pernah dibooking" },
    { id: 4, title: "Pemesanan 4", status: "Pernah dibooking" },
    { id: 4, title: "Pemesanan 5", status: "Sedang dibooking" },
  ];
  const leftColumnData = bookingHistory.filter((_, index) => index % 2 === 0);
  const rightColumnData = bookingHistory.filter((_, index) => index % 2 !== 0);
  const sedangDibookingCount = bookingHistory.filter(
    (item) => item.status === "Sedang dibooking"
  ).length;

  const pernahDibookingCount = bookingHistory.filter(
    (item) => item.status === "Pernah dibooking"
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Username : {user?(user.username):''}</Text>
        <Text style={styles.dateText}>
          {onDay} {formattedDate}
        </Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between'
      }}>
        <Text style={styles.historyHeader}>My Wishes</Text>
        <View style={{
          marginBottom:10,
        }}>
          <Button title="Add"/>
        </View>
      </View>
      <ScrollView>
        <View style={styles.historyContainer}>
        <View style={styles.leftColumn}>
        {leftColumnData.map((item) => (
          <View key={item.id}>
            <Image
              style={{
                width: 180,
                height: 120,
                marginRight: 10,
              }}
              source={hotel}
            />
            <View>
              <Text>{item.title}</Text>
              <Text>{item.status}</Text>
            </View>
          </View>
        ))}
        </View>
        <View style={styles.rightColumn}>
        {rightColumnData.map((item) => (
          <View key={item.id}>
            <Image
              style={{
                width: 180,
                height: 120,
                marginRight: 10,
              }}
              source={hotel}
            />
            <View>
              <Text>{item.title}</Text>
              <Text>{item.status}</Text>
            </View>
          </View>
        ))}
        </View>
        </View>
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
  historyContainer: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  historyItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  historyHeader: {
    fontSize: 20,
    // marginBottom:10,
  },
  leftColumn: {
    marginRight: 5,
    flex:1
  },
  rightColumn: {
    marginLeft: 5,
    flex: 1,
  },
});

export default BookmarkScreen;
