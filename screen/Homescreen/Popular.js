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
import { useCart } from "../../screen/Homescreen/CartContext";

const Popular = ({ navigation }) => {

  const {
    cart,
    addToCart,
    updateQuantity,
  } = useCart();

  const popularItems = [
    {
      id: 1,
      name: "Potato",
      price: "Rs.30/Kg",
      pricePerKg: 30,
      discount: "10% OFF",
      image: require("../../assets/potato.jpeg"),
      description:
        "Fresh farm potatoes directly sourced from local farmers.",
      rating: 5,
    },
    {
      id: 2,
      name: "Onion",
      price: "Rs.100/Kg",
      pricePerKg: 100,
      discount: "10% OFF",
      image: require("../../assets/onion.jpeg"),
      description:
        "Premium quality onions with best freshness and taste.",
      rating: 4.5,
    },
  ];

  // GET ITEM QUANTITY
  const getQuantity = (itemId) => {
    const cartItem = cart.find(
      (item) => item.id === itemId
    );

    return cartItem ? cartItem.quantity : 0;
  };

  // ADD ITEM
  const handleAdd = (item) => {

    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {

      updateQuantity(
        item.id,
        existingItem.quantity + 1
      );

    } else {

      addToCart({
        ...item,
        quantity: 1,
      });

    }
  };

  // INCREASE QUANTITY
  const increaseQty = (item, quantity) => {

    updateQuantity(
      item.id,
      quantity + 1
    );
  };

  // DECREASE QUANTITY
  const decreaseQty = (item, quantity) => {

    updateQuantity(
      item.id,
      quantity - 1
    );
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>

        <Text style={styles.title}>
          Popular
        </Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>
            See All
          </Text>
        </TouchableOpacity>

      </View>

      {/* PRODUCTS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >

        {popularItems.map((item, index) => {

          const quantity = getQuantity(item.id);

          return (

            <Animatable.View
              key={index}
              animation="fadeInUp"
              duration={700}
            >

              {/* CARD */}
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.card}
                onPress={() =>
                  navigation.navigate(
                    "ProductDescription",
                    {
                      vegetable: {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        type: "Fresh Vegetable",
                        description: item.description,
                        pricePerKg: item.pricePerKg,
                        rating: item.rating,
                      },
                    }
                  )
                }
              >

                {/* DISCOUNT BADGE */}
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {item.discount}
                  </Text>
                </View>

                {/* PRODUCT IMAGE */}
                <Image
                  source={item.image}
                  style={styles.image}
                />

                {/* DETAILS */}
                <View style={styles.details}>

                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    {item.price}
                  </Text>

                  {/* RATING */}
                  <View style={styles.ratingContainer}>

                    <Icon
                      name="star"
                      size={15}
                      color="#FFC107"
                    />

                    <Text style={styles.ratingText}>
                      {item.rating}
                    </Text>

                  </View>

                </View>

                {/* ADD BUTTON */}
                {quantity === 0 ? (

                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addButton}
                    onPress={() => handleAdd(item)}
                  >

                    <Icon
                      name="add"
                      size={24}
                      color="#fff"
                    />

                  </TouchableOpacity>

                ) : (

                  /* QUANTITY CONTROLS */
                  <View style={styles.quantityContainer}>

                    {/* MINUS */}
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        decreaseQty(item, quantity)
                      }
                    >

                      <Icon
                        name="remove"
                        size={18}
                        color="#fff"
                      />

                    </TouchableOpacity>

                    {/* QUANTITY */}
                    <Text style={styles.quantityText}>
                      {quantity}
                    </Text>

                    {/* PLUS */}
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        increaseQty(item, quantity)
                      }
                    >

                      <Icon
                        name="add"
                        size={18}
                        color="#fff"
                      />

                    </TouchableOpacity>

                  </View>

                )}

              </TouchableOpacity>

            </Animatable.View>
          );
        })}

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    paddingVertical: 18,
    paddingLeft: 18,
    backgroundColor: "#F5FFF1",
  },

  /* HEADER */

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 18,
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B5E20",
    letterSpacing: 0.5,
  },

  seeAll: {
    fontSize: 14,
    color: "#38C71C",
    fontWeight: "700",
  },

  /* CARD */

  card: {
    width: 185,
    backgroundColor: "#fff",
    borderRadius: 22,
    marginRight: 16,

    paddingTop: 14,
    paddingBottom: 18,
    paddingHorizontal: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,

    elevation: 5,

    position: "relative",
  },

  /* DISCOUNT */

  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,

    backgroundColor: "#FF4D4F",

    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 14,

    zIndex: 2,
  },

  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  /* IMAGE */

  image: {
    width: 130,
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: 10,
  },

  /* DETAILS */

  details: {
    marginTop: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212121",
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 5,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  ratingText: {
    marginLeft: 5,
    color: "#666",
    fontWeight: "600",
    fontSize: 13,
  },

  /* ADD BUTTON */

  addButton: {
    position: "absolute",
    bottom: 14,
    right: 14,

    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: "#38C71C",

    justifyContent: "center",
    alignItems: "center",

    elevation: 4,

    shadowColor: "#38C71C",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
  },

  /* QUANTITY CONTROLS */

  quantityContainer: {
    position: "absolute",
    bottom: 14,
    right: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#38C71C",

    borderRadius: 30,

    paddingHorizontal: 8,
    paddingVertical: 6,

    elevation: 4,

    shadowColor: "#38C71C",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,

    backgroundColor: "rgba(255,255,255,0.18)",

    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    marginHorizontal: 14,
  },

});

export default Popular;