# Skyward OS Landing Page

A single-page, purely front-end marketing site. No backend, no routing beyond the existing `/` route, no auth, no Cloud. Built with TanStack Start, Tailwind v4, and shadcn/ui components already in the project.

## Scope

- Replace the placeholder in `src/routes/index.tsx` with the full landing page.
- Extend `src/styles.css` with brand tokens, Inter font, and an `aurora` background utility.
- Load Inter via `<link>` in `src/routes/__root.tsx` and update `<title>` / meta for SEO.
- Build small section components under `src/components/landing/` (Navbar, Hero, BlockedCategories, Pricing, FAQ, Footer).
- Use existing shadcn primitives: `Button`, `Badge`, `Card`, `Switch`, `Accordion`, `Input`.
- Use `lucide-react` icons (already installed).

## Design tokens (added to `src/styles.css`)

- `--background` `#F8FAFC`, `--foreground` `#1E293B`
- `--primary` `#7DA7D9`, `--primary-foreground` `#FFFFFF`
- `--accent` (sage) `#A3B18A`
- `--card` `#FFFFFF`, `--border` `rgba(30, 41, 59, 0.1)`
- `--font-sans: "Inter", ...`
- `@utility aurora` — radial gradients in muted sky blue at ~10–15% opacity, layered for soft glow
- `@utility glass` — `bg-white/70 backdrop-blur-md border border-[color:var(--border)]`

All tokens registered under `@theme inline` so utilities like `bg-primary`, `text-accent`, `border-border` work.

## Page sections

1. **Navbar** — sticky top, transitions to a centered glass pill on scroll (`useEffect` scroll listener toggling width/rounded). Left: small logo dot + "Skyward". Right: rounded-full "Get Skyward" primary button.
2. **Hero** — `min-h-screen`, centered, `aurora` background. H1 (text-5xl→7xl, `-tracking-[0.02em]`, `text-balance`) + muted subtitle + primary CTA. Fade-up animation via existing `animate-fade-in` utility (staggered with inline `animationDelay`).
3. **Blocked Categories** — overline "CATEGORIES WE BLOCK" (tracking-widest, uppercase, muted). Flex-wrap of rounded-full white badges with sage Lucide icon + label: MessageCircle/Social media, Gamepad2/Gaming, Heart/Dating, Dices/Gambling, EyeOff/Adult sites, Newspaper/News.
4. **Pricing** — overline "PRICING" + `Switch` toggle (Monthly active visually, Annual inactive label). Single `rounded-3xl` white card with diffuse `shadow-[0_30px_80px_-20px_rgba(125,167,217,0.35)]`, plan name, large price ("$12"), "/mo", primary "Get Monthly" button, sage check list (3 items). Aurora background behind card.
5. **FAQ** — shadcn `Accordion` with ~5 dummy Q&As (what is Skyward, supported devices, can it be bypassed, refund, shipping).
6. **Footer** — newsletter input + rounded-full submit (no handler), small nav links, © 2026 Skyward.

## Animations

Reuse existing `animate-fade-in` keyframe; add staggered delays inline. Add a `slide-in-right` variant for pricing card via existing utility. No new keyframes needed beyond what's documented.

## Technical notes

- No new dependencies; everything ships with the template.
- Update `head()` in `src/routes/index.tsx`: title "Skyward OS — A distraction-free smartphone", matching description, og tags. Single `<h1>`.
- Inter loaded via Google Fonts `<link>` in `__root.tsx` head `links` array (filesystem `@import` would break Lightning CSS).
- All colors via semantic tokens — no hardcoded `text-white`/`bg-[#...]` in components except as noted in shadow values.

## File changes

```text
src/styles.css                              (extend tokens + aurora/glass utilities)
src/routes/__root.tsx                       (add Inter <link>)
src/routes/index.tsx                        (compose landing sections + SEO head)
src/components/landing/Navbar.tsx           (new)
src/components/landing/Hero.tsx             (new)
src/components/landing/BlockedCategories.tsx(new)
src/components/landing/Pricing.tsx          (new)
src/components/landing/Faq.tsx              (new)
src/components/landing/Footer.tsx           (new)
```
