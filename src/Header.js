// import React, { useState, useEffect } from 'react';
// import { 
//   View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid, Platform 
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Header = ({ navigation }) => {
//   const [location, setLocation] = useState('Fetching...');

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: "Location Access Required",
//             message: "This app needs to access your location.",
//             buttonPositive: "OK"
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     } else {
//       return true; // iOS automatically asks permission
//     }
//   };

//   const getLocation = async () => {
//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       Alert.alert("Permission Denied", "Location access is required.");
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
//       },
//       (error) => {
//         Alert.alert("Error", "Failed to fetch location. Try again.");
//         console.log(error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   return (
//     <View style={styles.headerContainer}>
//       {/* Location Button */}
//       <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
//         <Text style={styles.locationText}>Location </Text>
//         <Icon name="map-marker" size={15} color="white" />
//       </TouchableOpacity>
//       <Text style={styles.cityText}>{location}</Text>
//         {/* Notification Icon */}
//         <TouchableOpacity style={styles.iconButton}>
//         <Icon name="bell" size={25} color="white" />
//       </TouchableOpacity>
//       {/* Profile Icon - Navigate to Account */}
//       <TouchableOpacity
//         style={[styles.iconButton, { right: 15 }]}
//         onPress={() => navigation.navigate('Account')}
//       >
//         <Icon name="user" size={25} color="white" />
//       </TouchableOpacity>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Veggies"
//           placeholderTextColor="grey"
//         />
//         <TouchableOpacity style={styles.searchIcon}>
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
//     flexDirection: 'row',
//     backgroundColor: '#86DA7E',
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     alignItems: 'center',
//   },
//   locationText: {
//     color: 'white',
//     fontWeight: 'bold',
//     marginRight: 5,
//   },
//   cityText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 5,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     width: '100%',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     alignItems: 'center',
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
// });

// export default Header;
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid, Platform
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation }) => {
  const [location, setLocation] = useState('Fetching...');
  const [searchText, setSearchText] = useState('');

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This app needs to access your location.",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("Permission Denied", "Location access is required.");
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
      },
      (error) => {
        Alert.alert("Error", "Failed to fetch location. Try again.");
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      Alert.alert('Search is empty', 'Please enter something to search.');
      return;
    }
    navigation.navigate('Veggies', { query: searchText.trim() });
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.locationButton} onPress={getLocation}>
        <Text style={styles.locationText}>Location </Text>
        <Icon name="map-marker" size={15} color="white" />
      </TouchableOpacity>
      <Text style={styles.cityText}>{location}</Text>

      <TouchableOpacity style={styles.iconButton}>
        <Icon name="bell" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconButton, { right: 15 }]}
        onPress={() => navigation.navigate('Account')}
      >
        <Icon name="user" size={25} color="white" />
      </TouchableOpacity>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Veggies"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
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
    flexDirection: 'row',
    backgroundColor: '#86DA7E',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  cityText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
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
});

export default Header;
