import React from 'react';
import { prisma } from '@/lib/prisma';
import CompanyManager from './CompanyManager';

export const revalidate = 0;

export default async function AdminCompanyPage() {
  const company = await prisma.companyInformation.findFirst();

  return (
    <div>
      <CompanyManager initialCompany={company} />
    </div>
  );
}
