import IconButton from "@/components/IconButton";
import {
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  useForegroundPermissions,
} from "expo-location";
import { Alert, Platform, StyleSheet, View } from "react-native";

type LocationPickerProps = {
  onLocationPicked: (placeName: string) => void;
};

const LocationPicker = ({ onLocationPicked }: LocationPickerProps) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (locationPermissionInformation?.status === "undetermined") {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === "denied") {
      Alert.alert(
        "Insufficient Permission !",
        "You need to grant the location permission to use this app",
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    try {
      const location = await getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Default fallback: formatted coordinates
      let placeName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

      // Attempt reverse geocoding only if not on web
      // (On web, SDK 49+ will warn and may fail)
      if (Platform.OS !== "web") {
        try {
          const addresses = await reverseGeocodeAsync({ latitude, longitude });
          if (addresses.length > 0) {
            const place = addresses[0];
            // Build a readable name, prioritizing specific fields
            placeName =
              place.name ||
              place.street ||
              place.city ||
              place.region ||
              placeName; // keep coordinates if all fields are null
          }
        } catch (geocodeError) {
          // Silently fall back to coordinates if geocoding fails
          console.warn(
            "Reverse geocoding failed, using coordinates:",
            geocodeError,
          );
        }
      }

      onLocationPicked(placeName);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Could not retrieve your location.");
    }
  }

  return (
    <View>
      <View></View>
      <View>
        <IconButton
          name="map-outline"
          onPress={getLocationHandler}
          size={24}
          color=""
        />
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({});
