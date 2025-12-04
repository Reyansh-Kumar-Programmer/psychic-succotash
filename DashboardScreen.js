// DashboardScreen.js
// Ultra Modern Dark UI - React Native (Expo) - JavaScript

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import promptCompi from "../assets/prompt_compi.json";
const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(20)).current;
  const [selectedFilter, setSelectedFilter] = React.useState(null);

  const [filters, setFilters] = React.useState({
    class: null,
    subject: null,
    medium: null,
  });

  const handleExamPress = (title) => {
    // find matching exam data in JSON
    const found = promptCompi.find((item) => item.title === title);

    if (!found) {
      console.warn("No matching exam found in JSON for:", title);
      return;
    }

    // Navigate with dynamic data
    navigation.navigate("SubjectiveScreen", {
      examTitle: found.title,
      examIcon: found.icon,
      subjects: found.subjects,
      sections: found.sections,
    });
  };

  const filterOptions = {
    Class: ["6", "7", "8", "9", "10", "11", "12"],
    Subject: [
      "Science",
      "Maths",
      "English",
      "SST",
      "Physics",
      "Chemistry",
      "Biology",
    ],
    Medium: ["English", "Hindi"],
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navigation = useNavigation();

  const courses = [
    { title: "Science & Technology", icon: "flask" },
    { title: "Art & Humanities", icon: "palette" },
    { title: "Management & Buisness", icon: "briefcase" },
    { title: "Law & Legal Studies", icon: "scale-balance" },
    { title: "Coding & Programming", icon: "code-tags" },
    { title: "English Literature", icon: "book-open" },
  ];

  const exams = [
    { title: "JEE", icon: "school-outline" },
    { title: "NEET", icon: "medkit-outline" },
    { title: "CUET", icon: "receipt-outline" },
    { title: "CLAT", icon: "library-outline" },
    { title: "SSC", icon: "bar-chart-outline" },
    { title: "CAT/CMAT", icon: "stats-chart-outline" },
    { title: "Banking", icon: "cash-outline" },
    { title: "UPSC", icon: "globe-outline" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" translucent />

      {/* Animated background gradient */}
      <LinearGradient
        colors={["#000000", "#111111"]}
        style={styles.bg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fade,
              transform: [{ translateY: slide }],
            },
          ]}
        >
          <View>
            <Text style={styles.title}>TutorXpert</Text>
            <Text style={styles.subtitle}>Learn by class/subject (1-12)</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.topIcon}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.topIcon}>
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* FILTERS */}
        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {["Class", "Subject", "Medium"].map((label, i) => {
            const value =
              label === "Class"
                ? filters.class
                : label === "Subject"
                  ? filters.subject
                  : filters.medium;

            return (
              <TouchableOpacity
                key={i}
                style={styles.filterBtn}
                onPress={() => setSelectedFilter(label)}
              >
                <Text style={styles.filterLabel}>{label}</Text>

                <Text style={styles.filterValue}>
                  {value ? value : label}{" "}
                  <Ionicons name="chevron-down" size={12} color="#777" />
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* COURSES */}
        <Text style={styles.sectionTitle}>Academic & Professional Courses</Text>

        <View style={styles.grid}>
          {courses.map((c, i) => (
            <TouchableOpacity key={i} style={styles.card}>
              <MaterialCommunityIcons
                name={c.icon}
                size={26}
                color="#a855f7"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.cardTitle}>{c.title}</Text>
              <Text style={styles.cardSub}>Tap to explore</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EXAMS */}
        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Competitive Exams Preparation
        </Text>

        <View style={styles.grid}>
          {exams.map((ex, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleExamPress(ex.title)}
              style={styles.examModernCard}
            >
              <Ionicons name={ex.icon} size={22} color="#a855f7" />
              <Text style={styles.examModernTitle}>{ex.title}</Text>
              <Text style={styles.examModernSub}>Start Preparation</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* CHAT BUTTON */}
      <View style={styles.fabWrap}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
          <Text style={styles.fabText}>Ask anything</Text>

          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        </TouchableOpacity>
      </View>
      {selectedFilter && (
        <Animated.View
          style={[
            styles.dropdownOverlay,
            { opacity: fade, transform: [{ translateY: slide }] },
          ]}
        >
          <View style={styles.dropdownBoxModern}>
            <Text style={styles.dropdownTitleModern}>{selectedFilter}</Text>

            {filterOptions[selectedFilter].map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownModernItem}
                activeOpacity={0.7}
                onPress={() => {
                  setFilters({
                    ...filters,
                    [selectedFilter.toLowerCase()]: opt,
                  });
                  setSelectedFilter(null);
                }}
              >
                <Text style={styles.dropdownModernText}>{opt}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setSelectedFilter(null)}
              style={styles.dropdownCloseBtn}
            >
              <Text style={styles.dropdownCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const CARD = (width - 60) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  bg: {
    ...StyleSheet.absoluteFillObject,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  examModernCard: {
    width: CARD,
    backgroundColor: "rgba(17,17,17,0.7)", // glass feel
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.15)", // purple neon
    backdropFilter: "blur(10px)",
    alignItems: "left",
  },

  examModernTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },

  dropdownOverlay: {
    position: "absolute",
    top: 210,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    zIndex: 2000,
  },

  dropdownBoxModern: {
    backgroundColor: "#0e0e0e",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.2)", // soft purple neon
    shadowColor: "#a855f7",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  dropdownTitleModern: {
    color: "#a855f7",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
    opacity: 0.9,
  },

  dropdownModernItem: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
  },

  dropdownModernText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "600",
  },

  dropdownCloseBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255,80,80,0.12)",
    alignItems: "center",
  },

  dropdownCloseText: {
    color: "#ff5f5f",
    fontSize: 14,
    fontWeight: "700",
  },

  examModernSub: {
    color: "#777",
    fontSize: 12,
    marginTop: 6,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
  subtitle: {
    color: "#777",
    fontSize: 14,
    marginTop: 4,
  },

  headerIcons: { flexDirection: "row", gap: 12 },
  topIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#111",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  filterRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 15,
  },

  filterBtn: {
    backgroundColor: "#111",
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 115,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  filterLabel: {
    color: "#777",
    fontSize: 13,
  },
  filterValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 2,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 20,
    marginBottom: 14,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    paddingHorizontal: 20,
  },

  card: {
    width: CARD,
    backgroundColor: "#111",
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.15)",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  cardSub: {
    color: "#777",
    marginTop: 6,
    fontSize: 12,
  },

  examCard: {
    width: CARD,
    paddingVertical: 18,
    backgroundColor: "#111",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  examText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  fabWrap: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  fab: {
    width: width - 40,
    backgroundColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.2)",
  },

  fabText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
  },

  aiBadge: {
    marginLeft: "auto",
    backgroundColor: "#a855f7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
});
