
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Cart & Order icons
import HomeIcon from 'react-native-vector-icons/FontAwesome'; // Home icon
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import OrderScreen from './screen/Order';
import HomeScreen from './screen/Homescreen.js';
import Cart from './screen/Cart';

import AccountScreen from './screen/Account';
import NotificationsScreen from './screen/Notification';
import Veggies from './screen/Homescreen/Veggies.js';
import AccountDetailsScreen from './screen/Profile/AccountDetails.js';
import FavoritesScreen from './screen/Profile/Favourites.js';
import AboutUs from './screen/Profile/AboutUs.js';
import AuthScreen from './screen/Profile/AuthScreen.js';
import ProductScreen from './screen/ProductDescription.js';
import LoginScreen from './screen/Profile/LoginScreen.js';
import SignupScreen from './screen/Profile/Signupscreen.js';
import FarmerApplication from './screen/Profile/FarmerApplication.js';
import OtpVerificationScreen from './screen/Profile/OtpVerfication.js';
import { CartProvider, useCart } from './screen/Homescreen/CartContext';
import MessageBox from './screen/Profile/MessageBox.js';
import OrderPlacedScreen from './screen/OrderPlacedScreen.js';
// import VeggieResultsScreen from './screen/VeggiesResultScreen.js';
import OnionScreen from './screen/Onion.js';
import PotatoScreen from './screen/Potato.js';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Home
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Veggies" component={Veggies} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDescription" component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AuthScreen" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FarmerApplication" component={FarmerApplication} options={{ headerShown: false }} />
      <Stack.Screen name="MessageBox" component={MessageBox} options={{ headerShown: false }} />
      <Stack.Screen name="OrderPlacedScreen" component={OrderPlacedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OnionScreen" component={OnionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PotatoScreen" component={PotatoScreen} options={{ headerShown: false }} />
      

      {/* <Stack.Screen name="VeggieResultsScreen" component={VeggieResultsScreen} options={{ headerShown: false }} /> */}
    </Stack.Navigator>
  );
}

// Tab Navigator as a separate component wrapped inside CartProvider
function TabNavigatorWithCartBadge() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 15 },
        tabBarStyle: {
          backgroundColor: 'rgb(255, 255, 255)',
          height: 85,
        },
        tabBarActiveTintColor: 'white',
        tabBarActiveBackgroundColor: 'rgb(37, 187, 0)',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <HomeIcon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View>
              <Icon name="shopping-cart" size={30} color={color} />
              {cartItemCount > 0 && (
                <View style={{
                  position: 'absolute',
                  right: -6,
                  top: -4,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {cartItemCount}
                  </Text>
                </View>
              )}
            </View>
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

// Root App Component
const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <TabNavigatorWithCartBadge />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
