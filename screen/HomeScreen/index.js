import { Button, Spinner, Text, View, ScrollView } from "native-base";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/hotel/hotelAction";
import { useEffect, useState } from "react";
import Headers from "../../components/Headers";
import { Alert, Modal, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Calendar, LocaleConfig } from "react-native-calendars";
import darkColors from "react-native-elements/dist/config/colorsDark";
import City from "./../../components/Home/City";
import Hotels from "./../../components/Home/Hotels";

export default HomeScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchIcon = <Icon name="search" size={20} color="#fafafa" />;
  const [selected, setSelected] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  const calendar = <Icon name="calendar" size={10} color="black" />;
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
              value="Search Your Destination or Hotel"
            ></TextInput>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Button
                style={{ marginVertical: 10, backgroundColor: "white" }}
                variant={darkColors}
                title="Open Calendar"
                onPress={() => setModalVisible(true)}
              >
                {calendar}
              </Button>
              <Text
                style={{
                  marginVertical: 10,
                  marginRight: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  backgroundColor: "white",
                }}
              >
                {selected ? `${selected}` : "Check in Date"}
              </Text>
              <Button
                style={{ marginVertical: 10, backgroundColor: "white" }}
                variant={darkColors}
                title="Open Calendar"
                onPress={() => setOutVisible(true)}
              >
                {calendar}
              </Button>
              <Text
                style={{
                  marginVertical: 10,
                  paddingHorizontal: 30,
                  paddingVertical: 5,
                  backgroundColor: "white",
                }}
              >
                {checkOut ? `${checkOut}` : "Check out Date"}
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
            </View>
            <Button
              style={{
                backgroundColor: "#689ff1",
                marginVertical: 5,
              }}
              borderRadius={8}
            >
              {searchIcon}
            </Button>
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
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-evenly",
    marginVertical: 10,
    paddingRight: 4,
  },
  textInput: {
    marginLeft: 5,
    width: "auto",
    height: 40,
    borderColor: "#fafafa",
    borderWidth: 1,
    padding: 10,
    color: "#010101",
    borderRadius: 8,
    backgroundColor: "#fafafa",
    marginBottom: 5,
  },
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
});
