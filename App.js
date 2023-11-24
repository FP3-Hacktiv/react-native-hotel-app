import React from "react";
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
import LoginScreen from "./screen/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "./screen/DetailScreen";
import ListHotel from "./screen/ListHotel";

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
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListHotel"
        component={ListHotel}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Booking" component={BookingScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const { user } = useSelector((state) => state.hotels);

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
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon type="feather" name="search" color={color} />
            ),
          }}
        />
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
        {user ? (
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
        ) : (
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
        )}
      </Tab.Navigator>
    </NativeBaseProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
