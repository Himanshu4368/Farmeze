import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({ navigation }) => {
  const menuItems = [
    { icon: 'person', title: 'Account Details', navigateTo: 'AccountDetails' },
    { icon: 'heart', title: 'Favourites', navigateTo: 'FavouritesScreen' },
    // { icon: 'location', title: 'Location', navigateTo: 'Location' },
    { icon: 'log-out', title: 'Logout/(SignIn/SignUp)', navigateTo: 'AuthScreen' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.navigateTo)}
          >
            <Icon name={item.icon} size={20} color="green" />
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
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
});

export default AccountScreen;
