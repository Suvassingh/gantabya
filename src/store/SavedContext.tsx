import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { db } from "@/services/firebase";
import { useAuth } from "@/store/AuthContext";

const GUEST_KEY = "savedRoutes:guest";

type SavedRoutesContextValue = {
  savedIds: string[];
  loading: boolean;
  isSaved: (routeId: string) => boolean;
  toggleSave: (routeId: string) => Promise<void>;
  clearSaved: () => Promise<void>;
};
const SavedContext = createContext<SavedRoutesContextValue>({
  savedIds: [],
  loading: true,
  isSaved: () => false,
  toggleSave: async () => {},
  clearSaved: async () => {},
});

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const { user, initializing } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const savedIdsRef = useRef<string[]>([]);
  useEffect(() => {
    savedIdsRef.current = savedIds;
  }, [savedIds]);
  useEffect(() => {
    if (initializing) return;

    let cancelled = false;
    let unsub: (() => void) | undefined;

    async function loadGuest() {
      try {
        const raw = await AsyncStorage.getItem(GUEST_KEY);
        const ids = raw ? (JSON.parse(raw) as string[]) : [];
        if (!cancelled) setSavedIds(ids);
      } catch (e) {
        console.warn("[saved] guest load failed", e);
        if (!cancelled) setSavedIds([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (user) {
      setLoading(true);
      const coll = collection(db, "users", user.uid, "savedRoutes");
      unsub = onSnapshot(
        coll,
        (snap) => {
          if (cancelled) return;
          setSavedIds(snap.docs.map((d) => d.id));
          setLoading(false);
        },
        (err) => {
          console.error("[saved] snapshot error", err);
          if (!cancelled) setLoading(false);
        },
      );
    } else {
      loadGuest();
    }

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [user, initializing]);
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(GUEST_KEY);
        if (!raw) return;
        const ids = JSON.parse(raw) as string[];
        if (ids.length === 0) {
          await AsyncStorage.removeItem(GUEST_KEY);
          return;
        }
        const coll = collection(db, "users", user.uid, "savedRoutes");
        await Promise.all(
          ids.map((id) =>
            setDoc(doc(coll, id), { savedAt: Date.now() }, { merge: true }),
          ),
        );
        await AsyncStorage.removeItem(GUEST_KEY);
        console.log(`[saved] migrated ${ids.length} guest saves`);
      } catch (e) {
        console.warn("[saved] migration failed", e);
      }
    })();
  }, [user]);
  const isSaved = (routeId: string) => savedIds.includes(routeId);

  const toggleSave = async (routeId: string) => {
    const current = savedIdsRef.current;
    const already = current.includes(routeId);
    const next = already
      ? current.filter((id) => id !== routeId)
      : [...current, routeId];

    setSavedIds(next);

    try {
      if (user) {
        const ref = doc(db, "users", user.uid, "savedRoutes", routeId);
        if (already) await deleteDoc(ref);
        else await setDoc(ref, { savedAt: Date.now() });
      } else {
        await AsyncStorage.setItem(GUEST_KEY, JSON.stringify(next));
      }
    } catch (e) {
      console.error("[saved] toggleSave failed, reverting", e);
      setSavedIds(current);
    }
  };

  const clearSaved = async () => {
    const prev = savedIdsRef.current;
    setSavedIds([]);
    try {
      if (user) {
        const coll = collection(db, "users", user.uid, "savedRoutes");
        const snap = await getDocs(coll);
        await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
      } else {
        await AsyncStorage.removeItem(GUEST_KEY);
      }
    } catch (e) {
      console.error("[saved] clearSaved failed, reverting", e);
      setSavedIds(prev);
    }
  };

  const value = useMemo(
    () => ({ savedIds, loading, isSaved, toggleSave, clearSaved }),
    [savedIds, loading, user],
  );
  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export const useSavedRoutes = () => useContext(SavedContext);
