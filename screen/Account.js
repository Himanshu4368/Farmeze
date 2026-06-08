// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Modal,
//   Linking,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';


// const AccountScreen = ({ navigation }) => {
//   const menuItems = [
//     { icon: 'person', title: 'Account Details', navigateTo: 'AccountDetailsScreen' },
//     { icon: 'heart', title: 'Favourites', navigateTo: 'FavoritesScreen' },
//     { icon: 'information-circle', title: 'About Us', navigateTo: 'AboutUs' },
//     { icon: 'log-out', title: 'Logout/(SignIn/SignUp)', navigateTo:"LoginScreen" },
//   ];

//   const [mainModalVisible, setMainModalVisible] = useState(false);
//   const [userModalVisible, setUserModalVisible] = useState(false);
//   const [contactModalVisible, setContactModalVisible] = useState(false);

//   // 📞 CALL FUNCTION
//   const handleCall = (number) => {
//     Linking.openURL(`tel:${number}`);
//   };

//   return (
//     <View style={styles.container}>

//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>

//         <Text style={styles.headerText}>Account</Text>

//         {/* CONTACT BUTTON */}
//         <TouchableOpacity
//           style={styles.contactButton}
//           onPress={() => setContactModalVisible(true)}
//         >
//           <Icon name="call" size={16} color="#fff" />
//           <Text style={styles.contactText}>Contact Us</Text>
//         </TouchableOpacity>
//       </View>

//       {/* MENU */}
//       <ScrollView contentContainerStyle={styles.menu}>
//         {menuItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() => {
//               if (item.title === 'Logout/(SignIn/SignUp)') {
//                 setMainModalVisible(true);
//               } else {
//                 navigation.navigate(item.navigateTo);
//               }
//             }}
//           >
//             <Icon name={item.icon} size={20} color="#38C71C" />
//             <Text style={styles.menuText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* CONTACT MODAL (NEW UI) */}
//       <Modal transparent visible={contactModalVisible} animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.contactModal}>
//             <Text style={styles.modalTitle}>Contact Us</Text>

//             <TouchableOpacity
//               style={styles.contactItem}
//               onPress={() => handleCall('7033279285')}
//             >
//               <Icon name="call" size={20} color="#38C71C" />
//               <Text style={styles.contactNumber}>7033279285</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.contactItem}
//               onPress={() => handleCall('7017027163')}
//             >
//               <Icon name="call" size={20} color="#38C71C" />
//               <Text style={styles.contactNumber}>7017027163</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => setContactModalVisible(false)}
//             >
//               <Text style={styles.cancelText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//     </View>
//   );
// };

// export default AccountScreen;

// /* STYLES */
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D6F9C5',
//   },

//   header: {
//     backgroundColor: '#38C71C',
//     paddingVertical: 18,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   headerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },

//   contactButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 10,
//     paddingVertical: 13,
//     borderRadius: 20,
//   },

//   contactText: {
//     color: '#fff',
//     marginLeft: 5,
//     fontSize: 12,
//     fontWeight: 'bold'
//   },

//   menu: {
//     padding: 20,
//   },

//   menuItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 6,
//     elevation: 2,
//   },

//   menuText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   /* CONTACT MODAL */
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   contactModal: {
//     width: '85%',
//     backgroundColor: '#f0fdf4',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//   },

//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     marginBottom: 20,
//   },

//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     width: '100%',
//     marginBottom: 10,
//   },

//   contactNumber: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#333',
//   },

//   cancelBtn: {
//     marginTop: 10,
//     padding: 10,
//   },

//   cancelText: {
//     color: '#38C71C',
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({ navigation }) => {

  const menuItems = [
    {
      icon: 'person',
      title: 'Account Details',
      navigateTo: 'AccountDetailsScreen',
    },

    {
      icon: 'receipt',
      title: 'My Orders',
      navigateTo: 'MyOrders',
    },

    {
      icon: 'language',
      title: 'Language',
      navigateTo: 'LanguageSettings',
    },

    {
      icon: 'information-circle',
      title: 'About Us',
      navigateTo: 'AboutUs',
    },

    {
      icon: 'log-in',
      title: 'Login / Signup',
      navigateTo: 'LoginScreen',
    },
  ];

  const [contactModalVisible, setContactModalVisible] =
    useState(false);

  // CALL FUNCTION

  const handleCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (

    <View style={styles.container}>

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

        <Text style={styles.headerText}>
          Account
        </Text>

        {/* CONTACT BUTTON */}

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() =>
            setContactModalVisible(true)
          }
        >

          <Icon
            name="call"
            size={16}
            color="#fff"
          />

          <Text style={styles.contactText}>
            Contact Us
          </Text>

        </TouchableOpacity>

      </View>

      {/* MENU */}

      <ScrollView
        contentContainerStyle={styles.menu}
      >

        {menuItems.map((item, index) => (

          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() =>
              navigation.navigate(
                item.navigateTo
              )
            }
          >

            <Icon
              name={item.icon}
              size={20}
              color="#38C71C"
            />

            <Text style={styles.menuText}>
              {item.title}
            </Text>

          </TouchableOpacity>

        ))}

      </ScrollView>

      {/* CONTACT MODAL */}

      <Modal
        transparent
        visible={contactModalVisible}
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.contactModal}>

            <Text style={styles.modalTitle}>
              Contact Us
            </Text>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                handleCall('7033279285')
              }
            >

              <Icon
                name="call"
                size={20}
                color="#38C71C"
              />

              <Text style={styles.contactNumber}>
                7033279285
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactItem}
              onPress={() =>
                handleCall('7017027163')
              }
            >

              <Icon
                name="call"
                size={20}
                color="#38C71C"
              />

              <Text style={styles.contactNumber}>
                7017027163
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                setContactModalVisible(false)
              }
            >

              <Text style={styles.cancelText}>
                Close
              </Text>

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
    backgroundColor: '#F3FAF1',
  },

  header: {
    backgroundColor: '#25BB00',
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 20,
  },

  contactText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },

  menu: {
    padding: 20,
  },

  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#DDEFD8',
  },

  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#1F2A1F',
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactModal: {
    width: '85%',
    backgroundColor: '#f0fdf4',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
  },

  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },

  contactNumber: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },

  cancelBtn: {
    marginTop: 10,
    padding: 10,
  },

  cancelText: {
    color: '#38C71C',
    fontWeight: 'bold',
  },
});
export default AccountScreen;
