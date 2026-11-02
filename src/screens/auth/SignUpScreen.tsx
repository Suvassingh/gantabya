import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { Colors } from "@/constants/colors";
import IconButton from "@/components/IconButton";
import GeneralButton from "@/components/GeneralButton";
import { useRouter } from "expo-router";
import { Checkbox } from "expo-checkbox";
// import {useState} from "react";
function SignUpScreen() {
  const [isChecked, setChecked] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Create an account</Text>
      <Text style={styles.description}>
        Sign up to save your favorite routes and places.
      </Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/bus.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text>Name</Text>
      <TextInput style={styles.input} placeholder="Your Name" />
      <Text>Email</Text>
      <TextInput style={styles.input} placeholder="you@gmail.com" />

      <Text>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          secureTextEntry={!showPassword}
        />
        <IconButton
          onPress={() => setShowPassword((prev) => !prev)}
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          color={Colors.muted}
        />
      </View>
      <View style={styles.termView}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={Colors.primary}
        />
        <Text style={styles.termText}>I agree to the Terms and Conditions</Text>
      </View>
      <GeneralButton title="Login" onPress={() => {}} />
      <View style={styles.signuproute}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => router.dismiss()}>
          <Text style={styles.createAccountText}>Log in</Text>
        </Pressable>
      </View>
      <View style={styles.signuproute}>
        <Pressable
          onPress={() => {
            console.log("sfdfdfdf");
          }}
        >
          <Text>Continue without an account</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },
  login: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.muted,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  input: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.onPrimary,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  passwordContainer: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.onPrimary,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  forget: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  forgetText: { color: Colors.primary },
  signuproute: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  createAccountText: {
    color: Colors.primary,
  },
  termView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  termText: {
    fontSize: 16,
    color: Colors.muted,
  },
  checkbox: {
    margin: 8,
  },
});
