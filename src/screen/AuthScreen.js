// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

// const AuthScreen = ({ isLogin = true }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleAuth = async () => {
//     const endpoint = isLogin ? 'signin' : 'signup';
//     const response = await fetch(`http://192.168.1.12:3000/user/${endpoint}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isLogin ? 'Sign in' : 'Sign Up'}</Text>

//       <View style={styles.box}>
//         {!isLogin && (
//           <TextInput
//             style={styles.input}
//             placeholder="Your Name"
//             placeholderTextColor="#666"
//             value={name}
//             onChangeText={setName}
//           />
//         )}
//         <TextInput
//           style={styles.input}
//           placeholder="Email address"
//           placeholderTextColor="#666"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#666"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         <TouchableOpacity style={styles.button} onPress={handleAuth}>
//           <Text style={styles.buttonText}>{isLogin ? 'Sign in' : 'Sign Up'}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' },
//   title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 10 },
//   box: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '90%', alignItems: 'center', elevation: 5 },
//   input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, color: 'black' },
//   button: { backgroundColor: 'green', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
//   buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
// });

// export default AuthScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
 
const BASE_URL = 'http://192.168.1.12:3000'; // Make sure this IP is your local server IP

const AuthScreen = ({ isLogin = true }) => {
  const [step, setStep] = useState(1); // 1: enter phone & name, 2: enter OTP
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

  const handleRequestOtp = async () => {
    if (!phone || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const endpoint = isLogin ? 'loginRequestOtp' : 'signupRequestOtp';
    const body = isLogin ? { phone } : { phone, name };

    try {
      const response = await fetch(`${BASE_URL}/user/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
        setStep(2);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !phone) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/verifyOtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        Alert.alert('Success', 'Logged in successfully!');
        // Save token to asyncStorage if needed
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'OTP verification failed');
    }
  };

  return (
    <View style={styles.container}>
     
  <TouchableOpacity style={styles.backIcon}  onPress={() => navigation.goBack()}>
  <Icon name="arrow-back" size={24} color="white" />
</TouchableOpacity>

      <Text style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Text>

      <View style={styles.box}>
        {step === 1 ? (
          <>
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
              placeholder="Phone Number"
              placeholderTextColor="#666"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.button} onPress={handleRequestOtp}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#25BB00' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  box: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '90%', alignItems: 'center', elevation: 5 },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, color: 'black' },
  button: { backgroundColor: '#25BB00', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backButton: {
  position: 'absolute',
  top: 50,
  right: 20,
  padding: 10,
  zIndex: 1,
},
backText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
backIcon: {
  position: 'absolute',
  top: 50,
  left: 20,
  padding: 10,
  zIndex: 1,
},


});

export default AuthScreen;
