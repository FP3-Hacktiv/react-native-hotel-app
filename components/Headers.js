import { useEffect, useState } from "react";
import { Image, TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getLocationUser } from "../redux/hotel/hotelAction";
import { Spinner } from "native-base";
import profil from '../assets/image/hotel.jpg';

const myIcon = <Icon name="bell" size={20} color="#fafafa" />;
const locationIcon = (
  <IconIon name="location-outline" size={20} color="#fafafa" />
);

const Headers = () => {
  const { isLoading, locationUser, user } = useSelector((state) => state.hotels);
  const [date, setDate] = useState(new Date(1598051730000));
  const dispatch = useDispatch();
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();

    if (currentHour >= 0 && currentHour < 12) {
      setTimeOfDay('Morning');
    }else if(currentHour >= 12 && currentHour < 18) {
      setTimeOfDay('Afternoon');
    } else {
      setTimeOfDay('Night');
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerProfil}>
        <View style={styles.header}>
          <Image style={styles.profil} source={profil}/>
          <View style={styles.title}>
            <Text style={styles.left}>Good {timeOfDay}</Text>
            <Text style={{
              marginHorizontal:20,
              marginBottom:5,
              color:'white',
              fontSize:24,
            }}>{user?(user.username):'user'} </Text>
          </View>
        </View>
        <Text style={styles.right}>{myIcon}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: 20,
          marginTop:5,
        }}
      >
        {locationIcon}
        <Text
          style={{
            color: "#ffff",
            fontSize: 16,
          }}
        >
          {isLoading ? <Spinner /> : locationUser}
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
    justifyContent: "flex-start",
    alignItems:'center',
    paddingHorizontal: 20,
    marginBottom:5,
  },
  headerProfil: {
    flexDirection: "row",
    justifyContent:'space-between',
    alignItems:'flex-start',
    paddingRight: 20,
    paddingTop: 25,
  },
  left: {
    flex: 0,
    fontSize: 16,
    color: "#fafafa",
    fontWeight:'300',
    marginLeft:15,
  },
  right: {
    flex: 0,
  },
  profil:{
    width:70,
    height:70,
    borderRadius:50,
    marginRight:5,
  },
  title:{
    
  },
});
export default Headers;
