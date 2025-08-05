import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FreshnessCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Freshness{"\n"}Made{"\n"}Easy</Text>
      <Text style={styles.subtitle}>Fresh veggies directly from farm</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#00C400',
    borderRadius: 45,
    marginTop: 20,
    marginLeft: 18,
    borderWidth: 9,
    borderColor: 'white',
    padding: 30,
    width: 380, // Fixed from string to number
    height: 250,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FreshnessCard;
