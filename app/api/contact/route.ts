import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendContactNotification } from '@/lib/email';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, companyName, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, Email, Phone, and Message are required' },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        companyName: companyName ? companyName.trim() : null,
        message: message.trim(),
        status: 'New',
      },
    });

    await sendContactNotification({
      name,
      email,
      phone,
      companyName,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Your message has been received. Our team will get back to you shortly.',
        id: contact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: 'Failed to submit contact message' }, { status: 500 });
  }
}
