import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendQuoteNotification } from '@/lib/email';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quotes = await prisma.quoteRequest.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      companyName,
      email,
      phone,
      product,
      quantity,
      deliveryDate,
      material,
      toolDiameter,
      application,
      drawingUrl,
      message,
    } = body;

    // Validation
    if (!name || !companyName || !email || !phone || !product) {
      return NextResponse.json(
        { error: 'Name, Company Name, Email, Phone, and Product are required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        name: name.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        product: product.trim(),
        quantity: quantity || '',
        deliveryDate: deliveryDate || '',
        material: material || '',
        toolDiameter: toolDiameter || '',
        application: application || '',
        drawingUrl: drawingUrl || null,
        message: message || '',
        status: 'New',
      },
    });

    // Send notifications
    await sendQuoteNotification({
      name,
      companyName,
      email,
      phone,
      product,
      quantity,
      deliveryDate,
      material,
      toolDiameter,
      application,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you. Our team will review your requirement and contact you shortly.',
        quoteId: quote.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
