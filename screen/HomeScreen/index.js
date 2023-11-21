import { Button, Text, View } from "native-base"

export default HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen!</Text>
      <Button small primary onPress={() => navigation.navigate('Detail', {param: 'Contoh Penggunaan Param'})}>
        <Text>Detail Hotel (Param Text)</Text>
      </Button>
    </View>
  )
}