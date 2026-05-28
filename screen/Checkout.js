import React, { useState } from 'react';

import {
View,
Text,
StyleSheet,
TouchableOpacity,
ScrollView,
Image,
Modal,
TextInput,
Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
useRoute,
useNavigation
} from '@react-navigation/native';

import RazorpayCheckout from 'react-native-razorpay';

import {
useCart
} from '../screen/Homescreen/CartContext';

import {
createOrder
} from '../api/orderApi';

const Checkout = () => {

const route=useRoute();
const navigation=useNavigation();

const {clearCart}=useCart();

const {
items=[],
total=0
}=route.params || {};

const deliveryCharge=40;
const discount=20;

const grandTotal=
total+
deliveryCharge-
discount;

const [paymentMethod,
setPaymentMethod]=
useState('COD');

const [showSuccess,
setShowSuccess]=
useState(false);

const [placingOrder,
setPlacingOrder]=
useState(false);

const [editingAddress,
setEditingAddress]=
useState(false);

const [address,
setAddress]=useState({

name:'Himanshu Verma',
phone:'9999999999',
line1:'123 Green Farm Street',
city:'Punjab, India'

});


const buildOrderPayload =
(method)=>({

customerName:
address.name.trim(),

customerPhone:
address.phone.trim(),

customerEmail:
'test@gmail.com',

deliveryAddress:
address.line1.trim(),

city:
address.city.trim(),

paymentMedium:
method.toLowerCase(),

subtotal:
total,

discountAmount:
discount,

deliveryFee:
deliveryCharge,

totalAmount:
grandTotal,

items:
items.map(
(item)=>({

productId:
item.id ||
item._id,

productName:
item.name,

quantity:
Number(item.quantity) || 1,

price:
Number(item.pricePerKg) || 0

})
)

});


const submitOrder =
async(method)=>{

if(placingOrder){
return;
}

try{

setPlacingOrder(true);

const response =
await createOrder(
buildOrderPayload(method)
);

console.log(
'ORDER SUCCESS:',
response
);

handleSuccessNavigation();

}catch(error){

console.log(
'ORDER ERROR:',
error.response?.data ||
error.message
);

Alert.alert(
'Order Failed',
error.response?.data?.message ||
'Failed to place order'
);

}finally{

setPlacingOrder(false);

}

};


/* SUCCESS */

const handleSuccessNavigation = () => {

try {

clearCart();

setShowSuccess(true);

setTimeout(() => {

setShowSuccess(false);

navigation.reset({
index: 0,
routes: [
{
name: 'MainTabs',
state: {
routes: [
{
name: 'Order',
params: {
orderItems: items,
totalAmount: grandTotal,
status: 'Placed'
}
}
]
}
}
]
});

}, 2500);

} catch(error){

console.log(error);

Alert.alert(
'Error',
'Something went wrong'
);

}

};



/* RAZORPAY */

const handleRazorpayPayment=
()=>{

const options={

description:
'Farmeze Order Payment',

currency:'INR',

key:
'rzp_test_SlZ9QD1cFkxTig',

amount:
grandTotal*100,

name:'Farmeze',

prefill:{

email:
'test@gmail.com',

contact:
address.phone,

name:
address.name

},

theme:{
color:'#38C71C'
}

};

RazorpayCheckout
.open(options)

.then(()=>{

submitOrder(
paymentMethod
);

})

.catch((error)=>{

console.log(error);

Alert.alert(
'Payment Failed',
error.description ||
'Please try again'
);

});

};



/* PLACE ORDER */

const handlePlaceOrder=
()=>{

if(
address.name==='' ||
address.phone==='' ||
address.line1==='' ||
address.city===''
){

Alert.alert(
'Address Missing',
'Please fill all details'
);

return;

}

if(
paymentMethod==='UPI'
||
paymentMethod==='Card'
){

handleRazorpayPayment();

}

else{

submitOrder(
paymentMethod
);

}

};


return(

<View style={styles.container}>


{/* HEADER */}

<View style={styles.header}>

<TouchableOpacity
onPress={()=>
navigation.goBack()
}
>

<Icon
name='arrow-back'
size={25}
color='white'
/>

</TouchableOpacity>

<Text
style={styles.headerText}
>
Checkout
</Text>

<View style={{width:25}}/>

</View>


<ScrollView
showsVerticalScrollIndicator={false}
>

{/* ADDRESS */}

<View style={styles.card}>

<View
style={styles.rowBetween}
>

<Text
style={styles.cardTitle}
>

Delivery Address

</Text>

<TouchableOpacity
onPress={()=>
setEditingAddress(
!editingAddress
)
}
>

<Text
style={styles.change}
>

{
editingAddress
?
'Save'
:
'Edit'
}

</Text>

</TouchableOpacity>

</View>

{
editingAddress ?

<>

<TextInput
style={styles.input}
placeholder='Name'
placeholderTextColor="#666"
value={address.name}
onChangeText={(text)=>
setAddress({
...address,
name:text
})
}
/>

<TextInput
style={styles.input}
placeholder='Phone'
placeholderTextColor="#666"
keyboardType='phone-pad'
value={address.phone}
onChangeText={(text)=>
setAddress({
...address,
phone:text
})
}
/>

<TextInput
style={styles.input}
placeholder='Address'
placeholderTextColor="#666"
value={address.line1}
onChangeText={(text)=>
setAddress({
...address,
line1:text
})
}
/>

<TextInput
style={styles.input}
placeholder='City'
placeholderTextColor="#666"
value={address.city}
onChangeText={(text)=>
setAddress({
...address,
city:text
})
}
/>

</>

:

<>

<Text style={styles.textBlack}>
{address.name}
</Text>

<Text style={styles.textBlack}>
{address.phone}
</Text>

<Text style={styles.textBlack}>
{address.line1}
</Text>

<Text style={styles.textBlack}>
{address.city}
</Text>

</>

}

</View>



{/* ORDER SUMMARY */}

<View style={styles.card}>

<Text
style={styles.cardTitle}
>

Order Summary

</Text>

{
items.map(
(item,index)=>(

<View
key={index}
style={styles.productRow}
>

<Image
source={
item.image
?
typeof item.image==='string'
?
{
uri:item.image
}
:
item.image
:
require('../assets/potato.jpeg')
}
style={styles.image}
/>

<View style={{flex:1}}>

<Text style={styles.textBlack}>
{item.name}
</Text>

<Text style={styles.textBlack}>

{item.quantity}
× ₹
{item.pricePerKg}

</Text>

</View>

<Text style={styles.textBlack}>

₹
{
item.quantity*
item.pricePerKg
}

</Text>

</View>

))
}

</View>



{/* PAYMENT */}

<View style={styles.card}>

<Text
style={styles.cardTitle}
>

Payment Method

</Text>

{
['COD','UPI','Card']
.map(
(method)=>(

<TouchableOpacity

key={method}

style={[

styles.payment,

paymentMethod===
method
&&
styles.selected

]}

onPress={()=>
setPaymentMethod(
method
)
}
>

<Text style={styles.paymentText}>

{
method==='COD'
&&
'Cash On Delivery'
}

{
method==='UPI'
&&
'UPI / Razorpay'
}

{
method==='Card'
&&
'Card / Razorpay'
}

</Text>

</TouchableOpacity>

))
}

</View>



{/* BILL */}

<View style={styles.card}>

<View style={styles.rowBetween}>

<Text style={styles.summaryText}>
Items Total
</Text>

<Text style={styles.summaryText}>
₹{total}
</Text>

</View>

<View style={styles.rowBetween}>

<Text style={styles.summaryText}>
Delivery Fee
</Text>

<Text style={styles.summaryText}>
₹{deliveryCharge}
</Text>

</View>

<View style={styles.rowBetween}>

<Text style={styles.summaryText}>
Discount
</Text>

<Text style={styles.summaryText}>
-₹{discount}
</Text>

</View>

<View
style={styles.divider}
/>

<View style={styles.rowBetween}>

<Text
style={{
fontWeight:'bold',
fontSize:18,
color:"#000"
}}
>
Grand Total
</Text>

<Text
style={{
fontWeight:'bold',
fontSize:18,
color:"#000"
}}
>
₹{grandTotal}
</Text>

</View>

</View>

</ScrollView>


{/* FOOTER */}

<View style={styles.footer}>

<TouchableOpacity
style={[
styles.orderBtn,
placingOrder &&
styles.orderBtnDisabled
]}
onPress={
handlePlaceOrder
}
disabled={placingOrder}
>

<Text
style={styles.orderText}
>

{
placingOrder
?
'Placing Order...'
:
`Place Order ₹${grandTotal}`
}

</Text>

</TouchableOpacity>

</View>



{/* SUCCESS POPUP */}

<Modal
visible={showSuccess}
transparent
animationType='fade'
>

<View
style={styles.modal}
>

<View
style={styles.successBox}
>

<Icon
name='checkmark-circle'
size={90}
color='#38C71C'
/>

<Text
style={{
fontSize:22,
fontWeight:'bold',
marginTop:15,
color:"#000"
}}
>
Order Placed Successfully 🎉
</Text>

<Text
style={{
marginTop:10,
fontSize:14,
color:'#777',
textAlign:'center'
}}
>
Your fresh farm products
will be delivered soon
</Text>

</View>

</View>

</Modal>

</View>

);

};

export default Checkout;



const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:'#F3FAF1'
},

header:{
backgroundColor:'#25BB00',
paddingTop:20,
paddingBottom:15,
paddingHorizontal:20,
flexDirection:'row',
justifyContent:'space-between',
alignItems:'center'
},

headerText:{
fontSize:20,
fontWeight:'bold',
color:'white'
},

card:{
backgroundColor:'#fff',
margin:15,
padding:15,
borderRadius:12,
elevation:3,
borderWidth:1,
borderColor:'#DDEFD8'
},

cardTitle:{
fontSize:18,
fontWeight:'800',
marginBottom:10,
color:'#1F7A35'
},

change:{
color:'#38C71C',
fontWeight:'bold'
},

input:{
borderWidth:1,
borderColor:'#D0D5DD',
padding:10,
marginVertical:5,
borderRadius:10,
color:'#000',
backgroundColor:'#FFFFFF'
},

textBlack:{
color:"#000"
},

paymentText:{
color:"#000",
fontSize:15
},

summaryText:{
color:"#000"
},

rowBetween:{
flexDirection:'row',
justifyContent:'space-between',
marginVertical:5
},

productRow:{
flexDirection:'row',
alignItems:'center',
marginVertical:10
},

image:{
width:60,
height:60,
borderRadius:10,
marginRight:10
},

payment:{
padding:12,
backgroundColor:'#F9FAFB',
borderRadius:10,
marginVertical:5,
borderWidth:1,
borderColor:'#E4E7EC'
},

selected:{
backgroundColor:'#E7F6E2',
borderColor:'#25BB00'
},

divider:{
height:1,
backgroundColor:'#ddd',
marginVertical:10
},

footer:{
padding:15
},

orderBtn:{
backgroundColor:'#38C71C',
padding:15,
borderRadius:15,
alignItems:'center'
},

orderBtnDisabled:{
opacity:0.7
},

orderText:{
color:'#fff',
fontWeight:'bold',
fontSize:16
},

modal:{
flex:1,
justifyContent:'center',
alignItems:'center',
backgroundColor:'rgba(0,0,0,0.4)'
},

successBox:{
backgroundColor:'#fff',
paddingVertical:35,
paddingHorizontal:30,
borderRadius:25,
alignItems:'center',
width:'80%',
elevation:10
}

});