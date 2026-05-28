import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function OrderPlacedScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate icon scale from 0 to 1 (zoom in)
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 90,
    }).start();

    // After 5 seconds, navigate to OrdersScreen and reset the stack
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OrdersScreen' }],
      });
    }, 5000);

    // Clear timeout if component unmounts early
    return () => clearTimeout(timeout);
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Icon name="checkmark-circle" size={110} color="#38C71C" />
      </Animated.View>
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Your order was successful.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3FAF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    backgroundColor: '#fff',
    borderRadius: 90,
    padding: 24,
    marginBottom: 40,
    elevation: 7,
  },
  title: {
    color: '#1F7A35',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#475467',
  },
});
