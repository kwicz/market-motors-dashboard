import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getVehicleById } from '@/lib/vehicles-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  params: {
    vehicleId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicleId = parseInt(params.vehicleId);
  const vehicle = getVehicleById(vehicleId);

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found'
    };
  }

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} | Vehicle Dealership`,
    description: vehicle.description
  };
}

export default function VehicleDetailPage({ params }: Props) {
  const vehicleId = parseInt(params.vehicleId);
  const vehicle = getVehicleById(vehicleId);

  if (!vehicle) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    href="/vehicles"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Vehicles
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Vehicle Title and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <div className="text-3xl font-bold text-primary">
            {formatPrice(vehicle.price)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={vehicle.images[0]}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                {vehicle.images.length > 1 && (
                  <div className="flex p-2 gap-2 overflow-x-auto">
                    {vehicle.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-24 h-16 relative flex-shrink-0"
                      >
                        <Image
                          src={image}
                          alt={`${vehicle.make} ${vehicle.model} view ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded border-2 border-transparent hover:border-primary cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Vehicle Details Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="overview">
                  <TabsList className="w-full grid grid-cols-3 rounded-none">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="specifications">
                      Specifications
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Vehicle Overview
                    </h2>
                    <p className="text-gray-700 mb-6">{vehicle.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Make</span>
                        <span className="font-medium">{vehicle.make}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Model</span>
                        <span className="font-medium">{vehicle.model}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Year</span>
                        <span className="font-medium">{vehicle.year}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Mileage</span>
                        <span className="font-medium">
                          {vehicle.mileage.toLocaleString()} miles
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Body Type</span>
                        <span className="font-medium">{vehicle.bodyType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Fuel Type</span>
                        <span className="font-medium">{vehicle.fuelType}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          Transmission
                        </span>
                        <span className="font-medium">
                          {vehicle.transmission}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Color</span>
                        <span className="font-medium">{vehicle.color}</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Features & Options
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="specifications" className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Technical Specifications
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Performance</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Engine
                            </span>
                            <span className="font-medium">
                              {vehicle.fuelType === 'Electric'
                                ? 'Electric Motor'
                                : vehicle.fuelType === 'Hybrid'
                                  ? 'Hybrid System'
                                  : `${vehicle.make} ${vehicle.fuelType} Engine`}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Transmission
                            </span>
                            <span className="font-medium">
                              {vehicle.transmission}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Drive Type
                            </span>
                            <span className="font-medium">
                              {vehicle.make === 'Tesla'
                                ? 'All-Wheel Drive'
                                : vehicle.bodyType === 'Truck'
                                  ? '4x4'
                                  : 'Front-Wheel Drive'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Fuel Economy
                            </span>
                            <span className="font-medium">
                              {vehicle.fuelType === 'Electric'
                                ? '120 MPGe'
                                : vehicle.fuelType === 'Hybrid'
                                  ? '44 MPG Combined'
                                  : '24 MPG Combined'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Dimensions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Length
                            </span>
                            <span className="font-medium">
                              {vehicle.bodyType === 'Truck'
                                ? '231.7 in'
                                : vehicle.bodyType === 'SUV'
                                  ? '190.7 in'
                                  : '185.4 in'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">Width</span>
                            <span className="font-medium">
                              {vehicle.bodyType === 'Truck'
                                ? '79.9 in'
                                : vehicle.bodyType === 'SUV'
                                  ? '75.8 in'
                                  : '72.4 in'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Height
                            </span>
                            <span className="font-medium">
                              {vehicle.bodyType === 'Truck'
                                ? '75.6 in'
                                : vehicle.bodyType === 'SUV'
                                  ? '68.1 in'
                                  : '56.9 in'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500 text-sm">
                              Cargo Space
                            </span>
                            <span className="font-medium">
                              {vehicle.bodyType === 'Truck'
                                ? 'Bed: 67.0 cu ft'
                                : vehicle.bodyType === 'SUV'
                                  ? '37.6 cu ft'
                                  : vehicle.bodyType === 'Hatchback'
                                    ? '24.5 cu ft'
                                    : '16.7 cu ft'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Interested in this vehicle?
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out this form and our team will get back to you shortly.
                </p>

                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 p-2"
                      placeholder="I'm interested in this vehicle. Please contact me."
                    />
                  </div>

                  <Button className="w-full">Send Inquiry</Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Vehicle Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Stock #:</span>
                    <span className="font-medium">VD{vehicle.id}2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-medium">
                      1HD{vehicle.id}A{vehicle.year}CD123456
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Condition:</span>
                    <Badge>
                      {vehicle.mileage < 10000 ? 'Like New' : 'Used'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Exterior Color:</span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fuel Type:</span>
                    <span className="font-medium">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-medium">
                      {vehicle.mileage.toLocaleString()} miles
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financing Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Financing Options
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">
                      Estimated monthly payment:
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(Math.round(vehicle.price / 60))}
                      <span className="text-gray-500 text-sm font-normal">
                        /mo
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      for 60 months with $0 down
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <Button className="w-full mb-2">Apply for Financing</Button>
                    <Button variant="outline" className="w-full">
                      Calculate Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          {/* In a real application, you would fetch similar vehicles based on this vehicle's attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="aspect-video relative">
                  <Image
                    src="/placeholder.svg"
                    alt="Similar vehicle"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    Similar {vehicle.make} {vehicle.bodyType}
                  </h3>
                  <p className="text-primary font-bold mt-1">
                    {formatPrice(vehicle.price - 5000 + i * 2000)}
                  </p>
                  <div className="flex flex-wrap gap-2 my-2">
                    <Badge variant="outline">2022</Badge>
                    <Badge variant="outline">
                      {(vehicle.mileage - 5000 + i * 3000).toLocaleString()} mi
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
