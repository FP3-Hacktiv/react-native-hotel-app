import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import hotel from '../../assets/image/hotel.jpg'
import { ScrollView } from 'react-native';

const Hotels = () => {
  return (
    // <ScrollView>
    <View>
    <Text style={styles.header}>Top Destination</Text>
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 1</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 2</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 3</Text>
      </View>
    </View>
    <Text style={styles.header}>Recomendation Hotels</Text>
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 1</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 2</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 3</Text>
      </View>
    </View>
    <Text style={styles.header}>Recomendation Hotels</Text>
    <View style={styles.container}>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 1</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 2</Text>
      </View>
      <View style={styles.column}>
        <Image
          style={styles.image}
          source={hotel}
        />
        <Text style={styles.title}>Title 3</Text>
      </View>
    </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header:{
    fontSize:24,
    fontWeight:'500',
    marginHorizontal:15,
    marginVertical:25,
  }
});

export default Hotels;
