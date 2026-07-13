import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useUser } from "../context/UserContext";

// TODO: replace this mock with expo-image-picker's launchCameraAsync,
// then send the photo to a real verification endpoint before calling
// completeQuest(). See README "Prompt to give Codex".
export default function CameraConfirmScreen({ navigation }) {
  const { activeQuest, completeQuest } = useUser();
  const [status, setStatus] = useState("idle"); // idle | verifying | done
  const [mockPhotoTaken, setMockPhotoTaken] = useState(false);

  const takeMockPhoto = () => {
    setMockPhotoTaken(true);
  };

  const submit = () => {
    setStatus("verifying");
    setTimeout(() => {
      completeQuest();
      setStatus("done");
      setTimeout(() => navigation.goBack(), 1200);
    }, 1200);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{activeQuest.title}</Text>
      <Text style={styles.desc}>{activeQuest.desc}</Text>

      <View style={styles.previewBox}>
        {mockPhotoTaken ? (
          <View style={styles.mockPhoto}>
            <Text style={styles.mockPhotoText}>[ photo captured ]</Text>
          </View>
        ) : (
          <Text style={styles.placeholder}>No photo yet</Text>
        )}
      </View>

      {!mockPhotoTaken && (
        <TouchableOpacity style={styles.button} onPress={takeMockPhoto}>
          <Text style={styles.buttonText}>Open camera</Text>
        </TouchableOpacity>
      )}

      {mockPhotoTaken && status === "idle" && (
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Submit for verification</Text>
        </TouchableOpacity>
      )}

      {status === "verifying" && (
        <View style={styles.statusRow}>
          <ActivityIndicator color="#6C63FF" />
          <Text style={styles.statusText}>Verifying photo...</Text>
        </View>
      )}

      {status === "done" && (
        <Text style={styles.successText}>Quest verified — +{activeQuest.reward} XP</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F0F12", padding: 20, paddingTop: 60 },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },
  desc: { color: "#9A9AA5", fontSize: 14, marginTop: 4, marginBottom: 24 },
  previewBox: { flex: 1, backgroundColor: "#17171C", borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  placeholder: { color: "#5A5A65" },
  mockPhoto: { width: "80%", height: "60%", backgroundColor: "#231C3A", borderRadius: 12, alignItems: "center", justifyContent: "center" },
  mockPhotoText: { color: "#C7B9FF" },
  button: { backgroundColor: "#6C63FF", borderRadius: 10, paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  statusRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8 },
  statusText: { color: "#9A9AA5" },
  successText: { color: "#4ED18E", textAlign: "center", fontWeight: "600" },
});
