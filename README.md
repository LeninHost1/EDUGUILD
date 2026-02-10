# EDUGUILD

## Local setup

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
npm run dev
```

Create a `.env` file using `.env.example` as reference.

Seeded demo users:
- `admin@northbridge.edu` / `Password123!`
- `teacher@northbridge.edu` / `Password123!`
- `student@northbridge.edu` / `Password123!`

## Deployment

### Vercel (frontend + API routes)
1. Push to GitHub.
2. Create a Vercel project and import the repo.
3. Set environment variables: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
4. Deploy.

### Database (Supabase or Neon)
1. Create a PostgreSQL database.
2. Set `DATABASE_URL` to the connection string.
3. Run migrations using `npx prisma migrate deploy` on the deployment environment.

### Render/Railway (optional)
If you need a separate backend service later, keep the API in Next.js; no rewrite required.

