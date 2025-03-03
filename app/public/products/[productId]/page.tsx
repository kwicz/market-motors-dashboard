// app/(public)/products/[productId]/page.tsx
import { getProductById, Product } from 'lib/db';
import Image from 'next/image';

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

export default async function ProductDetailPage({
  params
}: ProductDetailPageProps) {
  const { productId } = params;
  const product: Product | undefined = await getProductById(
    parseInt(productId)
  );
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={200}
      />
      <p className="text-gray-600">Price: ${product.price}</p>
      <p className="text-gray-600">Stock: {product.stock}</p>
    </div>
  );
}
