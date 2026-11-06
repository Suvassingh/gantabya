import { AuthProvider, useAuth } from "@/store/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, initializing, isGuest } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(tabs)";
    const signedIn = !!user || isGuest;

    if (!signedIn && inAuthGroup) {
      router.replace("/");
    } else if (signedIn && !inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user,isGuest, initializing, segments]);

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
