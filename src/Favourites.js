
// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// // import { useFavourites } from '../context/FavouritesContext'; // ✅

// const FavoritesScreen = ({ navigation }) => {
//   const { favourites, removeFromFavourites } = useFavourites(); // ✅

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Image
//         source={typeof item.image === 'string' ? { uri: item.image } : item.image}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <View style={styles.cardContent}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromFavourites(item.id)}>
//           <Text style={styles.removeText}>Remove</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Icon name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Your Favorites</Text>
//       </View>

//       {favourites.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>You haven’t added any favorites yet.</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={favourites}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           contentContainerStyle={{ padding: 16 }}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eef7ef',
//   },
//   header: {
//     backgroundColor: 'rgb(37, 187, 0)',
//     paddingTop: 50,
//     paddingBottom: 15,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   backButton: {
//     paddingRight: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: '600',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 16,
//     color: '#888',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     elevation: 3,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   cardContent: {
//     flex: 1,
//     padding: 12,
//     justifyContent: 'space-between',
//   },
//   itemName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   removeBtn: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#f44336',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   removeText: {
//     color: 'white',
//     fontSize: 13,
//     fontWeight: '500',
//   },
// });

// export default FavoritesScreen;
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
    backgroundColor: '#eef7ef',
  },
  header: {
    backgroundColor: 'rgb(37, 187, 0)',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  removeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default FavoritesScreen;
