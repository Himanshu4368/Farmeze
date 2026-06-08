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

import {
  useFocusEffect
} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  getOrders
} from '../../api/orderApi';

import {
  getProducts
} from '../../api/productApi';

const CURRENCY = '\u20B9';

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

const getImageSource = (item) => {
  const image =
    item?.image ||
    item?.productId?.imageUrl;

  if (image) {
    return { uri: image };
  }

  return require('../../assets/potato.jpeg');
};

const formatDate = (date) => {
  if (!date) {
    return 'Date not available';
  }

  return new Date(date).toLocaleDateString();
};

const MyOrders = ({
  navigation
}) => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {
    try {
      const response =
        await getOrders();

      const products =
        await getProducts();

      setOrders(
        enrichOrdersWithProductImages(
          Array.isArray(response) ? response : [],
          Array.isArray(products) ? products : []
        )
      );
    } catch (error) {
      console.log(
        'FETCH MY ORDERS ERROR:',
        error.response?.data ||
        error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const renderOrder = ({
    item
  }) => {
    const firstItem =
      item.items?.[0];

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
          source={getImageSource(firstItem)}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {firstItem?.productName || 'Order'}
          </Text>

          <Text style={styles.metaText}>
            {formatDate(item.createdAt)}
            {itemCount > 1 ? ` | ${itemCount} items` : ''}
          </Text>

          <Text style={styles.metaText}>
            Status: {item.status || 'approved'}
          </Text>

          <Text style={styles.price}>
            {CURRENCY}{item.totalAmount || 0}
          </Text>
        </View>

        <Icon
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
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="arrow-back"
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          My Orders
        </Text>

        <View style={{ width: 26 }} />
      </View>

      {
        loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color="#25BB00"
            />
          </View>
        ) : orders.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              No orders found
            </Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item, index) =>
              item._id || index.toString()
            }
            contentContainerStyle={styles.listContent}
          />
        )
      }
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF1'
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '800'
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  listContent: {
    padding: 15
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    elevation: 2
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#EEF2F6'
  },

  info: {
    flex: 1,
    marginLeft: 12
  },

  name: {
    color: '#1F2A1F',
    fontSize: 17,
    fontWeight: '800'
  },

  metaText: {
    color: '#667085',
    marginTop: 3
  },

  price: {
    color: '#25BB00',
    fontWeight: '800',
    marginTop: 5,
    fontSize: 16
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    color: '#667085',
    fontSize: 16
  }
});
