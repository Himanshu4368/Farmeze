
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from "../screen/Homescreen/CartContext";

export default function Cart({ navigation }) {
  const { cart, updateQuantity, totalPrice } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={{ flex: 1, marginLeft: 15 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Rs.{item.pricePerKg}/Kg</Text>

        {/* Quantity Controls */}
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.name, -1)}>
            <Icon name="remove-circle" size={24} color="#38C71C" />
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => updateQuantity(item.name, 1)}>
            <Icon name="add-circle" size={24} color="#38C71C" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtotal}>
          Subtotal: Rs.{item.quantity * item.pricePerKg}
        </Text>
      </View>
    </View>
  );

  const handleCheckout = () => {
    navigation.navigate('Home', {
      screen: 'Checkout',
      params: {
        items: cart,
        total: totalPrice,
      },
    });
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="cart-outline" size={60} color="gray" />
          <Text style={{ marginTop: 10 }}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          {/* Items */}
          <FlatList
            data={cart}
            keyExtractor={(item, i) => i.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.total}>Total: Rs.{totalPrice}</Text>

            <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
              <Text style={styles.btnText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fff0" },

  header: {
    backgroundColor: '#25BB00',
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2
  },

  image: {
    width: 80,
    height: 70,
    borderRadius: 10
  },

  name: {
    fontSize: 17,
    fontWeight: "bold"
  },

  details: {
    fontSize: 14,
    color: "#888"
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6
  },

  qty: {
    fontSize: 16,
    marginHorizontal: 10
  },

  subtotal: {
    fontSize: 13,
    color: "#444"
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  total: {
    fontSize: 18,
    fontWeight: "bold"
  },

  btn: {
    backgroundColor: "#38C71C",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});