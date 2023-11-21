import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

function MyTabs() {
  return (
    <NativeBaseProvider>
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
