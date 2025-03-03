import { Metadata } from 'next';
import './globals.css';
import NavBar from './components/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | AutoMotion',
    default: 'AutoMotion - Premium Vehicle Dealership'
  },
  description:
    'Discover your perfect vehicle at AutoMotion. Browse our extensive inventory of premium vehicles with flexible financing options.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <NavBar />
        {/* Add padding to account for fixed navbar */}
        <main className="pt-16 md:pt-20">{children}</main>
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">AutoMotion</h3>
                <p className="text-gray-300">
                  Premium vehicle dealership providing quality vehicles and
                  exceptional service since 2010.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-300 hover:text-white">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vehicles"
                      className="text-gray-300 hover:text-white"
                    >
                      Vehicles
                    </a>
                  </li>
                  <li>
                    <a
                      href="/finance"
                      className="text-gray-300 hover:text-white"
                    >
                      Financing
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-300 hover:text-white">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/services"
                      className="text-gray-300 hover:text-white"
                    >
                      Vehicle Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="/finance"
                      className="text-gray-300 hover:text-white"
                    >
                      Financing Options
                    </a>
                  </li>
                  <li>
                    <a
                      href="/trade-in"
                      className="text-gray-300 hover:text-white"
                    >
                      Trade-In Appraisal
                    </a>
                  </li>
                  <li>
                    <a
                      href="/warranty"
                      className="text-gray-300 hover:text-white"
                    >
                      Warranty
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">123 Dealership Way</li>
                  <li className="text-gray-300">Anytown, USA 12345</li>
                  <li className="text-gray-300">(555) 123-4567</li>
                  <li className="text-gray-300">info@automotion.com</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} AutoMotion. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
