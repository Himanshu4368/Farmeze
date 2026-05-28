import React from "react";
import {
View,
Text,
Image,
StyleSheet,
ScrollView,
TouchableOpacity
} from "react-native";

import Ionicons from
"react-native-vector-icons/Ionicons";

const FarmerDetails=({
route,
navigation
})=>{

const {farmer}=route.params;

return(

<View style={styles.container}>

{/* Header */}

<View style={styles.header}>

<TouchableOpacity
onPress={()=>
navigation.goBack()
}
>

<Ionicons
name="arrow-back"
size={25}
color="#fff"
/>

</TouchableOpacity>

<Text style={styles.headerTitle}>
Farmer Details
</Text>

<View style={{width:25}}/>

</View>


<ScrollView
showsVerticalScrollIndicator={false}
>

{/* Profile Section */}

<View style={styles.profileContainer}>

<Image
source={farmer.image}
style={styles.profileImage}
/>

<View style={styles.profileInfo}>

<Text style={styles.name}>
{farmer.name}
</Text>

<Text style={styles.location}>
{farmer.city}, {farmer.state}
</Text>



</View>

</View>



{/* About */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
About
</Text>

<Text style={styles.text}>
{farmer.description}
</Text>

</View>



{/* Potato Selling */}

<View style={styles.section}>

{/* FARM INFORMATION */}


<View style={styles.infoCard}>

  <Text style={styles.infoHeading}>
    Farm Information
  </Text>

  <Text style={styles.infoText}>

    The farm primarily cultivates high-quality potato varieties including{" "}

    <Text style={styles.boldText}>
      {farmer.varieties.join(", ")}
    </Text>

    . The focus is on maintaining crop quality, proper cultivation practices, and producing potatoes suitable for household consumption and processing applications.

  </Text>

</View>
</View>



{/* Potato Varieties */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
Potato Varieties Cultivated
</Text>

{
farmer.varieties.map(
(item,index)=>(

<View
key={index}
style={styles.varietyRow}
>

<View
style={styles.dot}
/>

<Text
style={styles.varietyText}
>
{item}
</Text>

</View>

))
}

</View>



{/* Crop Details */}

<View style={styles.section}>

<Text style={styles.sectionTitle}>
Crop Information
</Text>

<Text style={styles.text}>
{farmer.potatoInfo}
</Text>

</View>

</ScrollView>

</View>

);

};

export default FarmerDetails;


const styles=StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3FAF1"
},

header:{
backgroundColor:"#25BB00",

paddingTop:20,
paddingBottom:16,

paddingHorizontal:18,

flexDirection:"row",

alignItems:"center",

justifyContent:"space-between",

elevation:4
},

headerTitle:{
fontSize:20,
fontWeight:"700",
color:"#fff"
},



profileContainer:{

backgroundColor:"#fff",

padding:18,

flexDirection:"row",

alignItems:"center",

marginBottom:10,

elevation:2,
borderBottomWidth:1,
borderBottomColor:'#DDEFD8'
},

profileImage:{
width:90,
height:90,

borderRadius:10
},

profileInfo:{
marginLeft:15,
flex:1
},

name:{
fontSize:22,
fontWeight:"700",
color:"#222"
},

location:{
fontSize:14,
color:"#666",
marginTop:5
},

price:{
fontSize:14,
marginTop:8,
color:"#555"
},

priceValue:{
fontWeight:"bold",
color:"#25BB00"
},
infoHeading:{
    fontWeight: 'bold',
    fontSize: 16,
    color:'#1F2A1F',
},



section:{
backgroundColor:"#fff",

marginBottom:10,

padding:18,

elevation:2,
borderTopWidth:1,
borderBottomWidth:1,
borderColor:'#E4E7EC'
},

sectionTitle:{
fontSize:17,
fontWeight:"700",
marginBottom:10,
color:"#222"
},
infoCard: {
  
  
  borderRadius: 10,
},

infoText: {
  fontSize: 13,
  lineHeight: 24,
  color: "#555", // BLACK TEXT
},

boldText: {
  fontWeight: "bold",
  color: "#000",
},

text:{
fontSize:14,
lineHeight:24,
color:"#555"
},

varietyRow:{

flexDirection:"row",

alignItems:"center",

marginBottom:12

},

dot:{

width:8,
height:8,

borderRadius:5,

backgroundColor:"#25BB00",

marginRight:10

},

varietyText:{
fontSize:15,
color:"#333"
}

});
