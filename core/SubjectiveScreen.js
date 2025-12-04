import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function SubjectiveScreen() {
  const route = useRoute();
  const { examTitle, examIcon, subjects, sections } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* PAGE TITLE */}
        <Text style={styles.title}>{examTitle}</Text>

        {/* ASK AI BOX */}
        <View style={styles.askBox}>
          <Text style={styles.askPlaceholder}>What's in your mind?</Text>
          <MaterialCommunityIcons
            name="robot-outline"
            size={22}
            color="#4E8CFF"
          />
        </View>

        {/* SUBJECTS */}
        <Text style={styles.sectionTitle}>Subjects</Text>

        <View style={styles.cardRow}>
          {subjects?.map((s, index) => (
            <SubjectCard key={index} title={s.name} icon={s.icon} />
          ))}
        </View>

        {/* 🔥 DYNAMIC SECTIONS WITH 2x2 GRID */}
        {sections?.map((section, idx) => (
          <View key={idx} style={{ marginTop: 20 }}>
            {section.title?.trim() !== "" && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            )}

            <View style={styles.sectionGrid}>
              {section.items?.map((item, index) => (
                <FeatureCard key={index} title={item.title} icon={item.icon} />
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SubjectCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.subjectCard}>
    <Ionicons name={icon} size={26} color="#4E8CFF" />
    <Text style={styles.subjectText}>{title}</Text>
  </TouchableOpacity>
);

const FeatureCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.featureCard}>
    <MaterialCommunityIcons name={icon} size={30} color="#4E8CFF" />
    <Text style={styles.featureCardText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  askBox: {
    backgroundColor: "#111",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginTop: 20,
    marginBottom: 10,
  },

  askPlaceholder: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 15,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },

  subjectCard: {
    width: "30%",
    backgroundColor: "#111",
    paddingVertical: 15,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  subjectText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    fontWeight: "600",
  },

  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  featureCard: {
    width: "47%",
    backgroundColor: "#111",
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  featureCardText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 6,
  },
});
