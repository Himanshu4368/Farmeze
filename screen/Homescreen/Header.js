// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   PermissionsAndroid,
//   Platform,
//   Alert,
// } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Header = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const [locationText, setLocationText] = useState('Fetching Location...');

//   useEffect(() => {
//     getLocation(); // Auto-fetch on load
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission',
//           message: 'This app needs access to your location.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn('Permission error:', err);
//       return false;
//     }
//   };

//   const getLocation = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const hasPermission = await requestLocationPermission();
//         if (!hasPermission) {
//           setLocationText('Permission Denied');
//           return;
//         }
//       }

//       Geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log('Coordinates:', latitude, longitude);

//           const apiKey = '9277e0c924ad4bc6865b76b8f9b88b34'; 
//           const response = await fetch(
//             `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
//           );

//           const data = await response.json();
//           console.log('OpenCage API response:', data);

//           if (!data.results || data.results.length === 0) {
//             setLocationText('Location Unavailable');
//             return;
//           }

//           const components = data.results[0].components;
//           const locality =
//             components.suburb ||
//             components.neighbourhood ||
//             components.road ||
//             '';

//           const city =
//             components.city || components.town || components.village || '';

//           const state = components.state || '';

//           const finalText = [locality, city, state].filter(Boolean).join(', ');

//           setLocationText(finalText || 'Location Unavailable');
//         },
//         (error) => {
//           console.warn('Location error:', error);
//           Alert.alert('Location Error', error.message);
//           setLocationText('Location Error');
//         },
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     } catch (err) {
//       console.warn('Location fetch failed:', err);
//       setLocationText('Error Fetching Location');
//     }
//   };

//   return (
//     <View style={styles.headerContainer}>
//       {/* Notification Icon */}
//       <TouchableOpacity
//         style={styles.iconButton}
//         onPress={() => navigation.navigate('NotificationsScreen')}
//       >
//         <Icon name="bell" size={25} color="white" />
//       </TouchableOpacity>

//       {/* Profile Icon */}
//       <TouchableOpacity
//         style={styles.profileIcon}
//         onPress={() => navigation.navigate('Account')}
//       >
//         <Icon name="user" size={25} color="white" />
//       </TouchableOpacity>

//       {/* Location Display */}
//       <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
//         <View style={styles.locationRow}>
//           <Icon name="map-marker" size={16} color="white" style={{ marginRight: 5 }} />
//           <Text style={styles.locationText}>{locationText}</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Veggies"
//           placeholderTextColor="grey"
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//         <TouchableOpacity
//           style={styles.searchIcon}
//           onPress={() =>
//             navigation.navigate('VeggieResults', { query: searchText })
//           }
//         >
//           <Icon name="search" size={20} color="grey" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: '#25BB00',
//     paddingTop: 60,
//     paddingBottom: 20,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   locationButton: {
//     backgroundColor: '#86DA7E',
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginBottom: 10,
//   },
//   locationRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   locationText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     width: '100%',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     color: '#333',
//   },
//   searchIcon: {
//     marginLeft: 10,
//   },
//   iconButton: {
//     position: 'absolute',
//     left: 15,
//     top: 35,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileIcon: {
//     position: 'absolute',
//     right: 15,
//     top: 35,
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Header;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  InteractionManager,
  Alert,
} from 'react-native';
import CommunityGeolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProducts } from '../../api/productApi';

const OPENCAGE_API_KEY = '9277e0c924ad4bc6865b76b8f9b88b34';

const formatAddressParts = (...parts) =>
  parts
    .filter(Boolean)
    .map((part) => String(part).trim())
    .filter(Boolean)
    .join(', ');

const isVegetableProduct = (item) =>
  item?.category?.toLowerCase().startsWith('veg');

const normalizeSearchText = (value) =>
  String(value || '').trim().toLowerCase();

const toProductDescriptionParam = (item) => ({
  _id: item?._id,
  id: item?._id || item?.id,
  name: item?.name,
  image: item?.imageUrl,
  price: `Rs.${item?.price || 0}/Kg`,
  pricePerKg: item?.price,
  description: item?.description,
  rating: item?.rating || 4.5,
});

const Header = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('Tap to fetch location');
  const [isSearching, setIsSearching] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // 🔑 Ask Location Permission
  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const fineLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Farmeze needs your location to deliver fresh vegetables.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );

    if (fineLocation === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    const coarseLocation = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Approximate Location Permission',
        message: 'Farmeze can use approximate location if GPS is unavailable.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel',
      }
    );

    return coarseLocation === PermissionsAndroid.RESULTS.GRANTED;
  };

  // 📍 Fetch Live Location
  const getCurrentPosition = () =>
    new Promise((resolve, reject) => {
      CommunityGeolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 12000,
        maximumAge: 10 * 60 * 1000,
      });
    });

  const setSafeLocationText = useCallback((text) => {
    if (isMountedRef.current) {
      setLocationText(text);
    }
  }, []);

  const reverseGeocodeWithOpenCage = useCallback(async (latitude, longitude) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const query = `${latitude},${longitude}`;
    const url =
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}` +
      `&key=${OPENCAGE_API_KEY}&no_annotations=1`;

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`Reverse geocode failed: ${response.status}`);
      }

      const data = await response.json();
      const components = data.results?.[0]?.components || {};

      const area =
        components.suburb ||
        components.neighbourhood ||
        components.road ||
        '';

      const city =
        components.city ||
        components.town ||
        components.village ||
        '';

      const state = components.state || '';

      return formatAddressParts(area, city, state);
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  const reverseGeocodeWithBigDataCloud = useCallback(async (latitude, longitude) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const url =
      'https://api.bigdatacloud.net/data/reverse-geocode-client' +
      `?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(`Fallback geocode failed: ${response.status}`);
      }

      const data = await response.json();

      return formatAddressParts(
        data.locality,
        data.city,
        data.principalSubdivision,
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const openCageAddress = await reverseGeocodeWithOpenCage(
        latitude,
        longitude,
      );

      if (openCageAddress) {
        return openCageAddress;
      }
    } catch (openCageError) {
      console.log('OpenCage geocode error:', openCageError);
    }

    return reverseGeocodeWithBigDataCloud(latitude, longitude);
  }, [reverseGeocodeWithBigDataCloud, reverseGeocodeWithOpenCage]);

  const getLocation = useCallback(async () => {
    try {
      setSafeLocationText('Finding location...');

      const hasPermission = await requestPermission();

      if (!hasPermission) {
        setSafeLocationText('Location permission needed');
        return;
      }

      const position = await getCurrentPosition();

      const { latitude, longitude } = position.coords;
      let finalAddress = '';

      try {
        finalAddress = await reverseGeocode(latitude, longitude);
      } catch (geocodeError) {
        console.log('Reverse geocode error:', geocodeError);
      }

      setSafeLocationText(
        finalAddress ||
          'Tap to retry location'
      );
    } catch (error) {
      console.log('Location error:', error);
      setSafeLocationText('Tap to retry location');
    }
  }, [reverseGeocode, setSafeLocationText]);

  const handleSearch = useCallback(async () => {
    const query = normalizeSearchText(searchText);

    if (!query || isSearching) {
      return;
    }

    try {
      setIsSearching(true);

      const products = await getProducts();
      const vegetables = Array.isArray(products)
        ? products.filter(isVegetableProduct)
        : [];

      const matchedProduct =
        vegetables.find(
          (item) => normalizeSearchText(item?.name) === query,
        ) ||
        vegetables.find((item) =>
          normalizeSearchText(item?.name).includes(query),
        );

      if (matchedProduct) {
        navigation.navigate('ProductDescription', {
          vegetable: toProductDescriptionParam(matchedProduct),
        });
        return;
      }

      Alert.alert(
        'No vegetable found',
        `No product matched "${searchText.trim()}".`,
      );
    } catch (error) {
      console.log('Search failed:', error);
      Alert.alert('Search Error', 'Unable to search products right now.');
    } finally {
      setIsSearching(false);
    }
  }, [isSearching, navigation, searchText]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      getLocation();
    });

    return () => {
      task.cancel?.();
    };
  }, [getLocation]);

  return (
    <View style={styles.header}>
      {/* Notification */}
      <TouchableOpacity
        style={styles.leftIcon}
        onPress={() => navigation.navigate('NotificationsScreen')}
      >
        <Icon name="bell" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.rightIcon}
        onPress={() => navigation.navigate('Account')}
      >
        <Icon name="user" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Location */}
      <TouchableOpacity style={styles.locationBox} onPress={getLocation}>
        <Icon name="map-marker" size={16} color="#fff" />
        <Text style={styles.locationText} numberOfLines={1}>
          {locationText}
        </Text>
      </TouchableOpacity>

      {/* Search */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search vegetables"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          onPress={handleSearch}
          disabled={isSearching}
        >
          <Icon name="search" size={18} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#25BB00',
    paddingTop: 60,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  locationBox: {
    flexDirection: 'row',
    backgroundColor: '#1F7A35',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
    maxWidth: '78%',
  },
  locationText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 13,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDEFD8',
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: '#1F2A1F',
    fontSize: 15,
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  rightIcon: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
});
