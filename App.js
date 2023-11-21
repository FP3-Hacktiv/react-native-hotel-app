import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Hotels from './components/home/Hotels';
import Headers from './components/Headers';
import { ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Headers/>
      <ScrollView style={styles.scrollContainer}>
        <Hotels/>
      </ScrollView>
      <View style={styles.bottomcontainer}>
      <Text style={styles.text}>Hello World! React Native</Text>
      <TouchableOpacity style={styles.button} onPress={() => alert('You Touched Me!')}>
        <Text style={styles.buttonText}>Touch Me!</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  bottomcontainer: {
    backgroundColor: '#fff',
    alignItems:'center',
    marginBottom
    :10
  },
  scrollContainer:{
    flex:1
  },
  text: {
    marginBottom: 6,
  },
  buttonText: {
    color: 'red',
    fontSize: 14,
  },
  button: {
    marginTop: 6,
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  }
});
