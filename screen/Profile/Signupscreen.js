import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

 const handleSignup = async () => {
  if (!phone || !name) {
    Alert.alert('Error', 'Please enter both name and phone number');
    return;
  }

  try {
    const response = await fetch('http://10.10.214.213:5000/signup/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name }),
    });

    const data = await response.json();

    if (response.ok) {
//   Alert.alert('Success', `OTP sent to ${phone}`);
  navigation.navigate('OtpVerificationScreen', { phone });
}
else {
      console.log("Signup error response:", data);
      Alert.alert('Signup Failed', data.error || 'Unknown error occurred');
    }
  } catch (error) {
    console.error("Network request error:", error);
    Alert.alert('Network error', 'Please make sure you are connected to the same Wi-Fi as the server.');
  }
};
;


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#33cc33" barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4f4c5',
  },
  header: {
    backgroundColor: '#33cc33',
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
    borderRadius: 15,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#33cc33',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#f9fff9',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#33cc33',
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
    color: '#33cc33',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SignupScreen;
