import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in logo & text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    // Loop gradient shift animation (used for opacity layer, not colors prop)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ]),
    ).start();

    // Navigate to SignIn screen after 3.5s
    const timer = setTimeout(() => {
      navigation.replace("SignIn");
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Animated opacity for a moving overlay
  const overlayOpacity = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  return (
    <View style={styles.container}>
      {/* Static base gradient */}

      {/* Content */}
      <Animated.View style={[styles.center, { opacity: fadeAnim }]}>
        <Ionicons name="bulb" size={100} color="#FFFFFF" />
        <Text style={styles.title}>TutorXpert</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
    letterSpacing: 1.5,
    marginTop: 18,
  },
});
