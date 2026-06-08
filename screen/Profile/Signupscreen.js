// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const SignupScreen = ({ navigation }) => {
//   const [phone, setPhone] = useState('');
//   const [name, setName] = useState('');

//  const handleSignup = async () => {
//   if (!phone || !name) {
//     Alert.alert('Error', 'Please enter both name and phone number');
//     return;
//   }

//   try {
//     const response = await fetch('http://10.10.214.213:5000/signup/request-otp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ phone, name }),
//     });

//     const data = await response.json();

//     if (response.ok) {
// //   Alert.alert('Success', `OTP sent to ${phone}`);
//   navigation.navigate('OtpVerificationScreen', { phone });
// }
// else {
//       console.log("Signup error response:", data);
//       Alert.alert('Signup Failed', data.error || 'Unknown error occurred');
//     }
//   } catch (error) {
//     console.error("Network request error:", error);
//     Alert.alert('Network error', 'Please make sure you are connected to the same Wi-Fi as the server.');
//   }
// };
// ;


//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#33cc33" barStyle="light-content" />

//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Sign Up</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={setName}
//           autoCapitalize="words"
//         />

//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           keyboardType="phone-pad"
//           value={phone}
//           onChangeText={setPhone}
//         />

//         <TouchableOpacity style={styles.button} onPress={handleSignup}>
//           <Text style={styles.buttonText}>Send OTP</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.linkText}>Already have an account? Log in</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#d4f4c5',
//   },
//   header: {
//     backgroundColor: '#33cc33',
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   formContainer: {
//     backgroundColor: '#fff',
//     margin: 20,
//     padding: 20,
//     borderRadius: 15,
//     elevation: 5,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 8,
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#33cc33',
//     borderRadius: 10,
//     padding: 12,
//     backgroundColor: '#f9fff9',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#33cc33',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   linkText: {
//     color: '#33cc33',
//     textAlign: 'center',
//     fontWeight: '600',
//   },
// });

// export default SignupScreen;
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
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useClerk } from '@clerk/expo';
import { useSignUp } from '@clerk/expo/legacy';
import { signupUser } from '../../api/authApi';
import {
  getClerkErrorMessage,
} from '../../config/clerk';

const SignupScreen = ({ navigation }) => {

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');

  const [code, setCode] = useState('');

  const [needsVerification, setNeedsVerification] = useState(false);

  const [address1, setAddress1] = useState('');

  const [address2, setAddress2] = useState('');

  const [city, setCity] = useState('');

  const [pinCode, setPinCode] = useState('');

  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signOut } = useClerk();

  const syncBackendUser = async (clerkId) => {
    const payload = {
      clerkId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      address1: address1.trim(),
      address2: address2.trim(),
      city: city.trim(),
      pinCode: pinCode.trim(),
    };

    try {
      const data = await signupUser(payload);

      await AsyncStorage.setItem(
        'user',
        JSON.stringify(data.user || data || payload)
      );
    } catch (error) {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          id: clerkId,
          _id: clerkId,
          ...payload,
        })
      );

      console.log(
        'BACKEND SIGNUP SYNC ERROR:',
        error.response?.data || error.message
      );
    }
  };

  const handleSignup = async () => {

    if (!email.trim() || !password.trim()) {

      Alert.alert(
        'Error',
        'Please enter email and password'
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

      await signUp.create({
        emailAddress: email.trim().toLowerCase(),
        password: password.trim(),
        firstName: name.trim().split(/\s+/)[0] || undefined,
        lastName: name.trim().split(/\s+/).slice(1).join(' ') || undefined,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setNeedsVerification(true);

      Alert.alert(
        'Verify email',
        'Enter the verification code sent to your email'
      );

    } catch (error) {

      console.log(
        'SIGNUP ERROR:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Signup Failed',
        getClerkErrorMessage(error, 'Something went wrong')
      );

    } finally {

      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      Alert.alert('Error', 'Please enter verification code');
      return;
    }

    try {
      setLoading(true);

      if (!isLoaded) {
        Alert.alert('Please wait', 'Clerk is still loading');
        return;
      }

      const completeSignUp =
        await signUp.attemptEmailAddressVerification({
          code: code.trim(),
        });

      if (completeSignUp.status === 'complete') {
        await setActive({
          session: completeSignUp.createdSessionId,
        });

        await AsyncStorage.setItem(
          'token',
          completeSignUp.createdSessionId || ''
        );

        await syncBackendUser(completeSignUp.createdUserId);

        Alert.alert('Success', 'Account Created Successfully');

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        Alert.alert(
          'Signup Pending',
          'Please complete the remaining Clerk verification'
        );
      }

    } catch (error) {

      console.log(
        'SIGNUP ERROR:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Verification Failed',
        getClerkErrorMessage(error, 'Unable to verify code')
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
          Sign Up
        </Text>

        <View style={{ width: 24 }} />

      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

      <View style={styles.formContainer}>

        <Text style={styles.label}>
          Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
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

        <Text style={styles.label}>
          Address 1
        </Text>

        <TextInput
          style={styles.input}
          placeholder="House no, street, area"
          value={address1}
          onChangeText={setAddress1}
        />

        <Text style={styles.label}>
          Address 2
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Landmark or nearby area"
          value={address2}
          onChangeText={setAddress2}
        />

        <Text style={styles.label}>
          City
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>
          Pin Code
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter pin code"
          keyboardType="number-pad"
          value={pinCode}
          onChangeText={setPinCode}
        />

        {needsVerification && (
          <>
            <Text style={styles.label}>
              Email Verification Code
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter code"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={needsVerification ? handleVerifyCode : handleSignup}
          disabled={loading}
        >

          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {needsVerification ? 'Verify Email' : 'Create Account'}
            </Text>
          )}

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LoginScreen')
          }
        >

          <Text style={styles.linkText}>
            Already have an account? Login
          </Text>

        </TouchableOpacity>

      </View>

      </ScrollView>

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

export default SignupScreen;
