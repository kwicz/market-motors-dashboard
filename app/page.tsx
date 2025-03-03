import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function HomePage() {
  // Featured vehicles could come from your database
  const featuredVehicles = [
    {
      id: 1,
      name: 'Tesla Model 3',
      price: '$39,990',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Ford Mustang',
      price: '$27,205',
      image: '/placeholder.svg'
    },
    { id: 3, name: 'Toyota Camry', price: '$25,945', image: '/placeholder.svg' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg"
            alt="Hero car"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-4 md:px-8 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Perfect Drive
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our extensive collection of premium vehicles with flexible
            financing options
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <Button size="lg" className="text-lg px-8">
                Browse All Vehicles
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium vehicles, each
            offering exceptional performance and value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              className="overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video relative">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                <p className="text-gray-500 mb-4">
                  Starting at {vehicle.price}
                </p>
                <Link href={`/vehicles/${vehicle.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/vehicles">
            <Button variant="outline" size="lg">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best car buying experience with
              transparent pricing and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Every vehicle undergoes a comprehensive 150-point inspection
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Financing</h3>
              <p className="text-gray-600">
                Competitive rates and personalized payment plans for every
                budget
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Dedicated customer service team ready to assist you anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
