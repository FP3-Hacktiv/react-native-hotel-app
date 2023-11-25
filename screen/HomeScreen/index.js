import { Button, Spinner, Text, View, ScrollView } from "native-base";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/hotel/hotelAction";
import { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import { StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Hotels from "../../components/Home/Hotels";
import City from "./../../components/Home/City";

export default HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchIcon = <Icon name="search" size={20} color="black" />;

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
    <View>
      <Headers />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: loading ? "center" : "flex-start",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Spinner />
        </View>
      ) : (
        <ScrollView style={{ marginBottom: 100 }}>
          <View style={styles.input}>
            <TextInput
              style={styles.textInput}
              placeholder="search"
              value="Search..."
            ></TextInput>
            <Button borderRadius={8}>{searchIcon}</Button>
          </View>
          <Hotels />
          <City navigation={navigation} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: 10,
    paddingRight: 4,
  },
  textInput: {
    marginLeft: 5,
    width: 350,
    height: 40,
    borderColor: "#fafafa",
    borderWidth: 1,
    padding: 10,
    color: "#010101",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
});
