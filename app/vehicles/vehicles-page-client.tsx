'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getAllVehicles,
  getFilteredVehicles,
  getUniqueMakes,
  getUniqueBodyTypes,
  getUniqueFuelTypes,
  getMinMaxPrice,
  getMinMaxYear,
  getUniqueTransmissions,
  Vehicle
} from '@/lib/vehicles-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [make, setMake] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minYear, setMinYear] = useState<number | undefined>();
  const [maxYear, setMaxYear] = useState<number | undefined>();
  const [bodyType, setBodyType] = useState<string>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price-low');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Filter options
  const makes = getUniqueMakes();
  const bodyTypes = getUniqueBodyTypes();
  const fuelTypes = getUniqueFuelTypes();
  const transmissions = getUniqueTransmissions();
  const priceRange = getMinMaxPrice();
  const yearRange = getMinMaxYear();

  useEffect(() => {
    // Apply filters and sorting
    let filteredVehicles = getFilteredVehicles({
      make: make || undefined,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      bodyType: bodyType || undefined,
      fuelType: fuelType || undefined,
      transmission: transmission || undefined
    });

    // Apply sorting
    if (sortBy === 'price-low') {
      filteredVehicles.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filteredVehicles.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'year-new') {
      filteredVehicles.sort((a, b) => b.year - a.year);
    } else if (sortBy === 'year-old') {
      filteredVehicles.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'mileage-low') {
      filteredVehicles.sort((a, b) => a.mileage - b.mileage);
    }

    setVehicles(filteredVehicles);
    setLoading(false);
  }, [
    make,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    bodyType,
    fuelType,
    transmission,
    sortBy
  ]);

  const handleReset = () => {
    setMake('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setMinYear(undefined);
    setMaxYear(undefined);
    setBodyType('');
    setFuelType('');
    setTransmission('');
    setSortBy('price-low');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={handleReset}
          >
            Reset Filters
          </Button>
        </div>

        <div className="space-y-6">
          {/* Make Filter */}
          <div>
            <h3 className="font-medium mb-2">Make</h3>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            >
              <option value="">All Makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-500">Min</label>
                <Input
                  type="number"
                  placeholder={priceRange.min.toString()}
                  value={minPrice || ''}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Max</label>
                <Input
                  type="number"
                  placeholder={priceRange.max.toString()}
                  value={maxPrice || ''}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Year Range Filter */}
          <div>
            <h3 className="font-medium mb-2">Year</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-500">Min</label>
                <Input
                  type="number"
                  placeholder={yearRange.min.toString()}
                  value={minYear || ''}
                  onChange={(e) =>
                    setMinYear(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Max</label>
                <Input
                  type="number"
                  placeholder={yearRange.max.toString()}
                  value={maxYear || ''}
                  onChange={(e) =>
                    setMaxYear(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Body Type Filter */}
          <div>
            <h3 className="font-medium mb-2">Body Type</h3>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
            >
              <option value="">All Body Types</option>
              {bodyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel Type Filter */}
          <div>
            <h3 className="font-medium mb-2">Fuel Type</h3>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Transmission Filter */}
          <div>
            <h3 className="font-medium mb-2">Transmission</h3>
            <select
              className="w-full rounded-md border border-gray-300 p-2"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">All Transmissions</option>
              {transmissions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vehicles Listing */}
      <div className="md:col-span-3">
        {/* Sort and View Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-gray-500">Sort by:</span>
            <select
              className="rounded-md border border-gray-300 p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-500">View:</span>
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('grid')}
            >
              Grid
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-500">{vehicles.length} vehicles found</p>
        </div>

        {/* Vehicle Cards */}
        {loading ? (
          <div className="text-center py-12">Loading vehicles...</div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to see more results.
            </p>
            <Button onClick={handleReset}>Reset Filters</Button>
          </div>
        ) : (
          <div
            className={
              view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-6'
            }
          >
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={view === 'list' ? 'overflow-hidden' : ''}
              >
                {view === 'grid' ? (
                  // Grid View
                  <>
                    <div className="aspect-video relative">
                      <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary">{vehicle.year}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <h3 className="text-lg font-semibold">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{vehicle.bodyType}</Badge>
                        <Badge variant="outline">{vehicle.fuelType}</Badge>
                        <Badge variant="outline">{vehicle.transmission}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {vehicle.mileage.toLocaleString()} miles
                      </p>
                      <Link href={`/vehicles/${vehicle.id}`}>
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardContent>
                  </>
                ) : (
                  // List View
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                      <Image
                        src={vehicle.images[0]}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary">{vehicle.year}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 md:w-2/3 flex flex-col">
                      <div className="mb-2 flex flex-col md:flex-row md:justify-between md:items-start">
                        <h3 className="text-lg font-semibold mb-1 md:mb-0">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-xl font-bold text-primary">
                          {formatPrice(vehicle.price)}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{vehicle.bodyType}</Badge>
                        <Badge variant="outline">{vehicle.fuelType}</Badge>
                        <Badge variant="outline">{vehicle.transmission}</Badge>
                        <Badge variant="outline">
                          {vehicle.mileage.toLocaleString()} miles
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-4 flex-grow">
                        {vehicle.description.substring(0, 120)}
                        {vehicle.description.length > 120 ? '...' : ''}
                      </p>
                      <div className="flex justify-end">
                        <Link href={`/vehicles/${vehicle.id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Pagination - could be implemented for large datasets */}
        {!loading && vehicles.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
