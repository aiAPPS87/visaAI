# visaAI — Visa Eligibility Screener

AI-powered visa eligibility screening tool. Users answer 15 questions and receive a personalized report of their top visa matches for the US, Canada, UK, Australia, and Germany.

## Tech Stack

- **Frontend**: Next.js 16 + Tailwind CSS
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email magic link + Google OAuth)
- **Payments**: Stripe (one-time premium report unlock — $29)
- **Language**: TypeScript

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, how it works, pricing, FAQ |
| `/screener` | Conversational intake interview |
| `/results/[sessionId]` | Personalized eligibility report |
| `/dashboard` | User's saved screenings |
| `/login` | Auth page (magic link + Google) |
| `/pricing` | Pricing breakdown |

## Getting Started

### 1. Clone the repo and install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL        # From Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY   # From Supabase project settings
SUPABASE_SERVICE_ROLE_KEY       # From Supabase project settings (keep secret!)
ANTHROPIC_API_KEY               # From console.anthropic.com
STRIPE_SECRET_KEY               # From Stripe dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET           # From Stripe webhook settings
```

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Then run `supabase/seed.sql` to populate the visa database
4. Enable **Google Auth** in Authentication > Providers (optional)

### 4. Set up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. For local development, install Stripe CLI and forward webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment to Vercel

1. Push to GitHub
2. Connect your repo at [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Deploy — Vercel will auto-detect Next.js

For Stripe webhooks in production, set the webhook URL to:
`https://your-domain.vercel.app/api/webhooks/stripe`

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with Navbar + Footer
│   ├── page.tsx                # Landing page
│   ├── screener/page.tsx       # Screener chat UI
│   ├── results/[sessionId]/    # Results report page
│   ├── dashboard/page.tsx      # User dashboard
│   ├── login/page.tsx          # Auth page
│   ├── pricing/page.tsx        # Pricing page
│   └── api/
│       ├── sessions/           # Create + fetch screening sessions
│       ├── payments/           # Stripe payment intent creation
│       └── webhooks/stripe/    # Stripe webhook handler
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── screener/               # ScreenerChat component
│   └── results/                # VisaCard, PremiumUnlock
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── supabase.ts             # Supabase client
│   ├── anthropic.ts            # Claude API integration
│   ├── stripe.ts               # Stripe client
│   ├── screener-questions.ts   # All 15 screener questions
│   └── utils.ts                # Shared utilities
└── supabase/
    ├── schema.sql              # Database schema
    └── seed.sql                # Visa database seed data
```

## Legal

This application provides general informational screening only and does not constitute legal advice. Immigration laws change frequently. Always consult a licensed immigration attorney before making immigration decisions.
