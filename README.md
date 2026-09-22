# Marswin Precision Tools - Full-Stack CNC Precision Cutting Tools Website

A high-performance, responsive full-stack website and enterprise administrative management platform built for **Marswin Precision Tools**, a CNC precision cutting tools manufacturer and tool regrinding specialist based in Chinnavedampatti, Coimbatore, Tamil Nadu, India.

---

## Key Features

- **High-Impact Industrial UI**: Deep Navy (`#071A2B`), Dark Blue (`#0B263D`), Electric Blue (`#1677FF`), Cyan (`#00C2FF`), and pristine contrast designed for industrial B2B buyers.
- **Dynamic Database-Driven Catalog**: Real-time SSR catalog for End Mills, Drills, Port Cutters, Reamers, and custom profile tools with detailed technical specification tables, applications, and coatings.
- **Interactive Technical Drawing RFQ System**: Comprehensive Request for Quotation (RFQ) workflow with direct PDF/image technical drawing upload (up to 15MB), workpiece material specifications, required delivery scheduling, and instant admin notification.
- **Full-Featured SaaS Admin Portal** (`/admin`):
  - **Metric Analytics**: Live tracking of RFQ quotation volumes, inquiries, products, and services.
  - **Product CRUD**: Add, edit, publish/unpublish, manage JSON specifications, and upload product photography.
  - **Service Management**: Update manufacturing capabilities and descriptions.
  - **Quote Request Pipeline**: Track RFQ stages (`New`, `Contacted`, `Quoted`, `Closed`), inspect uploaded customer drawings, and log internal engineering notes.
  - **Contact Messages**: Read and manage direct inquiries.
  - **Facility & Tooling Gallery**: Upload and categorize CNC grinding machinery, products, and metrology inspection photos with interactive lightbox preview.
  - **Company Profile & CMS**: Edit official Coimbatore address, phone numbers, and email contacts with instant live synchronization.
- **Production-Grade Security**:
  - Salted password hashing (`bcryptjs`).
  - Cryptographically signed HMAC SHA-256 session tokens in secure HTTP-only cookies.
  - Protected admin routes via Next.js Middleware.
  - Strict server-side input, file type, and MIME validation.
- **Comprehensive SEO & Schema**:
  - Automatic `sitemap.xml` and `robots.txt` generation.
  - Open Graph & Twitter Cards metadata on all routes.
  - JSON-LD structured data (`LocalBusiness` & `Organization`).

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React
- **ORM & Database**: [Prisma ORM](https://www.prisma.io/) with SQLite (local zero-dependency dev) and PostgreSQL ready (production)
- **Authentication**: Salted Bcrypt hashing + Secure HTTP-only cookies + Next.js Middleware

---

## Project Structure

```
├── app/
│   ├── (public)
│   │   ├── page.tsx               # Homepage (Hero, Trust, Products, Services, 7-Step Process)
│   │   ├── about/page.tsx         # About Us (Heritage, Mission, Vision, Values, Journey)
│   │   ├── products/page.tsx      # Products Catalog with search and category filters
│   │   ├── products/[slug]/       # Dynamic Product Details with specifications table
│   │   ├── services/page.tsx      # 5 Core Manufacturing & Regrinding Services
│   │   ├── technology/page.tsx    # 5-Axis CNC Grinding, Metrology & Regrinding Technology
│   │   ├── quality/page.tsx       # Quality at Every Stage & Inspection Metrology
│   │   ├── gallery/page.tsx       # Filterable Gallery with Lightbox
│   │   ├── contact/page.tsx       # Contact details, phones, WhatsApp CTA & Map
│   │   ├── request-quote/page.tsx # B2B RFQ with technical drawing upload
│   │   ├── sitemap.ts             # Dynamic Sitemap generator
│   │   ├── robots.ts              # Robots.txt generator
│   │   └── not-found.tsx          # Custom 404 error page
│   ├── admin/
│   │   ├── login/page.tsx         # Secure Admin Authentication
│   │   ├── layout.tsx             # Admin Shell with Sidebar
│   │   ├── page.tsx               # Analytics Dashboard
│   │   ├── products/page.tsx      # Product CRUD & Image Uploader
│   │   ├── services/page.tsx      # Service Capabilities Manager
│   │   ├── quotes/page.tsx        # RFQ Log, Status Pipeline & Drawing Viewer
│   │   ├── messages/page.tsx      # Contact Inquiries Manager
│   │   ├── gallery/page.tsx       # Gallery Asset Manager
│   │   ├── company/page.tsx       # Company Profile & Contact Sync
│   │   └── settings/page.tsx      # Website Settings & CMS
│   └── api/                       # REST API Endpoints (Auth, Products, Quotes, Contact, Upload, etc.)
├── components/                    # Reusable UI & Navbar / Footer components
├── lib/                           # Database client, Auth utilities, Email dispatcher
├── prisma/
│   ├── schema.prisma              # Database models
│   ├── seed.ts                    # Realistic Marswin seed data
│   └── dev.db                     # Local SQLite database
└── public/
    ├── images/                    # Industrial hero, product, and facility photography
    └── uploads/                   # Stored customer drawings and uploaded imagery
```

---

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Variables Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Ensure `.env` contains:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="your-secure-random-auth-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Database Initialization & Seeding

Run Prisma schema synchronization and seed default products, services, company contacts, and the admin account:

```bash
# Push schema to database
npx prisma db push

# Seed realistic database records
npx prisma db seed
```

### 4. Running Locally in Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Admin Portal Access

- **Login URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Seed Email**: `admin@marswinprecisiontools.in`
- **Default Seed Password**: `Admin@Marswin2026!`

*(You can update this password in the Admin Settings anytime).*

---

## Production Build & Deployment

To verify and produce an optimized production bundle:

```bash
npm run build
npm start
```

### Deploying to PostgreSQL (Production)

1. Change `provider = "postgresql"` in `prisma/schema.prisma`.
2. Set your production PostgreSQL URL in `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/marswindb?sslmode=require"
   ```
3. Run `npx prisma db push` or `npx prisma migrate deploy`.

---

## Verified Marswin Precision Tools Information

- **Company**: Marswin Precision Tools
- **Location**: 7/1, Sakthi Nagar, Udayampalayam Road, Chinnavedampatti, Coimbatore, Tamil Nadu - 641049, India
- **Direct Contacts**:
  - Karthikeyan: `+91 96555 05586`
  - Vikram: `+91 98404 23024`
- **Official Emails**:
  - `info@marswinprecisiontools.in`
  - `sales@marswinprecisiontools.in`
  - `marswinprecisiontools@gmail.com`
