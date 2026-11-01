import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import PillButton from "@/components/PillButton";
import { Colors } from "@/constants/colors";
import GeneralButton from "@/components/GeneralButton";
const ReportScreen = () => {
  function getStartedHandler() {
    console.log("sdsdsdsd");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.wrongText}>What is wrong?</Text>
      <View style={styles.problemView}>
        <PillButton
          onPress={getStartedHandler}
          title="Wrong fare"
          isActive={true}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Missing route"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Wrong stop"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Other"
          isActive={false}
        />
      </View>
      <Text style={styles.Route}>Route or stop</Text>
      <TextInput
        style={styles.textInput}
        placeholder="e.g Kalanki - Ratnapark"
      />
      <Text style={styles.Route}>Details</Text>
      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="What should it say?"
        multiline
        editable
        numberOfLines={5}
        maxLength={50}
        textAlignVertical="top"
      />
      <GeneralButton
        onPress={() => {
          console.log("dfdfdfdf");
        }}
        title="Send report"
      />
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  wrongText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.muted,
    marginTop: 10,
    marginBottom: 10,
  },
  problemView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  Route: {
    fontSize: 14,
    color: Colors.muted,
    marginBottom: 10,
  },
  textInput: {
    borderRadius: 12,
    borderWidth: 1,
    height: 40,
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.muted,
    marginBottom: 10,
    borderColor: Colors.border,
    backgroundColor: Colors.onPrimary,
  },
  textArea: {
    height: undefined,
    minHeight: 120,
    paddingTop: 12,
    marginBottom:24
  },
});
