// src/SearchResults.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchResults = ({ route }) => {
  const { query } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You searched for: {query}</Text>
      {/* Add product fetching / filtering logic here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default SearchResults;
