import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import { useCart } from "../screen/Homescreen/CartContext";

export default function ProductScreen({
  route,
  navigation,
}) {

  const { vegetable } = route.params;

  const { addToCart } = useCart();

  const [quantity, setQuantity] =
    useState(1);

  const [review, setReview] =
    useState("");

  const [reviews, setReviews] =
    useState([
      {
        name: "Amit",
        text:
          "Very fresh and clean quality",
      },
      {
        name: "Neha",
        text:
          "Best vegetables I bought online",
      },
    ]);

  const rating = 4.7;

  const pricePerKg =
    Number(
      vegetable.pricePerKg
    ) ||
    parseInt(
      String(
        vegetable.price || ""
      ).replace(/\D/g, "")
    ) ||
    0;

  const total =
    pricePerKg * quantity;

  /* ADD TO CART */

  const handleAddToCart =
    async () => {

      try {

        console.log(
          "VEGETABLE:",
          vegetable
        );

        // IMPORTANT FIX
        const productData = {

          id:
            vegetable._id ||
            vegetable.id,

          name:
            vegetable.name,

          image:
            vegetable.image,

          pricePerKg,

          quantity,
        };

        console.log(
          "ADDING PRODUCT:",
          productData
        );

        await addToCart(
          productData
        );

        Alert.alert(
          "Success",
          "Item added to cart"
        );

        navigation.navigate(
          "MainTabs",
          {
            screen: "Cart",
          }
        );

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to add item"
        );
      }
    };

  /* REVIEW */

  const submitReview = () => {

    if (
      review.trim() === ""
    ) return;

    setReviews([
      {
        name: "You",
        text: review,
      },
      ...reviews,
    ]);

    setReview("");
  };

  return (

    <View
      style={styles.container}
    >

      {/* HEADER */}

      <View
        style={styles.header}
      >

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Icon
            name="arrow-left"
            size={22}
            color="#000"
          />

        </TouchableOpacity>

        <Text
          style={
            styles.headerTitle
          }
        >
          Product Details
        </Text>

        <View
          style={{ width: 22 }}
        />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* IMAGE */}

        <View
          style={
            styles.imageContainer
          }
        >

          <Image
            source={
              typeof vegetable.image ===
              "string"
                ? {
                    uri:
                      vegetable.image,
                  }
                : vegetable.image
            }
            style={styles.image}
          />

        </View>

        {/* PRODUCT CARD */}

        <View
          style={styles.card}
        >

          <Text
            style={styles.name}
          >
            {vegetable.name}
          </Text>

          <Text
            style={styles.price}
          >
            ₹{pricePerKg}/Kg
          </Text>

          {/* RATING */}

          <View
            style={
              styles.ratingRow
            }
          >

            {[1, 2, 3, 4, 5].map(
              (i) => (

                <Icon
                  key={i}
                  name="star"
                  size={16}
                  color={
                    i <=
                    Math.floor(
                      rating
                    )
                      ? "#FFD700"
                      : "#ccc"
                  }
                  style={{
                    marginRight: 3,
                  }}
                />

              )
            )}

            <Text
              style={{
                marginLeft: 8,
              }}
            >
              {rating} (124 ratings)
            </Text>

          </View>

          {/* QUANTITY */}

          <View
            style={
              styles.qtyRow
            }
          >

            <TouchableOpacity
              style={
                styles.qtyBtn
              }
              onPress={() =>
                setQuantity(
                  Math.max(
                    1,
                    quantity - 1
                  )
                )
              }
            >

              <Icon
                name="minus"
                size={16}
              />

            </TouchableOpacity>

            <Text
              style={
                styles.qtyText
              }
            >
              {quantity} Kg
            </Text>

            <TouchableOpacity
              style={
                styles.qtyBtn
              }
              onPress={() =>
                setQuantity(
                  quantity + 1
                )
              }
            >

              <Icon
                name="plus"
                size={16}
              />

            </TouchableOpacity>

          </View>

          {/* DESCRIPTION */}

          <Text
            style={
              styles.sectionTitle
            }
          >
            Description
          </Text>

          <Text
            style={styles.desc}
          >
            Premium quality{" "}
            {vegetable.name},
            fresh from farms,
            hygienically packed
            and delivered to your
            doorstep.
          </Text>

          {/* REVIEW INPUT */}

          <Text
            style={
              styles.sectionTitle
            }
          >
            Write a Review
          </Text>

          <TextInput
            value={review}
            onChangeText={
              setReview
            }
            placeholder="Write your experience..."
            style={
              styles.reviewInput
            }
          />

          <TouchableOpacity
            style={
              styles.submitBtn
            }
            onPress={
              submitReview
            }
          >

            <Text
              style={{
                color: "#fff",
                fontWeight:
                  "bold",
              }}
            >
              Submit Review
            </Text>

          </TouchableOpacity>

          {/* REVIEWS */}

          <Text
            style={
              styles.sectionTitle
            }
          >
            Customer Reviews
          </Text>

          {reviews.map(
            (r, i) => (

              <View
                key={i}
                style={
                  styles.reviewBox
                }
              >

                <Text
                  style={
                    styles.reviewName
                  }
                >
                  {r.name}
                </Text>

               <Text style={styles.reviewText}>
  {r.text}
</Text>

              </View>

            )
          )}

        </View>

      </ScrollView>

      {/* BOTTOM BAR */}

      <View
        style={styles.bottomBar}
      >

        <View>

          <Text
            style={
              styles.totalLabel
            }
          >
            Total
          </Text>

          <Text
            style={
              styles.totalPrice
            }
          >
            ₹{total}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.cartBtn}
          onPress={
            handleAddToCart
          }
        >

          <Text
            style={
              styles.cartText
            }
          >
            Add to Cart
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor:
        "#F3FAF1",
    },

    header: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#fff",
      elevation: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#DDEFD8",
    },

    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1F2A1F",
      
    },

    imageContainer: {
      backgroundColor: "#fff",
      height: 300,
      justifyContent:
        "center",
      alignItems: "center",
    },

    image: {
      width: "85%",
      height: "85%",
      resizeMode: "contain",
    },

    card: {
      backgroundColor: "#fff",
      padding: 20,
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18,
      borderWidth: 1,
      borderColor: "#DDEFD8",
    },

    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#1F2A1F",
    },

    price: {
      fontSize: 22,
      color: "#2E7D32",
      marginVertical: 8,
      fontWeight: "bold",
    },

    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 8,
     
    },

    qtyRow: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },

    qtyBtn: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 6,
      borderRadius: 8,
      backgroundColor:
        "#160303",
    },

    qtyText: {
      marginHorizontal: 20,
      fontSize: 16,
      fontWeight: "bold",
      color: "#1F2A1F",
    },

    sectionTitle: {
      fontSize: 17,
      fontWeight: "bold",
      marginTop: 15,
      color: "#1F2A1F",
    },

    desc: {
      fontSize: 14,
      color: "#475467",
      marginTop: 5,
      lineHeight: 22,
    },

    reviewInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 12,
      marginTop: 10,
      backgroundColor:
        "#fff",
      color: "#020e02",
    },

    submitBtn: {
      backgroundColor:
        "#2E7D32",
      alignSelf: "flex-end",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginTop: 10,
    },

    reviewBox: {
      backgroundColor:
        "#F1F8E9",
      padding: 12,
      borderRadius: 10,
      marginTop: 10,
      color: "#1F2A1F",
    },

    reviewName: {
      fontWeight: "bold",
      color: "#2E7D32",
      marginBottom: 3,
    },
    reviewText: {
  color: "#000",
  fontSize: 14,
},

    bottomBar: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      padding: 15,
      backgroundColor: "#fff",
      elevation: 10,
      borderTopWidth: 1,
      borderTopColor: "#DDEFD8",
    },

    totalLabel: {
      color: "#888",
    },

    totalPrice: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#2E7D32",
    },

    cartBtn: {
      backgroundColor:
        "#25BB00",
      paddingHorizontal: 40,
      paddingVertical: 14,
      borderRadius: 30,
    },

    cartText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
