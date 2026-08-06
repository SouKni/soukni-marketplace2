export interface City {
  name: string;
  neighborhoods: string[];
}

export interface Province {
  name: string;
  cities: City[];
}

export interface Region {
  region: string;
  provinces: Province[];
}

export const MOROCCO_LOCATIONS: Region[] = [
  {
    "region": "Casablanca-Settat",
    "provinces": [
      {
        "name": "Casablanca",
        "cities": [
          {
            "name": "Casablanca",
            "neighborhoods": [
              "Anfa", "Maârif", "Gauthier", "Racine", "Palmier", "Ain Diab", "CIL",
              "Bourgogne", "Belvédère", "Hassan II", "Sidi Belyout", "Centre Ville",
              "Hay Hassani", "Oulfa", "Lissasfa", "Polo", "California", "Inara",
              "Ain Sebaâ", "Hay Mohammadi", "Roches Noires", "Sidi Bernoussi",
              "Sidi Moumen", "Ben M'Sick", "Moulay Rachid", "Sidi Othmane",
              "Mers Sultan", "Derb Sultan", "Derb Omar", "Habous", "Sbata"
            ]
          }
        ]
      },
      {
        "name": "Nouaceur",
        "cities": [
          {
            "name": "Bouskoura",
            "neighborhoods": ["Ville Verte", "Bouskoura Centre", "Golf City", "Victoria"]
          },
          {
            "name": "Dar Bouazza",
            "neighborhoods": ["Tamaris", "Jackbeach", "Errahma"]
          }
        ]
      },
      {
        "name": "Mohammedia",
        "cities": [
          {
            "name": "Mohammedia",
            "neighborhoods": ["Kasbah", "La Siesta", "Monica", "Mannesmann", "Riad", "El Alia", "Rachidia"]
          }
        ]
      },
      {
        "name": "El Jadida",
        "cities": [
          {
            "name": "El Jadida",
            "neighborhoods": ["Cité Portugaise", "Plage", "Najmat El Jdida", "Sidi Bouzid", "Plateau", "Koudia"]
          }
        ]
      }
    ]
  },
  {
    "region": "Rabat-Salé-Kénitra",
    "provinces": [
      {
        "name": "Rabat",
        "cities": [
          {
            "name": "Rabat",
            "neighborhoods": [
              "Agdal", "Hay Riad", "Hassan", "Souissi", "Les Orangers", "Aviation",
              "Yacoub El Mansour", "Takaddoum", "Océan", "Diour Jamaa", "Médina",
              "Kasbah des Oudayas", "Hay El Fath", "Mabella", "Kamra"
            ]
          }
        ]
      },
      {
        "name": "Salé",
        "cities": [
          {
            "name": "Salé",
            "neighborhoods": ["Bettana", "Tabriquet", "Sala Al Jadida", "Hay Chmaou", "Rmaila", "Médina"]
          }
        ]
      },
      {
        "name": "Skhirate-Témara",
        "cities": [
          {
            "name": "Témara",
            "neighborhoods": ["Wifaq", "Harhoura", "Fouarat", "Massira", "Nassim", "Al Mansour"]
          }
        ]
      },
      {
        "name": "Kénitra",
        "cities": [
          {
            "name": "Kénitra",
            "neighborhoods": ["Mimosa", "Ville Haute", "Mehdia", "Val Fleuri", "Bir Rami", "Saknia"]
          }
        ]
      }
    ]
  },
  {
    "region": "Marrakech-Safi",
    "provinces": [
      {
        "name": "Marrakech",
        "cities": [
          {
            "name": "Marrakech",
            "neighborhoods": [
              "Guéliz", "Hivernage", "Médina", "Palmerai", "Sidi Youssef Ben Ali",
              "Daoudiate", "Targa", "Agdal", "Al Izdirad", "Mhamid", "Massira",
              "Amerchich", "Camp Ghoul", "Sidi Ghanem", "Sidi Abbad", "Azzouzia"
            ]
          }
        ]
      },
      {
        "name": "Essaouira",
        "cities": [
          {
            "name": "Essaouira",
            "neighborhoods": ["Médina", "Mellah", "Diyar My Ali", "Borj", "Lalla Amina", "Ghazoua"]
          }
        ]
      }
    ]
  },
  {
    "region": "Tanger-Tétouan-Al Hoceïma",
    "provinces": [
      {
        "name": "Tanger-Assilah",
        "cities": [
          {
            "name": "Tangier",
            "neighborhoods": [
              "Malabata", "Marshan", "Boukhalef", "Iberia", "Centre Ville", "California",
              "Mesnana", "Charf", "Tanja Balbal", "Bni Makada", "Médina", "Kasbah",
              "Val Fleuri", "Gzennaya", "Achakkar"
            ]
          }
        ]
      },
      {
        "name": "Tétouan",
        "cities": [
          {
            "name": "Tétouan",
            "neighborhoods": ["Médina", "Ensanche", "Touabel", "Sania Ramel", "Wilaya", "Coelma"]
          }
        ]
      },
      {
        "name": "M'diq-Fnideq",
        "cities": [
          {
            "name": "M'diq",
            "neighborhoods": ["Rincón", "Kabila", "Restinga"]
          },
          {
            "name": "Martil",
            "neighborhoods": ["Chabar", "Miramar", "Riad"]
          }
        ]
      }
    ]
  },
  {
    "region": "Souss-Massa",
    "provinces": [
      {
        "name": "Agadir-Ida Ou Tanane",
        "cities": [
          {
            "name": "Agadir",
            "neighborhoods": [
              "Talborjt", "Secteur Touristique", "Charaf", "Dakhla", "Al Houda",
              "Sonaba", "Hay Dakhla", "Bensergao", "Founty", "Anza", "Illigh", "Tikiouine"
            ]
          },
          {
            "name": "Taghazout",
            "neighborhoods": ["Village", "Taghazout Bay"]
          }
        ]
      }
    ]
  }
];

export const ALL_CITIES: string[] = MOROCCO_LOCATIONS.flatMap(region =>
  region.provinces.flatMap(province =>
    province.cities.map(city => city.name)
  )
);

export function getNeighborhoods(cityName: string): string[] {
  for (const region of MOROCCO_LOCATIONS) {
    for (const province of region.provinces) {
      for (const city of province.cities) {
        if (city.name === cityName) {
          return city.neighborhoods;
        }
      }
    }
  }
  return [];
}
