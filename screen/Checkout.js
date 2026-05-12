import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { items = [], total = 0 } = route.params || {};

  // ✅ Updated Address (with phone)
  const [address, setAddress] = useState({
    name: "Himanshu Verma",
    phone: "9999999999",
    line1: "123, Green Farm Street",
    city: "Punjab, India"
  });

  const [editingAddress, setEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Razorpay Payment
  const handleRazorpayPayment = () => {
    const options = {
      description: 'Farm Fresh Order Payment',
      currency: 'INR',
      key: 'rzp_test_SlZ9QD1cFkxTig',
      amount: total * 100,
      name: 'Farmeze',
      prefill: {
        email: 'test@gmail.com',
        contact: address.phone,
        name: address.name
      },
      theme: { color: '#38C71C' }
    };

    RazorpayCheckout.open(options)
      .then(() => handleSuccessNavigation())
      .catch(() => alert('Payment Failed ❌'));
  };

  // ✅ Success Navigation
  const handleSuccessNavigation = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigation.navigate("OrderScreen", {
        orderItems: items,
      });
    }, 2000);
  };

  // ✅ Place Order
  const handlePlaceOrder = () => {
    if (paymentMethod === "COD") {
      handleSuccessNavigation();
    } else {
      handleRazorpayPayment();
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔝 Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 📍 Address */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Address</Text>

          {editingAddress ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={address.name}
                onChangeText={(text) => setAddress({ ...address, name: text })}
              />

              {/* ✅ Phone Input */}
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={address.phone}
                onChangeText={(text) => setAddress({ ...address, phone: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="Address Line"
                value={address.line1}
                onChangeText={(text) => setAddress({ ...address, line1: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="City"
                value={address.city}
                onChangeText={(text) => setAddress({ ...address, city: text })}
              />

              <TouchableOpacity onPress={() => setEditingAddress(false)}>
                <Text style={styles.saveText}>Save Address</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.text}>{address.name}</Text>
              <Text style={styles.subText}>📞 {address.phone}</Text>
              <Text style={styles.subText}>{address.line1}</Text>
              <Text style={styles.subText}>{address.city}</Text>

              <TouchableOpacity onPress={() => setEditingAddress(true)}>
                <Text style={styles.editText}>Change Address</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* 🛒 Order Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          {items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Image source={item.image} style={styles.image} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.subText}>
                  {item.quantity} × ₹{item.pricePerKg}
                </Text>
              </View>

              <Text style={styles.text}>
                ₹{item.quantity * item.pricePerKg}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalText}>₹{total}</Text>
          </View>
        </View>

        {/* 💳 Payment */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          {["COD", "UPI", "Card"].map((method) => (
            <TouchableOpacity
              key={method}
              style={[
                styles.paymentOption,
                paymentMethod === method && styles.selectedPayment
              ]}
              onPress={() => setPaymentMethod(method)}
            >
              <Text style={styles.text}>
                {method === "COD" && "Cash on Delivery"}
                {method === "UPI" && "UPI / Razorpay"}
                {method === "Card" && "Card / Razorpay"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* 🔘 Place Order */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Icon name="checkmark-circle" size={70} color="#38C71C" />
            <Text style={styles.successText}>Order Placed!</Text>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6FFF3' },

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
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#38C71C',
    marginBottom: 10,
  },

  text: { fontSize: 15, color: '#333' },
  subText: { fontSize: 13, color: '#666' },

  editText: {
    color: '#38C71C',
    marginTop: 8,
    fontWeight: '600',
  },

  saveText: {
    color: '#38C71C',
    marginTop: 10,
    fontWeight: 'bold',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },

  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  paymentOption: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
    marginVertical: 5,
  },

  selectedPayment: {
    backgroundColor: '#D6F9C5',
  },

  footer: {
    padding: 16,
    backgroundColor: '#fff',
  },

  button: {
    backgroundColor: '#38C71C',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },

  successText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
