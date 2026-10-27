import type { Preferences } from "@/lib/types";

export const defaultPreferences: Preferences = {
  sizes: ["pequeno"],
  coats: ["branco"],
  ages: ["adulto"],
  sexes: ["femea"],
  energy: 0.34,
  goodWithKids: true,
  goodWithPets: true,
  acceptSpecialNeeds: false,
  maxDistanceKm: 30,
};
