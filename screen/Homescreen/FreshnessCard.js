import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

import defaultBanner from "../../assets/default-banner.jpg";

const { width } = Dimensions.get("window");

const API_URL =
  "https://farmeze-backend-4.onrender.com/api/content";

const DEFAULT_BANNERS = [
  {
    _id: "default-1",
    image: null,
    localImage: defaultBanner,
  },
];

const FreshnessCard = () => {

  const [banners, setBanners] =
    useState(DEFAULT_BANNERS);

  const [loading, setLoading] =
    useState(true);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const flatListRef = useRef(null);

  // FETCH BANNERS

  const fetchBanners = async () => {

    try {

      const response =
        await axios.get(API_URL);

      console.log(
        "BANNERS:",
        response.data
      );

      // FILTER ONLY ACTIVE BANNERS

      const activeBanners =
        response.data.filter(
          (item) =>
            item.type === "banner" &&
            item.isActive
        );

      if (activeBanners.length > 0) {

        setBanners(activeBanners);

      } else {

        setBanners(DEFAULT_BANNERS);
      }

    } catch (error) {

      console.log(
        "BANNER ERROR:",
        error.response?.data ||
        error.message
      );

      setBanners(DEFAULT_BANNERS);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBanners();

  }, []);

  // AUTO SLIDER

  useEffect(() => {

    if (banners.length <= 1) return;

    const interval = setInterval(() => {

      const nextIndex =
        (currentIndex + 1) %
        banners.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);

    }, 3000);

    return () => clearInterval(interval);

  }, [currentIndex, banners]);

  // RENDER ITEM

  const renderItem = ({ item }) => {

    // BACKEND IMAGE FIELD

    const imageSource =
      item.image
        ? { uri: item.image }
        : item.imageUrl
        ? { uri: item.imageUrl }
        : item.localImage;

    return (

      <View style={styles.card}>

        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />

      </View>
    );
  };

  // LOADER

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#38C71C"
        />

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <FlatList
        ref={flatListRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) =>
          item._id
            ? item._id.toString()
            : index.toString()
        }
        renderItem={renderItem}
        onMomentumScrollEnd={(e) => {

          const index = Math.round(
            e.nativeEvent.contentOffset.x /
            width
          );

          setCurrentIndex(index);
        }}
      />

      {/* DOTS */}

      <View style={styles.dotsContainer}>

        {banners.map((_, index) => (

          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index &&
                styles.activeDot,
            ]}
          />

        ))}

      </View>

    </View>
  );
};

export default FreshnessCard;

const styles = StyleSheet.create({

  loader: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    marginTop: 10,
  },

  card: {
    width: width,
    paddingHorizontal: 12,
  },

  image: {
    width: "100%",
    height: width * 0.5,
    borderRadius: 18,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#999",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#38C71C",
    width: 10,
    height: 10,
  },
});