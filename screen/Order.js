import React, {
  useCallback,
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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useFocusEffect
} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { getUserOrders } from '../api/orderApi';
import { getProducts } from '../api/productApi';

const CURRENCY = '\u20B9';

const getOrderItemImage = (item) =>
  item?.image ||
  item?.productId?.imageUrl ||
  item?.product?.imageUrl;

const getImageSource = (image) => {
  if (image) {
    return { uri: image };
  }

  return require('../assets/potato.jpeg');
};

const statusStyle = (status) => {
  if (status === 'delivered') {
    return styles.delivered;
  }

  if (status === 'cancelled') {
    return styles.cancelled;
  }

  if (status === 'shipped') {
    return styles.shipped;
  }

  return styles.packed;
};

const getProductId = (item) => {
  if (!item?.productId) {
    return null;
  }

  return typeof item.productId === 'string'
    ? item.productId
    : item.productId._id;
};

const enrichOrdersWithProductImages = (orders, products) => {
  const productMap = products.reduce((map, product) => {
    map[product._id || product.id] = product;
    return map;
  }, {});

  return orders.map((order) => ({
    ...order,
    items: order.items?.map((item) => {
      const product =
        productMap[getProductId(item)];

      return {
        ...item,
        image:
          item.image ||
          item.productId?.imageUrl ||
          product?.imageUrl,
      };
    }) || [],
  }));
};

const OrderScreen = ({
  navigation,
  route
}) => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = useCallback(async () => {

    try {

      const storedUser =
        await AsyncStorage.getItem('user');
      const user =
        storedUser
          ? JSON.parse(storedUser)
          : {};

      const response =
        await getUserOrders(user.email);

      const products =
        await getProducts();

      setOrders(
        (() => {
          const enrichedOrders =
            enrichOrdersWithProductImages(
          Array.isArray(response) ? response : [],
          Array.isArray(products) ? products : []
            );

          const latestOrderId =
            route?.params?.latestOrderId;

          if (latestOrderId) {
            return enrichedOrders.filter(
              (order) => order._id === latestOrderId
            );
          }

          return enrichedOrders;
        })()
      );

    } catch (error) {

      console.log(
        "FETCH ORDER ERROR:",
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  }, [route?.params?.latestOrderId]);

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [fetchOrders])
  );

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

    const itemCount =
      item.items?.length || 0;

    return (

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate(
            'OrderDetails',
            {
              orderId: item._id,
              order: item
            }
          )
        }
      >

        <Image
          source={getImageSource(getOrderItemImage(firstItem))}
          style={styles.image}
        />

        <View style={styles.info}>

          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {name}
          </Text>

          <Text style={styles.metaText}>
            {quantity} Kg
            {itemCount > 1 ? ` + ${itemCount - 1} more` : ''}
          </Text>

          <Text style={styles.price}>
            {CURRENCY}{item.totalAmount}
          </Text>

          <Text style={styles.metaText}>
            Payment: {item.paymentMedium || 'cod'}
          </Text>

          <Text style={styles.metaText}>
            Status:
            <Text
              style={statusStyle(item.status)}
            >
              {' '}
              {item.status || 'approved'}
            </Text>
          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#98A2B3"
        />

      </TouchableOpacity>
    );
  };

  return (

    <View style={styles.container}>

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
          Current Order
        </Text>

        <View style={{ width: 28 }} />

      </View>

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
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8'
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#EEF2F6'
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

  metaText: {
    color: '#475467',
    marginTop: 2
  },

  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#25BB00',
    marginTop: 5
  },

  packed: {
    color: '#B54708',
    fontWeight: 'bold'
  },

  shipped: {
    color: '#175CD3',
    fontWeight: 'bold'
  },

  delivered: {
    color: 'green',
    fontWeight: 'bold'
  },

  cancelled: {
    color: '#B42318',
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
