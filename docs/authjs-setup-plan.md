# Auth.js Setup Plan

## Goal
Enable baseline Auth.js v5 wiring in this Next.js 16 app.

## Steps
- Install `next-auth` v5 beta package
- Generate auth secret in env
- Add root `auth.ts` using `import NextAuth from 'next-auth'`
- Add App Router auth handler route at `app/api/auth/[...nextauth]/route.ts`

## Status
- Completed
- Google provider added in `auth.ts`
- Google sign-in/sign-out server actions added
- Home page includes OAuth test controls
- Navbar shows connected user name and avatar
- Navbar includes a List button to open the full users table
- Added dedicated users list page at `app/list/page.tsx`
- Users list now supports live text filtering above the table
- Users list supports page size selection and per-row edit/delete icon actions

## Notes
- Google OAuth now uses `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` from env.
- Add Google credentials from Google Cloud Console to enable sign-in.
- If the site appears inaccessible, ensure `pnpm dev` is running and port 3000 is free.
