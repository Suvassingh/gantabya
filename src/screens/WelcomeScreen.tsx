import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";
import GeneralButton from "@/components/GeneralButton";
import PillButton from "@/components/PillButton";
const WelcomeScreen = () => {
  function getStartedHandler() {
    console.log("clicked");
  }
  return (
    <View style={styles.container}>
      <View style={styles.Gcard}>
        <Text style={styles.Gtext}>G</Text>
      </View>
      <Text style={styles.rideText}>Know which ride to take.</Text>
      <Text style={styles.desc}>
        Micro, tempo or Sajha: find the route, where to change, and the fare.
        Works offline.
      </Text>
      <View style={styles.bottomSection}>
        <Text style={styles.languageText}>Language</Text>
        <View style={styles.languageView}>
          <PillButton
            onPress={getStartedHandler}
            title="English"
            isActive={true}
          />
          <PillButton
            onPress={getStartedHandler}
            title="Nepali"
            isActive={false}
          />
        </View>
        <GeneralButton onPress={getStartedHandler} title="Get started" />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
    padding: 20,
    marginTop: 80,
  },
  Gcard: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 20,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  Gtext: {
    color: Colors.onPrimary,
    fontSize: 30,
    fontWeight: "bold",
  },
  rideText: {
    fontSize: 37,
    fontWeight: "700",
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.muted,
  },
  bottomSection: {
    width: "100%",
    marginTop: "auto", 
  },
  languageText: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 12,
  },
  languageView: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
});
