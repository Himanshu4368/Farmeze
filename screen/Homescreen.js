import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Homescreen/Header';
import FreshnessCard from './Homescreen/FreshnessCard';
import Categories from './Homescreen/Categories';
import Popular from './Homescreen/Popular';

const Homescreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || 'Farmer');
          setUserPhone(user.phone || '');
        }
      } catch (error) {
        console.log('Failed to load user data', error);
      }
    };

    loadUserData();

    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showWelcome) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {userName} 👋</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {/* Removed permanent greeting here */}

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <FreshnessCard />
        <Categories />
        <Popular navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 230, 200)',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1fbe1',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#388e3c',
  },
});
