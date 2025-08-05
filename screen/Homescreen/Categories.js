import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // ✅ IMPORT THIS

const Categories = () => {
  const navigation = useNavigation(); // ✅ HOOK TO ACCESS NAVIGATION

  return (
    <View style={styles.container}>
      {/* Categories Title */}
      <Text style={styles.title}>Categories</Text>

      {/* Horizontal ScrollView for Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>

        {/* ✅ Veggies Category with navigation */}
        <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('Veggies')}>
          <View style={styles.iconContainer}>
            <Icon name="spa" size={30} color="white" />
          </View>
          <Text style={styles.categoryText}>Veggies</Text>
        </TouchableOpacity>

        {/* Fruits Category (no nav yet) */}
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconContainer}>
            <Icon name="apple" size={30} color="white" />
          </View>
          <Text style={styles.categoryText}>Fruits</Text>
        </TouchableOpacity>

        {/* Others Category */}
        <TouchableOpacity style={styles.categoryItem}>
          <View style={styles.iconContainer}>
            <Icon name="category" size={30} color="white" />
          </View>
          <Text style={styles.categoryText}>Others</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  scrollView: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  iconContainer: {
    width: 87,
    height: 87,
    borderRadius: 60,
    backgroundColor: '#00C400',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: 'white',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default Categories;
