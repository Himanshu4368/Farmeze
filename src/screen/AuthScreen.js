import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const AuthScreen = ({ isLogin = true }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    const endpoint = isLogin ? 'signin' : 'signup';
    const response = await fetch(`http://192.168.1.12:3000/user/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Sign in' : 'Sign Up'}</Text>

      <View style={styles.box}>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Sign in' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  box: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '90%', alignItems: 'center', elevation: 5 },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, color: 'black' },
  button: { backgroundColor: 'green', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AuthScreen;
