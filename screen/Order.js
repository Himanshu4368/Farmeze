import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getOrders } from '../api/orderApi';

const OrderScreen = ({
  navigation
}) => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      const response =
        await getOrders();

      console.log(
        "ORDERS:",
        response
      );

      setOrders(response);

    } catch (error) {

      console.log(
        "FETCH ORDER ERROR:",
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchOrders();

  }, []);

  // LOADING

  if (loading) {

    return (

      <View style={styles.loaderContainer}>

        <ActivityIndicator
          size="large"
          color="#25BB00"
        />

      </View>
    );
  }

  // RENDER ORDER ITEM

  const renderOrder = ({
    item
  }) => {

    const firstItem =
      item.items?.[0];

    const name =
      firstItem?.productName ||
      "Product";

    const quantity =
      firstItem?.quantity || 1;

    return (

      <View style={styles.card}>

        {/* IMAGE */}

        <Image
          source={require('../assets/potato.jpeg')}
          style={styles.image}
        />

        {/* INFO */}

        <View style={styles.info}>

          <Text style={styles.name}>
            {name}
          </Text>

          <Text>
            Quantity:
            {' '}
            {quantity}
            {' '}
            Kg
          </Text>

          <Text style={styles.price}>
            ₹{item.totalAmount}
          </Text>

          <Text>
            Payment:
            {' '}
            {item.paymentMedium || 'COD'}
          </Text>

          <Text>

            Status:

            <Text
              style={
                item.status === 'delivered'
                  ? styles.delivered
                  : styles.packed
              }
            >

              {' '}
              {item.status || 'approved'}

            </Text>

          </Text>

        </View>

      </View>
    );
  };

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Ionicons
            name='arrow-back'
            size={28}
            color='white'
          />

        </TouchableOpacity>

        <Text style={styles.headerText}>
          My Orders
        </Text>

        <View style={{ width: 28 }} />

      </View>

      {/* EMPTY */}

      {
        orders.length === 0 ? (

          <View style={styles.empty}>

            <Icon
              name='box'
              size={70}
              color='gray'
            />

            <Text style={styles.emptyText}>
              No Orders Found
            </Text>

          </View>

        ) : (

          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item, index) =>

              item._id
                ? item._id.toString()
                : index.toString()
            }
            contentContainerStyle={{
              padding: 15
            }}
          />

        )
      }

    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3FAF1'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    backgroundColor: '#25BB00',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8'
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  },

  info: {
    marginLeft: 15,
    flex: 1
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2A1F'
  },

  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#25BB00',
    marginTop: 5
  },

  packed: {
    color: 'orange',
    fontWeight: 'bold'
  },

  delivered: {
    color: 'green',
    fontWeight: 'bold'
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    fontSize: 18,
    marginTop: 15,
    color: 'gray'
  }

});
