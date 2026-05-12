import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

/* 🔥 Dummy Data (replace later with backend) */
const dummyFarmers = [
  { id: "1", name: "Farmer Name", location: "City, State" },
  { id: "2", name: "Farmer Name", location: "City, State" },
  { id: "3", name: "Farmer Name", location: "City, State" },
  { id: "4", name: "Farmer Name", location: "City, State" },
  { id: "5", name: "Farmer Name", location: "City, State" },
  { id: "6", name: "Farmer Name", location: "City, State" },
];

const OurFarmers = ({ data = dummyFarmers, onPressCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  /* 🔁 Auto Scroll */
  useEffect(() => {
    if (data.length === 0) return;

    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % data.length;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, data]);

  /* 🧑‍🌾 Render Item */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPressCard && onPressCard(item)}
    >
      {/* 🔲 Blank Image */}
      <View style={styles.imagePlaceholder} />

      {/* 👤 Name */}
      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      {/* 📍 Location */}
      <Text style={styles.location} numberOfLines={1}>
        {item.location}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔥 Title */}
      <Text style={styles.title}>Our Farm-preneurs</Text>

      {/* 🟢 Slider */}
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingLeft: 15 }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / 130
          );
          setCurrentIndex(index);
        }}
      />

      {/* 🔵 Pagination */}
      <View style={styles.pagination}>
        {data.map((_, index) => (
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

export default OurFarmers;

/* 🎨 Styles */
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
    color: "#222",
  },

  card: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
  },

  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor:"#38C71C",
    borderWidth: 2,
    backgroundColor: "#E0E0E0",

    // shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,

    marginBottom: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },

  location: {
    fontSize: 12,
    color: "#2E7D32",
    textAlign: "center",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#38C71C",
    width: 8,
    height: 8,
  },
});