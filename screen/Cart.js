import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useCart } from '../screen/Homescreen/CartContext';

export default function Cart({ navigation }) {

  const {
    cart,
    updateQuantity,
    totalPrice,
  } = useCart();

  // PLACE ORDER FUNCTION

  const handlePlaceOrder = () => {

    if (cart.length === 0) {
      Alert.alert(
        "Cart Empty",
        "Please add products before placing an order"
      );
      return;
    }

    navigation.navigate(
      "Checkout",
      {
        items: cart,
        total: totalPrice,
      }
    );
  };

  // RENDER CART ITEM

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      {/* PRODUCT IMAGE */}

      <Image
        source={
          item.image
            ? typeof item.image === 'string'
              ? { uri: item.image }
              : item.image
            : require('../assets/potato.jpeg')
        }
        style={styles.image}
      />

      {/* DETAILS */}

      <View style={styles.infoContainer}>

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.details}>
          ₹{item.pricePerKg}/Kg
        </Text>

        {/* QUANTITY CONTROLS */}

        <View style={styles.qtyRow}>

          {/* MINUS */}

          <TouchableOpacity
            onPress={() =>
              updateQuantity(
                item.id,
                item.quantity - 1
              )
            }
          >

            <Icon
              name="remove-circle"
              size={26}
              color="#38C71C"
            />

          </TouchableOpacity>

          {/* QUANTITY */}

          <Text style={styles.qty}>
            {item.quantity}
          </Text>

          {/* PLUS */}

          <TouchableOpacity
            onPress={() =>
              updateQuantity(
                item.id,
                item.quantity + 1
              )
            }
          >

            <Icon
              name="add-circle"
              size={26}
              color="#38C71C"
            />

          </TouchableOpacity>

        </View>

        {/* SUBTOTAL */}

        <Text style={styles.subtotal}>

          Subtotal: ₹
          {item.pricePerKg * item.quantity}

        </Text>

      </View>

    </View>
  );

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Icon
            name="arrow-back"
            size={28}
            color="white"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Cart
        </Text>

        <View style={{ width: 28 }} />

      </View>

      {/* EMPTY CART */}

      {
        cart.length === 0 ? (

          <View style={styles.empty}>

            <Icon
              name="cart-outline"
              size={70}
              color="#999"
            />

            <Text style={styles.emptyText}>
              Your cart is empty
            </Text>

          </View>

        ) : (

          <>
            {/* CART ITEMS */}

            <FlatList
              data={cart}
              renderItem={renderItem}
              keyExtractor={(item, index) =>

                item.id
                  ? item.id.toString()
                  : index.toString()
              }
              contentContainerStyle={{
                padding: 12,
              }}
            />

            {/* FOOTER */}

            <View style={styles.footer}>

              <Text style={styles.total}>
                Total: ₹{totalPrice}
              </Text>

              <TouchableOpacity
                style={styles.btn}
                onPress={handlePlaceOrder}
              >

                <Text style={styles.btnText}>
                  Place Order
                </Text>

              </TouchableOpacity>

            </View>

          </>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3FAF1',
  },

  header: {
    backgroundColor: '#25BB00',
    paddingTop: 18,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8',
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },

  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2A1F',
  },

  details: {
    fontSize: 14,
    marginTop: 5,
    color: '#667085',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  qty: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: '#1F2A1F',
  },

  subtotal: {
    fontSize: 14,
    color: '#475467',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },

  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2A1F',
  },

  btn: {
    backgroundColor: '#38C71C',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
