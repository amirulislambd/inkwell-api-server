# Inkwell API - Prisma Blog Backend

Backend for a blog platform built with Express, TypeScript, Prisma ORM, and PostgreSQL.

## Live API
https://inkwell-api-server.onrender.com

## Tech Stack
- Express.js + TypeScript
- Prisma ORM + PostgreSQL (Supabase)
- Better Auth (email/password authentication)

## Setup
\`\`\`bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
\`\`\`

## Environment Variables
\`\`\`
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
SMTP_USER=
SMTP_PASS=
\`\`\`

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/sign-up/email | Register |
| POST | /api/auth/sign-in/email | Login |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /post | Create post (Auth required) |
| GET | /post | Get all posts |
| GET | /post/:postId | Get post by ID |