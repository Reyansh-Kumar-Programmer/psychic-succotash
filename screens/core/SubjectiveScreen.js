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

export default function SubjectiveScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* PAGE TITLE */}
        <Text style={styles.title}>JEE</Text>

        {/* AI ASK BOX */}
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
          <SubjectCard title="Physics" icon="atom" />
          <SubjectCard title="Chemistry" icon="flask" />
          <SubjectCard title="Maths" icon="function-variant" />
        </View>

        {/* PRACTICE */}
        <Text style={styles.sectionTitle}>Practice & Question Banks</Text>

        <RowCard title="Previous Year Papers" icon="document-text-outline" />
        <RowCard title="Topic-wise Practice" icon="list-outline" />

        {/* AI */}
        <Text style={styles.sectionTitle}>AI Suggested</Text>

        <RowCard title="Topic Recommender" icon="bulb-outline" />
        <RowCard title="Smart Notes Generator" icon="create-outline" />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const SubjectCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.subjectCard}>
    <MaterialCommunityIcons name={icon} size={28} color="#4E8CFF" />
    <Text style={styles.subjectText}>{title}</Text>
  </TouchableOpacity>
);

const RowCard = ({ title, icon }) => (
  <TouchableOpacity style={styles.rowCard}>
    <Ionicons name={icon} size={22} color="#4E8CFF" />
    <Text style={styles.rowText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  /* NEW AI ASK BOX */
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
    marginTop: 26,
    marginBottom: 14,
  },

  cardRow: {
    flexDirection: "row",
    gap: 12,
  },

  subjectCard: {
    flex: 1,
    backgroundColor: "#111",
    paddingVertical: 22,
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
    fontWeight: "600",
  },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 14,
  },

  rowText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
