
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useCart } from "../screen/Homescreen/CartContext";

export default function ProductScreen({ route, navigation }) {
  const { vegetable } = route.params;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    { name: "Amit", text: "Very fresh and clean quality" },
    { name: "Neha", text: "Best vegetables I bought online" },
  ]);

  const rating = 4.7;

  const pricePerKg = parseInt(vegetable.price.replace(/\D/g, "")) || 0;
  const total = pricePerKg * quantity;

  const handleAddToCart = () => {
    addToCart({
      name: vegetable.name,
      image: vegetable.image,
      pricePerKg,
      quantity,
    });
    navigation.navigate("Cart");
  };

  const submitReview = () => {
    if (review.trim() === "") return;
    setReviews([{ name: "You", text: review }, ...reviews]);
    setReview("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image source={vegetable.image} style={styles.image} />
        </View>

        {/* Product Info */}
        <View style={styles.card}>
          <Text style={styles.name}>{vegetable.name}</Text>
          <Text style={styles.price}>{vegetable.price}</Text>

          {/* ⭐ Rating */}
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon
                key={i}
                name="star"
                size={16}
                color={i <= Math.floor(rating) ? "#FFD700" : "#ccc"}
              />
            ))}
            <Text style={{ marginLeft: 8 }}>{rating} (124 ratings)</Text>
          </View>

          {/* Quantity */}
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="minus" />
            </TouchableOpacity>

            <Text style={styles.qtyText}>{quantity} Kg</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="plus" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.desc}>
            Premium quality {vegetable.name}, fresh from farms, hygienically packed and delivered to your doorstep.
          </Text>

          {/* 📝 Write Review */}
          <Text style={styles.sectionTitle}>Write a Review</Text>
          <TextInput
            value={review}
            onChangeText={setReview}
            placeholder="Write your experience..."
            style={styles.reviewInput}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={submitReview}>
            <Text style={{ color: "#fff" }}>Submit Review</Text>
          </TouchableOpacity>

          {/* 💬 Reviews */}
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          {reviews.map((r, i) => (
            <View key={i} style={styles.reviewBox}>
              <Text style={styles.reviewName}>{r.name}</Text>
              <Text>{r.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>₹{total}</Text>
        </View>

        <TouchableOpacity style={styles.cartBtn} onPress={handleAddToCart}>
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 4,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  imageContainer: {
    backgroundColor: "#fff",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "85%", height: "85%", resizeMode: "contain" },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  name: { fontSize: 22, fontWeight: "bold" },
  price: { fontSize: 20, color: "#2E7D32", marginVertical: 8 },

  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 8 },

  qtyRow: { flexDirection: "row", alignItems: "center", marginVertical: 15 },
  qtyBtn: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 },
  qtyText: { marginHorizontal: 15, fontSize: 18, fontWeight: "bold" },

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
  desc: { fontSize: 14, color: "#555", marginTop: 5 },

  reviewInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  reviewBox: {
    backgroundColor: "#F1F8E9",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  reviewName: { fontWeight: "bold", color: "#2E7D32" },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 10,
  },
  totalLabel: { color: "#888" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#2E7D32" },

  cartBtn: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },
  cartText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
