import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function PlanScreen() {
  const [selected, setSelected] = useState("Free");
  const [selectedPrice, setSelectedPrice] = useState(null); // "Monthly" or "Yearly"
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const featureSets = {
    Free: [
      "Limited file and photo uploads",
      "Limited access to Mindra Research",
      "Limited access to advanced AI models",
      "Access to voice mode",
    ],
    Pro: [
      "Unlimited uploads",
      "Full access to Mindra Research",
      "Advanced AI features unlocked",
      "Voice + Document mode",
    ],
    Max: [
      "Everything in Pro",
      "Early access to new AI models",
      "Priority response time",
      "Custom AI workflows",
    ],
  };

  const currentFeatures = featureSets[selected];

  return (
    <LinearGradient
      colors={["#212124", "#000000"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY }] },
        ]}
      >
        <Ionicons name="bulb" size={80} color="#fff" style={styles.icon} />

        <Text style={styles.title}>Select your plan</Text>
        <Text style={styles.subtitle}>
          {selected === "Free"
            ? "Ask once, get trusted answers fast"
            : selected === "Pro"
              ? "Get full power with unlimited access"
              : "Unlock every capability of Mindra AI"}
        </Text>

        {/* Plan Toggle */}
        <View style={styles.planContainer}>
          {["Free", "Pro", "Max"].map((plan) => (
            <TouchableOpacity
              key={plan}
              style={[
                styles.planButton,
                selected === plan && styles.selectedButton,
              ]}
              onPress={() => {
                setSelected(plan);
                if (plan !== "Pro") setSelectedPrice(null); // Reset price for Free/Max
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.planText,
                  selected === plan && styles.selectedText,
                ]}
              >
                {plan}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <Animated.View style={{ opacity: fadeAnim }}>
          {currentFeatures.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark" size={20} color="#bbb" />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Info / Price box */}
        <Animated.View style={[styles.priceContainer, { opacity: fadeAnim }]}>
          {selected === "Max" ? (
            <View style={styles.priceBoxMax}>
              <Text style={styles.priceTitleMax}>Yearly</Text>
              <Text style={styles.priceValueMax}>₹7,999</Text>
              <Text style={styles.priceSubMax}>per year</Text>
            </View>
          ) : selected === "Pro" ? (
            ["Monthly", "Yearly"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.priceBox,
                  selectedPrice === type && styles.selectedPriceBox,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedPrice(type)}
              >
                <Text
                  style={[
                    styles.priceTitle,
                    selectedPrice === type && styles.selectedPriceText,
                  ]}
                >
                  {type}
                </Text>
                <Text
                  style={[
                    styles.priceValue,
                    selectedPrice === type && styles.selectedPriceText,
                  ]}
                >
                  {type === "Monthly" ? "₹499" : "₹4,999"}
                </Text>
                <Text
                  style={[
                    styles.priceSub,
                    selectedPrice === type && styles.selectedPriceText,
                  ]}
                >
                  {type === "Monthly" ? "per month" : "per year"}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Animated.View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Limited access</Text>
              <Text style={styles.infoDesc}>
                Free Pro searches & file uploads daily
              </Text>
            </Animated.View>
          )}
        </Animated.View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.continueText}>
            {selected === "Pro"
              ? "Upgrade to Pro"
              : selected === "Max"
                ? "Unlock Max Plan"
                : "Continue for Free"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  planContainer: {
    flexDirection: "row",
    backgroundColor: "#2a2a2a",
    borderRadius: 60,
    padding: 5,
    marginBottom: 30,
  },
  planButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#fff",
  },
  planText: {
    color: "#bbb",
    fontSize: 18,
    fontWeight: "600",
  },
  selectedText: {
    color: "#000",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    color: "#bbb",
    marginLeft: 10,
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: "#1c1c1e",
    padding: 18,
    borderRadius: 15,
    marginTop: 40,
  },
  infoTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  infoDesc: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 3,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  priceBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 15,
    paddingVertical: 25,
    marginHorizontal: 4,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    alignItems: "flex-start",
  },
  selectedPriceBox: {
    backgroundColor: "transparent",
    borderColor: "#007BFF",
  },
  selectedPriceText: {
    color: "#007BFF",
  },
  priceTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
  },
  priceValue: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "400",
    marginTop: 5,
  },
  priceSub: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 3,
  },
  priceBoxMax: {
    flex: 1,
    borderWidth: 2,
    borderColor: "gold",
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 4,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  priceTitleMax: {
    color: "gold",
    fontSize: 16,
    fontWeight: "400",
  },
  priceValueMax: {
    color: "gold",
    fontSize: 40,
    fontWeight: "400",
    marginTop: 5,
  },
  priceSubMax: {
    color: "gold",
    fontSize: 14,
    marginTop: 3,
  },
  continueButton: {
    backgroundColor: "#fff",
    borderRadius: 60,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 25,
  },
  continueText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});
