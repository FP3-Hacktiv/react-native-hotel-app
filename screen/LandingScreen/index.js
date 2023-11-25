import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import hotelImg from '../../assets/image/landing.jpg'

const LandingPage = ({ setShowTabs }) => {
  const handleSetShowTabs = (value) => {
    setShowTabs(value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ImageBackground source={hotelImg} style={
            {
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              width:500
            }
          }>
            <View style={{
              textAlign:'justify',
              left:55,
              top:350
            }}>
              <Text style={styles.titleLanding}>Find Your</Text>
              <Text style={styles.titleLanding}>Favorite Hotel</Text>
              <Text style={styles.titleLanding}>To Stay</Text>
              <Text style={styles.subtitleLanding}>Find your hotel easly and travel</Text>
              <Text style={styles.subtitleLanding}>anywhere you want</Text>
            </View>
            <View style={{
              width:500,
              flex:1,
              justifyContent:'flex-end',
              alignItems:'center',
              marginBottom:40,
            }}>
              <TouchableOpacity style={styles.button} onPress={() => handleSetShowTabs(true)}>
                <Text style={styles.textButton}>Start Explore</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
  );
};

const styles = StyleSheet.create({
    titleLanding :{
      fontSize:36,
      fontWeight:'bold',
      color:'white'
    },
    subtitleLanding :{
      fontSize:18,
      fontWeight:'light',
      color:'white'
    },
    button:{
      borderRadius:8,
      backgroundColor:'#289ff1',
      width:300,
      padding:10,
    },
    textButton:{
      textAlign:'center',
      color:'white',
      fontSize:16,
      fontWeight:'600'
    }
  })

export default LandingPage;