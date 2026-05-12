import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const AccountDetailsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        const parsed = JSON.parse(userData);
        setUser(parsed);

        if (parsed.profileImage) {
          setProfileImage(parsed.profileImage);
        }
      }
    };

    loadUser();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const handleEditPicture = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets?.length
      ) {
        const imageUri = response.assets[0].uri;
        setProfileImage(imageUri);
      }
    });
  };

  const handleSave = async () => {
    const updatedUser = { ...user, profileImage };
    setUser(updatedUser);

    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

    Alert.alert('Success', 'Profile updated locally');
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('LoginScreen');
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Loading user details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#38C71C" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Account Details</Text>

        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Profile Section */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: profileImage
                ? profileImage
                : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            }}
            style={styles.profilePicture}
          />

          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={handleEditPicture}
          >
            <Ionicons name="camera" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(text) =>
              setUser({ ...user, name: text })
            }
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>PHONE</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            keyboardType="phone-pad"
            onChangeText={(text) =>
              setUser({ ...user, phone: text })
            }
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AccountDetailsScreen;

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f4c5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#38C71C',
    paddingHorizontal: 15,
    paddingVertical: 15,
    elevation: 5,
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  saveButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },

  scrollContainer: {
    padding: 20,
  },

  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 3,
  },

  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#38C71C',
    padding: 6,
    borderRadius: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    color: '#555',
    fontWeight: '600',
    marginBottom: 5,
  },

  input: {
    height: 48,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  logoutButton: {
    backgroundColor: '#38C71C',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});