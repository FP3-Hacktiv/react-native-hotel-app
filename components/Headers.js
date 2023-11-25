import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { getLocationUser } from "../redux/hotel/hotelAction";

const myIcon = <Icon name="bell" size={20} color="#fafafa" />;
const searchIcon = <Icon name="search" size={20} color="#fafafa" />;
const locationIcon = (
  <IconIon name="location-outline" size={20} color="#fafafa" />
);

const Headers = () => {
  const [locationUser, setLocationUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      const { payload } = await dispatch(
        getLocationUser({
          latitude: coords.latitude,
          longitude: coords.longitude,
        })
      );
      setLocationUser(payload[0].City);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.left}>Location</Text>
        <Text style={styles.right}>{myIcon}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 10,
          marginLeft: 15,
        }}
      >
        {locationIcon}
        <Text
          style={{
            color: "#ffff",
            fontSize: 16,
          }}
        >
          {locationUser}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: "#689ff1",
    borderRadius: 8,
    paddingVertical: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  left: {
    flex: 0,
    paddingVertical: 5,
    fontSize: 16,
    color: "#fafafa",
  },
  right: {
    flex: 0,
  },
});
export default Headers;
