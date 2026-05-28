import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const dummyFarmers = [
  {
    id: "1",
    name: "Surmukh Singh",
    city: "Mohali",
    state: "Punjab",

    image: require("../../assets/SurmukhSingh.jpeg"),

    potatoPrice: "₹1/kg",

    varieties: [
      "Kufri Pukhraj",
      "Kufri Mohini",
      "Kufri Super-6",
    ],

    description:
      "Surmukh Singh is a potato farmer from Mohali, Punjab. He combines traditional farming methods with modern irrigation systems and focuses on producing quality potatoes.",

    potatoInfo:
      "He grows Kufri Pukhraj for early harvesting, Kufri Mohini for table consumption and Kufri Super-6 for better productivity."
  },

  {
    id: "2",
    name: "Ajit Singh",
    city: "Ambala",
    state: "Haryana",

    image: require("../../assets/AjitSingh.png"),

    potatoPrice: "₹1/kg",

    varieties: [
      "Kufri Jyoti",
      "Kufri Gola"
    ],

    description:
      "Ajit Singh is a potato farmer from Ambala, Haryana. He works on improving crop quality and reducing storage losses.",

    potatoInfo:
      "He grows Kufri Jyoti due to disease resistance and Kufri Gola (small potatoes) for snacks and food processing."
  }
];

const OurFarmers = ({ data = dummyFarmers }) => {

  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef();
  const currentIndexRef = useRef(0);

  useEffect(() => {

    if (!data.length) return;

    const interval = setInterval(() => {

      let nextIndex =
        (currentIndexRef.current + 1) %
        data.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });

      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);

    },3000);

    return ()=>clearInterval(interval);

  },[data.length]);


  const renderItem=({item})=>(

    <TouchableOpacity

      style={styles.card}

      onPress={()=>
        navigation.navigate(
          "FarmerDetails",
          {
            farmer:item
          }
        )
      }
    >

      <Image
        source={item.image}
        style={styles.image}
      />

      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.location}>
        📍 {item.city}, {item.state}
      </Text>

    </TouchableOpacity>

  );


  return(

    <View style={styles.container}>

      <Text style={styles.title}>
        Our Farm-preneurs
      </Text>

      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item)=>item.id}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: 157,
          offset: 157 * index,
          index,
        })}
        onScrollToIndexFailed={({ index }) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index,
              animated: true,
            });
          }, 250);
        }}
        contentContainerStyle={{
          paddingLeft:15
        }}
      />

      <View style={styles.pagination}>
        {
          data.map((_,index)=>(

            <View
              key={index}
              style={[
                styles.dot,
                currentIndex===index &&
                styles.activeDot
              ]}
            />

          ))
        }
      </View>

    </View>

  );

};

export default OurFarmers;


const styles=StyleSheet.create({

container:{
marginTop:15
},

title:{
fontSize:22,
fontWeight:'800',
color:'#1F2A1F',
marginLeft:15,
marginBottom:10
},

card:{
width:142,
marginRight:15,
alignItems:'center',
backgroundColor:'#FFFFFF',
borderRadius:12,
padding:12,
borderWidth:1,
borderColor:'#DDEFD8'
},

image:{
width:100,
height:100,
borderRadius:50,
borderWidth:2,
borderColor:'#38C71C'
},

name:{
fontSize:14,
fontWeight:'800',
color:'#1F2A1F',
marginTop:8
},

location:{
fontSize:12,
color:'#667085',
fontWeight:'600',
textAlign:'center'
},

pagination:{
flexDirection:'row',
justifyContent:'center',
marginTop:10
},

dot:{
width:6,
height:6,
borderRadius:5,
backgroundColor:'#ccc',
marginHorizontal:4
},

activeDot:{
backgroundColor:'#38C71C',
width:8,
height:8
}

});
