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
import { useClerk } from '@clerk/expo';
import { useSignIn } from '@clerk/expo/legacy';
import {
  getClerkErrorMessage,
  normalizePhoneForClerk,
} from '../../config/clerk';

const LoginScreen = ({ navigation }) => {

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  const handleLogin = async () => {

    // VALIDATION

    if (!identifier.trim() || !password.trim()) {

      Alert.alert(
        'Error',
        'Please enter all fields'
      );

      return;
    }

    try {

      setLoading(true);

      if (!isLoaded) {
        Alert.alert('Please wait', 'Clerk is still loading');
        return;
      }

      try {
        await signOut();
      } catch {
        // No active Clerk session to clear.
      }

      await AsyncStorage.clear();

      const loginIdentifier =
        identifier.includes('@')
          ? identifier.trim().toLowerCase()
          : normalizePhoneForClerk(identifier);

      const signInAttempt = await signIn.create({
        identifier: loginIdentifier,
        password: password.trim(),
      });

      if (signInAttempt.status !== 'complete') {
        Alert.alert(
          'Login Pending',
          'Please complete the remaining Clerk verification'
        );
        return;
      }

      await setActive({
        session: signInAttempt.createdSessionId,
      });

      await AsyncStorage.setItem(
        'token',
        signInAttempt.createdSessionId || ''
      );

      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          id: signInAttempt.createdUserId,
          _id: signInAttempt.createdUserId,
          email: identifier.includes('@') ? loginIdentifier : '',
          phone: identifier.includes('@') ? '' : loginIdentifier,
        })
      );

      Alert.alert('Success', 'Login Successful');

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
        getClerkErrorMessage(error, 'Something went wrong');

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
          Email or Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email or phone number"
          keyboardType="email-address"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
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
