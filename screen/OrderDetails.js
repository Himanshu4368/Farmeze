import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getOrderById
} from '../api/orderApi';

import {
  getProducts
} from '../api/productApi';
import {
  createProductReview
} from '../api/reviewApi';

const CURRENCY = '\u20B9';

const getImageSource = (image) => {
  if (image) {
    return { uri: image };
  }

  return require('../assets/potato.jpeg');
};

const getOrderItemImage = (item) =>
  item?.image ||
  item?.productId?.imageUrl ||
  item?.product?.imageUrl;

const formatDate = (date) => {
  if (!date) {
    return 'Not available';
  }

  return new Date(date).toLocaleString();
};

const labelize = (value) => {
  if (!value) {
    return 'Not available';
  }

  return String(value)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getProductId = (item) => {
  if (!item?.productId) {
    return item?.product?._id ||
      item?.product?.id ||
      item?.id ||
      null;
  }

  return typeof item.productId === 'string'
    ? item.productId
    : item.productId._id || item.productId.id;
};

const enrichOrderWithProductImages = (order, products) => {
  const productMap = products.reduce((map, product) => {
    map[product._id || product.id] = product;
    return map;
  }, {});

  return {
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
  };
};

const statusSteps = [
  'approved',
  'shipped',
  'delivered'
];

const OrderDetails = ({
  route,
  navigation
}) => {
  const {
    orderId,
    order: initialOrder
  } = route.params || {};

  const [order, setOrder] =
    useState(initialOrder || null);

  const [loading, setLoading] =
    useState(Boolean(orderId));

  const [reviewDrafts, setReviewDrafts] =
    useState({});

  const [submittingReviewFor, setSubmittingReviewFor] =
    useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const response =
          await getOrderById(orderId);

        const products =
          await getProducts();

        setOrder(
          enrichOrderWithProductImages(
            response,
            Array.isArray(products) ? products : []
          )
        );
      } catch (error) {
        Alert.alert(
          'Order Details',
          error.response?.data?.message ||
          'Unable to load order details'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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

  if (!order) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Order Details
          </Text>
          <View style={{ width: 28 }} />
        </View>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Order not found
          </Text>
        </View>
      </View>
    );
  }

  const currentStep =
    statusSteps.indexOf(order.status);

  const isDelivered =
    String(order.status || '').toLowerCase() === 'delivered';

  const updateReviewDraft = (itemKey, changes) => {
    setReviewDrafts((current) => ({
      ...current,
      [itemKey]: {
        rating: 5,
        comment: '',
        ...(current[itemKey] || {}),
        ...changes
      }
    }));
  };

  const submitItemReview = async (item, itemKey) => {
    const productId = getProductId(item);
    const draft = {
      rating: 5,
      comment: '',
      ...(reviewDrafts[itemKey] || {})
    };

    if (!productId) {
      Alert.alert('Review', 'Product id missing for this item');
      return;
    }

    if (!draft.comment.trim()) {
      Alert.alert('Review', 'Please write your review');
      return;
    }

    try {
      setSubmittingReviewFor(itemKey);

      const storedUser =
        await AsyncStorage.getItem('user');
      const user =
        storedUser
          ? JSON.parse(storedUser)
          : {};

      await createProductReview(
        productId,
        {
          orderId: order._id || order.id,
          orderItemId: item._id || item.id || itemKey,
          rating: draft.rating,
          comment: draft.comment.trim(),
          text: draft.comment.trim(),
          userId: user._id || user.id,
          userName:
            user.name ||
            user.email ||
            order.customerName ||
            'Farmeze User',
        }
      );

      updateReviewDraft(
        itemKey,
        {
          comment: '',
          submitted: true
        }
      );

      Alert.alert(
        'Success',
        'Review submitted'
      );
    } catch (error) {
      console.log(
        'ORDER REVIEW ERROR:',
        error.response?.data ||
        error.message
      );

      Alert.alert(
        'Review Failed',
        error.response?.data?.message ||
        'Unable to submit review'
      );
    } finally {
      setSubmittingReviewFor(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Order Details
        </Text>

        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
      >
        <View style={styles.card}>
          <Text style={styles.orderNumber}>
            {order.orderNumber || 'Order'}
          </Text>

          <Text style={styles.orderDate}>
            Placed on {formatDate(order.createdAt)}
          </Text>

          <View style={styles.statusPill}>
            <Text style={styles.statusText}>
              {labelize(order.status)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Order Updates
          </Text>

          {
            statusSteps.map((step, index) => {
              const isDone =
                order.status === 'cancelled'
                  ? false
                  : index <= currentStep;

              return (
                <View
                  key={step}
                  style={styles.stepRow}
                >
                  <View
                    style={[
                      styles.stepDot,
                      isDone && styles.stepDotActive
                    ]}
                  />

                  <Text
                    style={[
                      styles.stepText,
                      isDone && styles.stepTextActive
                    ]}
                  >
                    {labelize(step)}
                  </Text>
                </View>
              );
            })
          }

          {
            order.status === 'cancelled' && (
              <Text style={styles.cancelledText}>
                This order has been cancelled.
              </Text>
            )
          }
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Items
          </Text>

          {
            order.items?.map((item, index) => {
              const itemKey =
                item._id ||
                item.id ||
                `${getProductId(item)}-${index}`;
              const draft =
                reviewDrafts[itemKey] || {
                  rating: 5,
                  comment: ''
                };

              return (
                <View
                  key={itemKey}
                  style={styles.itemBlock}
                >
                  <View style={styles.itemRow}>
                    <Image
                      source={getImageSource(getOrderItemImage(item))}
                      style={styles.itemImage}
                    />

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>
                        {item.productName}
                      </Text>

                      <Text style={styles.metaText}>
                        {item.quantity} Kg x {CURRENCY}{item.price}
                      </Text>
                    </View>

                    <Text style={styles.itemAmount}>
                      {CURRENCY}{Number(item.quantity || 0) * Number(item.price || 0)}
                    </Text>
                  </View>

                  {isDelivered && (
                    <View style={styles.reviewPanel}>
                      <Text style={styles.reviewTitle}>
                        Review this item
                      </Text>

                      <View style={styles.starRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity
                            key={star}
                            onPress={() =>
                              updateReviewDraft(
                                itemKey,
                                {
                                  rating: star,
                                  submitted: false
                                }
                              )
                            }
                          >
                            <Icon
                              name="star"
                              size={22}
                              color={
                                star <= draft.rating
                                  ? '#FFD700'
                                  : '#D0D5DD'
                              }
                              style={styles.starIcon}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      <TextInput
                        style={styles.reviewInput}
                        placeholder="Share your experience with this product"
                        placeholderTextColor="#98A2B3"
                        value={draft.comment}
                        multiline
                        onChangeText={(text) =>
                          updateReviewDraft(
                            itemKey,
                            {
                              comment: text,
                              submitted: false
                            }
                          )
                        }
                      />

                      <TouchableOpacity
                        style={[
                          styles.reviewButton,
                          submittingReviewFor === itemKey &&
                            styles.reviewButtonDisabled
                        ]}
                        onPress={() =>
                          submitItemReview(item, itemKey)
                        }
                        disabled={submittingReviewFor === itemKey}
                      >
                        {submittingReviewFor === itemKey ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.reviewButtonText}>
                            {draft.submitted ? 'Submitted' : 'Submit Review'}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          }
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Payment
          </Text>

          <DetailRow
            label="Mode of pay"
            value={labelize(order.paymentMedium)}
          />

          <DetailRow
            label="Payment status"
            value={labelize(order.paymentStatus)}
          />

          <DetailRow
            label="Amount"
            value={`${CURRENCY}${order.totalAmount || 0}`}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Bill Summary
          </Text>

          <DetailRow
            label="Items total"
            value={`${CURRENCY}${order.subtotal || 0}`}
          />

          {
            Number(order.deliveryFee || 0) > 0 && (
              <DetailRow
                label="Delivery fee"
                value={`${CURRENCY}${order.deliveryFee}`}
              />
            )
          }

          {
            Number(order.discountAmount || 0) > 0 && (
              <DetailRow
                label={`Discount${order.promoCode ? ` (${order.promoCode})` : ''}`}
                value={`-${CURRENCY}${order.discountAmount}`}
              />
            )
          }

          <View style={styles.divider} />

          <DetailRow
            label="Total price"
            value={`${CURRENCY}${order.totalAmount || 0}`}
            strong
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Delivery
          </Text>

          <Text style={styles.metaText}>
            {order.customerName}
          </Text>

          <Text style={styles.metaText}>
            {order.customerPhone}
          </Text>

          <Text style={styles.metaText}>
            {order.deliveryAddress}
          </Text>

          <Text style={styles.metaText}>
            {order.city}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({
  label,
  value,
  strong
}) => (
  <View style={styles.detailRow}>
    <Text
      style={[
        styles.detailLabel,
        strong && styles.strongText
      ]}
    >
      {label}
    </Text>

    <Text
      style={[
        styles.detailValue,
        strong && styles.strongText
      ]}
    >
      {value}
    </Text>
  </View>
);

export default OrderDetails;

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

  content: {
    padding: 15
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8'
  },

  orderNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1F2A1F'
  },

  orderDate: {
    marginTop: 6,
    color: '#667085'
  },

  statusPill: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E7F6E2'
  },

  statusText: {
    color: '#1F7A35',
    fontWeight: '700'
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F7A35',
    marginBottom: 12
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },

  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D0D5DD',
    marginRight: 10
  },

  stepDotActive: {
    backgroundColor: '#25BB00'
  },

  stepText: {
    color: '#667085',
    fontWeight: '600'
  },

  stepTextActive: {
    color: '#1F2A1F'
  },

  cancelledText: {
    color: '#B42318',
    fontWeight: '700'
  },

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },

  itemBlock: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
    marginBottom: 14,
    paddingBottom: 14
  },

  itemImage: {
    width: 58,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#EEF2F6'
  },

  itemInfo: {
    flex: 1,
    marginLeft: 12
  },

  itemName: {
    color: '#1F2A1F',
    fontWeight: '700'
  },

  metaText: {
    color: '#475467',
    marginTop: 3
  },

  itemAmount: {
    color: '#1F2A1F',
    fontWeight: '700'
  },

  reviewPanel: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E4E7EC'
  },

  reviewTitle: {
    color: '#1F2A1F',
    fontWeight: '800',
    marginBottom: 8
  },

  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },

  starIcon: {
    marginRight: 6
  },

  reviewInput: {
    minHeight: 76,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 10,
    color: '#1F2A1F'
  },

  reviewButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#25BB00',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 10,
    minWidth: 128,
    alignItems: 'center'
  },

  reviewButtonDisabled: {
    opacity: 0.7
  },

  reviewButtonText: {
    color: '#fff',
    fontWeight: '800'
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },

  detailLabel: {
    color: '#475467',
    flex: 1
  },

  detailValue: {
    color: '#1F2A1F',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1
  },

  strongText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#000'
  },

  divider: {
    height: 1,
    backgroundColor: '#E4E7EC',
    marginVertical: 8
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
