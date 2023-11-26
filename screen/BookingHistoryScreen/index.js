import React from 'react';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import hotel from '../../assets/image/hotel.jpg'

const BookingHistoryPage = () => {
  const { user } = useSelector((state) => state.hotels);
  console.log(user)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; 
  const day = today.getDate();
  const days = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']

const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
const onDay = days[today.getDay()]

  const bookingHistory = [
    { id: 1, title: 'Pemesanan 1', status: 'Sedang dibooking' },
    { id: 2, title: 'Pemesanan 2', status: 'Pernah dibooking' },
    { id: 3, title: 'Pemesanan 1', status: 'Pernah dibooking' },
    { id: 4, title: 'Pemesanan 2', status: 'Pernah dibooking' },
    { id: 4, title: 'Pemesanan 2', status: 'Sedang dibooking' },
  ];

  const sedangDibookingCount = bookingHistory.filter(
    item => item.status === 'Sedang dibooking'
  ).length;

  const pernahDibookingCount = bookingHistory.filter(
    item => item.status === 'Pernah dibooking'
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Username : {user.username}</Text>
        <Text style={styles.dateText}>{onDay} {formattedDate}</Text>
      </View>
      <View style={styles.categoryContainer}>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Sedang dibooking</Text>
          <Text style={styles.categoryText}>{sedangDibookingCount}</Text>
        </View>
        <View style={styles.categoryBox}>
          <Text style={styles.categoryText}>Pernah dibooking</Text>
          <Text style={styles.categoryText}>{pernahDibookingCount}</Text>
        </View>
      </View>
      <Text style={styles.historyHeader}>History</Text>
      <ScrollView style={styles.historyContainer}>
        {bookingHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Image style={{
              width:180,
              height:120,
              marginRight:10
            }} source={hotel}/>
            <View>
              <Text>{item.title}</Text>
              <Text>{item.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical:20
  },
  header: {
    marginBottom: 20,
    width: '100%',
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  dateText: {
    fontSize: 18,
    fontWeight:'300',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryBox: {
    width: '48%',
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  historyContainer: {
  },
  historyItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  historyHeader:{
    fontSize:20,
    paddingBottom:10,
  }
});

export default BookingHistoryPage;
