import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { Route } from "@/data/routesSeed";
import { Vehicle, Colors } from "@/constants/colors";
import IconButton from "./IconButton";
import { useSavedRoutes } from "@/store/SavedContext";
import { Ionicons } from "@expo/vector-icons";

const VEHICLE_STYLES: Record<string, { bg: string; text: string }> = {
  sajha: Vehicle.sajha,
  micro: Vehicle.micro,
  tempo: Vehicle.tempo,
};

function VehiclesContainer({ id, vehicles, from, to, stops, fare }: Route) {
  const { isSaved, toggleSave } = useSavedRoutes();
  const saved = isSaved(id);

  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topRow}>
        <View style={styles.leftGroup}>
          {/* Badges */}
          <View style={styles.badgeRow}>
            {vehicles.map((vehicle, index) => {
              const v = VEHICLE_STYLES[vehicle];
              if (!v) return null;
              return (
                <View
                  key={index}
                  style={[styles.badge, { backgroundColor: v.bg }]}
                >
                  <Text style={[styles.badgeText, { color: v.text }]}>
                    {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Title and Stop Count */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {from} – {to}
            </Text>
            <Text style={styles.subtitle}>{stops.length} stops</Text>
          </View>
        </View>

        {/* Fare */}
        <View style={styles.favcontainer}>
          <Pressable
            onPress={() => toggleSave(id)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={saved ? "Remove from saved" : "Save route"}
          >
            <Ionicons
              name={saved ? "bookmark" : "bookmark-outline"}
              size={22}
              color={saved ? Colors.primary : Colors.muted}
            />
          </Pressable>
          <Text style={styles.fare}>Rs {fare}</Text>
        </View>
      </View>

      {/* Bottom Section: Stops */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stopsRow}
      >
        {stops.map((stop, index) => (
          <View key={index} style={styles.stopItem}>
            {index > 0 && <Text style={styles.arrow}>→</Text>}
            <View style={styles.chip}>
              <Text style={styles.chipText}>{stop}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default VehiclesContainer;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  textContainer: {
    // flex: 1,
    // justifyContent: "center",
  },
  favcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  fare: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    marginLeft: 10,
  },
  stopsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stopItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  arrow: {
    fontSize: 12,
    color: "#0a0909",
  },
  chip: {
    backgroundColor: "#f8aeae",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  chipText: {
    fontSize: 12,
    color: "#ed0d0d",
  },
});
