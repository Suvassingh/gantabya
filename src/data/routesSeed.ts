export type VehicleType = "sajha" | "micro" | "tempo";

export type SeedRoute = {
  from: string;
  to: string;
  stops: string[];
  vehicles: VehicleType[];
  fare: number;
  durationMinutes: number;
  popular?: boolean;
};

export const ROUTES_SEED: SeedRoute[] = [
  {
    from: "Kalanki",
    to: "Ratnapark",
    stops: ["Kalanki", "Kalimati", "Tripureshwor", "Sundhara", "Ratnapark"],
    vehicles: ["sajha"],
    fare: 25,
    durationMinutes: 30,
    popular: true,
  },
  {
    from: "Ratnapark",
    to: "Kalanki",
    stops: ["Ratnapark", "Sundhara", "Tripureshwor", "Kalimati", "Kalanki"],
    vehicles: ["sajha"],
    fare: 25,
    durationMinutes: 30,
  },
  {
    from: "Koteshwor",
    to: "Ratnapark",
    stops: ["Koteshwor", "Tinkune", "Baneshwor", "Maitighar", "Ratnapark"],
    vehicles: ["micro"],
    fare: 30,
    durationMinutes: 40,
    popular: true,
  },
  {
    from: "Ratnapark",
    to: "Koteshwor",
    stops: ["Ratnapark", "Maitighar", "Baneshwor", "Tinkune", "Koteshwor"],
    vehicles: ["micro"],
    fare: 30,
    durationMinutes: 40,
  },
  {
    from: "Lagankhel",
    to: "Ratnapark",
    stops: ["Lagankhel", "Kupondole", "Thapathali", "Maitighar", "Ratnapark"],
    vehicles: ["tempo"],
    fare: 35,
    durationMinutes: 45,
    popular: true,
  },
  {
    from: "Ratnapark",
    to: "Lagankhel",
    stops: ["Ratnapark", "Maitighar", "Thapathali", "Kupondole", "Lagankhel"],
    vehicles: ["tempo"],
    fare: 35,
    durationMinutes: 45,
  },
  {
    from: "Balkhu",
    to: "Kalanki",
    stops: ["Balkhu", "Kalimati", "Kalanki"],
    vehicles: ["sajha"],
    fare: 20,
    durationMinutes: 15,
  },
  {
    from: "Kalanki",
    to: "Balkhu",
    stops: ["Kalanki", "Kalimati", "Balkhu"],
    vehicles: ["sajha"],
    fare: 20,
    durationMinutes: 15,
  },
  {
    from: "Chabahil",
    to: "Ratnapark",
    stops: ["Chabahil", "Gaushala", "Maitighar", "Ratnapark"],
    vehicles: ["micro"],
    fare: 25,
    durationMinutes: 30,
  },
  {
    from: "Ratnapark",
    to: "Chabahil",
    stops: ["Ratnapark", "Maitighar", "Gaushala", "Chabahil"],
    vehicles: ["micro"],
    fare: 25,
    durationMinutes: 30,
  },
  {
    from: "Boudha",
    to: "Ratnapark",
    stops: ["Boudha", "Chabahil", "Gaushala", "Ratnapark"],
    vehicles: ["micro"],
    fare: 30,
    durationMinutes: 35,
  },
  {
    from: "Gongabu",
    to: "Ratnapark",
    stops: ["Gongabu", "Balaju", "Lainchaur", "Ratnapark"],
    vehicles: ["tempo"],
    fare: 25,
    durationMinutes: 30,
    popular: true,
  },
  {
    from: "Patan Dhoka",
    to: "Lagankhel",
    stops: ["Patan Dhoka", "Pulchowk", "Lagankhel"],
    vehicles: ["tempo"],
    fare: 15,
    durationMinutes: 10,
  },
  {
    from: "Kalimati",
    to: "Kalanki",
    stops: ["Kalimati", "Balkhu", "Kalanki"],
    vehicles: ["sajha"],
    fare: 15,
    durationMinutes: 10,
  },
  {
    from: "Satdobato",
    to: "Lagankhel",
    stops: ["Satdobato", "Ekantakuna", "Lagankhel"],
    vehicles: ["tempo"],
    fare: 20,
    durationMinutes: 20,
  },
];
