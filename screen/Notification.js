// import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
// import React from 'react'

// import Icon from 'react-native-vector-icons/Ionicons';


// const Notification = () => {
//   return (
    
//    <View style={styles.notification}>
//          <View style={styles.header}>
//            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//              <Icon name="arrow-back" size={24} color="#fff" />
//            </TouchableOpacity>
//            <Text style={styles.headerTitle}>Your Favorites</Text>
//          </View>
//          </View>
   
//   )
// }

// export default Notification

// const styles = StyleSheet.create({
//   notification:{
//     backgroundColor:"rgb(200, 230, 200)",
//     flex:1
//   },
//    scrollView: {
//     flexDirection: "row",
//   },
//   header:{
//    backgroundColor: 'rgb(37, 187, 0)',
//     paddingTop: 50,
//     paddingBottom: 15,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 4,
//   },
//   headerTitle:{
//     color:"white",
    
//   }
// })
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const Notification = ({ navigation }) => {
  return (
    <View style={styles.notification}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.text}>No Notifications Yet 🔔</Text>
      </View>

    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notification: {
    flex: 1,
    backgroundColor: 'rgb(200,230,200)',
  },

  header: {
    backgroundColor: 'rgb(37, 187, 0)',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },

  backButton: {
    padding: 5,
  },

  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    color: '#444',
  },
});