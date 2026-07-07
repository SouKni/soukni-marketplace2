export const cities = [
  "Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Meknès",
  "Mohammedia", "Oujda", "Kénitra", "Tétouan", "Salé", "Temara", "Khouribga",
  "Laâyoune", "Safi", "Beni Mellal", "El Jadida", "Taza", "Nador", "Settat",
  "Ksar El Kebir", "Larache", "Khemisset", "Tiznit", "Berrechid", "Oued Zem",
  "Taourirt", "Berkane", "Sidi Slimane", "Errachidia", "Sidi Kacem", "Khenifra",
  "Tiflet", "Essaouira", "Taroudant", "Oulad Teima", "Sefrou", "Ben Guerir",
  "Tan-Tan", "Ouazzane", "Guercif", "Ouarzazate", "Al Hoceïma", "Chefchaouen",
  "Fnidek", "Ifrane", "Asilah", "Azrou", "Guelmim", "Dakhla", "Taghazout",
  "Skhirate", "Midelt", "Inezgane", "Zagora", "Bouznika", "Bouskoura",
  "Mediouna", "Tinghir", "Azemmour", "Saidia",
]

export const quartiersCasablanca = [
  "Californie", "Anfa", "Val d'Anfa", "Ain Diab", "Racine", "Gauthier",
  "Bourgogne", "Beauséjour", "Nassim", "Triangle d'Or", "Longchamps",
  "Palmier", "Maarif", "Maârif Extension", "Abdelmoumen", "Oasis",
  "Casablanca Finance City", "Marina", "Les Princesses",
  "Centre Ville", "Mers Sultan", "Hôpitaux", "Belvédère", "Hippodrome",
  "Hermitage", "La Gironde", "Sidi Belyout", "Ben Ejdia", "2 Mars",
  "Hay Mohammadi", "Lusitania", "Tantonville", "Alsace Lorraine",
  "Ain Sebaa", "Roches Noires", "Sidi Bernoussi", "Sidi Moumen",
  "Ben M'sick", "Bachkou", "Industriel Nord",
  "Hay Hassani", "Oulfa", "Lissasfa", "Hay Moulay Rachid", "Errahma",
  "Aïn Chock", "Aïn Borja", "Sbata", "Hay Albaraka", "Hay Chrifa",
  "Sidi Othmane", "Bournazil", "Al Fida", "Sidi Maarouf", "Al Qods",
  "Route d'El Jadida", "Route d'Azemmour",
  "Val Fleuri", "Al Madina Aljadida", "Al Mostakbal", "Bouskoura",
  "Mediouna", "Sour Jdid",
]

export const quartiersByCity: Record<string, string[]> = {
  Casablanca: quartiersCasablanca,
  Rabat: [
    "Agdal", "Hay Riad", "Souissi", "Hassan", "Centre Ville",
    "Océan", "Orangers", "Aviation", "Akkari", "Youssoufia",
    "Diour Jamaa", "Madinat Al Irfane", "Hay Nahda",
  ],
  Marrakech: [
    "Guéliz", "Hivernage", "Médina", "Mellah", "Agdal",
    "Palmeraie", "Massira", "M'Hamid", "Targa", "Hay Mohammadi",
    "Semlalia", "Sidi Youssef Ben Ali",
  ],
  Tanger: [
    "Centre Ville", "Malabata", "California", "Marchane",
    "Dradeb", "Béni Makada", "Val Fleuri", "Iberia",
    "Moujahidine", "Médina", "Rmilat",
  ],
  Agadir: [
    "Centre Ville", "Founty", "Hay Mohammadi", "Tilila",
    "Anza", "Dcheira", "Hay Almassira", "Secteur Touristique",
    "Cité Suisse", "Lazaret", "Inezgane",
  ],
  Fès: [
    "Médina", "Ville Nouvelle", "Les Orangers", "Narjiss",
    "Saiss", "Route Sefrou", "Dhar El Mahraz", "Ben Souda",
  ],
  Meknès: [
    "Centre Ville", "Médina", "Hamria", "Hay Zitoune",
    "Hay Salam", "Ville Nouvelle",
  ],
  Salé: [
    "Tabriquet", "Hay Salam", "Médina", "Bettana",
    "Hay Karima", "Hay Arrahma",
  ],
}
