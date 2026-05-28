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
        <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('ComingSoonScreen')}>
          <View style={styles.iconContainer}>
            <Icon name="apple" size={30} color="white" />
          </View>
          <Text style={styles.categoryText}>Fruits</Text>
        </TouchableOpacity>

        {/* Others Category */}
        <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('ComingSoonScreen')}>
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 15,
    color: '#1F2A1F',
  },
  scrollView: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 14,
    width: 92,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#25BB00',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 2,
  },
  categoryText: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2A1F',
    textAlign: 'center',
  },
});

export default Categories;
