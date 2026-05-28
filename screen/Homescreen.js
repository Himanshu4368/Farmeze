import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from './Homescreen/Header';
import FreshnessCard from './Homescreen/FreshnessCard';
import Categories from './Homescreen/Categories';
import Popular from './Homescreen/Popular';
import OurFarmers from './Homescreen/OurFarmers';
import { getFeaturedProducts, getProducts } from '../api/productApi';

const Homescreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.name || 'Farmer');
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const featuredProducts = await getFeaturedProducts();

        if (featuredProducts.length > 0) {
          setProducts(featuredProducts);
          return;
        }

        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.log('Failed to load products', error);
      }
    };

    loadProducts();
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

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <FreshnessCard />
        <Categories />
        <Popular navigation={navigation} products={products} />

        {/* ✅ Added Our Farmers section */}
        <OurFarmers />
      </ScrollView>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF1',
  },
  scrollContainer: {
    paddingBottom: 30, // little extra space for smooth scroll
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3FAF1',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F7A35',
  },
});
