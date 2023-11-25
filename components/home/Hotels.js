import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import hotelDummy from '../../dummyData/hotelsDummy';
import destinationDummy from '../../dummyData/destinationDummy';

const Hotels = () => {
  const startIcon = <Icon name="star-o" size={10} color="black" />;
  const location = <IconIon name="location-outline" size={15} color="black" />;
  return (
    <View>
    <Text style={styles.header}>Top Destination</Text>
    <View style={styles.container}>
      {destinationDummy.slice(0,3).map((item)=>(
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={item.image}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      ))}
    </View>
    <Text style={styles.header}>Top Hotels</Text>
    <View style={styles.container}>
      {hotelDummy.slice(0,3).map((item)=>{
        if(item.ratings >= 4.5){
          return(
          <View style={styles.column}>
            <Image
              style={styles.topImage}
              source={item.image}
            />
            <Text style={{
              position:'absolute',
              top: 10, 
              left: 15, 
              color: 'black',
              fontSize: 12, 
              backgroundColor: 'white', 
              paddingHorizontal: 5, 
              paddingVertical: 2,
              borderRadius:6
            }}>{item.ratings} {startIcon}</Text>
            <Text style={styles.topTitle}>{item.title}</Text>
            <Text style={styles.topLocation}>{location} {item.cityName}, {item.country}</Text>
          </View>
          )
        }
      })}
    </View>
    <Text style={styles.header}>Recomendation Hotels</Text>
    <View style={styles.container}>
      {hotelDummy.slice(0,3).map((item)=>(
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={item.image}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom:15,
  },
  column: {
    flex: 1,
    position:'relative',
    marginHorizontal:10
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
    resizeMode:'cover'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  topTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topLocation: {
    fontSize: 14,
    fontWeight: 'light',
  },
  header:{
    fontSize:24,
    fontWeight:'500',
    marginHorizontal:15,
    marginVertical:5,
  }
});

export default Hotels;
