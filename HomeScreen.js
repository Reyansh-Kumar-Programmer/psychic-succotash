import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(40)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* ─── Background Image ───────────────────────── */}
      <ImageBackground
        source={require("../assets/bg-lines.png")} // use the new geometric dark image
        style={styles.bgImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["#0e0e0e", "transparent", "#0e0e0e"]}
          style={styles.fadeOverlay}
        />

        {/* ─── Top Navbar ───────────────────────────── */}
        <Animated.View
          style={[
            styles.topBar,
            { opacity: fadeAnim, transform: [{ translateY: slideUp }] },
          ]}
        >
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.appName}>MindraAi</Text>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* ─── Center Text with faded corners ───────── */}
        <Animated.View
          style={[
            styles.centerContent,
            { opacity: fadeAnim, transform: [{ translateY: slideUp }] },
          ]}
        >
          <View style={styles.fadedBackdrop}>
              <Text style={styles.slogan}>
                Where{"\n"}knowledge{"\n"}begins
              </Text>
          </View>
        </Animated.View>

        {/* ─── Bottom Input ─────────────────────────── */}
        <Animated.View
          style={[
            styles.inputContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideUp }] },
          ]}
        >
          <Ionicons name="scan-outline" size={25} color="#aaa" />
          <TextInput
            placeholder="Ask anything..."
            placeholderTextColor="#888"
            style={styles.input}
            onFocus={() => navigation.navigate("Chat")}
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={28} color="#aaa" />
          </TouchableOpacity>
        </Animated.View>
      </ImageBackground>

      {/* ─── Bottom Nav ───────────────────────────── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search" size={24} color="#fff" />
          <Text style={styles.navLabel}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="globe-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="sparkles-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Spark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="wifi-outline" size={24} color="#fff" />
          <Text style={styles.navLabel}>Network</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e0e",
  },
  bgImage: {
    flex: 1,
    justifyContent: "space-between",
  },
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
  },

  // ─── Top Bar ───────────────────────────────
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  appName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  // ─── Center Text Area ─────────────────────
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fadedBackdrop: {
    borderRadius: 30,
    overflow: "hidden",
  },
  fadedCorners: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  slogan: {
    color: "#dcdcdc",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 34,
    fontFamily: "serif",
  },

  // ─── Input Bar ────────────────────────────
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b1b1b",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },

  // ─── Bottom Navbar ───────────────────────
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: "#1a1a1a",
    borderTopWidth: 0.5,
    borderTopColor: "#333",
  },
  navButton: {
    alignItems: "center",
  },
  navLabel: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 3,
  },
});
