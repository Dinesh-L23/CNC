import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where = status ? { status } : {};
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      shortDescription,
      description,
      image,
      applications,
      specifications,
      material,
      coating,
      status,
    } = body;

    if (!name || !slug || !description) {
      return NextResponse.json(
        { error: 'Product name, slug, and description are required' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slug.toLowerCase().trim().replace(/\s+/g, '-'),
        shortDescription: shortDescription || '',
        description,
        image: image || '/images/products/end-mill.jpg',
        applications: typeof applications === 'string' ? applications : JSON.stringify(applications || []),
        specifications: typeof specifications === 'string' ? specifications : JSON.stringify(specifications || {}),
        material: material || 'Micrograin Solid Carbide',
        coating: coating || 'AlTiN',
        status: status || 'published',
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
