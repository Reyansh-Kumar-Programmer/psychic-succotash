import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [isNotification, setIsNotification] = useState(false);

  return (
    <ScrollView style={styles.container}>
      {/* ─── Header ───────────────────────────── */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* ─── Promo Card ───────────────────────── */}
      <View style={styles.card}>
        <ImageBackground
          source={require("../assets/setting_bg.png")}
          style={styles.cardImage}
          imageStyle={{ borderRadius: 14 }}
        >
          <View style={styles.overlay} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>MindraAi Pro</Text>
            <Text style={styles.cardSubtitle}>
              Upgrade to the latest AI models and boost your Pro Search usage
            </Text>
            <TouchableOpacity style={styles.learnMoreBtn}>
              <Text style={styles.learnMoreText}>Learn more</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* ─── Account Section ──────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>rexnoah06613460</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>rexnoah0667@gmail.com</Text>
        </View>
      </View>

      {/* ─── Notifications ───────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.toggleContainer}>
          <Text style={styles.subText}>Daily threads from Discover</Text>
          <Switch
            value={isNotification}
            onValueChange={setIsNotification}
            thumbColor={isNotification ? "#00bfa6" : "#f4f3f4"}
            trackColor={{ false: "#3a3a3a", true: "#00695c" }}
          />
        </View>
      </View>

      {/* ─── Actions ─────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <Text style={styles.outerLabel}>Clear History</Text>
        <Text style={styles.outerLabel}>Logout</Text>
      </View>

      {/* ─── More Section ───────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More</Text>
        <Text style={styles.outerLabel}>Privacy Policy</Text>
        <Text style={styles.outerLabel}>Terms of Service</Text>
      </View>

      {/* ─── Delete Account ─────────────────── */}
      <View style={styles.deleteContainer}>
        <Text style={styles.deleteText}>Delete your account</Text>
        <Text style={styles.deleteSubText}>
          For deleting your account permanently
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e0e0e",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  // ─── Header ───────────────────────────────
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },

  // ─── Promo Card ───────────────────────────
  card: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
  },
  cardImage: {
    height: 180,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardContent: {
    padding: 14,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
  },
  cardSubtitle: {
    color: "#ddd",
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },
  learnMoreBtn: {
    backgroundColor: "#fff",
    borderRadius: 30,
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  learnMoreText: {
    color: "#0e0e0e",
    fontWeight: "600",
  },

  // ─── Sections ────────────────────────────
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#00bfa6",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 6,
  },
  infoBox: {
    marginBottom: 8,
  },
  label: {
    color: "#ccc",
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    color: "#999",
    fontSize: 14,
    marginTop: 3,
  },
  subText: {
    color: "#777",
    fontSize: 13,
    flex: 1,
    marginRight: 10,
    lineHeight: 18,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // ─── Text Styles ─────────────────────────
  outerLabel: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "500",
  },

  // ─── Delete Section ──────────────────────
  deleteContainer: {
    marginBottom: 50,
  },
  deleteText: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
  deleteSubText: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
    marginBottom: 40,
  },
});
