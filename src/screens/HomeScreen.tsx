import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import GeneralButton from "@/components/GeneralButton";
import { Colors } from "@/constants/colors";
import PillButton from "@/components/PillButton";
const HomeScreen = () => {
  function getStartedHandler() {
    console.log("sdfsdf");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.namasteText}>Namaste</Text>
      <Text style={styles.whereToText}>Where to in the Valley?</Text>
      {/* form section */}
      <View style={styles.formView}>
        <View>
          <Text style={styles.text}>From</Text>
          <TextInput
            style={styles.inputView}
            placeholder="Choose your current location"
          />
        </View>
        <View>
          <Text style={styles.text}>To</Text>
          <TextInput
            style={styles.inputView}
            placeholder="Search a stop or place"
          />
        </View>
        <GeneralButton onPress={() => {}} title="Find route" />
      </View>
      {/* Popular section */}
      <Text style={styles.popText}>Popular stops</Text>
      <View style={styles.poularStopView}>
        <PillButton
          onPress={getStartedHandler}
          title="Ratnapark"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Kalanki"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Koteshwor"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Balkhu"
          isActive={false}
        />
        <PillButton
          onPress={getStartedHandler}
          title="Lagankhel"
          isActive={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    flex: 1,
  },
  namasteText: {
    fontSize: 18,
    color: Colors.muted,
  },
  whereToText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formView: {
    marginTop: 20,
    backgroundColor: Colors.onPrimary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  inputView: {
    backgroundColor: Colors.background,
    height: 40,
    marginVertical: 8,
    borderRadius: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.muted,
    marginBottom: 12,
    width: "100%",
  },
  text: {
    color: Colors.muted,
    fontSize: 18,
  },
  popText: {
    color: Colors.muted,
    fontSize: 18,
    marginBottom: 10,
  },
  poularStopView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
    width: "auto",
  },
});
