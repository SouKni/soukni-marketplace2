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
    region: "Casablanca-Settat",
    provinces: [
      {
        name: "Casablanca",
        cities: [
          {
            name: "Casablanca",
            neighborhoods: ["Anfa","Maârif","Gauthier","Racine","Palmier","Ain Diab","CIL","Bourgogne","Belvédère","Hassan II","Sidi Belyout","Centre Ville","Hay Hassani","Oulfa","Lissasfa","Polo","California","Inara","Ain Sebaâ","Hay Mohammadi","Roches Noires","Sidi Bernoussi","Sidi Moumen","Ben M'Sick","Moulay Rachid","Sidi Othmane","Mers Sultan","Derb Sultan","Derb Omar","Habous","Sbata"]
          }
        ]
      },
      {
        name: "Nouaceur",
        cities: [
          { name: "Bouskoura", neighborhoods: ["Ville Verte","Bouskoura Centre","Golf City","Victoria"] },
          { name: "Dar Bouazza", neighborhoods: ["Tamaris","Jackbeach","Errahma"] }
        ]
      },
      {
        name: "Mohammedia",
        cities: [
          { name: "Mohammedia", neighborhoods: ["Kasbah","La Siesta","Monica","Mannesmann","Riad","El Alia","Rachidia"] }
        ]
      },
      {
        name: "El Jadida",
        cities: [
          { name: "El Jadida", neighborhoods: ["Cité Portugaise","Plage","Najmat El Jdida","Sidi Bouzid","Plateau","Koudia"] }
        ]
      }
    ]
  },
  {
    region: "Rabat-Salé-Kénitra",
    provinces: [
      {
        name: "Rabat",
        cities: [
          { name: "Rabat", neighborhoods: ["Agdal","Hay Riad","Hassan","Souissi","Les Orangers","Aviation","Yacoub El Mansour","Takaddoum","Océan","Diour Jamaa","Médina","Kasbah des Oudayas","Hay El Fath","Mabella","Kamra"] }
        ]
      },
      {
        name: "Salé",
        cities: [
          { name: "Salé", neighborhoods: ["Bettana","Tabriquet","Sala Al Jadida","Hay Chmaou","Rmaila","Médina"] }
        ]
      },
      {
        name: "Skhirate-Témara",
        cities: [
          { name: "Témara", neighborhoods: ["Wifaq","Harhoura","Fouarat","Massira","Nassim","Al Mansour"] }
        ]
      },
      {
        name: "Kénitra",
        cities: [
          { name: "Kénitra", neighborhoods: ["Mimosa","Ville Haute","Mehdia","Val Fleuri","Bir Rami","Saknia"] }
        ]
      }
    ]
  },
  {
    region: "Marrakech-Safi",
    provinces: [
      {
        name: "Marrakech",
        cities: [
          { name: "Marrakech", neighborhoods: ["Guéliz","Hivernage","Médina","Palmeraie","Sidi Youssef Ben Ali","Daoudiate","Targa","Agdal","Al Izdirad","Mhamid","Massira","Amerchich","Camp Ghoul","Sidi Ghanem","Sidi Abbad","Azzouzia"] }
        ]
      },
      {
        name: "Essaouira",
        cities: [
          { name: "Essaouira", neighborhoods: ["Médina","Mellah","Diyar My Ali","Borj","Lalla Amina","Ghazoua"] }
        ]
      }
    ]
  },
  {
    region: "Tanger-Tétouan-Al Hoceïma",
    provinces: [
      {
        name: "Tanger-Assilah",
        cities: [
          { name: "Tangier", neighborhoods: ["Malabata","Marshan","Boukhalef","Iberia","Centre Ville","California","Mesnana","Charf","Tanja Balbal","Bni Makada","Médina","Kasbah","Val Fleuri","Gzennaya","Achakkar"] }
        ]
      },
      {
        name: "Tétouan",
        cities: [
          { name: "Tétouan", neighborhoods: ["Médina","Ensanche","Touabel","Sania Ramel","Wilaya","Coelma"] }
        ]
      },
      {
        name: "M'diq-Fnideq",
        cities: [
          { name: "M'diq", neighborhoods: ["Rincón","Kabila","Restinga"] },
          { name: "Martil", neighborhoods: ["Chabar","Miramar","Riad"] }
        ]
      }
    ]
  },
  {
    region: "Souss-Massa",
    provinces: [
      {
        name: "Agadir-Ida Ou Tanane",
        cities: [
          { name: "Agadir", neighborhoods: ["Talborjt","Secteur Touristique","Charaf","Dakhla","Al Houda","Sonaba","Hay Dakhla","Bensergao","Founty","Anza","Illigh","Tikiouine"] },
          { name: "Taghazout", neighborhoods: ["Village","Taghazout Bay"] }
        ]
      }
    ]
  },
  {
    region: "Fès-Meknès",
    provinces: [
      {
        name: "Fès",
        cities: [
          { name: "Fès", neighborhoods: ["Médina","Ville Nouvelle","Saiss","Narjiss","Bensouda","Atlas","Oued Fès","Les Mérinides","Route d'Imouzzer","Sidi Brahim","Fès El Bali","Fès El Jedid"] }
        ]
      },
      {
        name: "Meknès",
        cities: [
          { name: "Meknès", neighborhoods: ["Hamria","Ismaïlia","Marjane","Bassatine","Médina","Toulal","Riad"] }
        ]
      }
    ]
  },
  {
    region: "Oriental",
    provinces: [
      {
        name: "Oujda-Angad",
        cities: [
          { name: "Oujda", neighborhoods: ["Centre Ville","Lazaret","Sidi Maafa","Hay Al Qods","Hay Riad","Médina","Naima"] }
        ]
      }
    ]
  }
]

export const ALL_CITIES = MOROCCO_LOCATIONS.flatMap(r =>
  r.provinces.flatMap(p => p.cities.map(c => c.name))
)

export const ALL_CITIES_WITH_NEIGHBORHOODS = MOROCCO_LOCATIONS.flatMap(r =>
  r.provinces.flatMap(p => p.cities)
)
