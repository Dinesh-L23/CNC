import React from 'react';
import { prisma } from '@/lib/prisma';
import ServiceManager from './ServiceManager';

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div>
      <ServiceManager initialServices={services} />
    </div>
  );
}
