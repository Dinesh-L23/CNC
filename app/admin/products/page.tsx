import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductManager from './ProductManager';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <ProductManager initialProducts={products} />
    </div>
  );
}
