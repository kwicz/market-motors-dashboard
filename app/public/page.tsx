// app/(public)/page.tsx
import { getActiveProducts, Product } from 'lib/db';
import Image from 'next/image';
export default async function HomePage() {
  const products: Product[] = await getActiveProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={300}
              height={200}
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <a
              href={`/products/${product.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
