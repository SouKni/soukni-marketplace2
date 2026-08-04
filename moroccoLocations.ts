export interface Region {
  region: string;
  cities: string[];
}

export const moroccoLocations: Region[] = [
  {
    region: "Tanger-Tétouan-Al Hoceïma",
    cities: ["Tangier", "Tétouan", "Al Hoceïma", "Chefchaouen", "Larache"]
  },
  {
    region: "L'Oriental",
    cities: ["Oujda", "Nador", "Berkane", "Taourirt"]
  },
  {
    region: "Fès-Meknès",
    cities: ["Fes", "Meknes", "Taza", "Ifrane"]
  },
  {
    region: "Rabat-Salé-Kénitra",
    cities: ["Rabat", "Salé", "Kénitra", "Temara", "Khemisset"]
  },
  {
    region: "Béni Mellal-Khénifra",
    cities: ["Béni Mellal", "Khénifra", "Khouribga"]
  },
  {
    region: "Casablanca-Settat",
    cities: ["Casablanca", "Mohammedia", "El Jadida", "Settat"]
  },
  {
    region: "Marrakesh-Safi",
    cities: ["Marrakesh", "Safi", "Essaouira"]
  },
  {
    region: "Drâa-Tafilalet",
    cities: ["Errachidia", "Ouarzazate", "Zagora"]
  },
  {
    region: "Souss-Massa",
    cities: ["Agadir", "Inezgane", "Taroudant", "Tiznit"]
  },
  {
    region: "Guelmim-Oued Noun",
    cities: ["Guelmim", "Tan-Tan"]
  },
  {
    region: "Laâyoune-Sakia El Hamra",
    cities: ["Laâyoune", "Boujdour"]
  },
  {
    region: "Dakhla-Oued Ed-Dahab",
    cities: ["Dakhla"]
  }
];

export default moroccoLocations;
