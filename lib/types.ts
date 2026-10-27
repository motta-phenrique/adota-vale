export type Size = "pequeno" | "medio" | "grande";
export type Coat = "branco" | "caramelo" | "marrom" | "preto" | "bicolor";
export type Sex = "femea" | "macho";
export type AgeBand = "filhote" | "adulto" | "idoso";

export interface Dog {
  slug: string;
  name: string;
  breed: string;
  size: Size;
  coat: Coat;
  sex: Sex;
  ageYears: number;
  ageBand: AgeBand;
  weightKg: number;
  energy: number;
  goodWithKids: boolean;
  goodWithPets: boolean;
  specialNeeds: string | null;
  neutered: boolean;
  vaccinated: boolean;
  story: string;
  shelterSlug: string;
  distanceKm: number;
  photoTone: string;
  adopted?: boolean;
}

export interface Shelter {
  slug: string;
  name: string;
  city: string;
  address: string;
  distanceKm: number;
  dogsAvailable: number;
  adoptions: number;
  since: number;
  verified: boolean;
  about: string;
  visitingHours: string;
}

export interface Preferences {
  sizes: Size[];
  coats: Coat[];
  ages: AgeBand[];
  sexes: Sex[];
  energy: number;
  goodWithKids: boolean;
  goodWithPets: boolean;
  acceptSpecialNeeds: boolean;
  maxDistanceKm: number;
}
