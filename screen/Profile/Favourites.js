import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoritesScreen = ({ navigation, route }) => {
const { favourites = [], removeFromFavourites = () => {} } = route.params || {};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromFavourites(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Favorites</Text>
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven’t added any favorites yet.</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
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
    backgroundColor: '#25BB00',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    padding: 6,
    zIndex: 10,
  },

  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 24,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    marginHorizontal: 12,
    overflow: 'hidden',
    elevation: 4,
    borderWidth: 1,
    borderColor: '#DDEFD8',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: 110,
    height: 110,
  },

  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },

  removeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  removeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default FavoritesScreen;
