import { View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

const Splashscreen = () => {
  const navigation = useNavigation(); // ✅ Fix: Added useNavigation

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1500);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#00FF00',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Splashscreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Splashscreen;
