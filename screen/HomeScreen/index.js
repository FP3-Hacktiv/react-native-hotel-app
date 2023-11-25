import { Button, Spinner, Text, View, ScrollView } from "native-base";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/hotel/hotelAction";
import { useEffect, useState } from "react";
import Hotels from "../../components/home/Hotels";
import Headers from "../../components/Headers";
import { StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import City from "../../components/home/City";

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
    <View >
      <Headers/>
      {loading ? (
        <View>
          <Text>Home Screen!</Text> 
          <Spinner />
        </View>
      ) : (
        <ScrollView style={{marginBottom:100}}>
          <View style={styles.input}>
              <TextInput style={styles.textInput} placeholder="search" value="Search..."></TextInput>
              {searchIcon}
          </View>
          <Hotels/>
          <City/>
          {/* {Array.isArray(cities) && cities.map((city, index) => (
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
          ))} */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    marginVertical: 10,
  },
  textInput :{
      marginLeft:5,
      width: 350,
      height: 40,
      borderColor: '#fafafa',
      borderWidth: 1,
      padding: 10,
      color:'#010101',
      borderRadius:8,
      backgroundColor:'#fafafa'
  }
})
