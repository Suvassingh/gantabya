import { AuthProvider, useAuth } from "@/store/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(tabs)"; // The folder name for your tabs

    if (!user && inAuthGroup) {
      // If not logged in and trying to access tabs, w
      router.replace("/");
    } else if (user && !inAuthGroup) {
      // If logged in and on the welcome/login screen, redirect to tabs
      router.replace("/(tabs)");
    }
  }, [user, initializing, segments]);

  if (initializing) return null;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="report" options={{ title: "Report a mistake" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
