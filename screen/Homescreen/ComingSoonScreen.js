import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Svg, { Circle, Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

/* 🌿 REPEATING PATTERN TILE */
const PatternTile = ({ x, y }) => (
  <Svg
    height={200}
    width={200}
    style={{
      position: "absolute",
      left: x,
      top: y,
    }}
  >
    {/* 🥕 carrot */}
    <Path
      d="M30 40 L60 110"
      stroke="#2E7D32"
      strokeWidth="3"
      opacity="0.35"
    />

    {/* 🍅 tomato */}
    <Circle
      cx="140"
      cy="60"
      r="25"
      stroke="#2E7D32"
      strokeWidth="3"
      fill="none"
      opacity="0.35"
    />

    {/* 🥬 leaf */}
    <Path
      d="M40 160 C 80 110, 140 110, 180 160"
      stroke="#2E7D32"
      strokeWidth="3"
      fill="none"
      opacity="0.35"
    />

    {/* 🥒 cucumber */}
    <Path
      d="M20 120 Q 90 100 160 120"
      stroke="#2E7D32"
      strokeWidth="3"
      fill="none"
      opacity="0.35"
    />

    {/* 🧅 onion */}
    <Circle
      cx="110"
      cy="150"
      r="20"
      stroke="#2E7D32"
      strokeWidth="3"
      fill="none"
      opacity="0.35"
    />
  </Svg>
);

/* 🌿 Animated Wallpaper Background */
const VeggiePattern = () => {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(floatAnim, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const tiles = [];

  // 🔥 generate repeating grid
  for (let i = 0; i < width; i += 160) {
    for (let j = 0; j < height; j += 160) {
      tiles.push(<PatternTile key={`${i}-${j}`} x={i} y={j} />);
    }
  }

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { transform: [{ translateY }] },
      ]}
    >
      {tiles}
    </Animated.View>
  );
};

/* 🚀 MAIN SCREEN */
const ComingSoonScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#91bc89" />

      {/* 🌿 Wallpaper Pattern */}
      <VeggiePattern />

      {/* 📦 Card */}
      <View style={styles.card}>
        <Icon name="rocket-outline" size={55} color="#38C71C" />

        <Text style={styles.title}>Coming Soon</Text>

        <Text style={styles.subtitle}>
          Fresh features are on the way 🌿{"\n"}
          Stay connected with us!
        </Text>

        {/* 🔥 Animated Button */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => {
              Animated.spring(scaleAnim, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start();
            }}
            onPressOut={() => {
              Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
              }).start();

              if (navigation?.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default ComingSoonScreen;

/* 🎨 STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#91bc89", // ✅ softer green background
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 12,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginVertical: 15,
  },

  button: {
    backgroundColor: "#38C71C",
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});