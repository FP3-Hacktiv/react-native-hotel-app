import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIon from 'react-native-vector-icons/Ionicons';

const myIcon = <Icon name="bell" size={20} color="#fafafa" />;
const searchIcon = <Icon name="search" size={20} color="#fafafa" />;
const location = <IconIon name="location-outline" size={20} color="#fafafa" />;

const Headers = () => {
    return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.left}>Location</Text>
            <Text style={styles.right}>{myIcon}</Text>
        </View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            marginBottom: 10,
            marginLeft:15
        }}>
            {location}
            <Text style={{
                color:'#ffff',
                fontSize:16,
            }}>
                Jakarta, Indonesiax
            </Text>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {  
        paddingTop: 15,
        backgroundColor:'#689ff1',
        borderRadius:8,
        paddingVertical:15
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        paddingTop: 15,
    },
    left: {
        flex: 0,
        paddingVertical:5,
        fontSize: 16,
        color:'#fafafa'  
    },
    right: {
        flex:0
    },
  });
export default Headers;