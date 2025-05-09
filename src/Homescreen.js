// // Homescreen.js
// import React from 'react';
// import { View, ScrollView, StyleSheet } from 'react-native';
// import Header from './Header'; // Import the Header component
// import FreshnessCard from './FreshnessCard';
// import Categories from './Categories';
// import Popular from './Popular';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// const Homescreen = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       {/* Header with navigation passed */}
//       <Header navigation={navigation} />

//       {/* Scrollable Content */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         <FreshnessCard />
//         <Categories />
//         <Popular  navigation={navigation}/>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgb(200, 230, 200)',
//   },
//   scrollContainer: {
//     paddingBottom: 20, // Add padding to avoid content getting cut off
//   },
// });

// export default Homescreen;
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './Header';
import FreshnessCard from './FreshnessCard';
import Categories from './Categories';
import Popular from './Popular';

const Homescreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <FreshnessCard />
        <Categories />
        <Popular navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 230, 200)',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});

export default Homescreen;
