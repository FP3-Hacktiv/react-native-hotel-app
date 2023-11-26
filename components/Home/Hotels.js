import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";
import hotelDummy from "../../dummyData/hotelsDummy";
import destinationDummy from "../../dummyData/destinationDummy";
import { ScrollView, Spinner } from "native-base";
import {
  getDestinationId,
  getHotelByLocation,
} from "../../redux/hotel/hotelAction";
import { useDispatch, useSelector } from "react-redux";
import img from "./../../assets/image/hotel.jpg";
import Loading from "../Loading";

const Hotels = () => {
  const startIcon = <Icon name="star-o" size={10} color="black" />;
  const locationIcon = (
    <IconIon name="location-outline" size={15} color="black" />
  );
  const dispatch = useDispatch();
  const { locationUser, isLoading } = useSelector((state) => state.hotels);
  const [destinationId, setDestinationId] = useState({});
  const [topHotels, setTopHotels] = useState([]);
  const [popularHotels, setPopularHotels] = useState([]);
  const [loadingTopHotels, setLoadingTopHotels] = useState(true);
  const [loadingPopularHotels, setLoadingPopularHotels] = useState(true);

  const handleScreen = async () => {
    const { payload } = await dispatch(
      getDestinationId({ cityName: locationUser })
    );

    const responseTopHotel = await dispatch(
      getHotelByLocation({
        dest_id: payload[0].dest_id,
        order_by: "review_score",
      })
    );
    setLoadingTopHotels(false);
    setTopHotels(responseTopHotel.payload.result);

    const responsePopularHotels = await dispatch(
      getHotelByLocation({
        dest_id: payload[0].dest_id,
        order_by: "popularity",
      })
    );
    setLoadingPopularHotels(false);
    setPopularHotels(responsePopularHotels.payload.result);
  };

  useEffect(() => {
    handleScreen();
  }, []);

  return (
    <View>
      <Text style={styles.header}>Top Destination</Text>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {destinationDummy.map((item, index) => (
            <View style={styles.column} key={index}>
              <Image style={styles.image} source={item.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.header}>Top Hotels</Text>
      <View style={styles.container}>
        {loadingTopHotels ? (
          <View
            style={{
              flex: 1,
              justifyContent: loadingTopHotels ? "center" : "flex-start",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {topHotels.map((item, index) => (
              <View style={styles.column} key={index}>
                <Image style={styles.topImage} source={img} />
                <Text
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 15,
                    color: "black",
                    fontSize: 12,
                    backgroundColor: "white",
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderRadius: 6,
                  }}
                >
                  {item.ratings} {startIcon}
                </Text>
                <View>
                  <Text style={styles.topTitle}>{item.hotel_name}</Text>
                  <Text style={styles.topLocation}>
                    {locationIcon} {item.city_name_en}, {item.country_trans}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <Text style={styles.header}>Recomendation Hotels</Text>
      <View style={styles.container}>
        {loadingPopularHotels ? (
          <View
            style={{
              flex: 1,
              justifyContent: loadingTopHotels ? "center" : "flex-start",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {popularHotels.map((item, index) => (
              <View style={styles.column} key={index}>
                <Image style={styles.image} source={img} />
                <Text style={styles.title}>{item.hotel_name}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
  },
  column: {
    flex: 1,
    position: "relative",
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  topImage: {
    width: 190,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
  },
  topTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  topLocation: {
    fontSize: 14,
    fontWeight: "light",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginHorizontal: 15,
    marginVertical: 5,
  },
});

export default Hotels;