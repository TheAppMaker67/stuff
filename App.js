import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "src/context/UserContext.js";
import HomeScreen from "src/screens/HomeScreen.js";
import CameraConfirmScreen from "src/screens/CameraConfirmScreen.js";
import PaywallScreen from "src/screens/PaywallScreen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CameraConfirm" component={CameraConfirmScreen} />
          <Stack.Screen name="Paywall" component={PaywallScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
