# Prisma Setup Plan

## Goal
Install Prisma in this Next.js 16 project and scaffold a minimal working local setup.

## Assumption
- Initialize Prisma with SQLite as the default local datasource because no database provider is configured yet.
- This can be switched later to Postgres/Neon/MySQL with a schema and adapter update.

## Steps
- Install `prisma`
- Initialize Prisma files
- Validate generated config and schema
- Keep the setup documented for later database migration

## Status
- Completed

## Generated Files
- `prisma/schema.prisma`
- `prisma.config.ts`
- `.env`
- Prisma Client generated to `lib/generated/prisma`

## Notes
- Datasource is now PostgreSQL for Neon/Vercel deployment.
- `DATABASE_URL` must be a Neon/Postgres connection string.
- Schema validation passed.
- Prisma Client generation passed.
- Added and applied Prisma migration `20260314012559_add_user_model` for the `User` table.
- Runtime adapter switched to Prisma 7 Postgres adapter: `@prisma/adapter-pg` with `pg`.
- Server actions in `app/actions/actions.ts` now use Prisma CRUD instead of in-memory data.
- Server action inputs/outputs are validated with shared Zod schemas before returning data to UI.
- This project now has both `pnpm-lock.yaml` and `package-lock.json` because `@prisma/client` was initially installed with npm.

## Deployment Commands
- `pnpm exec prisma generate`
- `pnpm exec prisma migrate deploy`

## Before First Neon Deploy
- Set `DATABASE_URL` in Vercel project environment variables.
- Ensure migration files are present in the repository and pushed to GitHub.
