import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PillButton from "@/components/PillButton";
import { Colors } from "@/constants/colors";
import RoutesListContainer from "@/components/RoutesListContainer";
import VehiclesContainer from "@/components/vehiclesContainer";
import { SeedRoute, VehicleType } from "@/data/routesSeed";
import { fetchRoutes } from "@/services/routes";
const CATEGORIES = ["All", "Sajha", "Micro", "Tempo"] as const;

const pillBase = {
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: Colors.muted,
} as const;

const RoutesScreen = () => {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState<SeedRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchRoutes();
      setRoutes(data);
      setLoading(false);
    }
    loadData();
  }, []);
  const filteredRoutes = routes.filter((route) => {
    const matchesCategory =
      category === "All" ||
      route.vehicles.includes(category.toLowerCase() as VehicleType);
    const q = search.toLowerCase().trim();
    const matchesSearch =
      q === "" ||
      route.from.toLowerCase().includes(q) ||
      route.to.toLowerCase().includes(q) ||
      route.stops.some((stop) => stop.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });
  return (
    <View style={styles.container}>
      <Text style={styles.all}>All Routes</Text>
      <Text style={styles.search}>Search</Text>
      <TextInput
        placeholder="Search routes..."
        style={styles.Input}
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.categoryContainer}>
        {CATEGORIES.map((c) => {
          const isActive = category === c;
          return (
            <PillButton
              key={c}
              title={c}
              isActive={isActive}
              onPress={() => setCategory(c)}
              style={{
                ...pillBase,
                backgroundColor: isActive ? Colors.ink : Colors.onPrimary,
              }}
              textStyle={{ color: isActive ? Colors.onPrimary : Colors.muted }}
            />
          );
        })}
      </View>

      <RoutesListContainer>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{ marginTop: 40 }}
          />
        ) : filteredRoutes.length === 0 ? (
          <Text style={styles.noResults}>No routes found.</Text>
        ) : (
          filteredRoutes.map((route, index) => (
            <VehiclesContainer key={index} {...route} />
          ))
        )}
      </RoutesListContainer>
    </View>
  );
};
export default RoutesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
    padding: 20,
  },
  all: { fontSize: 30, fontWeight: "bold" },
  search: { fontSize: 18, fontWeight: "600", color: Colors.muted },
  Input: {
    backgroundColor: Colors.onPrimary,
    width: "100%",
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.muted,
    borderRadius: 12,
    padding: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  noResults: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.muted,
    textAlign: "center",
    width: "100%",
  },
});
