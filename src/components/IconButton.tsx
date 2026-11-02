import { Pressable, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
type IconButtonProps = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  size?: number;
  color?: string;
};
const IconButton = ({ name, onPress, size, color }: IconButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
