import React from 'react';
import { prisma } from '@/lib/prisma';
import QuoteManager from './QuoteManager';

export const revalidate = 0;

export default async function AdminQuotesPage() {
  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <QuoteManager initialQuotes={quotes} />
    </div>
  );
}
