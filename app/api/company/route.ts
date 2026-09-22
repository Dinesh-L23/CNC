import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    let company = await prisma.companyInformation.findFirst();
    if (!company) {
      company = await prisma.companyInformation.create({
        data: {
          companyName: 'Marswin Precision Tools',
          address:
            '7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti, Coimbatore, Tamil Nadu - 641049',
          phone1: '+91 96555 05586',
          phone2: '+91 98404 23024',
          email1: 'info@marswinprecisiontools.in',
          email2: 'sales@marswinprecisiontools.in',
          email3: 'marswinprecisiontools@gmail.com',
          description:
            'At Marswin Precision Tools, we focus on delivering reliable and precision-engineered cutting tools for modern manufacturing requirements. Our expertise in CNC tool manufacturing, grinding, regrinding, and advanced machining enables us to provide consistent solutions for demanding industrial applications.',
        },
      });
    }
    return NextResponse.json(company);
  } catch (error) {
    console.error('Error fetching company info:', error);
    return NextResponse.json({ error: 'Failed to fetch company information' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const existing = await prisma.companyInformation.findFirst();

    if (existing) {
      const updated = await prisma.companyInformation.update({
        where: { id: existing.id },
        data: {
          companyName: body.companyName || existing.companyName,
          address: body.address || existing.address,
          phone1: body.phone1 || existing.phone1,
          phone2: body.phone2 || existing.phone2,
          email1: body.email1 || existing.email1,
          email2: body.email2 || existing.email2,
          email3: body.email3 || existing.email3,
          description: body.description || existing.description,
        },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.companyInformation.create({
        data: body,
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error('Error updating company info:', error);
    return NextResponse.json({ error: 'Failed to update company information' }, { status: 500 });
  }
}
