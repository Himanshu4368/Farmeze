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

const Popular = ({ navigation, products = [] }) => {

  const {
    cart,
    addToCart,
    updateQuantity,
  } = useCart();

  // GET ITEM QUANTITY

  const getQuantity = (itemId) => {

    const cartItem = cart.find(
      (item) => item.id === itemId
    );

    return cartItem ? cartItem.quantity : 0;
  };

  // ADD ITEM

  const handleAdd = (item) => {
    const itemId = item?._id || item?.id;

    const existingItem = cart.find(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItem) {

      updateQuantity(
        itemId,
        existingItem.quantity + 1
      );

    } else {

      addToCart({
        id: itemId,
        name: item?.name,
        image: item?.imageUrl,
        pricePerKg: item?.price,
        quantity: 1,
      });
    }
  };

  // INCREASE

  const increaseQty = (item, quantity) => {

    updateQuantity(
      item?._id || item?.id,
      quantity + 1
    );
  };

  // DECREASE

  const decreaseQty = (item, quantity) => {

    updateQuantity(
      item?._id || item?.id,
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

      </View>

      {/* PRODUCTS */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >

        {
          products.map((item, index) => {

            const quantity =
              getQuantity(item?._id || item?.id);

            return (

              <Animatable.View
                key={item?._id || index}
                animation="fadeInUp"
                duration={700}
              >

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate(
                      "ProductDescription",
                      {
                        vegetable: {
                          id: item?._id,
                          name: item?.name,
                          image: item?.imageUrl,
                          price:
                            `Rs.${item?.price || 0}/Kg`,
                          pricePerKg: item?.price,
                          description:
                            item?.description,
                          rating:
                            item?.rating || 4.5,
                        },
                      }
                    )
                  }
                >

                  {/* PRODUCT IMAGE */}

                  <Image
                    source={
                      item?.imageUrl
                        ? { uri: item.imageUrl }
                        : require("../../assets/potato.jpeg")
                    }
                    style={styles.image}
                  />

                  {/* DETAILS */}

                  <View style={styles.details}>

                    <Text style={styles.name}>
                      {item?.name || "Vegetable"}
                    </Text>

                    <Text style={styles.price}>
                      ₹{item?.price || 0}/Kg
                    </Text>

                    {/* RATING */}

                    <View style={styles.ratingContainer}>

                      <Icon
                        name="star"
                        size={15}
                        color="#FFC107"
                      />

                      <Text style={styles.ratingText}>
                        {item?.rating || 4.5}
                      </Text>

                    </View>

                  </View>

                  {/* ADD BUTTON */}

                  {
                    quantity === 0 ? (

                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() =>
                          handleAdd(item)
                        }
                      >

                        <Icon
                          name="add"
                          size={24}
                          color="#fff"
                        />

                      </TouchableOpacity>

                    ) : (

                      <View
                        style={
                          styles.quantityContainer
                        }
                      >

                        {/* MINUS */}

                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() =>
                            decreaseQty(
                              item,
                              quantity
                            )
                          }
                        >

                          <Icon
                            name="remove"
                            size={18}
                            color="#fff"
                          />

                        </TouchableOpacity>

                        {/* QUANTITY */}

                        <Text
                          style={
                            styles.quantityText
                          }
                        >
                          {quantity}
                        </Text>

                        {/* PLUS */}

                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() =>
                            increaseQty(
                              item,
                              quantity
                            )
                          }
                        >

                          <Icon
                            name="add"
                            size={18}
                            color="#fff"
                          />

                        </TouchableOpacity>

                      </View>

                    )
                  }

                </TouchableOpacity>

              </Animatable.View>
            );
          })
        }

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    paddingVertical: 18,
    paddingLeft: 18,
  },

  headerRow: {
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2A1F",
  },

  card: {
    width: 185,

    backgroundColor: "#FFFFFF",

    borderRadius: 12,

    marginRight: 16,

    paddingTop: 14,
    paddingBottom: 18,
    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: "#DDEFD8",

    elevation: 3,
  },

  image: {
    width: 130,
    height: 120,

    alignSelf: "center",

    resizeMode: "contain",

    marginTop: 10,

    borderRadius: 10,
  },

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
    color: "#0f0909",
    fontWeight: "600",
    fontSize: 13,
  },

  addButton: {
    position: "absolute",
    bottom: 14,
    right: 14,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#25BB00",

    justifyContent: "center",
    alignItems: "center",
  },

  quantityContainer: {
    position: "absolute",
    bottom: 14,
    right: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#25BB00",

    borderRadius: 30,

    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  qtyBtn: {
    width: 28,
    height: 28,

    borderRadius: 14,

    backgroundColor:
      "rgba(255,255,255,0.2)",

    justifyContent: "center",
    alignItems: "center",
  },

  quantityText: {
    color: "#080000",

    fontWeight: "700",

    fontSize: 15,

    marginHorizontal: 14,
  },

});

export default Popular;
