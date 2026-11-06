import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
import { Checkbox } from "expo-checkbox";
import IconButton from "@/components/IconButton";

import { useState } from "react";
import { useRouter } from "expo-router";
import GeneralButton from "@/components/GeneralButton";
import { signOut } from "@/services/auth";
import { Alert } from "react-native";
import { Platform } from "react-native";
import { useAuth } from "@/store/AuthContext";
const SHEET_BG = Colors.muted;
const SHEET_TEXT = "#FFFFFF";
const ProfileScreen = () => {
  const [isChecked, setChecked] = React.useState(false);
  const [isPresented, setIsPresented] = useState(false);
  const router = useRouter();
  const { user, signOutGuest } = useAuth();
  console.log("[profile] user:", user?.email ?? "null");
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          if (user) {
            await signOut();
          } else {
            signOutGuest();
          }
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Profile</Text>
      {/* Container */}
      <View style={styles.contentContainer}>
        {/* language */}
        <View style={styles.languageView}>
          <Text style={styles.languageText}>Language</Text>
          <Text style={styles.languageValue}>English</Text>
        </View>
        {/* Trip Alert */}
        <View style={styles.languageView}>
          <Text style={styles.languageText}>Trip Alert</Text>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={Colors.primary}
          />
        </View>
        {/* Report a mistake */}
        <View style={styles.languageView}>
          <Text style={styles.languageText}>Report a mistake</Text>
          <IconButton
            name="arrow-forward"
            size={24}
            color={Colors.muted}
            onPress={() => router.push("/report")}
          />
        </View>
        {/* About a gantabya*/}
        <View style={styles.languageView}>
          <Text style={styles.languageText}>About a gantabya</Text>
          <IconButton
            name="arrow-forward"
            size={24}
            color={Colors.muted}
            onPress={() => setIsPresented(true)}
          />
          <Modal
            visible={isPresented}
            transparent
            animationType="slide"
            onRequestClose={() => setIsPresented(false)}
          >
            <Pressable
              style={styles.backdrop}
              onPress={() => setIsPresented(false)}
            />
            <View style={styles.sheet}>
              <ScrollView>
                <Text style={styles.aboutText}>
                  Gantabya (गन्तव्य) means “destination,” and that is exactly
                  what this app helps you reach. Getting around the Kathmandu
                  Valley by micro, tempo, or Sajha bus can be confusing, because
                  routes are rarely written down and most of us learn them by
                  asking around. Gantabya puts that knowledge in your pocket:
                  enter where you are and where you want to go, and it shows
                  which vehicle to take, where to change, and how much the fare
                  will be. It works offline, can alert you before your stop, and
                  is available in English and नेपाली. Routes and fares change,
                  so if you spot a mistake or a missing route, tap Report a
                  mistake in your Profile and help make Gantabya better for
                  everyone. Made in Nepal, for everyone who travels the Valley
                </Text>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
      <GeneralButton onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  profileText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  contentContainer: {
    backgroundColor: Colors.onPrimary,
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  languageView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  languageText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  languageValue: {
    fontSize: 16,
    color: Colors.muted,
  },
  checkbox: {
    margin: 8,
  },

  backdrop: { flex: 1, backgroundColor: Colors.background },
  sheet: {
    height: "80%",
    backgroundColor: SHEET_BG,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  aboutText: { fontSize: 16, lineHeight: 24, color: SHEET_TEXT },
});
