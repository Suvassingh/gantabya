import GeneralButton from "@/components/GeneralButton";
import PillButton from "@/components/PillButton";
import { Colors } from "@/constants/colors";
import { SeedRoute } from "@/data/routesSeed";
import LocationPicker from "@/location/LocationPicker";
import { fetchRoutes } from "@/services/routes";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const POPULAR = ["Ratnapark", "Kalanki", "Koteshwor", "Balkhu", "Lagankhel"];

const HomeScreen = () => {
  const router = useRouter();

  // Route data from Firebase
  const [routes, setRoutes] = useState<SeedRoute[]>([]);
  const [loadingStops, setLoadingStops] = useState(true);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load routes once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingStops(true);
      const data = await fetchRoutes();
      if (!cancelled) {
        setRoutes(data);
        setLoadingStops(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Derive unique stop list from Firebase-backed routes
  const allStops = useMemo(() => {
    const source = routes;
    const set = new Set<string>();
    for (const r of source) {
      set.add(r.from);
      set.add(r.to);
      for (const s of r.stops) set.add(s);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [routes]);

  // Autocomplete
  const suggestions = useMemo(() => {
    const q = toLocation.trim().toLowerCase();
    const f = fromLocation.trim().toLowerCase();
    if (!q) return [];
    return allStops
      .filter(
        (s) =>
          s.toLowerCase().includes(q) &&
          s.toLowerCase() !== q &&
          s.toLowerCase() !== f,
      )
      .slice(0, 6);
  }, [toLocation, fromLocation, allStops]);

  const pickSuggestion = (stop: string) => {
    setToLocation(stop);
    setShowSuggestions(false);
  };

  const handleFindRoute = () => {
    const from = fromLocation.trim();
    const to = toLocation.trim();

    if (!from || !to) {
      Alert.alert("Missing location", "Please choose both From and To.");
      return;
    }
    if (from.toLowerCase() === to.toLowerCase()) {
      Alert.alert("Same location", "From and To can't be the same.");
      return;
    }

    setShowSuggestions(false);
    router.push({
      pathname: "/(tabs)/routes",
      params: { from, to },
    });
  };

  const handlePopularStop = (stop: string) => {
    if (!fromLocation) setFromLocation(stop);
    else setToLocation(stop);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.namasteText}>Namaste</Text>
      <Text style={styles.whereToText}>Where to in the Valley?</Text>
      {/* form section */}
      <View style={styles.formView}>
        <View>
          <Text style={styles.text}>From</Text>
          <View style={styles.fromView}>
            <TextInput
              style={[styles.inputView, styles.flexInput]}
              placeholder="Choose your current location"
              value={fromLocation}
              onChangeText={setFromLocation}
            />
            <LocationPicker onLocationPicked={setFromLocation} />
          </View>
        </View>

        <View>
          <Text style={styles.text}>To</Text>
          <View style={{ zIndex: 20 }}>
            <View style={styles.fromView}>
              <TextInput
                style={[styles.inputView, styles.flexInput]}
                placeholder={
                  loadingStops ? "Loading stops…" : "Search a stop or place"
                }
                value={toLocation}
                onChangeText={(t) => {
                  setToLocation(t);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                autoCorrect={false}
                autoCapitalize="words"
                editable={!loadingStops}
              />
              {loadingStops ? (
                <ActivityIndicator size="small" color={Colors.muted} />
              ) : (
                toLocation.length > 0 && (
                  <Pressable
                    hitSlop={10}
                    onPress={() => {
                      setToLocation("");
                      setShowSuggestions(false);
                    }}
                  >
                    <Text style={styles.clearIcon}>✕</Text>
                  </Pressable>
                )
              )}
            </View>

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <View style={styles.suggestions}>
                {suggestions.map((stop) => (
                  <Pressable
                    key={stop}
                    style={styles.suggestionItem}
                    onPress={() => pickSuggestion(stop)}
                  >
                    <Text style={styles.suggestionText}>{stop}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* No match hint */}
            {showSuggestions &&
              !loadingStops &&
              toLocation.trim().length >= 2 &&
              suggestions.length === 0 && (
                <View style={styles.suggestions}>
                  <View style={styles.suggestionItem}>
                    <Text
                      style={[styles.suggestionText, { color: Colors.muted }]}
                    >
                      No stops match "{toLocation.trim()}"
                    </Text>
                  </View>
                </View>
              )}
          </View>
          <GeneralButton
            onPress={handleFindRoute}
            title="Find route"
            disabled={loadingStops}
          />
        </View>
      </View>

      {/* Popular section */}
      <Text style={styles.popText}>Popular stops</Text>
      <View style={styles.poularStopView}>
        {POPULAR.map((stop) => (
          <PillButton
            key={stop}
            title={stop}
            isActive={toLocation === stop || fromLocation === stop}
            onPress={() => handlePopularStop(stop)}
          />
        ))}
      </View>
    </SafeAreaView>
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
  },
  fromView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 8,
  },
  flexInput: {
    flex: 1,
    marginVertical: 0,
    marginBottom: 0,
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
  clearIcon: {
    color: Colors.muted,
    fontSize: 16,
    paddingHorizontal: 4,
  },
  suggestions: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    zIndex: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  suggestionItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  suggestionText: {
    fontSize: 15,
    color: Colors.ink,
  },
});
