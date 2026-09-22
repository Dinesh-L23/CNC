import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Marswin Precision Tools database...');

  // 1. Seed Admin
  const adminEmail = 'admin@marswinprecisiontools.in';
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const passwordHash = bcrypt.hashSync('Admin@Marswin2026!', 10);
    await prisma.admin.create({
      data: {
        name: 'Marswin Administrator',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      },
    });
    console.log('Admin account created: admin@marswinprecisiontools.in / Admin@Marswin2026!');
  }

  // 2. Seed Company Information
  const companyInfo = await prisma.companyInformation.findFirst();
  if (!companyInfo) {
    await prisma.companyInformation.create({
      data: {
        companyName: 'Marswin Precision Tools',
        address: '7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti, Coimbatore, Tamil Nadu - 641049',
        phone1: '+91 96555 05586', // Karthikeyan
        phone2: '+91 98404 23024', // Vikram
        email1: 'info@marswinprecisiontools.in',
        email2: 'sales@marswinprecisiontools.in',
        email3: 'marswinprecisiontools@gmail.com',
        description:
          'At Marswin Precision Tools, we focus on delivering reliable and precision-engineered cutting tools for modern manufacturing requirements. Our expertise in CNC tool manufacturing, grinding, regrinding, and advanced machining enables us to provide consistent solutions for demanding industrial applications.',
      },
    });
    console.log('Company information seeded.');
  }

  // 3. Seed Products
  const productsData = [
    {
      name: 'End Mills',
      slug: 'end-mills',
      shortDescription:
        'All types of square End Mills with various specifications can be manufactured and regrinded to meet specific machining requirements.',
      description:
        'Precision-engineered End Mills manufactured for accurate, chatter-free, and high-efficiency milling applications. Designed with optimized helix and rake angles to ensure superior chip evacuation and surface finish on diverse materials.',
      image: '/images/products/end-mill.jpg',
      material: 'Micro-grain Solid Carbide (WC + Co)',
      coating: 'AlTiN / TiAlN / Multi-layer DLC',
      status: 'published',
      applications: JSON.stringify([
        'CNC machining & High-Speed Milling',
        'Die and mould manufacturing',
        'Automotive components machining',
        'Engineering components',
        'General precision machining',
        'Aerospace bracket milling',
      ]),
      specifications: JSON.stringify({
        'Product Type': 'Square End Mill / Ball Nose / Corner Radius / Rougher',
        'Diameter Range': '1.0 mm to 25.0 mm',
        'Overall Length (OAL)': '50 mm to 150 mm',
        'Cutting Flute Length (LOC)': '3 mm to 65 mm',
        'Number of Flutes': '2, 3, 4, 6 Flutes',
        'Material Grade': 'Ultra-fine Micrograin Tungsten Carbide',
        'Coating Options': 'AlTiN / TiAlN / TiSiN / Uncoated',
        'Helix Angle': '35° / 38° / 45° Variable Helix',
        'Diameter Tolerance': 'h6 (0 / -0.008 mm)',
        'Shank Tolerance': 'h6',
        'Regrinding Availability': 'Yes, CNC regrinding and recoating available',
      }),
    },
    {
      name: 'Drills',
      slug: 'drills',
      shortDescription:
        'Standard and step drills are manufactured using advanced 5-axis CNC technology for accurate and consistent performance.',
      description:
        'Engineered solid carbide drills and customized step drills providing exceptional self-centering, tight hole tolerances, and superior hole straightness across ferrous and non-ferrous materials.',
      image: '/images/products/drill.jpg',
      material: 'Solid Sub-micron Carbide',
      coating: 'AlCrN / TiAlN / TiN',
      status: 'published',
      applications: JSON.stringify([
        'Deep hole drilling & through-coolant applications',
        'Automotive cylinder and block machining',
        'Precision multi-step drilling in a single pass',
        'Hydraulic manifolds and fittings',
        'General engineering & fabrication',
      ]),
      specifications: JSON.stringify({
        'Product Type': 'Standard Twist Drill / Step Drill / Center Drill',
        'Diameter Range': '1.0 mm to 32.0 mm',
        'Overall Length (OAL)': '45 mm to 220 mm',
        'Flute Length': '12 mm to 140 mm',
        'Point Angle': '118° / 135° / 140° Split Point',
        'Coolant Style': 'Internal Through-Coolant / Solid',
        'Material Grade': 'Micro-grain Carbide',
        'Coating Options': 'AlCrN / TiAlN',
        'Diameter Tolerance': 'm7 / h7',
        'Regrinding Availability': 'Yes, full point geometry re-grinding available',
      }),
    },
    {
      name: 'Port Cutters',
      slug: 'port-cutters',
      shortDescription:
        'Precision forms and profiles are manufactured using advanced 5-axis CNC tool and cutter grinding technology.',
      description:
        'Custom-contoured hydraulic and pneumatic port contour cutters built to exact international standards (SAE, ISO, BSPP, Military specs). Delivers reliable one-shot port machining with pristine sealing surfaces.',
      image: '/images/products/port-cutter.jpg',
      material: 'Premium Sub-micron Carbide',
      coating: 'Multi-layer TiAlN / AlTiN',
      status: 'published',
      applications: JSON.stringify([
        'Hydraulic valve block machining',
        'Fluid power manifold cavity generation',
        'SAE J1926 / ISO 6149 / BSPP porting',
        'Aerospace actuator manifolds',
        'High-pressure fluid fittings',
      ]),
      specifications: JSON.stringify({
        'Product Type': 'Hydraulic Port Form / Contour Cutter',
        'Standard Compatibility': 'SAE J1926-1, ISO 6149, BSPP, MS-33649, Mil-Spec',
        'Shank Diameter': '12 mm to 32 mm Welded / Solid Shank',
        'Flute Count': '3, 4, or 5 Flutes',
        'Form Accuracy': 'Within ±0.005 mm profile tolerance',
        'Surface Finish Target': 'Ra 0.4 µm on seal surfaces',
        'Material Grade': 'Ultra-fine Carbide',
        'Coating Options': 'High-lubricity AlTiN',
        'Regrinding Availability': 'Yes, specialized profile re-sharpening supported',
      }),
    },
    {
      name: 'Reamers',
      slug: 'reamers',
      shortDescription:
        'Different types of reamers can be manufactured to deliver dimensional accuracy and consistent quality.',
      description:
        'Ultra-precision reamers engineered for micro-inch bore tolerances and mirror-like surface finishes. Available in straight flute, left-hand spiral, and right-hand spiral configurations.',
      image: '/images/products/reamer.jpg',
      material: 'Ultra-fine Micrograin Carbide',
      coating: 'TiCN / AlTiN / Polished Uncoated',
      status: 'published',
      applications: JSON.stringify([
        'High-precision bore finishing (H7 / H6)',
        'Valve guide and injector bore sizing',
        'Engine block cylinder liner locating bores',
        'Aerospace bushings and bearing pockets',
        'Tool and die locating dowel pin holes',
      ]),
      specifications: JSON.stringify({
        'Product Type': 'Straight Flute / Spiral Flute Machine Reamer',
        'Diameter Range': '2.0 mm to 30.0 mm',
        'Overall Length (OAL)': '50 mm to 180 mm',
        'Flute Length': '15 mm to 75 mm',
        'Number of Flutes': '4, 6, 8 Even/Uneven Flutes for anti-vibration',
        'Material Grade': 'Sub-micron Tungsten Carbide',
        'Tolerance Standard': 'H7 standard (Custom ±0.002 mm upon request)',
        'Coating Options': 'TiCN / AlTiN',
        'Regrinding Availability': 'Yes, precision re-grinding & diameter restoration',
      }),
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`Seeded ${productsData.length} core precision products.`);

  // 4. Seed Services
  const servicesData = [
    {
      title: 'Precision Tool Manufacturing',
      slug: 'precision-tool-manufacturing',
      description:
        'Manufacturing precision cutting tools according to customer requirements and application needs with strict adherence to dimensional tolerances.',
      icon: 'Wrench',
      image: '/images/services/tool-manufacturing.jpg',
      status: 'active',
    },
    {
      title: 'CNC Tool Grinding',
      slug: 'cnc-tool-grinding',
      description:
        'Advanced CNC grinding processes for accurate tool geometry, ultra-fine cutting edges, and consistent results batch after batch.',
      icon: 'Cpu',
      image: '/images/services/cnc-grinding.jpg',
      status: 'active',
    },
    {
      title: 'Tool Regrinding',
      slug: 'tool-regrinding',
      description:
        'Professional regrinding services to restore tool performance, recreate original tool geometry, and significantly extend tool life at reduced cost.',
      icon: 'RotateCcw',
      image: '/images/services/tool-regrinding.jpg',
      status: 'active',
    },
    {
      title: 'Custom Tool Solutions',
      slug: 'custom-tool-solutions',
      description:
        'Customized tooling solutions based on component geometry, machining requirements, challenging alloys, and specific customer requirements.',
      icon: 'Cog',
      image: '/images/services/custom-solutions.jpg',
      status: 'active',
    },
    {
      title: '5-Axis CNC Manufacturing',
      slug: '5-axis-cnc-manufacturing',
      description:
        'Advanced 5-axis machining and grinding capabilities for complex tool geometries, stepped diameters, helical profiles, and precision forms.',
      icon: 'Layers',
      image: '/images/services/five-axis.jpg',
      status: 'active',
    },
  ];

  for (const serv of servicesData) {
    await prisma.service.upsert({
      where: { slug: serv.slug },
      update: serv,
      create: serv,
    });
  }
  console.log(`Seeded ${servicesData.length} services.`);

  // 5. Seed Gallery Items
  const sampleGallery = [
    {
      title: '5-Axis CNC Tool Grinding Center',
      description: 'Precision 5-axis grinding setup for complex multi-flute geometry generation.',
      imageUrl: '/images/gallery/cnc-grinding-machine.jpg',
      category: 'CNC Machines',
    },
    {
      title: 'Solid Carbide Square End Mills',
      description: 'Micro-grain 4-flute carbide end mills with high-performance AlTiN coating.',
      imageUrl: '/images/gallery/carbide-endmills.jpg',
      category: 'Products',
    },
    {
      title: 'Optical Tool Geometry Inspection',
      description: 'High-magnification optical comparator and laser diameter measurement.',
      imageUrl: '/images/gallery/tool-inspection.jpg',
      category: 'Inspection',
    },
    {
      title: 'Precision Regrinding Workstation',
      description: 'Restoring cutting edge sharpness and flute geometry on re-sharpened tools.',
      imageUrl: '/images/gallery/tool-regrinding-process.jpg',
      category: 'Grinding',
    },
    {
      title: 'Step Drills & Specialty Profile Tools',
      description: 'Custom multi-step drill profiles manufactured for automotive component machining.',
      imageUrl: '/images/gallery/step-drills.jpg',
      category: 'Manufacturing',
    },
    {
      title: 'Marswin Precision Production Floor',
      description: 'Controlled environment manufacturing bay in Chinnavedampatti, Coimbatore.',
      imageUrl: '/images/gallery/manufacturing-facility.jpg',
      category: 'Facility',
    },
  ];

  const existingGalleryCount = await prisma.gallery.count();
  if (existingGalleryCount === 0) {
    for (const g of sampleGallery) {
      await prisma.gallery.create({ data: g });
    }
    console.log(`Seeded ${sampleGallery.length} gallery items.`);
  }

  // 6. Seed Sample Quote Request & Contact Message for Admin demonstration
  const existingQuoteCount = await prisma.quoteRequest.count();
  if (existingQuoteCount === 0) {
    await prisma.quoteRequest.create({
      data: {
        name: 'Senthil Murugan',
        companyName: 'Apex Precision Auto Components Ltd',
        email: 'senthil@apexautocomponents.in',
        phone: '+91 94432 11223',
        product: 'End Mills',
        quantity: '50 pcs',
        deliveryDate: '2026-10-15',
        material: 'Solid Carbide',
        toolDiameter: '12.0 mm',
        application: 'Die & Mold Roughing on H13 Tool Steel (52 HRC)',
        message: 'Looking for 4-flute square end mills with AlTiN coating for high-speed trochoidal milling.',
        status: 'New',
      },
    });

    await prisma.contactMessage.create({
      data: {
        name: 'Rajesh Kumar',
        companyName: 'Kovai Hydraulics Pvt Ltd',
        email: 'rajesh@kovaihydraulics.com',
        phone: '+91 98421 99887',
        message: 'Inquiring about custom SAE port contour cutter manufacturing and regrinding schedule.',
        status: 'New',
      },
    });
    console.log('Sample quote and contact message created.');
  }

  console.log('Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
