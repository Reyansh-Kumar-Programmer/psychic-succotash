import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

export default function SignInScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Top Image */}
      <ImageBackground
        source={require("../assets/bg.png")}
        style={styles.topImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      {/* Bottom content */}
      <View style={styles.content}>
        <Ionicons
          name="bulb"
          size={100}
          color="white"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.title}>TutorXpert</Text>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => navigation.navigate("Plan")}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <Text style={[styles.buttonText, { color: "#000" }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Continue with SSO</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Privacy policy</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerText}>Terms of service</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  topImage: {
    width: "100%",
    height: height * 0.75, // top 35% of screen
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    padding: 25,
    justifyContent: "flex-end", // anchor content to bottom
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 50,
    backgroundColor: "#212124",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#ccc",
    fontSize: 13,
    marginHorizontal: 6,
  },
  footerDot: {
    color: "#ccc",
    fontSize: 13,
  },
});
