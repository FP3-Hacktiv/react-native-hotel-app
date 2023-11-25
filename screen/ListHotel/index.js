import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; // Import the useSelector hook
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
  NativeBaseProvider,
  View,
  Spinner,
  ScrollView,
  Button,
} from "native-base";

function ListHotel({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const route = useRoute();
  const { cityName } = route.params;
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const { listHotels } = useSelector((state) => state.hotels);

  const handlerGetHotel = async () => {
    try {
      const { payload } = await dispatch(
        getDestinationId({
          cityName,
        })
      );
      const response = await dispatch(
        getHotelByLocation({ dest_id: payload[0].dest_id, offset })
      );

      setHotels(listHotels);

      const newHotels = response.payload.result;

      if (newHotels.length === 0) {
        setEndReached(true);
      }

      setHotels((prevHotels) => [...prevHotels, ...newHotels]);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!endReached) {
      setOffset((prevOffset) => prevOffset + 1);
      setLoadingMore(true);
    }
  };

  useEffect(() => {
    handlerGetHotel();
  }, [offset]);

  return (
    <NativeBaseProvider>
      <View flex={1}>
        <Box
          bg="blue.500"
          py="2"
          px="3"
          marginBottom={4}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <Heading color="white">Hotels in {cityName}</Heading>
        </Box>
        <View
          style={{
            flex: 1,
            justifyContent: loading ? "center" : "flex-start",
            alignItems: "center",
          }}
        >
          {loading ? (
            <Spinner size="lg" color="blue.500" />
          ) : (
            <ScrollView
              width={"full"}
              flex={1}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                if (
                  !endReached &&
                  nativeEvent.contentOffset.y +
                    nativeEvent.layoutMeasurement.height >=
                    nativeEvent.contentSize.height - 20
                ) {
                  handleLoadMore();
                }
              }}
            >
              {hotels.map((item, index) => (
                <Box
                  key={index}
                  width="100%"
                  alignItems="center"
                  style={{ marginBottom: 10 }}
                >
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
                        <Image
                          source={{ uri: item.main_photo_url }}
                          alt="image"
                        />
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
                    <Box p="4" space={3}>
                      <Box space={2}>
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
                      </Box>
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
                    </Box>
                  </Box>
                </Box>
              ))}
              {loadingMore && (
                <Spinner style={({ marginTop: 10 }, { marginBottom: 10 })} />
              )}
              {endReached && <Text>No more hotels to load</Text>}
            </ScrollView>
          )}
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default ListHotel;
