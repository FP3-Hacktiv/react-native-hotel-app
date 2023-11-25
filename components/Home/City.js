import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { ScrollView, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../redux/hotel/hotelAction";
import img from "./../../assets/image/hotel.jpg";

const City = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, location } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(getLocation());
  }, []);

  return (
    <View>
      <Text style={styles.header}>Explore City</Text>
      <View style={styles.container}>
        {loading ? (
          <Spinner />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {location.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("ListHotel", {
                    cityName: item.regionNames.primaryDisplayName,
                  })
                }
                key={index}
              >
                <View style={styles.column}>
                  <Image style={styles.image} source={img} />
                  <Text style={styles.title}>
                    {item.regionNames?.primaryDisplayName}
                  </Text>
                </View>
              </Pressable>
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
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginHorizontal: 15,
    marginVertical: 5,
  },
});

export default City;
