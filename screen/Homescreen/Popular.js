import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { useCart } from "../../screen/Homescreen/CartContext"; // Make sure the path is correct

const Popular = ({ navigation }) => {
  const { addToCart } = useCart();

  const popularItems = [
    {
      name: "Potato",
      price: "Rs.30/Kg",
      pricePerKg: 30,
      discount: "10% OFF",
      image: require("../../assets/potato.jpeg"),
      description: "Our fresh, farm-grown potatoes are carefully selected...",
      rating: 5,
    },
    {
      name: "Onion",
      price: "Rs.100/Kg",
      pricePerKg: 100,
      discount: "10% OFF",
      image: require("../../assets/onion.jpeg"),
      description: "High-quality onions sourced from the best farms.",
      rating: 4.5,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {popularItems.map((item, index) => (
          <Animatable.View key={index} animation="fadeInUp" duration={500}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                if (item.name === "Onion") {
                  navigation.navigate("OnionScreen");
                } else if (item.name === "Potato") {
                  navigation.navigate("PotatoScreen");
                } else {
                  navigation.navigate("ProductScreen", { item });
                }
              }}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.discount}>{item.discount}</Text>
              </View>

              <TouchableOpacity
                style={styles.cartIcon}
                onPress={() => addToCart(item)}
              >
                <Icon name="shopping-cart" size={20} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "rgb(200, 230, 200)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  scrollView: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 15,
    width: 150,
    height: 200,
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  details: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  price: {
    fontSize: 14,
    color: "black",
    marginTop: 5,
  },
  discount: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
  },
  cartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default Popular;
