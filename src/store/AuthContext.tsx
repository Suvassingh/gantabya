import { auth } from "@/services/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<{
  user: User | null;
  isGuest: boolean;
  initializing: boolean;
  continueAsGuest: () => void;
  signOutGuest: () => void;
}>({
  user: null,
  isGuest: false,
  initializing: true,
  continueAsGuest: () => {},
  signOutGuest: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userState) => {
      setUser(userState);
      if (userState) setIsGuest(false);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);
  const continueAsGuest = () => setIsGuest(true);
  const signOutGuest = () => setIsGuest(false);
  return (
    <AuthContext.Provider
      value={{ user, isGuest, initializing, continueAsGuest, signOutGuest }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
