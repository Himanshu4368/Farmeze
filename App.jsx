
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // ✅ IMPORT STACK
import Icon from 'react-native-vector-icons/FontAwesome5';
import SplashScreen from 'react-native-splash-screen';

import Homescreen from './src/Homescreen';
import Cart from './src/Cart';
import OrderScreen from './src/Order';
import Veggies from './src/Veggies'; // ✅ IMPORT VEGGIES SCREEN
import ProductScreen from './src/ProductScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // ✅ CREATE STACK

// Stack Navigator for Home
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Homescreen} options={{ headerShown: false }} />
      <Stack.Screen name="Veggies" component={Veggies} options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarStyle: {
          backgroundColor: 'rgb(255, 255, 255)',
          height: 85,
        },
        tabBarActiveTintColor: 'rgb(255, 255, 255)',
        tabBarActiveBackgroundColor: 'rgb(37, 187, 0)',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // ✅ USE HomeStack instead of Homescreen directly
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="shopping-cart" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="clipboard-list" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); // Hide the splash screen
  }, []);

  return (
    
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    

  );
};

export default App;
