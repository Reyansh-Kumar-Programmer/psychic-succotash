import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // animation refs for each AI message
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const animateMessage = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);

    const userText = input;
    setInput("");

    try {
      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          input: userText,
          store: false,
        }),
      });

      const data = await response.json();
      console.log("AI RAW:", data);

      const aiText =
        data?.output?.[1]?.content?.[0]?.text || "No response received.";

      const aiMsg = { role: "assistant", content: aiText };
      setMessages((prev) => [...prev, aiMsg]);

      animateMessage();
    } catch (err) {
      console.log("ChatGPT Error:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Top Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask anything..."
          placeholderTextColor="#999"
          style={styles.input}
          autoFocus
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
        />
      </View>

      {/* Messages */}
      <ScrollView style={styles.chatBox} showsVerticalScrollIndicator={false}>
        {messages.map((msg, index) => {
          const animatedStyle =
            msg.role === "assistant"
              ? {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }
              : {};

          return (
            <Animated.View
              key={index}
              style={[
                styles.msgBubble,
                msg.role === "user" ? styles.userBubble : styles.aiBubble,
                animatedStyle,
              ]}
            >
              <Text
                style={[
                  styles.msgText,
                  msg.role === "assistant" && { fontSize: 16 },
                ]}
              >
                {msg.content}
              </Text>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        <View style={styles.leftGroup}>
          <TouchableOpacity style={[styles.iconButton, styles.searchButton]}>
            <Text style={styles.textButton}>Search</Text>
            <Ionicons
              name="chevron-down"
              size={18}
              color="#fff"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="camera-outline" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="attach" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.iconButton, styles.micButton]}
        >
          <Ionicons name="mic-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101010" },

  header: { paddingTop: 50, paddingLeft: 20 },
  closeButton: {
    backgroundColor: "#2a2a2a",
    borderRadius: 50,
    padding: 8,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: { marginTop: 15, paddingLeft: 20 },
  input: {
    fontSize: 28,
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "90%",
  },

  chatBox: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 120,
  },

  msgBubble: {
    maxWidth: "98%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },

  userBubble: {
    backgroundColor: "#2a2a2a",
    alignSelf: "flex-end",
  },

  aiBubble: {
    backgroundColor: "#181818",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#333",
  },

  msgText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },

  bottomRow: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  searchButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  textButton: { color: "#fff", fontSize: 16 },
  micButton: { backgroundColor: "#2a2a2a" },
});
