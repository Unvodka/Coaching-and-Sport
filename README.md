# Coach-Bluewave 🏊‍♂️💪

**Site web professionnel pour Arnaud Chevallier** — coach sportif et maître-nageur diplômé d'État à Valbonne, Côte d'Azur.

🌐 **Live:** [coach-bluewave.com](https://coach-bluewave.com)

## Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (PostgreSQL + Google OAuth)
- **Payments:** Stripe Checkout
- **Animations:** Framer Motion
- **Contact:** EmailJS
- **Analytics:** Google Analytics 4 (consent-first)
- **Hosting:** Vercel

## Features

- 🌍 Bilingual (FR/EN) with client-side i18n
- 🔒 Authenticated client portal (weight tracking, mood journal, recipes, workout programs)
- 💳 Stripe checkout for session packs and online coaching
- 📊 Rich structured data (JSON-LD: ProfessionalService, Person, FAQPage)
- ♿ Accessible (skip nav, ARIA labels, semantic HTML)
- 🍪 GDPR-compliant cookie consent with GA4 consent mode
- 🔐 Security headers (HSTS, CSP, X-Frame-Options, etc.)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase project
- A Stripe account
- An EmailJS account

### Environment Variables

Create `.env.local` at the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_live_or_sk_test_xxx

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-public-key

# App
NEXT_PUBLIC_APP_URL=https://coach-bluewave.com
```

### Database Setup

Run the migration in the Supabase SQL Editor:

```sql
-- See supabase-migration.sql for the full schema
```

After your first Google login, promote yourself to coach:

```sql
UPDATE public.profiles SET role = 'coach' WHERE email = 'your-email@gmail.com';
```

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build & Deploy

```bash
npm run build
npm start
```

Deployed automatically on Vercel via `main` branch.

## Project Structure

```
app/
├── api/              # API routes (checkout, auth, portal CRUD)
├── auth/             # OAuth callback & logout
├── blog/             # Blog pages
├── checkout/         # Stripe success/cancel pages
├── portal/           # Authenticated client portal
├── services/         # Dynamic service detail pages
├── layout.tsx        # Root layout (metadata, JSON-LD, providers)
├── page.tsx          # Home page
├── sitemap.ts        # Dynamic sitemap
└── robots.ts         # Robots.txt config

components/
├── portal/           # Portal-specific components
├── animations/       # Framer Motion wrappers
└── *.tsx             # Shared UI components

lib/
├── api/              # API helpers (auth wrapper)
├── i18n/             # Language context & hook
├── supabase/         # Supabase client, server, middleware
├── translations/     # FR/EN translation files
├── config.ts         # Centralized config & env validation
├── constants.ts      # Nav links, services, pricing data
├── blog.ts           # Blog post data
├── stripe.ts         # Stripe client
└── types.ts          # Shared TypeScript types
```

## License

Private — All rights reserved.
