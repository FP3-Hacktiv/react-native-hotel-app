import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import store from './redux/hotel';
import HomeScreen from './screen/HomeScreen';
import Search from './screen/Search';
import BookingHistoryPage from './screen/BookingHistoryPage';
import ProfilePage from './screen/ProfilePage';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        component={BookingHistoryPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon type="feather" name="book" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon type="feather" name="user" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyTabs() {
  return (
    <NativeBaseProvider>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={TabNavigator} />
        {/* Add more screens in the drawer if needed */}
      </Drawer.Navigator>
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
