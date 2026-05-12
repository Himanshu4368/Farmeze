
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

// ✅ local default image
import defaultBanner from "../../assets/default-banner.jpg";

const { width } = Dimensions.get("window");

// ✅ fallback banner
const DEFAULT_BANNERS = [
  {
    id: "default-1",
    imageUrl: null,
    localImage: defaultBanner,
  },
];

const FreshnessCard = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef();

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % banners.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, banners]);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://YOUR_IP:5000/api/content");

      const activeBanners = res.data.filter(
        (item) => item.type === "banner" && item.isActive
      );

      // ✅ fallback if empty
      if (activeBanners.length === 0) {
        setBanners(DEFAULT_BANNERS);
      } else {
        setBanners(activeBanners);
      }
    } catch (err) {
      console.log("Error:", err);

      // ✅ fallback if API fails
      setBanners(DEFAULT_BANNERS);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={
          item.localImage
            ? item.localImage
            : { uri: item.imageUrl }
        }
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#38C71C" />
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
  keyExtractor={(item, index) => item.id || index.toString()}
  renderItem={renderItem}
  style={{ backgroundColor: "transparent" }}
  contentContainerStyle={{ paddingHorizontal: 8 }}
  onMomentumScrollEnd={(e) => {
    const index = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setCurrentIndex(index);
  }}
/>

    {/* dots */}
    <View style={styles.dotsContainer}>
      {banners.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index && styles.activeDot,
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

  // 🔥 outer container (adds spacing like pro apps)
  container: {
    marginTop: 10,
  },

  // 🔥 card styling
  card: {
    width: width,
    paddingHorizontal: 12,
  },

  // 🔥 image styling (MAIN FIX)
  image: {
    width: "100%",
    height: width * 0.5,   // ✅ perfect professional ratio
    borderRadius: 18,      // ✅ smooth rounded corners
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 6,
  },

  dot: {
    width: 2,
    height: 2,
    borderRadius: 3,
    backgroundColor: "#0a0101",
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: "#38C71C",
    width: 8,
    height: 8,
  },
});