import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";
import { progressInLevel, XP_PER_LEVEL } from "../utils/xpEngine";

export default function HomeScreen({ navigation }) {
  const { totalXp, level, streak, activeQuest, missQuest, isSubscribed, trialDaysLeft } = useUser();
  const [secondsLeft, setSecondsLeft] = useState(activeQuest.seconds);
  const timerRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(activeQuest.seconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          missQuest();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [activeQuest]);

  const progress = progressInLevel(totalXp) / XP_PER_LEVEL;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.brand}>Questly</Text>
        <Text style={styles.level}>Level {level}</Text>
      </View>

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{progressInLevel(totalXp)} / {XP_PER_LEVEL} XP</Text>
        <Text style={styles.metaText}>{streak} day streak</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.questLabel}>ACTIVE QUEST</Text>
        <Text style={styles.questTitle}>{activeQuest.title}</Text>
        <Text style={styles.questDesc}>{activeQuest.desc}</Text>
        <Text style={styles.reward}>+{activeQuest.reward} XP</Text>
        <Text style={styles.timer}>expires in {mins}:{secs}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CameraConfirm")}
        >
          <Text style={styles.buttonText}>Complete with photo</Text>
        </TouchableOpacity>
      </View>

      {!isSubscribed && (
        <TouchableOpacity style={styles.paywallStrip} onPress={() => navigation.navigate("Paywall")}>
          <Text style={styles.paywallText}>Free trial — {trialDaysLeft} days left</Text>
          <Text style={styles.paywallCta}>Get Questly Plus</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F0F12", padding: 20, paddingTop: 60 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  brand: { color: "#fff", fontSize: 18, fontWeight: "600" },
  level: { color: "#9A9AA5", fontSize: 14 },
  barTrack: { height: 8, borderRadius: 8, backgroundColor: "#1E1E24", overflow: "hidden" },
  barFill: { height: "100%", backgroundColor: "#6C63FF" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6, marginBottom: 20 },
  metaText: { color: "#7A7A85", fontSize: 12 },
  card: { backgroundColor: "#17171C", borderRadius: 16, padding: 18 },
  questLabel: { color: "#6C63FF", fontSize: 11, fontWeight: "600", marginBottom: 4 },
  questTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
  questDesc: { color: "#9A9AA5", fontSize: 13, marginTop: 4 },
  reward: { color: "#6C63FF", fontSize: 13, marginTop: 10 },
  timer: { color: "#E24B4A", fontSize: 12, marginTop: 8 },
  button: { backgroundColor: "#6C63FF", borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 16 },
  buttonText: { color: "#fff", fontWeight: "600" },
  paywallStrip: { marginTop: 16, backgroundColor: "#231C3A", borderRadius: 10, padding: 12, flexDirection: "row", justifyContent: "space-between" },
  paywallText: { color: "#C7B9FF", fontSize: 12 },
  paywallCta: { color: "#C7B9FF", fontSize: 12, fontWeight: "600" },
});
