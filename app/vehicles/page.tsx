import { Suspense } from 'react';
import { Metadata } from 'next';
import VehiclesPage from './vehicles-page-client';

export const metadata: Metadata = {
  title: 'Browse All Cars | Car Dealership',
  description:
    'Browse our extensive collection of quality vehicles with advanced filtering options.'
};

export default function VehiclesPageWrapper() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Browse All Cars
        </h1>

        <Suspense
          fallback={<div className="text-center py-12">Loading cars...</div>}
        >
          <VehiclesPage />
        </Suspense>
      </div>
    </div>
  );
}
