import { TextInput } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="bell" size={25} color="#fafafa" />;
const searchIcon = <Icon name="search" size={25} color="#fafafa" />;

const Headers = () => {
    return(
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.left}>Location</Text>
            <Text style={styles.right}>{myIcon}</Text>
        </View>
        <View style={styles.input}>
            <TextInput style={styles.textInput} placeholder="search" value="Search..."></TextInput>
            {searchIcon}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {  
        paddingTop:35,
        backgroundColor:'#689ff1',
        borderRadius:8,
        paddingVertical:15
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        paddingVertical: 10,
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
    input:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        marginBottom: 10,
    },
    textInput :{
        marginLeft:5,
        width: 300,
        height: 40,
        borderColor: '#fafafa',
        borderWidth: 1,
        padding: 10,
        color:'#010101',
        borderRadius:8,
        backgroundColor:'#fafafa'
    }
  });
export default Headers;