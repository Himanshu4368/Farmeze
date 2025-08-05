import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [locationText, setLocationText] = useState('Fetching Location...');

  useEffect(() => {
    getLocation(); // Auto-fetch on load
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const getLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setLocationText('Permission Denied');
          return;
        }
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Coordinates:', latitude, longitude);

          const apiKey = '9277e0c924ad4bc6865b76b8f9b88b34'; // Replace with your key
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );

          const data = await response.json();
          console.log('OpenCage API response:', data);

          if (!data.results || data.results.length === 0) {
            setLocationText('Location Unavailable');
            return;
          }

          const components = data.results[0].components;
          const locality =
            components.suburb ||
            components.neighbourhood ||
            components.road ||
            '';

          const city =
            components.city || components.town || components.village || '';

          const state = components.state || '';

          const finalText = [locality, city, state].filter(Boolean).join(', ');

          setLocationText(finalText || 'Location Unavailable');
        },
        (error) => {
          console.warn('Location error:', error);
          Alert.alert('Location Error', error.message);
          setLocationText('Location Error');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.warn('Location fetch failed:', err);
      setLocationText('Error Fetching Location');
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Notification Icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.navigate('NotificationsScreen')}
      >
        <Icon name="bell" size={25} color="white" />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('Account')}
      >
        <Icon name="user" size={25} color="white" />
      </TouchableOpacity>

      {/* Location Display */}
      <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
        <View style={styles.locationRow}>
          <Icon name="map-marker" size={16} color="white" style={{ marginRight: 5 }} />
          <Text style={styles.locationText}>{locationText}</Text>
        </View>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Veggies"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() =>
            navigation.navigate('VeggieResults', { query: searchText })
          }
        >
          <Icon name="search" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#25BB00',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: '#86DA7E',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 10,
  },
  iconButton: {
    position: 'absolute',
    left: 15,
    top: 35,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    position: 'absolute',
    right: 15,
    top: 35,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
