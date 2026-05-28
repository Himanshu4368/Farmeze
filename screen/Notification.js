import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import API from '../api/axios';

const Notification = ({ navigation }) => {

  const [promotions, setPromotions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // FETCH PROMOTIONS

  const fetchPromotions = async () => {

    try {

      setLoading(true);

      const response =
        await API.get('/promotions');

      console.log(
        "PROMOTIONS:",
        response.data
      );

      setPromotions(response.data);

    } catch (error) {

      console.log(
        "PROMOTION ERROR:",
        error.response?.data ||
        error.message
      );

    } finally {

      setLoading(false);
    }
  };

  // LOAD ON SCREEN OPEN

  useEffect(() => {

    fetchPromotions();

  }, []);

  // SINGLE CARD

  const renderPromotion = ({
    item
  }) => {

    return (

      <View style={styles.card}>

        {/* IMAGE */}

        {
          item.image && (

            <Image
              source={{
                uri: item.image
              }}
              style={styles.image}
            />
          )
        }

        {/* CONTENT */}

        <View style={styles.content}>

          <View style={styles.titleRow}>

            <Icon
              name="notifications"
              size={20}
              color="#25BB00"
            />

            <Text style={styles.title}>
              {item.title}
            </Text>

          </View>

          <Text style={styles.description}>
            {item.description}
          </Text>

          {
            item.discount && (

              <View style={styles.discountBadge}>

                <Text style={styles.discountText}>
                  {item.discount}% OFF
                </Text>

              </View>
            )
          }

        </View>

      </View>
    );
  };

  return (

    <View style={styles.notification}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          style={styles.backButton}
        >

          <Icon
            name="arrow-back"
            size={24}
            color="#fff"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

        <View style={{ width: 24 }} />

      </View>

      {/* LOADER */}

      {
        loading ? (

          <ActivityIndicator
            size="large"
            color="#25BB00"
            style={{ marginTop: 30 }}
          />

        ) : (

          <FlatList
            data={promotions}
            keyExtractor={(item) =>
              item._id
            }
            renderItem={renderPromotion}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={
              false
            }
            ListEmptyComponent={
              <View style={styles.emptyBox}>

                <Icon
                  name="notifications-off"
                  size={70}
                  color="#999"
                />

                <Text style={styles.emptyText}>
                  No Promotions Yet
                </Text>

              </View>
            }
          />
        )
      }

    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({

  notification: {
    flex: 1,
    backgroundColor: '#F3FAF1',
  },

  /* HEADER */

  header: {
    backgroundColor:
      'rgb(37, 187, 0)',

    paddingTop: 20,
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

  /* CARD */

  card: {
    backgroundColor: '#fff',

    borderRadius: 12,

    marginBottom: 18,

    overflow: 'hidden',

    elevation: 4,
    borderWidth: 1,
    borderColor: '#DDEFD8',
  },

  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },

  content: {
    padding: 16,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',

    marginLeft: 8,
  },

  description: {
    marginTop: 10,

    fontSize: 15,

    color: '#555',

    lineHeight: 22,
  },

  discountBadge: {
    alignSelf: 'flex-start',

    marginTop: 14,

    backgroundColor: '#FF5252',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 20,
  },

  discountText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  /* EMPTY */

  emptyBox: {
    marginTop: 120,
    alignItems: 'center',
  },

  emptyText: {
    marginTop: 15,
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },

});
