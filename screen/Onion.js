import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PRODUCT = {
  name: "Onion",
  pricePerKg: 100,
  rating: 4.5,
  image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/onions-1238334_1280.jpg",
  description: `Our fresh, high-quality onions are handpicked directly from trusted farmers...`
};

const RELATED = {
  name: "Potato",
  pricePerKg: 20,
  image: "https://cdn.pixabay.com/photo/2016/02/25/15/07/potatoes-1226789_1280.jpg"
};

const REVIEW = {
  user: "Vaibhav",
  rating: 5,
  text: "These onions are always farm-fresh and full of flavor"
};

export default function OnionScreen({ navigation }) {
  const nav = navigation || useNavigation();
  const [quantity, setQuantity] = useState(2);
  const [cartQty, setCartQty] = useState(0);

  const total = quantity * PRODUCT.pricePerKg;

  const handleQuantityChange = (change) => {
    setQuantity(q => Math.max(0, q + change));
  };

  const addToCart = () => {
    setCartQty(q => q + quantity);
    setQuantity(0);
  };

  const goToRelatedProduct = () => {
    nav.navigate('ProductDescription', {
      product: {
        name: RELATED.name,
        pricePerKg: RELATED.pricePerKg,
        rating: 4.8,
        image: RELATED.image,
        description: `Potatoes are fresh from our partner farms. Great for all cooking needs.`,
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#d6f9c5' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
        {/* Top Section */}
        <View style={styles.topCard}>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => nav.goBack()}>
              <Icon name="arrow-back" size={26} color="#38C71C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Icon name="notifications" size={26} color="#38C71C" />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: PRODUCT.image }} style={styles.productImg} />
        </View>

        <View style={styles.bodyContent}>
          {/* Info */}
          <View style={{ paddingHorizontal: 22 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{PRODUCT.name}</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: '#38C71C', fontWeight: 'bold', fontSize: 16 }}>
                {PRODUCT.rating} <Icon name="star" color="#38C71C" size={18} />
              </Text>
            </View>
            <Text style={{ color: "#8ACB55", fontWeight: "bold", fontSize: 17 }}>Rs.{PRODUCT.pricePerKg}/kg</Text>

            {/* Quantity Controls */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Text style={{ color: "#38C71C", fontWeight: "bold", fontSize: 16 }}>
                {quantity}kg
              </Text>
              <TouchableOpacity onPress={() => handleQuantityChange(-1)} disabled={quantity <= 0}>
                <Icon
                  name="remove-circle"
                  size={23}
                  color={quantity <= 0 ? "#bbb" : "#38C71C"}
                  style={{ marginHorizontal: 2 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleQuantityChange(1)}>
                <Icon name="add-circle" size={23} color="#38C71C" style={{ marginHorizontal: 2 }} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={{ marginTop: 10, paddingHorizontal: 22 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Item Description</Text>
            <Text style={{ color: "#525252", marginVertical: 6, fontSize: 13, lineHeight: 18 }}>
              {PRODUCT.description}
            </Text>
          </View>

          {/* Review */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 18, marginLeft: 22 }}>Reviews</Text>
          <View style={styles.reviewCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>{REVIEW.user}</Text>
              <View style={{ flex: 1 }} />
              <Text style={{ color: "#38C71C", fontWeight: "bold" }}>
                {REVIEW.rating} <Icon name="star" color="#38C71C" size={15} />
              </Text>
            </View>
            <Text style={{ color: '#666', fontSize: 12 }}>{REVIEW.text}</Text>
          </View>

          {/* Related Products */}
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 22, marginTop: 10 }}>Related Products</Text>
          <TouchableOpacity onPress={goToRelatedProduct}>
            <View style={styles.relatedCard}>
              <Image source={{ uri: RELATED.image }} style={{ width: 65, height: 55, borderRadius: 11 }} />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{RELATED.name}</Text>
                <Text style={styles.relatedPrice}>Rs.{RELATED.pricePerKg}/kg</Text>
              </View>
              <View style={styles.relatedQty}>
                <Icon name="chevron-forward" size={18} color="#38C71C" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.cartBar}>
        <TouchableOpacity
          style={[styles.cartBtn, { opacity: quantity > 0 ? 1 : 0.6 }]}
          onPress={() => addToCart(item)}
          disabled={quantity <= 0}
        >
          <Text style={styles.btnText}>Add to cart</Text>
          
        </TouchableOpacity>
        <Text style={styles.cartTotal}>Rs.{total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: "#D6F9C5",
    borderRadius: 7,
    marginTop: 25,
    marginHorizontal: 10,
    paddingTop: 18,
    alignItems: "center",
    position: "relative",
  },
  bodyContent: {
    backgroundColor: "#fff",
    marginTop: -12,
    minHeight: 750,
    paddingTop: 6,
    paddingBottom: 20,
  },
  iconRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 1, height: 1 },
    marginBottom: 5,
  },
  productImg: {
    width: 170,
    height: 130,
    resizeMode: 'contain',
    marginTop: 6,
    marginBottom: 18
  },
  cartBar: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
    elevation: 4,
    shadowColor: "#222",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 8,
  },
  cartBtn: {
    backgroundColor: "#38C71C",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  cartTotal: { color: "#38C71C", fontSize: 18, fontWeight: "bold", flex: 1, textAlign: "right", marginRight: 15 },
  reviewCard: {
    marginHorizontal: 18,
    borderRadius: 13,
    backgroundColor: "#fff",
    padding: 12,
    marginTop: 8,
    marginBottom: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 1, height: 1 }
  },
  relatedCard: {
    marginHorizontal: 18,
    borderRadius: 13,
    backgroundColor: "#fff",
    padding: 9,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 1, height: 1 }
  },
  relatedPrice: {
    fontSize: 13,
    color: "#38C71C",
    marginTop: 4,
    fontWeight: "bold"
  },
  relatedQty: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  }
});
