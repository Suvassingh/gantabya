import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { SeedRoute } from "@/data/routesSeed";

export async function fetchRoutes(): Promise<SeedRoute[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "routes"));

    const routes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id:doc.id,
        from: data.from,
        to: data.to,
        stops: data.stops,
        vehicles: data.vehicles,
        fare: data.fare,
        durationMinutes: data.durationMinutes,
        popular: data.popular,
      } as SeedRoute;
    });

    return routes;
  } catch (error) {
    console.error("Error fetching routes from Firebase: ", error);
    return [];
  }
}
