import WelcomeScreen from "@/screens/WelcomeScreen";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
