<wizard-report>
# PostHog post-wizard report

The wizard completed a PostHog analytics integration for the Skyward website. The project already had `@posthog/react` installed, `PostHogProvider` configured in `__root.tsx`, a reverse proxy for `/ingest` in `vite.config.ts`, and user identification wired up in `useAuth.tsx`. The wizard confirmed environment variables, supplemented the event plan with two missing events (`faq_item_opened` and `user_signed_out`), and created a dashboard with five insights covering the full conversion funnel, signups, purchases, and churn signals.

| Event                            | Description                                                                    | File                                 |
| -------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------ |
| `get_started_clicked`            | User clicks the primary CTA button in the hero section.                        | `src/components/landing/Hero.tsx`    |
| `pricing_plan_selected`          | User clicks the pricing CTA to start a subscription funnel with a chosen plan. | `src/components/landing/Pricing.tsx` |
| `faq_item_opened`                | User opens a FAQ accordion item on the landing page.                           | `src/components/landing/Faq.tsx`     |
| `user_signed_up`                 | User successfully creates a new account.                                       | `src/routes/auth.tsx`                |
| `user_logged_in`                 | User successfully logs in to their existing account.                           | `src/routes/auth.tsx`                |
| `password_reset_requested`       | User requests a password reset email.                                          | `src/routes/auth.tsx`                |
| `checkout_started`               | User submits the onboarding form and is redirected to Stripe Checkout.         | `src/routes/onboarding.tsx`          |
| `subscription_purchased`         | User lands on the success page after completing a Stripe Checkout.             | `src/routes/success.tsx`             |
| `device_imei_saved`              | User saves or updates the IMEI of their linked device from the account page.   | `src/routes/account.tsx`             |
| `subscription_management_opened` | User opens the Stripe billing portal to manage or cancel their subscription.   | `src/routes/account.tsx`             |
| `user_signed_out`                | User clicks the sign-out button from the account page.                         | `src/routes/account.tsx`             |
| `setup_step_completed`           | User checks off a step in the device setup flow (backup or factory reset).     | `src/routes/setup.tsx`               |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) dashboard](https://us.posthog.com/project/480120/dashboard/1742141)
- [Full conversion funnel](https://us.posthog.com/project/480120/insights/tI9PB4vt) — `get_started_clicked` → `user_signed_up` → `checkout_started` → `subscription_purchased`
- [New signups over time](https://us.posthog.com/project/480120/insights/MrJ6P5jf) — daily signup volume
- [Subscriptions purchased](https://us.posthog.com/project/480120/insights/dQsZlItW) — daily purchase volume
- [Checkout funnel by plan](https://us.posthog.com/project/480120/insights/W6FrXesd) — `pricing_plan_selected` → `checkout_started` → `subscription_purchased`
- [Churn signals](https://us.posthog.com/project/480120/insights/HWnNMZ86) — subscription management opens and sign-outs over time

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — `useAuth.tsx` identifies on `SIGNED_IN` auth state change, which covers both fresh logins and returning sessions that restore a Supabase session from storage.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
