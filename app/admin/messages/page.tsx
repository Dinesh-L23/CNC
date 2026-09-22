import React from 'react';
import { prisma } from '@/lib/prisma';
import MessageManager from './MessageManager';

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <MessageManager initialMessages={messages} />
    </div>
  );
}
