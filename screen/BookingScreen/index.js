import { useRoute } from "@react-navigation/native";
import { Text, View } from "native-base"

export default BookingScreen = () => {
  const route = useRoute();
  const { param } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Booking Page!</Text>
      <Text>Param1: {param}</Text>
    </View>
  )
}