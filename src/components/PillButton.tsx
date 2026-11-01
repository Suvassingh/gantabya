import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
type PillButton = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};
const PillButton = ({ title, isActive, onPress }: PillButton) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default PillButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    
  },

  activeButton: {
    backgroundColor: Colors.ink,
    borderColor: Colors.muted,
  },
  activeText: {
    color: Colors.onPrimary,
  },

  inactiveButton: {
    backgroundColor: Colors.onPrimary,
    borderColor: Colors.muted,
  },
  inactiveText: {
    color: Colors.muted,
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
