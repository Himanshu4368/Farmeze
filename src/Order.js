import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Dummy Data
const orders = []; // No Current Orders

const deliveredOrders = [
  { id: '2', name: 'Onion', weight: '2Kg', price: 200, payment: 'Cash On Delivery', status: 'Delivered', image: require('../assets/onion.jpeg') },
  { id: '3', name: 'Potato', weight: '2Kg', price: 50, payment: 'UPI', status: 'Delivered', image: require('../assets/potato.jpeg') },
  { id: '4', name: 'Onion', weight: '2Kg', price: 200, payment: 'Cash On Delivery', status: 'Delivered', image: require('../assets/onion.jpeg') },
];

const OrderScreen = () => {
  // Render Order Card
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image source={item.image} style={styles.orderImage} />
      <View style={styles.orderInfo}>
        <Text style={styles.orderName}>
          {item.name} <Text style={styles.orderWeight}>{item.weight}</Text>
        </Text>
        <Text style={styles.orderPrice}>
          Order Value <Text style={{ color: 'green' }}>Rs.{item.price}</Text>
        </Text>
        <Text style={styles.orderPayment}>{item.payment}</Text>
        <Text style={styles.orderStatus}>
          Status{' '}
          <Text style={item.status === 'Delivered' ? styles.statusDelivered : styles.statusPacked}>
            {item.status}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Icon name="refresh" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* No Orders Message */}
      {orders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Icon name="box-open" size={50} color="gray" />
          <Text style={styles.noOrdersText}>No Current Orders</Text>
        </View>
      ) : (
        <FlatList data={orders} renderItem={renderOrderItem} keyExtractor={(item) => item.id} />
      )}

      {/* Delivered Orders Section */}
      <Text style={styles.sectionTitle}>Delivered Orders</Text>
      <FlatList data={deliveredOrders} renderItem={renderOrderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D1F5C7', paddingHorizontal: 10 },
  header: { backgroundColor: '#25BB00', padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  refreshButton: { backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 8, borderRadius: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#000' },
  orderCard: { backgroundColor: 'white', borderRadius: 15, padding: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 3 },
  orderImage: { width: 50, height: 50, marginRight: 10 },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 18, fontWeight: 'bold' },
  orderWeight: { fontSize: 16, fontWeight: 'bold', color: 'green' },
  orderPrice: { fontSize: 14 },
  orderPayment: { fontSize: 14, color: '#555' },
  orderStatus: { fontSize: 14, marginTop: 5 },
  statusDelivered: { fontWeight: 'bold', color: 'green' },
  statusPacked: { fontWeight: 'bold', color: 'orange' },
  noOrdersContainer: { alignItems: 'center', marginTop: 30 },
  noOrdersText: { fontSize: 18, color: 'gray', marginTop: 10 },
});

export default OrderScreen;
