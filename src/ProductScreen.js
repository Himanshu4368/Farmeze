
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCart } from './CartContext'; 
const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params; // Receive item from Popular screen
  const [quantity, setQuantity] = useState(1);
  
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="green" />
        </TouchableOpacity>
        <Icon name="bell" size={24} color="green" />
      </View>

      {/* Image */}
      <Image source={item.image} style={styles.image} />

      {/* Product Details */}
      <View style={styles.details}>
        <Text style={styles.title}>
          {item.name} <Text style={styles.subTitle}>(Sugar Free)</Text>
        </Text>

        {/* Price and Rating */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Icon name="star" size={16} color="green" />
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Icon name="minus-circle" size={24} color="green" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}Kg</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Icon name="plus-circle" size={24} color="green" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Item Description</Text>
        <Text style={styles.description}>
          {item.description}
        </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCart}>
          <Text style={styles.addToCartText}>Add to cart</Text>
          <Text style={styles.price}>
            Rs.{parseInt(item.price.replace(/\D/g, "")) * quantity}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E8F5E9", alignItems: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", width: "90%", marginTop: 40 },
  image: { width: 300, height: 200, resizeMode: "contain", marginVertical: 20 },
  details: { width: "90%", backgroundColor: "#fff", padding: 20, borderRadius: 15 },
  title: { fontSize: 20, fontWeight: "bold" },
  subTitle: { fontSize: 16, color: "gray" },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { fontSize: 18, color: "green", fontWeight: "bold" },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 16, fontWeight: "bold", marginRight: 5 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  quantity: { fontSize: 18, fontWeight: "bold", marginHorizontal: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  description: { fontSize: 14, color: "gray" },
  addToCart: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "green", padding: 15, borderRadius: 10, marginTop: 20 },
  addToCartText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});

export default ProductScreen;
