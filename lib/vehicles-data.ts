export type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Automatic' | 'Manual';
  bodyType:
    | 'Sedan'
    | 'SUV'
    | 'Truck'
    | 'Hatchback'
    | 'Coupe'
    | 'Convertible'
    | 'Wagon';
  color: string;
  description: string;
  features: string[];
  images: string[];
};

// This is mock data - in a real application, this would come from your database
export const vehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25945,
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Silver',
    description:
      'Well-maintained Toyota Camry with low mileage. Features include backup camera, Bluetooth connectivity, and more.',
    features: [
      'Backup Camera',
      'Bluetooth',
      'Cruise Control',
      'Power Windows',
      'Keyless Entry'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 2,
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 28500,
    mileage: 22000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Blue',
    description:
      'Spacious Honda CR-V with excellent fuel economy and plenty of cargo space.',
    features: [
      'All-Wheel Drive',
      'Backup Camera',
      'Heated Seats',
      'Apple CarPlay',
      'Android Auto'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 39990,
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'Red',
    description:
      'Nearly new Tesla Model 3 with premium autopilot features and long-range battery.',
    features: [
      'Autopilot',
      'Premium Sound System',
      'Glass Roof',
      'Heated Seats',
      'Navigation'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 4,
    make: 'Ford',
    model: 'F-150',
    year: 2020,
    price: 35750,
    mileage: 30000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Truck',
    color: 'Black',
    description:
      'Powerful Ford F-150 with towing package and bed liner. Perfect for work or play.',
    features: [
      'Towing Package',
      'Bed Liner',
      'Backup Camera',
      'Bluetooth',
      '4-Wheel Drive'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 5,
    make: 'BMW',
    model: '3 Series',
    year: 2021,
    price: 42000,
    mileage: 18000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    color: 'White',
    description:
      'Luxury BMW 3 Series with premium features and sporty handling.',
    features: [
      'Leather Seats',
      'Sunroof',
      'Navigation',
      'Premium Sound System',
      'Parking Sensors'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 6,
    make: 'Toyota',
    model: 'RAV4 Hybrid',
    year: 2022,
    price: 32500,
    mileage: 12000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Green',
    description:
      'Eco-friendly Toyota RAV4 Hybrid with excellent fuel efficiency and spacious interior.',
    features: [
      'All-Wheel Drive',
      'Backup Camera',
      'Lane Departure Warning',
      'Adaptive Cruise Control',
      'Keyless Entry'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 7,
    make: 'Mazda',
    model: 'CX-5',
    year: 2021,
    price: 27999,
    mileage: 25000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Red',
    description:
      'Stylish Mazda CX-5 with upscale interior and engaging driving dynamics.',
    features: [
      'Leather Seats',
      'Bluetooth',
      'Backup Camera',
      'Blind Spot Monitoring',
      'Sunroof'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  },
  {
    id: 8,
    make: 'Chevrolet',
    model: 'Bolt EV',
    year: 2022,
    price: 31995,
    mileage: 8000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    color: 'Blue',
    description:
      'All-electric Chevrolet Bolt EV with impressive range and tech features.',
    features: [
      'Quick Charging',
      'Heated Seats',
      'Apple CarPlay',
      'Android Auto',
      'Backup Camera'
    ],
    images: ['/placeholder.svg', '/placeholder.svg']
  }
];

export function getAllVehicles() {
  return vehicles;
}

export function getVehicleById(id: number) {
  return vehicles.find((Vehicle) => Vehicle.id === id);
}

export function getFilteredVehicles({
  make,
  model,
  minYear,
  maxYear,
  minPrice,
  maxPrice,
  bodyType,
  fuelType,
  transmission
}: {
  make?: string;
  model?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  bodyType?: string;
  fuelType?: string;
  transmission?: string;
}) {
  return vehicles.filter((Vehicle) => {
    // Apply each filter if it's defined
    if (make && Vehicle.make.toLowerCase() !== make.toLowerCase()) return false;
    if (model && Vehicle.model.toLowerCase() !== model.toLowerCase())
      return false;
    if (minYear && Vehicle.year < minYear) return false;
    if (maxYear && Vehicle.year > maxYear) return false;
    if (minPrice && Vehicle.price < minPrice) return false;
    if (maxPrice && Vehicle.price > maxPrice) return false;
    if (bodyType && Vehicle.bodyType !== bodyType) return false;
    if (fuelType && Vehicle.fuelType !== fuelType) return false;
    if (transmission && Vehicle.transmission !== transmission) return false;

    return true;
  });
}

export function getUniqueMakes() {
  return [...new Set(vehicles.map((Vehicle) => Vehicle.make))];
}

export function getUniqueModels() {
  return [...new Set(vehicles.map((Vehicle) => Vehicle.model))];
}

export function getMinMaxYear() {
  const years = vehicles.map((Vehicle) => Vehicle.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years)
  };
}

export function getMinMaxPrice() {
  const prices = vehicles.map((Vehicle) => Vehicle.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

export function getUniqueBodyTypes() {
  return [...new Set(vehicles.map((Vehicle) => Vehicle.bodyType))];
}

export function getUniqueFuelTypes() {
  return [...new Set(vehicles.map((Vehicle) => Vehicle.fuelType))];
}

export function getUniqueTransmissions() {
  return [...new Set(vehicles.map((Vehicle) => Vehicle.transmission))];
}
