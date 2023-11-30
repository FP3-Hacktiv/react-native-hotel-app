import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { Provider, useSelector } from "react-redux";
import store from "./redux/hotel";
import HomeScreen from "./screen/HomeScreen";
import Search from "./screen/SearchScreen";
import BookingHistoryScreen from "./screen/BookingHistoryScreen";
import BookingScreen from "./screen/BookingScreen";
import ProfileScreen from "./screen/ProfileScreen";
import { Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./screen/DetailScreen";
import ListHotel from "./screen/ListHotel";
import { LoginScreen } from "./screen/LoginScreen";
import LandingPage from "./screen/LandingScreen";
import BookmarkScreen from "./screen/BookmarkScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="ListHotel"
        component={ListHotel}
        options={{ title: "List Hotel" }}
      />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const { user,querySearch } = useSelector((state) => state.hotels);

  return (
    <NativeBaseProvider>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MyStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon type="feather" name="home" color={color} />
            ),
          }}
        />
        {querySearch?(
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            // headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon type="feather" name="search" color={color} />
            ),
          }}
        />
        ):<></>}
        {user ? (
          <>
            <Tab.Screen
              name="Booking History"
              component={BookingHistoryScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon type="feather" name="book" color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="BookmarkScreen"
              component={BookmarkScreen}
              options={{
                headerShown: false,
                title: "Bookmark",
                tabBarIcon: ({ color, size }) => (
                  <Icon type="feather" name="heart" color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon type="feather" name="user" color={color} />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="BookmarkScreen"
              component={BookmarkScreen}
              options={{
                headerShown: false,
                title: "Bookmark",
                tabBarIcon: ({ color, size }) => (
                  <Icon type="feather" name="heart" color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Icon type="feather" name="user" color={color} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}
export default function App() {
  const [showTabs, setShowTabs] = useState(false);

  const handleShowTabs = (value) => {
    setShowTabs(value);
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        {showTabs ? <MyTabs /> : <LandingPage setShowTabs={handleShowTabs} />}
        {/* <StatusBar /> */}
      </NavigationContainer>
    </Provider>
  );
}
