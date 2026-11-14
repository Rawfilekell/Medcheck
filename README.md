# MedCheck — Frontend

React + Vite + React Router + Tailwind CSS + GSAP/ScrollTrigger + Lenis (JavaScript). **Frontend only.**

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## What this is (and isn't)

- No backend, database, external API, mock data or fake authentication.
- Verification, interaction checks, library, accounts, saved medicines, report submission and admin management show a clear **"not yet available"** state.
- Forms are fully validated. Report images are previewed locally and never uploaded.
- **Reminders** are the one working feature: they are created by you and stored in your browser's localStorage only. They do not send alerts.
- A NAFDAC number match never proves a physical medicine is genuine; the UI says so wherever results would appear.

## Structure

```
src/
  components/  reusable UI (Navbar, SearchBar, Field, ServiceState, …)
  layouts/     MainLayout, DashboardLayout (user + admin)
  pages/       public + user pages;  pages/admin/ admin pages
  services/    ONE file per domain — the backend integration point
  hooks/       useAsyncAction, useLoad, useDocumentTitle
  utils/       constants, validators, helpers
```

## Connecting a backend later

Edit files in `src/services/`. Each method currently rejects with `ServiceUnavailableError`; replace it with a real request that returns the shape described in the comment above it. Pages already handle loading, empty, unavailable and error states. Route guards already exist (`src/components/ProtectedRoute.jsx`), so nothing else needs to change in the routes.

## Login and roles

Users and admins share one Login page (`/login`). `authService.login` must resolve with `{ token, user: { id, name, email, role: 'user' | 'admin' } }`. `AuthContext` stores the session and the Login page sends `admin` to `/admin` and `user` to `/dashboard`. `/dashboard` and `/saved` are for users, `/admin/*` is for admins, and anyone on the wrong side is redirected to their own dashboard. Signed-out visitors are sent to `/login`. `/reminders` stays open because it only uses this device's storage. Until a backend exists, `login` rejects with the usual "not yet available" state, so nobody can sign in.

## Visual system & motion (redesign)

- **Type:** Unbounded (display), Instrument Serif italic (contrast), Syne (h3), Space Grotesk (body). Loaded via `@fontsource`.
- **Palette:** electric blue `#1F3BFF`, night `#060A2B`, ice `#EAF0FF`, aqua `#7DF9FF`, signal yellow `#FFD84A`, pill red `#FF4B2B`, lilac `#C6B5FF`. Tailwind token names are unchanged, so every page re-skins from `tailwind.config.js`.
- **Motion layer** (`src/lib`, `src/components`): `SmoothScroll` (Lenis), `Curtain` (route wipe), `SplitText`, `Magnetic`. Home sections in `src/components/home/` are Hero, Tools (pinned horizontal), WhoFor (stacked cards), InsideDashboard (two dashboard previews, Reminders and Reported Drugs, with illustrative entries) and Faq.
- **Accessibility:** `prefers-reduced-motion` disables smooth scroll and scroll animation (tools become a static grid). Focus rings, skip link, ARIA on the menu, accordion are kept.
