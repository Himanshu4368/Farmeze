import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser } from '../../api/authApi';

const LoginScreen = ({ navigation }) => {

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    // VALIDATION

    if (!phone.trim() || !password.trim()) {

      Alert.alert(
        'Error',
        'Please enter all fields'
      );

      return;
    }

    try {

      setLoading(true);

      console.log('Trying Login...');

      // LOGIN API CALL

      const data = await loginUser({
        phone: phone.trim(),
        password: password.trim(),
      });

      console.log(
        'LOGIN SUCCESS:',
        data
      );

      // SAVE JWT TOKEN

      if (data.token) {

        await AsyncStorage.setItem(
          'token',
          data.token
        );

        console.log('Token Saved');
      }

      // SAVE USER DATA

      if (data.user) {

        await AsyncStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        console.log('User Saved');
      }

      // SUCCESS ALERT

      Alert.alert(
        'Success',
        'Login Successful'
      );

      // NAVIGATE TO HOME

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });

    } catch (error) {

      console.log(
        'LOGIN ERROR:',
        error.response?.data || error.message
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

      Alert.alert(
        'Login Failed',
        message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#33cc33"
        barStyle="light-content"
      />

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >

          <Icon
            name="arrow-back"
            size={24}
            color="white"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Login
        </Text>

        <View style={{ width: 24 }} />

      </View>

      {/* FORM */}

      <View style={styles.formContainer}>

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>
          Password
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >

          {
            loading ? (

              <ActivityIndicator color="#fff" />

            ) : (

              <Text style={styles.buttonText}>
                Login
              </Text>
            )
          }

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SignupScreen')
          }
        >

          <Text style={styles.linkText}>
            Don't have an account? Sign Up
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3FAF1',
  },

  header: {
    backgroundColor: '#25BB00',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#DDEFD8',
  },

  label: {
    fontSize: 16,
    color: '#344054',
    marginBottom: 8,
    fontWeight: '600',
  },

  input: {
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    color: '#1F2A1F',
  },

  button: {
    backgroundColor: '#25BB00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  linkText: {
    color: '#1F7A35',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default LoginScreen;
