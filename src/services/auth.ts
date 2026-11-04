import {
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";

import { Alert } from "react-native";
import { auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
// const auth = getAuth();

export async function signUpWithEmailAndPassword(
  email: string,
  password: string,
  name: string,
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    if (user) {
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: new Date(),
      });
    }
    return user;
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      Alert.alert("That email address is already in use!");
    } else if (error.code === "auth/invalid-email") {
      Alert.alert("That email address is invalid!");
    } else {
      Alert.alert("Error", error.message);
    }
  }
}

export async function signInWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      Alert.alert("No user found with this email address!");
    } else if (error.code === "auth/wrong-password") {
      Alert.alert("Incorrect password!");
    } else {
      Alert.alert("Error", error.message);
    }
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out!");
  } catch (error: any) {
    Alert.alert("Error", error.message);
  }
}
