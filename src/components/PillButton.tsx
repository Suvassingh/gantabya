import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  StyleProp,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";
type PillButton = {
  title: string;
  isActive: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
const PillButton = ({
  title,
  isActive,
  onPress,
  style,
  textStyle,
}: PillButton) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
        style,
        styles.base,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
          textStyle,
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
  base: { alignItems: "center", justifyContent: "center" },
});
