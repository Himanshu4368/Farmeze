// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// // Dummy Delivered Orders (unchanged)
// const deliveredOrders = [
//   {
//     id: '2',
//     name: 'Onion',
//     weight: '2Kg',
//     price: 200,
//     payment: 'Cash On Delivery',
//     status: 'Delivered',
//     image: require('../assets/onion.jpeg'),
//   },
//   {
//     id: '3',
//     name: 'Potato',
//     weight: '2Kg',
//     price: 50,
//     payment: 'UPI',
//     status: 'Delivered',
//     image: require('../assets/potato.jpeg'),
//   },
//   {
//     id: '4',
//     name: 'Onion',
//     weight: '2Kg',
//     price: 200,
//     payment: 'Cash On Delivery',
//     status: 'Delivered',
//     image: require('../assets/onion.jpeg'),
//   },
// ];

// const screenWidth = Dimensions.get('window').width;

// const OrderScreen = ({ route }) => {
//   // Receive orderItems passed from Cart screen or default to empty array
//   const orderItems = route?.params?.orderItems || [];

//   // Transform orderItems to expected data shape for rendering
//   const currentOrders = orderItems.map((item, index) => ({
//     id: item.name + index.toString(), // unique id
//     name: item.name,
//     weight: item.quantity + ' Kg', // showing quantity as weight
//     price: item.pricePerKg * item.quantity,
//     payment: 'Pending Payment', // you can update later
//     status: 'Packed', // new orders could be 'Packed'
//     image: item.image,
//   }));

//   const renderOrderItem = ({ item }) => (
//     <View style={styles.orderCard}>
//       <Image
//         source={typeof item.image === 'string' ? { uri: item.image } : item.image}
//         style={styles.orderImage}
//       />
//       <View style={styles.orderInfo}>
//         <Text style={styles.orderName}>
//           {item.name}{' '}
//           <Text style={styles.orderWeight}>{item.weight}</Text>
//         </Text>
//         <Text style={styles.orderPrice}>
//           Order Value <Text style={{ color: 'green' }}>Rs.{item.price}</Text>
//         </Text>
//         <Text style={styles.orderPayment}>{item.payment}</Text>
//         <Text style={styles.orderStatus}>
//           Status{' '}
//           <Text
//             style={
//               item.status === 'Delivered'
//                 ? styles.statusDelivered
//                 : styles.statusPacked
//             }
//           >
//             {item.status}
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Orders</Text>
//         </View>
//       </View>

//       {/* Current Orders */}
//       <Text style={styles.sectionTitle}>Current Orders</Text>
//       {currentOrders.length === 0 ? (
//         <View style={styles.noOrdersContainer}>
//           <Icon name="box" size={50} color="gray" />
//           <Text style={styles.noOrdersText}>No Current Orders</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={currentOrders}
//           renderItem={renderOrderItem}
//           keyExtractor={(item) => item.id}
//         />
//       )}

//       {/* Delivered Orders */}
//       <Text style={styles.sectionTitle}>Delivered Orders</Text>
//       <FlatList
//         data={deliveredOrders}
//         renderItem={renderOrderItem}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#D1F5C7',
//     paddingHorizontal: 15,
//   },
//   headerContainer: {
//     backgroundColor: '#25BB00',
//     marginHorizontal: -15, // Stretch beyond padding
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//   },
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 15,
//     marginBottom: 8,
//     color: '#000',
//   },
//   orderCard: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     padding: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   orderImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//     marginRight: 12,
//   },
//   orderInfo: {
//     flex: 1,
//   },
//   orderName: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orderWeight: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   orderPrice: {
//     fontSize: 14,
//     marginTop: 3,
//   },
//   orderPayment: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 2,
//   },
//   orderStatus: {
//     fontSize: 14,
//     marginTop: 5,
//   },
//   statusDelivered: {
//     fontWeight: 'bold',
//     color: 'green',
//   },
//   statusPacked: {
//     fontWeight: 'bold',
//     color: 'orange',
//   },
//   noOrdersContainer: {
//     alignItems: 'center',
//     marginTop: 40,
//     marginBottom: 20,
//   },
//   noOrdersText: {
//     fontSize: 17,
//     color: 'gray',
//     marginTop: 10,
//   },
// });

// export default OrderScreen;
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Dummy Delivered Orders
const deliveredOrders = [
  {
    id: '2',
    name: 'Onion',
    weight: '2Kg',
    price: 200,
    payment: 'Cash On Delivery',
    status: 'Delivered',
    image: require('../assets/onion.jpeg'),
  },
  {
    id: '3',
    name: 'Potato',
    weight: '2Kg',
    price: 50,
    payment: 'UPI',
    status: 'Delivered',
    image: require('../assets/potato.jpeg'),
  },
  {
    id: '4',
    name: 'Onion',
    weight: '2Kg',
    price: 200,
    payment: 'Cash On Delivery',
    status: 'Delivered',
    image: require('../assets/onion.jpeg'),
  },
];

const OrderScreen = ({ route, navigation }) => {
  const orderItems = route?.params?.orderItems || [];

  const currentOrders = orderItems.map((item, index) => ({
    id: item.name + index.toString(),
    name: item.name,
    weight: item.quantity + ' Kg',
    price: item.pricePerKg * item.quantity,
    payment: 'Pending Payment',
    status: 'Packed',
    image: item.image,
  }));

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.orderImage}
      />

      <View style={styles.orderInfo}>
        <Text style={styles.orderName}>
          {item.name}{' '}
          <Text style={styles.orderWeight}>{item.weight}</Text>
        </Text>

        <Text style={styles.orderPrice}>
          Order Value <Text style={{ color: 'green' }}>Rs.{item.price}</Text>
        </Text>

        <Text style={styles.orderPayment}>{item.payment}</Text>

        <Text style={styles.orderStatus}>
          Status{' '}
          <Text
            style={
              item.status === 'Delivered'
                ? styles.statusDelivered
                : styles.statusPacked
            }
          >
            {item.status}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Orders</Text>

        <View style={{ width: 28 }} />
      </View>

      {/* Current Orders */}
      <Text style={styles.sectionTitle}>Current Orders</Text>

      {currentOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Icon name="box" size={50} color="gray" />
          <Text style={styles.noOrdersText}>No Current Orders</Text>
        </View>
      ) : (
        <FlatList
          data={currentOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Delivered Orders */}
      <Text style={styles.sectionTitle}>Delivered Orders</Text>

      <FlatList
        data={deliveredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1F5C7',
    paddingHorizontal: 15,
  },

  headerContainer: {
    backgroundColor: '#25BB00',
    marginHorizontal: -15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backBtn: {
    width: 28,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#000',
  },

  orderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  orderImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },

  orderInfo: {
    flex: 1,
  },

  orderName: {
    fontSize: 16,
    fontWeight: '600',
  },

  orderWeight: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },

  orderPrice: {
    fontSize: 14,
    marginTop: 3,
  },

  orderPayment: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },

  orderStatus: {
    fontSize: 14,
    marginTop: 5,
  },

  statusDelivered: {
    fontWeight: 'bold',
    color: 'green',
  },

  statusPacked: {
    fontWeight: 'bold',
    color: 'orange',
  },

  noOrdersContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },

  noOrdersText: {
    fontSize: 17,
    color: 'gray',
    marginTop: 10,
  },
});