import { Button, Spinner, Text, View } from "native-base";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/hotel/hotelAction";
import { useEffect, useState } from "react";

export default HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const handleGetCities = async () => {
    try {
      const { payload } = await dispatch(getLocation());
      setCities(payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetCities();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen!</Text>
      {loading ? (
        <Spinner />
      ) : (
        <View>
          {cities.map((city, index) => (
            <View style={{ marginBottom: 10 }} key={index}>
              <Button
                small
                primary
                onPress={() =>
                  navigation.navigate("ListHotel", {
                    cityName: city.regionNames.primaryDisplayName,
                  })
                }
              >
                <Text>{city.regionNames.primaryDisplayName}</Text>
              </Button>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
