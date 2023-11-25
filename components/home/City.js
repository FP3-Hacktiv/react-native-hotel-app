import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import hotelDummy from '../../dummyData/hotelsDummy';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'native-base';


const City = () => {
    const uniqueCityNames = hotelDummy.filter(
        (item, index, self) => self.findIndex((t) => t.cityName === item.cityName) === index
      );
    return (
    <View>
        <Text style={styles.header}>Explore City</Text>
        <View style={styles.container}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
        >
            {uniqueCityNames.map((item, index) => (
            <View style={styles.column} key={index}>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.title}>{item.cityName}</Text>
            </View>
            ))}
        </ScrollView>
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
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 5,
    marginHorizontal:5
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header:{
    fontSize:24,
    fontWeight:'500',
    marginHorizontal:15,
    marginVertical:5,
  }
});

export default City;
