import type { Shelter } from "@/lib/types";

export const shelters: Shelter[] = [
  {
    slug: "patas-do-ivai",
    name: "Abrigo Patas do Ivai",
    city: "Ivaipora",
    address: "Rua das Acacias, 210",
    distanceKm: 3.2,
    dogsAvailable: 18,
    adoptions: 146,
    since: 2019,
    verified: true,
    about:
      "Associacao sem fins lucrativos mantida por voluntarios. Visitas de sabado, das 9h as 15h, com agendamento.",
    visitingHours: "Sab, 9h-15h",
  },
  {
    slug: "lar-amigo-fiel",
    name: "Lar Amigo Fiel",
    city: "Jandaia do Sul",
    address: "Av. Getulio Vargas, 1.480",
    distanceKm: 11,
    dogsAvailable: 24,
    adoptions: 203,
    since: 2016,
    verified: true,
    about: "Abrigo com equipe veterinaria propria e programa de lar temporario.",
    visitingHours: "Sab e dom, 9h-15h",
  },
  {
    slug: "amparo-animal",
    name: "Amparo Animal",
    city: "Apucarana",
    address: "Rua Ponta Grossa, 77",
    distanceKm: 24,
    dogsAvailable: 31,
    adoptions: 318,
    since: 2013,
    verified: false,
    about: "Maior abrigo da regiao, com foco em resgate de rua e castracao comunitaria.",
    visitingHours: "Ter a sab, 13h-17h",
  },
  {
    slug: "sos-quatro-patas",
    name: "SOS Quatro Patas",
    city: "Faxinal",
    address: "Estrada do Cerne, km 12",
    distanceKm: 29,
    dogsAvailable: 9,
    adoptions: 64,
    since: 2021,
    verified: false,
    about: "Grupo de protetores independentes que mantem cerca de dez caes em lar temporario.",
    visitingHours: "Sob agendamento",
  },
];

export function getShelter(slug: string) {
  return shelters.find((s) => s.slug === slug);
}
