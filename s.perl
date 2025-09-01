my-email-platform/
├─ .env.local               # Environment variables (DB, NextAuth secret, Gmail creds)
├─ package.json
├─ next.config.js
├─ tsconfig.json            # if using TypeScript
├─ public/                  # Static assets
│   └─ favicon.ico
├─ app/                     # App Router (Next.js 14+)
│   ├─ layout.tsx           # Root layout
│   ├─ page.tsx             # Homepage
│   ├─ login/
│   │   └─ page.tsx         # Login page
│   ├─ dashboard/
│   │   └─ page.tsx         # User dashboard
│   └─ api/
│       ├─ auth/            # NextAuth API routes
│       │   └─ [...nextauth]/route.ts
│       └─ send-email/
│           └─ route.ts     # Nodemailer API route
├─ lib/                     # Shared libs/helpers
│   ├─ db.ts                # MongoDB connection / Prisma client
│   ├─ auth.ts              # NextAuth config + helpers
│   └─ mailer.ts            # Nodemailer setup (App Password / OAuth2)
├─ models/                  # DB models (Mongoose schemas or Prisma models)
│   └─ User.ts
├─ components/              # Reusable UI components
│   ├─ Header.tsx
│   ├─ Footer.tsx
│   └─ ProtectedRoute.tsx   # Optional HOC or wrapper for auth
├─ styles/
│   ├─ globals.css
│   └─ dashboard.css
└─ utils/                   # Utility functions
    └─ validators.ts        # e.g., validate email, API key, etc.
