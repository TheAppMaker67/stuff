import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";

// TODO: wire react-native-purchases (RevenueCat) here for the real
// $10/year product. This mock just flips isSubscribed to true.
export default function PaywallScreen({ navigation }) {
  const { setIsSubscribed } = useUser();

  const subscribe = () => {
    setIsSubscribed(true);
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Questly Plus</Text>
      <Text style={styles.price}>$10<Text style={styles.priceUnit}>/year</Text></Text>
      <Text style={styles.desc}>Unlimited quests, streak insurance, custom quest packs.</Text>

      <TouchableOpacity style={styles.button} onPress={subscribe}>
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryText}>Not now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F0F12", padding: 24, paddingTop: 100, alignItems: "center" },
  title: { color: "#fff", fontSize: 20, fontWeight: "600" },
  price: { color: "#fff", fontSize: 40, fontWeight: "700", marginTop: 12 },
  priceUnit: { fontSize: 14, color: "#9A9AA5", fontWeight: "400" },
  desc: { color: "#9A9AA5", fontSize: 14, textAlign: "center", marginTop: 12, marginBottom: 32 },
  button: { backgroundColor: "#6C63FF", borderRadius: 10, paddingVertical: 14, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  secondaryButton: { marginTop: 12, paddingVertical: 10 },
  secondaryText: { color: "#7A7A85" },
});
