import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { ROUTES_SEED, type SeedRoute } from "@/data/routesSeed";

function buildSearchTerms(r: SeedRoute): string[] {
  const set = new Set<string>();
  const addPrefixes = (word: string) => {
    const w = word.toLowerCase().trim();
    if (!w) return;
    const min = Math.min(3, w.length);
    for (let i = min; i <= w.length; i++) set.add(w.slice(0, i));
  };
  for (const s of [r.from, r.to, ...r.stops]) {
    for (const w of s.split(/\s+/)) addPrefixes(w);
  }
  set.add(`${r.from} ${r.to}`.toLowerCase());
  set.add(`${r.to} ${r.from}`.toLowerCase());
  return Array.from(set);
}

export async function seedRoutes({
  force = false,
}: { force?: boolean } = {}): Promise<number> {
  const coll = collection(db, "routes");

  if (!force) {
    const existing = await getDocs(query(coll, limit(1)));
    if (!existing.empty) {
      console.log("[seed] routes collection already has data — skipping");
      return 0;
    }
  }

  const batch = writeBatch(db);
  for (const r of ROUTES_SEED) {
    const ref = doc(coll);
    batch.set(ref, {
      ...r,
      popular: r.popular ?? false,
      createdAt: Date.now(),
      searchTerms: buildSearchTerms(r),
    });
  }
  await batch.commit();
  console.log(`[seed] inserted ${ROUTES_SEED.length} routes`);
  return ROUTES_SEED.length;
}
