import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getDestinationId,
  getHotelByLocation,
} from "../../redux/hotel/hotelAction";
import { Icon } from "react-native-elements";
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
  Presssable
} from "native-base";
import { Pressable } from "react-native";

function Search({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const route = useRoute();
  const { querySearch, checkIn, checkOut } = route.params;
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const { bookmarks } = useSelector((state) => state.hotels);

  const handleLoadMore = () => {
    if (!endReached) {
      setOffset((prevOffset) => prevOffset + 1);
      setLoadingMore(true);
    }
  };

  const isHotelBookmarked = (hotel_id) => {
    return bookmarks?.some((item) => item.hotel_id === hotel_id);
  };

  useEffect(() => {
    const handlerGetHotel = async () => {
      setHotels([]);
      setLoading(true);
      try {
        const { payload } = await dispatch(
          getDestinationId({
            cityName: querySearch,
          })
        );

        const response = await dispatch(
          getHotelByLocation({
            dest_id: payload[0].dest_id,
            arrival_date: checkIn,
            departure_date: checkOut,
            offset,
          })
        );

        setHotels(response.payload.result);

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
          <Heading color="white">
            Hotels in {querySearch ? querySearch : "?"}
          </Heading>
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
                      <Pressable
                        onPress={() => !loadingBookmark && handleBookmark(item)}
                      >
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
                          {isHotelBookmarked(item.hotel_id) ? (
                            <Icon
                              type="feather"
                              name="heart"
                              solid
                              color="white"
                            />
                          ) : (
                            <Icon type="feather" name="book" color="white" />
                          )}
                        </Center>
                      </Pressable>
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

export default Search;
