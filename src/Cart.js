import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Cart = () => {
  const [cart, setCart] = useState([
    { id: '1', name: 'Onion', quantity: '2Kg', price: 180, image: require('../assets/onion.jpeg') },
    { id: '2', name: 'Potato', quantity: '3Kg', price: 120, image: require('../assets/potato.jpeg') },
  ]);

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.cartDetails}>
                  <Text style={styles.name}>{item.name} - {item.quantity}</Text>
                  <Text style={styles.price}>Rs. {item.price}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footerBox}>
            <Text style={styles.totalText}>Total: Rs. {totalPrice}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FB',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  emptyCart: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 4,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 5,
  },
  cartDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  footerBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default Cart;
