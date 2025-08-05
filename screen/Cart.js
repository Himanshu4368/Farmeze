import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.name, -1)}>
            <Icon name="remove-circle" size={24} color="#38C71C" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.name, 1)}>
            <Icon name="add-circle" size={24} color="#38C71C" />
          </TouchableOpacity>
        </View>
        <Text>Subtotal: Rs.{item.quantity * item.pricePerKg}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 28 }} /> {/* Empty space to center title */}
      </View>

      {cart.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="cart-outline" size={60} color="gray" />
          <Text>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList data={cart} keyExtractor={(item, i) => i.toString()} renderItem={renderItem} />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: Rs.{totalPrice}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Order', { orderItems: cart })}
            >
              <Text style={styles.btnText}>Place Order</Text>
            </TouchableOpacity>

          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0fff0" },

  /* Header */
 header: {
    backgroundColor: '#25BB00',
    paddingTop: 35,
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  card: {
    flexDirection: "row", backgroundColor: "#fff", padding: 10, borderRadius: 10,
    marginBottom: 10, alignItems: "center"
  },
  image: { width: 80, height: 70, borderRadius: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#888" },
  qtyRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  qty: { fontSize: 16, marginHorizontal: 10 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  footer: {
    padding: 10, borderTopWidth: 1, borderColor: "#ddd", backgroundColor: "#fff",
    flexDirection: "row", justifyContent: "space-between", alignItems: "center"
  },
  total: { fontSize: 18, fontWeight: "bold" },
  btn: { backgroundColor: "#38C71C", padding: 10, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "bold" }
});