import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Colors } from "@/constants/colors";
import IconButton from "@/components/IconButton";
import GeneralButton from "@/components/GeneralButton";
import { useRouter } from "expo-router";
import { Checkbox } from "expo-checkbox";
import { signUpWithEmailAndPassword } from "@/services/auth";
import { useAuth } from "@/store/AuthContext";
function SignUpScreen() {
  const [isChecked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { continueAsGuest } = useAuth();
  const handleAuthAction = async () => {
    if (!email || !password || !name) {
      alert("Please fill in all fields.");
      return;
    }

    await signUpWithEmailAndPassword(email, password, name);
  };
  function withOutAnAccountHandler() {
    continueAsGuest();
    router.dismissAll();
    router.replace("/(tabs)");
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* <View style={styles.container}> */}
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
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
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
          <Text style={styles.termText}>
            I agree to the Terms and Conditions
          </Text>
        </View>
        <GeneralButton title="Sign Up" onPress={handleAuthAction} />
        <View style={styles.signuproute}>
          <Text>Already have an account? </Text>
          <Pressable onPress={() => router.dismiss()}>
            <Text style={styles.createAccountText}>Log in</Text>
          </Pressable>
        </View>
        <View style={styles.signuproute}>
          <Pressable onPress={withOutAnAccountHandler}>
            <Text>Continue without an account</Text>
          </Pressable>
        </View>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
    paddingBottom: 40,
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
