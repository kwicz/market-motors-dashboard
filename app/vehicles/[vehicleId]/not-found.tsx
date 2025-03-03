import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function VehicleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vehicle Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the vehicle you're looking for doesn't exist or may have been
          sold.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/vehicles">
            <Button>Browse All Vehicles</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
