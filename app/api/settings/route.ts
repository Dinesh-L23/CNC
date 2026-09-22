import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');

    if (section) {
      const content = await prisma.siteContent.findUnique({ where: { section } });
      return NextResponse.json(content ? JSON.parse(content.data) : null);
    }

    const all = await prisma.siteContent.findMany();
    const result: Record<string, unknown> = {};
    for (const item of all) {
      try {
        result[item.section] = JSON.parse(item.data);
      } catch {
        result[item.section] = item.data;
      }
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { section, data } = body;

    if (!section || data === undefined) {
      return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
    }

    const stringData = typeof data === 'string' ? data : JSON.stringify(data);

    const updated = await prisma.siteContent.upsert({
      where: { section },
      update: { data: stringData },
      create: { section, data: stringData },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
