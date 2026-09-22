import React from 'react';
import { prisma } from '@/lib/prisma';
import GalleryManager from './GalleryManager';

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const items = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <GalleryManager initialItems={items} />
    </div>
  );
}
