import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  CartProvider,
  useCart
}
from './screen/Homescreen/CartContext';

import {
  FavoritesProvider
}
from './screen/Profile/FavoritesContext';


// Screens
import Homescreen from './screen/Homescreen';
import Cart from './screen/Cart';
import OrderScreen from './screen/Order';

import Veggies from './screen/Homescreen/Veggies';
import ProductScreen from './screen/ProductDescription';

import Checkout from './screen/Checkout';

import AccountScreen from './screen/Account';
import NotificationsScreen from './screen/Notification';

import AccountDetailsScreen from './screen/Profile/AccountDetails';
import FavoritesScreen from './screen/Profile/Favourites';
import AboutUs from './screen/Profile/AboutUs';

import AuthScreen from './screen/Profile/AuthScreen';
import LoginScreen from './screen/Profile/LoginScreen';
import SignupScreen from './screen/Profile/Signupscreen';

import FarmerApplication from './screen/Profile/FarmerApplication';

import OtpVerificationScreen
from './screen/Profile/OtpVerfication';

import MessageBox
from './screen/Profile/MessageBox';

import OrderPlacedScreen
from './screen/OrderPlacedScreen';

import ComingSoonScreen
from './screen/Homescreen/ComingSoonScreen';

import OurFarmers
from './screen/Homescreen/OurFarmers';

import FarmerDetailsScreen
from './screen/FarmerDetails';


const Tab=createBottomTabNavigator();

const Stack=createNativeStackNavigator();


function TabNavigatorWithCartBadge(){

const {cart}=useCart();

const cartItemCount=
cart.reduce(
(total,item)=>
total+item.quantity,
0
);

return(

<Tab.Navigator

screenOptions={{

headerShown:false,

tabBarLabelStyle:{
fontSize:12,
fontWeight:'700'
},

tabBarStyle:{
height:68,
backgroundColor:'#FFFFFF',
borderTopWidth:1,
borderTopColor:'#DDEFD8',
paddingTop:6,
paddingBottom:8
},

tabBarActiveTintColor:
'#1F7A35',

tabBarInactiveTintColor:
'#667085'

}}

>

{/* HOME */}

<Tab.Screen

name="Home"

component={Homescreen}

options={{

tabBarIcon:
({color})=>(

<HomeIcon
name="home"
size={26}
color={color}
/>

)

}}

/>


{/* CART */}

<Tab.Screen

name="Cart"

component={Cart}

options={{

tabBarIcon:
({color})=>(

<View>

<Icon
name="shopping-cart"
size={25}
color={color}
/>

{

cartItemCount>0 && (

<View

style={{

position:'absolute',
top:-5,
right:-10,

backgroundColor:'red',

width:18,
height:18,

borderRadius:10,

justifyContent:'center',
alignItems:'center'

}}

>

<Text

style={{

color:'white',
fontSize:10,
fontWeight:'bold'

}}

>

{cartItemCount}

</Text>

</View>

)

}

</View>

)

}}

/>


{/* ORDER */}

<Tab.Screen

name="Order"

component={OrderScreen}

options={{

tabBarIcon:
({color})=>(

<Icon
name="clipboard-list"
size={25}
color={color}
/>

)

}}

/>

</Tab.Navigator>

);

}


export default function App(){

return(

<CartProvider>

<FavoritesProvider>

<NavigationContainer>

<Stack.Navigator

screenOptions={{
headerShown:false
}}

>

<Stack.Screen
name="MainTabs"
component={TabNavigatorWithCartBadge}
/>

<Stack.Screen
name="Checkout"
component={Checkout}
/>

<Stack.Screen
name="Veggies"
component={Veggies}
/>

<Stack.Screen
name="ProductDescription"
component={ProductScreen}
/>

<Stack.Screen
name="Account"
component={AccountScreen}
/>

<Stack.Screen
name="NotificationsScreen"
component={NotificationsScreen}
/>

<Stack.Screen
name="AuthScreen"
component={AuthScreen}
/>

<Stack.Screen
name="AccountDetailsScreen"
component={AccountDetailsScreen}
/>

<Stack.Screen
name="FavoritesScreen"
component={FavoritesScreen}
/>

<Stack.Screen
name="AboutUs"
component={AboutUs}
/>

<Stack.Screen
name="LoginScreen"
component={LoginScreen}
/>

<Stack.Screen
name="SignupScreen"
component={SignupScreen}
/>

<Stack.Screen
name="OtpVerificationScreen"
component={OtpVerificationScreen}
/>

<Stack.Screen
name="FarmerApplication"
component={FarmerApplication}
/>

<Stack.Screen
name="MessageBox"
component={MessageBox}
/>

<Stack.Screen
name="OrderPlacedScreen"
component={OrderPlacedScreen}
/>

<Stack.Screen
name="ComingSoonScreen"
component={ComingSoonScreen}
/>

<Stack.Screen
name="OurFarmers"
component={OurFarmers}
/>

<Stack.Screen
name="FarmerDetails"
component={FarmerDetailsScreen}
/>

</Stack.Navigator>

</NavigationContainer>

</FavoritesProvider>

</CartProvider>

);

}
