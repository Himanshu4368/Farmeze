import React, {
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  getPromotionByCode,
  getPromotions
} from '../api/promotionApi';

const CURRENCY = '\u20B9';

const calculateDiscount = (promotion, total) => {
  if (!promotion) {
    return 0;
  }

  if (Number(total || 0) < Number(promotion.minOrderAmount || 0)) {
    return 0;
  }

  const rawDiscount =
    promotion.discountType === 'percentage'
      ? Math.round(Number(total || 0) * Number(promotion.discountValue || 0) / 100)
      : Number(promotion.discountValue || 0);

  const cappedDiscount =
    promotion.maxDiscountAmount
      ? Math.min(rawDiscount, Number(promotion.maxDiscountAmount))
      : rawDiscount;

  return Math.min(cappedDiscount, Number(total || 0));
};

const normalizePromotion = (promotion) => ({
  ...promotion,
  code:
    promotion.code ||
    promotion.promoCode,
  discountType:
    promotion.discountType ||
    promotion.type,
  discountValue:
    promotion.discountValue ??
    promotion.value ??
    promotion.amount,
  minOrderAmount:
    promotion.minOrderAmount ??
    promotion.minimumOrderAmount ??
    0,
  maxDiscountAmount:
    promotion.maxDiscountAmount ??
    promotion.maximumDiscountAmount,
});

const formatOffer = (promotion) => {
  if (promotion.discountType === 'percentage') {
    return `${promotion.discountValue}% off`;
  }

  return `${CURRENCY}${promotion.discountValue} off`;
};

export default function DiscountPromotions({
  navigation,
  route
}) {
  const {
    items = [],
    total = 0,
    selectedCode
  } = route.params || {};

  const [promotions, setPromotions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [manualCode, setManualCode] =
    useState('');

  const [checkingCode, setCheckingCode] =
    useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response =
          await getPromotions();

        setPromotions(
          Array.isArray(response)
            ? response.map(normalizePromotion)
            : []
        );
      } catch (error) {
        Alert.alert(
          'Discounts',
          error.response?.data?.message ||
          'Unable to load discounts'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const applyPromotion = (promotion) => {
    const discount =
      calculateDiscount(promotion, total);

    if (discount <= 0) {
      Alert.alert(
        'Offer Not Applicable',
        promotion.minOrderAmount
          ? `Add items worth ${CURRENCY}${promotion.minOrderAmount} or more to use this offer`
          : 'This offer cannot be applied to the current cart'
      );
      return;
    }

    navigation.navigate(
      'Checkout',
      {
        items,
        total,
        selectedPromotion: promotion
      }
    );
  };

  const applyManualCode = async () => {
    const code = manualCode.trim();

    if (!code) {
      Alert.alert(
        'Discount Code',
        'Please enter a discount code'
      );
      return;
    }

    try {
      setCheckingCode(true);

      const promotion =
        await getPromotionByCode(code);

      applyPromotion(normalizePromotion(promotion));
    } catch (error) {
      Alert.alert(
        'Invalid Code',
        error.response?.data?.message ||
        'This discount code is not available'
      );
    } finally {
      setCheckingCode(false);
    }
  };

  const renderPromotion = ({
    item
  }) => {
    const discount =
      calculateDiscount(item, total);

    const isSelected =
      selectedCode &&
      selectedCode === item.code;

    const isApplicable =
      discount > 0;

    return (
      <TouchableOpacity
        style={[
          styles.offerCard,
          isSelected && styles.offerCardSelected,
          !isApplicable && styles.offerCardDisabled
        ]}
        activeOpacity={0.85}
        onPress={() => applyPromotion(item)}
      >
        <View style={styles.offerIcon}>
          <Icon
            name="pricetag"
            size={22}
            color="#1F7A35"
          />
        </View>

        <View style={styles.offerInfo}>
          <Text style={styles.offerTitle}>
            {item.title || item.code}
          </Text>

          <Text style={styles.offerDescription}>
            {formatOffer(item)}
            {item.maxDiscountAmount ? ` up to ${CURRENCY}${item.maxDiscountAmount}` : ''}
          </Text>

          <Text style={styles.offerMeta}>
            Code: {item.code}
            {item.minOrderAmount ? ` | Min order ${CURRENCY}${item.minOrderAmount}` : ''}
          </Text>

          {
            isApplicable ? (
              <Text style={styles.savingsText}>
                You save {CURRENCY}{discount}
              </Text>
            ) : (
              <Text style={styles.notApplicableText}>
                Not applicable on this cart
              </Text>
            )
          }
        </View>

        <Text style={styles.applyText}>
          {isSelected ? 'Applied' : 'Apply'}
        </Text>
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
          Apply Discount
        </Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.manualCard}>
        <Text style={styles.codeLabel}>
          Have a coupon code?
        </Text>

        <View style={styles.manualRow}>
          <TextInput
            style={styles.codeInput}
            placeholder="Type code from backend"
            placeholderTextColor="#667085"
            autoCapitalize="characters"
            value={manualCode}
            editable={!checkingCode}
            onChangeText={(text) =>
              setManualCode(text.toUpperCase())
            }
          />

          <TouchableOpacity
            style={[
              styles.manualApply,
              checkingCode && styles.disabledButton
            ]}
            onPress={applyManualCode}
            disabled={checkingCode}
          >
            <Text style={styles.manualApplyText}>
              {checkingCode ? 'Checking' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {
        loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color="#25BB00"
            />
          </View>
        ) : (
          <FlatList
            data={promotions}
            renderItem={renderPromotion}
            keyExtractor={(item, index) =>
              item._id || item.code || index.toString()
            }
            ListHeaderComponent={
              <Text style={styles.sectionTitle}>
                Available offers
              </Text>
            }
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>
                  No active discounts available
                </Text>
              </View>
            }
            contentContainerStyle={styles.listContent}
          />
        )
      }
    </View>
  );
}

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

  manualCard: {
    margin: 15,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    elevation: 2
  },

  codeLabel: {
    color: '#1F2A1F',
    fontWeight: '700',
    marginBottom: 10
  },

  manualRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  codeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    color: '#1F2A1F'
  },

  manualApply: {
    marginLeft: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#25BB00'
  },

  manualApplyText: {
    color: '#fff',
    fontWeight: '800'
  },

  disabledButton: {
    opacity: 0.7
  },

  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 24
  },

  sectionTitle: {
    color: '#1F7A35',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10
  },

  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    elevation: 2
  },

  offerCardSelected: {
    borderColor: '#25BB00',
    backgroundColor: '#E7F6E2'
  },

  offerCardDisabled: {
    opacity: 0.65
  },

  offerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F6E2',
    marginRight: 12
  },

  offerInfo: {
    flex: 1
  },

  offerTitle: {
    color: '#1F2A1F',
    fontWeight: '800',
    fontSize: 16
  },

  offerDescription: {
    color: '#475467',
    marginTop: 3
  },

  offerMeta: {
    color: '#667085',
    marginTop: 4,
    fontSize: 12
  },

  savingsText: {
    color: '#1F7A35',
    fontWeight: '700',
    marginTop: 6
  },

  notApplicableText: {
    color: '#B42318',
    fontWeight: '700',
    marginTop: 6
  },

  applyText: {
    color: '#25BB00',
    fontWeight: '800',
    marginLeft: 10
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  empty: {
    padding: 24,
    alignItems: 'center'
  },

  emptyText: {
    color: '#667085'
  }
});
