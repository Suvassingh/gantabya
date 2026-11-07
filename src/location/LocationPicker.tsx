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
    if (locationPermissionInformation?.granted) return true;
    const response = await requestPermission();
    if (!response.granted) {
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

      let placeName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

      if (Platform.OS !== "web") {
        try {
          const addresses = await reverseGeocodeAsync({ latitude, longitude });
          if (addresses.length > 0) {
            const p = addresses[0];
            const parts = [
              p.street ?? p.name,
              p.district ?? p.subregion,
              p.city,
            ].filter(Boolean);
            if (parts.length > 0) {
              placeName = Array.from(new Set(parts)).join(", ");
            }
          }
        } catch (geocodeError) {
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
          name="location"
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
