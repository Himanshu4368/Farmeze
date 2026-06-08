import React, {
  useCallback,
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';

import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useCart
} from '../screen/Homescreen/CartContext';

import {
  createOrder
} from '../api/orderApi';
import {
  getUserProfile
} from '../api/authApi';

const CURRENCY = '\u20B9';

const getItemImage = (item) => {
  if (!item?.image) {
    return null;
  }

  return typeof item.image === 'string'
    ? item.image
    : null;
};

const getImageSource = (image) => {
  if (image) {
    return typeof image === 'string'
      ? { uri: image }
      : image;
  }

  return require('../assets/potato.jpeg');
};

const Checkout = () => {

  const route = useRoute();
  const navigation = useNavigation();

  const { clearCart } = useCart();

  const {
    items = [],
    total = 0
  } = route.params || {};

  const deliveryCharge = 0;

  const [paymentMethod, setPaymentMethod] =
    useState('COD');

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [editingAddress, setEditingAddress] =
    useState(false);

  const [appliedPromotion, setAppliedPromotion] =
    useState(null);

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    email: '',
    line1: '',
    city: ''
  });

  const buildProfileAddress = (profile) => ({
    name:
      profile.name || '',
    phone:
      profile.phone || '',
    email:
      profile.email || '',
    line1:
      profile.address ||
      [profile.address1, profile.address2]
        .filter(Boolean)
        .join(', '),
    city:
      [
        profile.city,
        profile.state,
        profile.pincode ||
        profile.pinCode
      ]
        .filter(Boolean)
        .join(', ')
  });

  const loadProfileAddress = useCallback(async () => {
    try {
      const storedUser =
        await AsyncStorage.getItem('user');

      if (!storedUser) {
        return;
      }

      const parsed =
        JSON.parse(storedUser);

      const userId =
        parsed.id || parsed._id;
      const isMongoId =
        /^[a-f\d]{24}$/i.test(String(userId || ''));

      const profile =
        isMongoId
          ? await getUserProfile(userId)
          : parsed;

      await AsyncStorage.setItem('user', JSON.stringify(profile));
      setAddress(buildProfileAddress(profile));
    } catch (error) {
      console.log(
        'PROFILE ADDRESS ERROR:',
        error.response?.data ||
        error.message
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfileAddress();
    }, [loadProfileAddress])
  );

  useEffect(() => {
    if (route.params?.selectedPromotion) {
      setAppliedPromotion(route.params.selectedPromotion);
    }
  }, [route.params?.selectedPromotion]);

  const calculateDiscount = (promotion) => {
    if (!promotion) {
      return 0;
    }

    if (total < Number(promotion.minOrderAmount || 0)) {
      return 0;
    }

    const rawDiscount =
      promotion.discountType === 'percentage'
        ? Math.round(total * Number(promotion.discountValue || 0) / 100)
        : Number(promotion.discountValue || 0);

    const cappedDiscount =
      promotion.maxDiscountAmount
        ? Math.min(rawDiscount, Number(promotion.maxDiscountAmount))
        : rawDiscount;

    return Math.min(cappedDiscount, total);
  };

  const discount = calculateDiscount(appliedPromotion);

  const grandTotal =
    Math.max(
      total + deliveryCharge - discount,
      0
    );

  const removePromo = () => {
    setAppliedPromotion(null);
  };

  const openDiscounts = () => {
    navigation.navigate(
      'DiscountPromotions',
      {
        items,
        total,
        selectedCode:
          appliedPromotion?.code
      }
    );
  };

  const buildOrderPayload =
    (method) => ({

      customerName:
        address.name.trim(),

      customerPhone:
        address.phone.trim(),

      customerEmail:
        address.email || 'customer@farmeze.local',

      deliveryAddress:
        address.line1.trim(),

      city:
        address.city.trim(),

      paymentMedium:
        method.toLowerCase(),

      paymentStatus:
        method === 'COD'
          ? 'unpaid'
          : 'paid',

      subtotal:
        total,

      discountAmount:
        discount,

      deliveryFee:
        deliveryCharge,

      totalAmount:
        grandTotal,

      promoCode:
        appliedPromotion?.code || undefined,

      items:
        items.map(
          (item) => ({

            productId:
              item.id ||
              item._id,

            productName:
              item.name,

            quantity:
              Number(item.quantity) || 1,

            price:
              Number(item.pricePerKg) || 0,

            image:
              getItemImage(item)

          })
        )

    });

  const submitOrder =
    async (method) => {

      if (placingOrder) {
        return;
      }

      try {

        setPlacingOrder(true);

        const response =
          await createOrder(
            buildOrderPayload(method)
          );

        handleSuccessNavigation(response);

      } catch (error) {

        Alert.alert(
          'Order Failed',
          error.response?.data?.message ||
          'Failed to place order'
        );

      } finally {

        setPlacingOrder(false);

      }

    };

  const handleSuccessNavigation = (createdOrder) => {

    try {

      clearCart();

      setShowSuccess(true);

      setTimeout(() => {

        setShowSuccess(false);

        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainTabs',
              state: {
                routes: [
                  {
                    name: 'Order',
                    params: {
                      latestOrderId: createdOrder?._id
                    }
                  }
                ]
              }
            }
          ]
        });

      }, 2500);

    } catch (error) {

      Alert.alert(
        'Error',
        'Something went wrong'
      );

    }

  };

  const handleRazorpayPayment =
    () => {

      const options = {

        description:
          'Farmeze Order Payment',

        currency: 'INR',

        key:
          'rzp_test_SlZ9QD1cFkxTig',

        amount:
          grandTotal * 100,

        name: 'Farmeze',

        prefill: {

          email:
            address.email || 'test@gmail.com',

          contact:
            address.phone,

          name:
            address.name

        },

        theme: {
          color: '#38C71C'
        }

      };

      RazorpayCheckout
        .open(options)

        .then(() => {

          submitOrder(
            paymentMethod
          );

        })

        .catch((error) => {

          Alert.alert(
            'Payment Failed',
            error.description ||
            'Please try again'
          );

        });

    };

  const handlePlaceOrder =
    () => {

      if (
        address.name === '' ||
        address.phone === '' ||
        address.line1 === '' ||
        address.city === ''
      ) {

        Alert.alert(
          'Address Missing',
          'Please fill all details'
        );

        return;

      }

      if (
        paymentMethod === 'UPI'
        ||
        paymentMethod === 'Card'
      ) {

        handleRazorpayPayment();

      }

      else {

        submitOrder(
          paymentMethod
        );

      }

    };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >

          <Icon
            name='arrow-back'
            size={25}
            color='white'
          />

        </TouchableOpacity>

        <Text
          style={styles.headerText}
        >
          Checkout
        </Text>

        <View style={{ width: 25 }} />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.card}>

          <View
            style={styles.rowBetween}
          >

            <Text
              style={styles.cardTitle}
            >
              Delivery Address
            </Text>

            <TouchableOpacity
              onPress={() =>
                setEditingAddress(
                  !editingAddress
                )
              }
            >

              <Text
                style={styles.change}
              >
                {editingAddress ? 'Save' : 'Edit'}
              </Text>

            </TouchableOpacity>

          </View>

          {
            editingAddress ?

              <>

                <TextInput
                  style={styles.input}
                  placeholder='Name'
                  placeholderTextColor="#666"
                  value={address.name}
                  onChangeText={(text) =>
                    setAddress({
                      ...address,
                      name: text
                    })
                  }
                />

                <TextInput
                  style={styles.input}
                  placeholder='Phone'
                  placeholderTextColor="#666"
                  keyboardType='phone-pad'
                  value={address.phone}
                  onChangeText={(text) =>
                    setAddress({
                      ...address,
                      phone: text
                    })
                  }
                />

                <TextInput
                  style={styles.input}
                  placeholder='Address'
                  placeholderTextColor="#666"
                  value={address.line1}
                  onChangeText={(text) =>
                    setAddress({
                      ...address,
                      line1: text
                    })
                  }
                />

                <TextInput
                  style={styles.input}
                  placeholder='City'
                  placeholderTextColor="#666"
                  value={address.city}
                  onChangeText={(text) =>
                    setAddress({
                      ...address,
                      city: text
                    })
                  }
                />

              </>

              :

              <>

                <Text style={styles.textBlack}>
                  {address.name}
                </Text>

                <Text style={styles.textBlack}>
                  {address.phone}
                </Text>

                <Text style={styles.textBlack}>
                  {address.line1}
                </Text>

                <Text style={styles.textBlack}>
                  {address.city}
                </Text>

              </>

          }

        </View>

        <View style={styles.card}>

          <Text
            style={styles.cardTitle}
          >
            Order Summary
          </Text>

          {
            items.map(
              (item, index) => (

                <View
                  key={index}
                  style={styles.productRow}
                >

                  <Image
                    source={getImageSource(item.image)}
                    style={styles.image}
                  />

                  <View style={{ flex: 1 }}>

                    <Text style={styles.textBlack}>
                      {item.name}
                    </Text>

                    <Text style={styles.textBlack}>
                      {item.quantity}
                      {' x '}
                      {CURRENCY}
                      {item.pricePerKg}
                    </Text>

                  </View>

                  <Text style={styles.textBlack}>
                    {CURRENCY}
                    {item.quantity * item.pricePerKg}
                  </Text>

                </View>

              )
            )
          }

        </View>

        <TouchableOpacity
          style={styles.discountCard}
          activeOpacity={0.85}
          onPress={openDiscounts}
        >

          <View style={styles.discountIcon}>
            <Icon
              name="pricetag-outline"
              size={22}
              color="#1F7A35"
            />
          </View>

          <View style={styles.discountInfo}>
            <Text style={styles.discountTitle}>
              Discounts & Offers
            </Text>

            <Text style={styles.discountSubtitle}>
              {
                appliedPromotion
                  ? `${appliedPromotion.code || 'Offer'} applied, saved ${CURRENCY}${discount}`
                  : 'View available offers'
              }
            </Text>
          </View>

          {
            appliedPromotion ? (
              <TouchableOpacity
                onPress={removePromo}
              >
                <Text style={styles.removePromo}>
                  Remove
                </Text>
              </TouchableOpacity>
            ) : (
              <Icon
                name="chevron-forward"
                size={22}
                color="#98A2B3"
              />
            )
          }

        </TouchableOpacity>

        {
          appliedPromotion && (
            <TouchableOpacity
              style={styles.changeOfferRow}
              activeOpacity={0.85}
              onPress={openDiscounts}
            >
              <Text style={styles.changeOfferText}>
                Change offer
              </Text>
            </TouchableOpacity>
          )
        }

        <View style={styles.card}>

          <Text
            style={styles.cardTitle}
          >
            Payment Method
          </Text>

          {
            ['COD', 'UPI', 'Card']
              .map(
                (method) => (

                  <TouchableOpacity

                    key={method}

                    style={[

                      styles.payment,

                      paymentMethod ===
                      method
                      &&
                      styles.selected

                    ]}

                    onPress={() =>
                      setPaymentMethod(
                        method
                      )
                    }
                  >

                    <Text style={styles.paymentText}>

                      {
                        method === 'COD'
                        &&
                        'Cash On Delivery'
                      }

                      {
                        method === 'UPI'
                        &&
                        'UPI / Razorpay'
                      }

                      {
                        method === 'Card'
                        &&
                        'Card / Razorpay'
                      }

                    </Text>

                  </TouchableOpacity>

                )
              )
          }

        </View>

        <View style={styles.card}>

          <View style={styles.rowBetween}>

            <Text style={styles.summaryText}>
              Items Total
            </Text>

            <Text style={styles.summaryText}>
              {CURRENCY}{total}
            </Text>

          </View>

          {
            discount > 0 && (
              <View style={styles.rowBetween}>

                <Text style={styles.summaryText}>
                  Discount
                </Text>

                <Text style={styles.discountText}>
                  -{CURRENCY}{discount}
                </Text>

              </View>
            )
          }

          <View
            style={styles.divider}
          />

          <View style={styles.rowBetween}>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: "#000"
              }}
            >
              Grand Total
            </Text>

            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                color: "#000"
              }}
            >
              {CURRENCY}{grandTotal}
            </Text>

          </View>

        </View>

      </ScrollView>

      <View style={styles.footer}>

        <TouchableOpacity
          style={[
            styles.orderBtn,
            placingOrder &&
            styles.orderBtnDisabled
          ]}
          onPress={
            handlePlaceOrder
          }
          disabled={placingOrder}
        >

          <Text
            style={styles.orderText}
          >

            {
              placingOrder
                ? 'Placing Order...'
                : `Place Order ${CURRENCY}${grandTotal}`
            }

          </Text>

        </TouchableOpacity>

      </View>

      <Modal
        visible={showSuccess}
        transparent
        animationType='fade'
      >

        <View
          style={styles.modal}
        >

          <View
            style={styles.successBox}
          >

            <Icon
              name='checkmark-circle'
              size={90}
              color='#38C71C'
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 15,
                color: "#000"
              }}
            >
              Order Placed Successfully
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                color: '#777',
                textAlign: 'center'
              }}
            >
              Your fresh farm products will be delivered soon
            </Text>

          </View>

        </View>

      </Modal>

    </View>

  );

};

export default Checkout;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3FAF1'
  },

  header: {
    backgroundColor: '#25BB00',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },

  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8'
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#1F7A35'
  },

  change: {
    color: '#38C71C',
    fontWeight: 'bold'
  },

  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    color: '#000',
    backgroundColor: '#FFFFFF'
  },

  textBlack: {
    color: "#000"
  },

  paymentText: {
    color: "#000",
    fontSize: 15
  },

  summaryText: {
    color: "#000"
  },

  discountText: {
    color: '#1F7A35',
    fontWeight: '700'
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },

  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10
  },

  discountCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    flexDirection: 'row',
    alignItems: 'center'
  },

  discountIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F6E2',
    marginRight: 12
  },

  discountInfo: {
    flex: 1,
  },

  discountTitle: {
    color: '#1F2A1F',
    fontSize: 16,
    fontWeight: '800'
  },

  discountSubtitle: {
    color: '#667085',
    marginTop: 3
  },

  changeOfferRow: {
    marginHorizontal: 15,
    marginTop: -5,
    marginBottom: 15,
    alignItems: 'flex-end'
  },

  changeOfferText: {
    color: '#1F7A35',
    fontWeight: '800'
  },

  removePromo: {
    color: '#B42318',
    fontWeight: '700',
    marginLeft: 10
  },

  payment: {
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E4E7EC'
  },

  selected: {
    backgroundColor: '#E7F6E2',
    borderColor: '#25BB00'
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10
  },

  footer: {
    padding: 15
  },

  orderBtn: {
    backgroundColor: '#38C71C',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center'
  },

  orderBtnDisabled: {
    opacity: 0.7
  },

  orderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },

  successBox: {
    backgroundColor: '#fff',
    paddingVertical: 35,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    elevation: 10
  }

});
