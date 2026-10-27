import type { Dog, Preferences } from "@/lib/types";

const WEIGHTS = {
  size: 26,
  coat: 18,
  age: 10,
  sex: 6,
  energy: 16,
  kids: 10,
  pets: 8,
  special: 6,
};

/** Pontuacao 0-100 de compatibilidade entre um cao e as preferencias do adotante. */
export function matchScore(dog: Dog, prefs: Preferences): number {
  let score = 0;
  let total = 0;

  total += WEIGHTS.size;
  if (!prefs.sizes.length || prefs.sizes.includes(dog.size)) score += WEIGHTS.size;

  total += WEIGHTS.coat;
  if (!prefs.coats.length || prefs.coats.includes(dog.coat)) score += WEIGHTS.coat;

  total += WEIGHTS.age;
  if (!prefs.ages.length || prefs.ages.includes(dog.ageBand)) score += WEIGHTS.age;

  total += WEIGHTS.sex;
  if (!prefs.sexes.length || prefs.sexes.includes(dog.sex)) score += WEIGHTS.sex;

  total += WEIGHTS.energy;
  score += WEIGHTS.energy * (1 - Math.min(1, Math.abs(dog.energy - prefs.energy) / 0.6));

  total += WEIGHTS.kids;
  if (!prefs.goodWithKids || dog.goodWithKids) score += WEIGHTS.kids;

  total += WEIGHTS.pets;
  if (!prefs.goodWithPets || dog.goodWithPets) score += WEIGHTS.pets;

  total += WEIGHTS.special;
  if (prefs.acceptSpecialNeeds || !dog.specialNeeds) score += WEIGHTS.special;

  const distancePenalty = dog.distanceKm > prefs.maxDistanceKm ? 0.85 : 1;
  return Math.round((score / total) * 100 * distancePenalty);
}

export function rankDogs(dogs: Dog[], prefs: Preferences) {
  return dogs
    .filter((d) => !d.adopted)
    .map((dog) => ({ dog, score: matchScore(dog, prefs) }))
    .sort((a, b) => b.score - a.score);
}

export const sizeLabel = { pequeno: "Pequeno", medio: "Medio", grande: "Grande" } as const;
export const coatLabel = {
  branco: "Branco", caramelo: "Caramelo", marrom: "Marrom", preto: "Preto", bicolor: "Bicolor",
} as const;
export const coatSwatch = {
  branco: "#FFFFFF", caramelo: "#E4C48A", marrom: "#6B5A4A", preto: "#2B2B2B",
  bicolor: "linear-gradient(90deg,#2B2B2B 50%,#FFF 50%)",
} as const;
export const sexLabel = { femea: "Femea", macho: "Macho" } as const;
export const ageLabel = { filhote: "Filhote", adulto: "Adulto", idoso: "Idoso" } as const;
export const photoTone = { 1: "#DCD3C7", 2: "#D6CFC4", 3: "#E0D8CB", 4: "#D2CABE" } as const;
