import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  getDestinationId,
  getHotelByLocation,
} from "../../redux/hotel/hotelAction";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  View,
  Spinner,
  ScrollView,
  Button,
} from "native-base";

function ListHotel({ navigation }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { cityName } = route.params;
  const dispatch = useDispatch();

  const handlerGetHotel = async () => {
    try {
      const { payload } = await dispatch(
        getDestinationId({
          cityName,
        })
      );
      const response = await dispatch(
        getHotelByLocation({ dest_id: payload[0].dest_id })
      );
      setHotels(response.payload.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching destination ID:", error);
    }
  };

  useEffect(() => {
    handlerGetHotel();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: loading ? "center" : "flex-start",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <ScrollView>
          {hotels.map((item, index) => (
            <Box key={index} alignItems="center" style={{ marginBottom: 10 }}>
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
              >
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image source={{ uri: item.main_photo_url }} alt="image" />
                  </AspectRatio>
                  <Center
                    bg="violet.500"
                    _dark={{
                      bg: "violet.400",
                    }}
                    _text={{
                      color: "warmGray.50",
                      fontWeight: "700",
                      fontSize: "xs",
                    }}
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5"
                  >
                    Photos
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {item.hotel_name}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: "violet.500",
                      }}
                      _dark={{
                        color: "violet.400",
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                    >
                      {item.address}
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                    Rp.
                    {item.price_breakdown.all_inclusive_price.toLocaleString(
                      "en-US"
                    )}
                  </Text>
                  <Button
                    small
                    primary
                    onPress={() =>
                      navigation.navigate("Detail", {
                        hotel: item,
                      })
                    }
                  >
                    <Text>Book Now</Text>
                  </Button>
                </Stack>
              </Box>
            </Box>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default ListHotel;
