// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const AccountScreen = ({ navigation }) => {
//   const menuItems = [
//     { icon: 'person', title: 'Account Details', navigateTo: 'AccountDetailsScreen' },
//     { icon: 'heart', title: 'Favourites', navigateTo: 'FavoritesScreen' },
//     { icon: 'information-circle', title: 'About Us', navigateTo: 'AboutUs' },
//     { icon: 'log-out', title: 'Logout/(SignIn/SignUp)', navigateTo: 'AuthScreen' },
//   ];

//   const [modalVisible, setModalVisible] = useState(false);

//   const handleLogoutPress = () => {
//     setModalVisible(true);
//   };

//   const handleNavigate = (screen) => {
//     setModalVisible(false);
//     navigation.navigate(screen);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}
//         >
//           <Icon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>

//         <Text style={styles.headerText}>Account</Text>

//         {/* Empty view to balance center alignment */}
//         <View style={{ width: 24 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.menu}>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() => {
//               if (item.title === 'Logout/(SignIn/SignUp)') {
//                 handleLogoutPress();
//               } else {
//                 navigation.navigate(item.navigateTo);
//               }
//             }}
//           >
//             <Icon name={item.icon} size={20} color="green" />
//             <Text style={styles.menuText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Custom Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Register as</Text>
//             <Text style={styles.modalSubtitle}>Choose account type:</Text>

//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => handleNavigate('AuthScreen')}
//             >
//               <Text style={styles.modalButtonText}>User</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => handleNavigate('FarmerApplication')}
//             >
//               <Text style={styles.modalButtonText}>Farmer</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.modalButton, { backgroundColor: '#ccc' }]}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={[styles.modalButtonText, { color: '#333' }]}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
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
//   backButton: {
//     width: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   menu: {
//     padding: 20,
//   },
//   menuItem: {
//     backgroundColor: 'white',
//     padding: 15,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//     elevation: 3,
//   },
//   menuText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: '#f0fdf4',
//     borderRadius: 15,
//     padding: 20,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 5,
//   },
//   modalSubtitle: {
//     fontSize: 14,
//     color: '#4caf50',
//     marginBottom: 20,
//   },
//   modalButton: {
//     backgroundColor: '#33cc33',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginVertical: 5,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default AccountScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({ navigation }) => {
  const menuItems = [
    { icon: 'person', title: 'Account Details', navigateTo: 'AccountDetailsScreen' },
    { icon: 'heart', title: 'Favourites', navigateTo: 'FavoritesScreen' },
    { icon: 'information-circle', title: 'About Us', navigateTo: 'AboutUs' },
    { icon: 'log-out', title: 'Logout/(SignIn/SignUp)', navigateTo: null },
  ];

  const [mainModalVisible, setMainModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);

  const handleLogoutPress = () => {
    setMainModalVisible(true);
  };

  const handleUserPress = () => {
    setMainModalVisible(false);
    setUserModalVisible(true);
  };

  const navigateToScreen = (screen) => {
    setUserModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Menu */}
      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === 'Logout/(SignIn/SignUp)') {
                handleLogoutPress();
              } else {
                navigation.navigate(item.navigateTo);
              }
            }}
          >
            <Icon name={item.icon} size={20} color="green" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal 1: Choose Role */}
      <Modal
        transparent={true}
        visible={mainModalVisible}
        animationType="fade"
        onRequestClose={() => setMainModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Register as</Text>
            <Text style={styles.modalSubtitle}>Choose account type:</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleUserPress}>
              <Text style={styles.modalButtonText}>User</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setMainModalVisible(false);
                navigation.navigate('FarmerApplication');
              }}
            >
              <Text style={styles.modalButtonText}>Farmer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setMainModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal 2: User - Login or Signup */}
      <Modal
        transparent={true}
        visible={userModalVisible}
        animationType="fade"
        onRequestClose={() => setUserModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Continue as User</Text>
            <Text style={styles.modalSubtitle}>Choose an option:</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToScreen('LoginScreen')}
            >
              <Text style={styles.modalButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToScreen('SignupScreen')}
            >
              <Text style={styles.modalButtonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#ccc' }]}
              onPress={() => setUserModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  backButton: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 3,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#f0fdf4',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#4caf50',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#33cc33',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountScreen;
