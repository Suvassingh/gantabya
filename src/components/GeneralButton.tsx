import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

type prop = {
  onPress: () => void;
  title: string;
  disabled?:boolean
};
const GeneralButton = ({ onPress, title,disabled }: prop) => {
  return (
    <View style={styles.container}>
      <Pressable
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
        onPress={onPress}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default GeneralButton;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "black",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
  pressable: {
    paddingVertical: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
