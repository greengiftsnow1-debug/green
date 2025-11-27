// src/utils/distanceData.ts

// Approximate distance in km from each store PIN to customer PIN.
// You can tweak these values anytime based on your real delivery experience.

export const distanceMap: Record<string, Record<string, number>> = {
  // 🟢 Store 1: Shubham Nursery Patel Nagar (462022)
  "462022": {
    // Very close / same belt
    "462022": 1,
    "462023": 4, // Govindpura
    "462024": 4, // HE Hospital
    "462021": 4, // Anand Nagar
    "462020": 5, // AIIMS
    "462026": 7, // Misrod / C21 side
    "462010": 7, // Nishatpura / Chandbad
    "462036": 10, // Gandhi Nagar

    // Old city & central
    "462001": 7,
    "462003": 6,
    "462004": 7,
    "462008": 7,
    "462011": 7,
    "462016": 7,
    "462013": 8,

    // Kolar & Hoshangabad Road side
    "462042": 9,
    "462039": 9,
    "462037": 9,
    "462041": 11,
    "462043": 11,
    "462047": 12,
    "462045": 13,

    // Outer / rural-ish belt
    "462101": 18,
    "462046": 16,
    "462044": 14,
    "462066": 14,
    "462420": 22
  },

  // 🔵 Store 2: Shubham Nursery C21 Mall (462026)
  "462026": {
    // Very close / same belt
    "462026": 1,
    "462039": 3,
    "462042": 4,
    "462037": 4,
    "462041": 6,
    "462043": 6,
    "462047": 6,
    "462045": 8,

    // BHEL / Govindpura / AIIMS side
    "462022": 7,
    "462023": 7,
    "462024": 8,
    "462021": 8,
    "462020": 7,

    // Old city & central
    "462001": 9,
    "462003": 8,
    "462004": 9,
    "462008": 10,
    "462011": 8,
    "462016": 8,
    "462013": 9,
    "462010": 9,
    "462036": 11,

    // Outer belt
    "462066": 10,
    "462046": 18,
    "462044": 15,
    "462101": 22,
    "462420": 25
  }
};
