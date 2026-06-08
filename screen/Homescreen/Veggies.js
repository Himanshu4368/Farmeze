import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getProducts } from '../../api/productApi';
import { useCart } from './CartContext';

const isVegetableProduct = (item) =>
  item?.category?.toLowerCase().startsWith('veg');

const Veggies = ({ navigation, route }) => {
  const query = route?.params?.query?.toLowerCase() || '';
  const { addToCart } = useCart();
  const [veggiesData, setVeggiesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVeggies = async () => {
      try {
        const data = await getProducts();
        const products = Array.isArray(data)
          ? data.filter(isVegetableProduct)
          : [];
        setVeggiesData(products);
        setFilteredData(products);
      } catch (error) {
        console.log('Failed to load vegetables', error);
        setVeggiesData([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    loadVeggies();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = veggiesData.filter(item =>
        item.name?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(veggiesData);
    }
  }, [query, veggiesData]);

  const handleNavigateToProduct = (item) => {
    navigation.navigate('ProductDescription', {
      vegetable: {
        _id: item._id,
        id: item._id,
        name: item.name,
        image: item.imageUrl,
        price: `Rs.${item.price || 0}/Kg`,
        pricePerKg: item.price,
        description: item.description,
      },
    });
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id || item.id,
      name: item.name,
      image: item.imageUrl,
      pricePerKg: item.price,
      quantity: 1,
    });

    navigation.navigate('MainTabs', {
      screen: 'Cart',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Veggies</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Result Header */}
      {query ? (
        <Text style={styles.resultText}>Results for "{query}"</Text>
      ) : null}

      {/* Grid View */}
      {loading ? (
        <Text style={styles.noResults}>Loading vegetables...</Text>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id || item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.88}
                style={styles.productTap}
                onPress={() => handleNavigateToProduct(item)}
              >
                <View style={styles.imageWrap}>
                  <Image
                    source={
                      item.imageUrl
                        ? { uri: item.imageUrl }
                        : require('../../assets/potato.jpeg')
                    }
                    style={styles.image}
                  />
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name || 'Vegetable'}
                  </Text>

                  <Text style={styles.type} numberOfLines={2}>
                    {item.description || item.category || 'Fresh farm produce'}
                  </Text>

                  <View style={styles.footerRow}>
                    <Text style={styles.price}>Rs.{item.price || 0}/Kg</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>Fresh</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Icon name="shopping-cart" size={16} color="#fff" />
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResults}>
          {query ? `No vegetables found for "${query}"` : 'No vegetables found'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#25BB00',
    padding: 15,
    width: '100%',
  },
  headerTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 28,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 286,
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DCEED8',
    elevation: 3
  },
  productTap: {
    height: 232,
  },
  imageWrap: {
    height: 122,
    backgroundColor: '#F4FFF0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardBody: {
    padding: 12,
    height: 110,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2A1F',
    textAlign: 'left',
    marginBottom: 5,
  },
  type: {
    height: 34,
    fontSize: 12,
    lineHeight: 17,
    color: '#687368',
    textAlign: 'left',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    height: 24,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2E7D32',
    flex: 1,
  },
  badge: {
    backgroundColor: '#E7F6E2',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    marginHorizontal: 12,
    marginBottom: 12,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#25BB00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
    color: '#333',
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2E7D32',
    marginTop: 34,
  }
});

export default Veggies;
