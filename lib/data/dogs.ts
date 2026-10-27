import type { Dog } from "@/lib/types";

export const dogs: Dog[] = [
  {
    slug: "pipoca", name: "Pipoca", breed: "Poodle", size: "pequeno", coat: "branco", sex: "femea",
    ageYears: 2, ageBand: "adulto", weightKg: 7, energy: 0.5, goodWithKids: true, goodWithPets: true,
    specialNeeds: null, neutered: true, vaccinated: true,
    story: "Resgatada em Jardim Alegre no fim de 2025. Convive bem com outros caes, dorme a noite inteira e ja sabe passear na guia. Prefere casa com quintal cercado.",
    shelterSlug: "patas-do-ivai", distanceKm: 3.2, photoTone: "1.jpg",
  },
  {
    slug: "nino", name: "Nino", breed: "SRD", size: "pequeno", coat: "caramelo", sex: "macho",
    ageYears: 4, ageBand: "adulto", weightKg: 9.2, energy: 0.28, goodWithKids: true, goodWithPets: true,
    specialNeeds: null, neutered: true, vaccinated: true,
    story: "Muito calmo, ideal para apartamento. Foi entregue pelo tutor anterior por mudanca de cidade.",
    shelterSlug: "lar-amigo-fiel", distanceKm: 11, photoTone: "2.jpg",
  },
  {
    slug: "aurora", name: "Aurora", breed: "Shih Tzu", size: "pequeno", coat: "branco", sex: "femea",
    ageYears: 6, ageBand: "adulto", weightKg: 6.8, energy: 0.35, goodWithKids: true, goodWithPets: false,
    specialNeeds: "Medicacao diaria para tireoide", neutered: true, vaccinated: true,
    story: "Doce e grudenta. Precisa de um comprimido por dia, fornecido pelo abrigo nos primeiros meses.",
    shelterSlug: "patas-do-ivai", distanceKm: 3.2, photoTone: "3.jpg",
  },
  {
    slug: "tico", name: "Tico", breed: "Pinscher", size: "pequeno", coat: "preto", sex: "macho",
    ageYears: 1, ageBand: "filhote", weightKg: 4.1, energy: 0.82, goodWithKids: false, goodWithPets: true,
    specialNeeds: null, neutered: false, vaccinated: true,
    story: "Cheio de energia, adora brincar de buscar. Ainda em fase de adestramento basico.",
    shelterSlug: "amparo-animal", distanceKm: 24, photoTone: "4.jpg", adopted: true,
  },
  {
    slug: "zelda", name: "Zelda", breed: "Maltes", size: "pequeno", coat: "branco", sex: "femea",
    ageYears: 3, ageBand: "adulto", weightKg: 6.4, energy: 0.58, goodWithKids: true, goodWithPets: true,
    specialNeeds: null, neutered: true, vaccinated: true,
    story: "Resgatada em maio, muito docil e sociavel. Ja esta castrada e com vacinas em dia.",
    shelterSlug: "lar-amigo-fiel", distanceKm: 11, photoTone: "5.jpg",
  },
  {
    slug: "bento", name: "Bento", breed: "SRD", size: "medio", coat: "bicolor", sex: "macho",
    ageYears: 5, ageBand: "adulto", weightKg: 18, energy: 0.44, goodWithKids: true, goodWithPets: true,
    specialNeeds: null, neutered: true, vaccinated: true,
    story: "Companheiro tranquilo, acostumado a criancas. Esta no abrigo ha dois anos.",
    shelterSlug: "patas-do-ivai", distanceKm: 3.2, photoTone: "6.jpg",
  },
  {
    slug: "maia", name: "Maia", breed: "Border Collie mix", size: "medio", coat: "bicolor", sex: "femea",
    ageYears: 2, ageBand: "adulto", weightKg: 16.5, energy: 0.9, goodWithKids: true, goodWithPets: true,
    specialNeeds: null, neutered: true, vaccinated: true,
    story: "Muito inteligente e ativa. Precisa de tutores que caminhem todos os dias.",
    shelterSlug: "amparo-animal", distanceKm: 24, photoTone: "7.jpg",
  },
  {
    slug: "urso", name: "Urso", breed: "SRD", size: "grande", coat: "marrom", sex: "macho",
    ageYears: 7, ageBand: "idoso", weightKg: 32, energy: 0.22, goodWithKids: true, goodWithPets: false,
    specialNeeds: "Artrose leve nas patas traseiras", neutered: true, vaccinated: true,
    story: "O mais velho da casa. Dorme muito, late pouco e adora companhia humana.",
    shelterSlug: "sos-quatro-patas", distanceKm: 29, photoTone: "8.jpg",
  },
];

export function getDog(slug: string) {
  return dogs.find((d) => d.slug === slug);
}

export function dogsByShelter(shelterSlug: string) {
  return dogs.filter((d) => d.shelterSlug === shelterSlug && !d.adopted);
}
