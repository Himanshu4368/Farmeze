import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const veggiesData = [
  { id: '1', name: 'Potato', type: 'Sugar Free', price: 'Rs.30/Kg', image: require('../../assets/potato.jpeg'), tag: 'SUGAR-FREE' },
  { id: '2', name: 'Onion', type: '', price: 'Rs.100/Kg', image: require('../../assets/onion.jpeg') },
  { id: '3', name: 'Potato', type: 'Normal Sugar', price: 'Rs.20/Kg', image: require('../../assets/potato.jpeg') },
  { id: '4', name: 'Potato', type: 'Sugar Free - Red', price: 'Rs.30/Kg', image: require('../../assets/potato.jpeg'), tag: 'SUGAR-FREE' },
  { id: '5', name: 'Potato', type: 'Normal Sugar - Red', price: 'Rs.40/Kg', image: require('../../assets/potato.jpeg') },
  { id: '6', name: 'Potato', type: 'Farmeze Round', price: 'Rs.35/Kg', image: require('../../assets/potato.jpeg') }
];

const Veggies = ({ navigation, route }) => {
  const query = route?.params?.query?.toLowerCase() || '';
  const [filteredData, setFilteredData] = useState(veggiesData);

  useEffect(() => {
    if (query) {
      const filtered = veggiesData.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        (item.tag && item.tag.toLowerCase().includes(query))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(veggiesData);
    }
  }, [query]);

  const handleNavigateToProduct = (item) => {
    navigation.navigate('ProductDescription', { vegetable: item });
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
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigateToProduct(item)} style={styles.card}>
              <Image source={item.image} style={styles.image} />
              {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
              <Text style={styles.name}>{item.name}</Text>
              {item.type ? <Text style={styles.type}>({item.type})</Text> : null}
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.discount}>10% OFF</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No vegetables found for "{query}"</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 230, 200)',
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
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 5
  },
  image: { width: 80, height: 80, resizeMode: 'contain' },
  tag: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 5
  },
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  type: { fontSize: 12, color: '#666', textAlign: 'center' },
  price: { fontSize: 14, fontWeight: 'bold', marginVertical: 5 },
  discount: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
  resultText: { textAlign: 'center', fontSize: 14, marginBottom: 5, color: '#333' },
  noResults: { textAlign: 'center', fontSize: 16, color: 'red', marginTop: 30 }
});

export default Veggies;
