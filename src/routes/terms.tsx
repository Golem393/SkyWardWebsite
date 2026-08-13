import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/terms")({
  ssr: false,
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background aurora flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-32 space-y-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
              Legal Documents
            </p>
            <h1 className="text-3xl font-semibold -tracking-[0.02em] text-foreground">
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: August 13, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              These Terms and Conditions ("Terms") govern your use of Skyward, provided by{" "}
              <span className="font-medium text-foreground/80">Skyward OS LLC</span> ("Skyward,"
              "we," "us," or "our").
            </p>
            <p className="text-sm text-muted-foreground">
              By creating an account, purchasing a subscription, or using Skyward, you agree to
              these Terms. If you do not agree, please do not use the Services.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">1. Skyward</h2>
              <p className="text-sm text-muted-foreground">
                Skyward provides desktop and mobile applications designed to help users reduce
                screen time and build healthier digital habits.
              </p>
              <p className="text-sm text-muted-foreground">
                You must be at least 13 years old to use Skyward. If you are a minor where you
                live, your parent or legal guardian must approve your use of Skyward and agree to
                these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">2. Your Account</h2>
              <p className="text-sm text-muted-foreground">You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Providing accurate account information;</li>
                <li>Keeping your login credentials secure; and</li>
                <li>Activities that occur through your account.</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                You may not use Skyward for unlawful or unauthorized purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                3. Subscriptions and Payments
              </h2>
              <p className="text-sm text-muted-foreground">
                Some Skyward features require a paid subscription.
              </p>
              <p className="text-sm text-muted-foreground">
                Subscriptions automatically renew at the end of each billing period unless you
                cancel before the next renewal.
              </p>
              <p className="text-sm text-muted-foreground">
                If your subscription includes a{" "}
                <span className="font-medium text-foreground/80">14-day free trial</span>, you
                will not be charged during the trial. Unless you cancel before the trial ends, your
                payment method will be charged according to the subscription plan you selected.
              </p>
              <p className="text-sm text-muted-foreground">
                You may cancel your subscription through your account. Cancellation takes effect at
                the end of your current paid billing period.
              </p>
              <p className="text-sm text-muted-foreground">
                Prices and subscription plans may change. If a change affects an existing
                subscription, we will provide any notice required by applicable law before the
                change takes effect.
              </p>
              <p className="text-sm text-muted-foreground">
                Applicable taxes may be added to your purchase.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                4. License to Use Skyward
              </h2>
              <p className="text-sm text-muted-foreground">
                Skyward and its software, designs, trademarks, content, and technology belong to us
                or our licensors and are protected by applicable intellectual property laws.
              </p>
              <p className="text-sm text-muted-foreground">
                While you comply with these Terms, we give you a limited, personal, non-exclusive,
                non-transferable, and revocable license to use Skyward for its intended purpose.
              </p>
              <p className="text-sm text-muted-foreground">
                You may not, except where permitted by law:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Copy, sell, sublicense, or redistribute Skyward;</li>
                <li>Reverse engineer, decompile, or attempt to obtain its source code;</li>
                <li>Circumvent or interfere with security or access controls;</li>
                <li>Use automated systems to scrape or interfere with the Services; or</li>
                <li>
                  Use Skyward or our intellectual property to create or operate a competing service.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                All rights not expressly granted to you remain with Skyward.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">5. Acceptable Use</h2>
              <p className="text-sm text-muted-foreground">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Use Skyward unlawfully;</li>
                <li>
                  Attempt to gain unauthorized access to Skyward, another account, or our systems;
                </li>
                <li>Introduce malware or other harmful code;</li>
                <li>Interfere with the operation or security of the Services;</li>
                <li>Attempt to bypass security measures protecting the Services; or</li>
                <li>Use Skyward in a way that infringes another person's rights.</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                We may suspend or terminate accounts that violate these Terms or applicable law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">6. Privacy</h2>
              <p className="text-sm text-muted-foreground">
                Our collection and use of personal information is described in our{" "}
                <span className="font-medium text-foreground/80">
                  Privacy Policy at skywardos.com/privacy
                </span>
                .
              </p>
              <p className="text-sm text-muted-foreground">
                By using Skyward, you acknowledge that your information may be processed as
                described in that policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">7. Third-Party Services</h2>
              <p className="text-sm text-muted-foreground">
                Skyward may rely on or interact with third-party services, websites, software, or
                payment providers.
              </p>
              <p className="text-sm text-muted-foreground">
                Those third parties may have their own terms and privacy policies. We are not
                responsible for third-party services that we do not control.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                8. Changes and Availability
              </h2>
              <p className="text-sm text-muted-foreground">
                We may update, modify, suspend, or discontinue parts of Skyward from time to time.
              </p>
              <p className="text-sm text-muted-foreground">
                We do not guarantee that Skyward will always be available, uninterrupted, or
                error-free. Maintenance, technical problems, third-party services, or other
                circumstances may occasionally affect availability.
              </p>
              <p className="text-sm text-muted-foreground">
                We may also update these Terms. If we make material changes, we will provide notice
                where required by law. The updated Terms will apply from their stated effective
                date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">9. Termination</h2>
              <p className="text-sm text-muted-foreground">
                You may stop using Skyward or cancel your subscription at any time.
              </p>
              <p className="text-sm text-muted-foreground">
                We may suspend or terminate your access if you materially violate these Terms,
                misuse the Services, fail to pay amounts due, or use Skyward unlawfully.
              </p>
              <p className="text-sm text-muted-foreground">
                Termination does not affect obligations or rights that arose before termination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">10. Disclaimers</h2>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, Skyward is provided{" "}
                <span className="font-medium text-foreground/80">
                  "as is" and "as available."
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                We do not guarantee that the Services will always meet your requirements, operate
                without interruption, or be completely free of errors.
              </p>
              <p className="text-sm text-muted-foreground">
                Nothing in these Terms excludes warranties or consumer rights that cannot legally
                be excluded.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                11. Limitation of Liability
              </h2>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, Skyward OS LLC and its officers, employees,
                and agents will not be liable for indirect, incidental, special, exemplary,
                punitive, or consequential damages arising from your use of the Services.
              </p>
              <p className="text-sm text-muted-foreground">
                To the maximum extent permitted by law, our total liability arising out of or
                relating to the Services will not exceed the amount you paid to Skyward during the{" "}
                <span className="font-medium text-foreground/80">
                  six months immediately preceding the event giving rise to the claim
                </span>
                .
              </p>
              <p className="text-sm text-muted-foreground">
                These limitations do not apply where liability cannot legally be excluded or
                limited.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                12. Governing Law and Disputes
              </h2>
              <p className="text-sm text-muted-foreground">
                These Terms are governed by the laws of the{" "}
                <span className="font-medium text-foreground/80">State of Wyoming</span>, without
                regard to conflict-of-law principles.
              </p>
              <p className="text-sm text-muted-foreground">
                To the extent permitted by applicable law, legal proceedings relating to these
                Terms or the Services will be brought in the applicable state or federal courts
                serving{" "}
                <span className="font-medium text-foreground/80">
                  Sheridan County, Wyoming
                </span>
                .
              </p>
              <p className="text-sm text-muted-foreground">
                Nothing in this section limits any mandatory consumer rights or protections that
                apply to you under the laws of your jurisdiction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">13. General Terms</h2>
              <p className="text-sm text-muted-foreground">
                These Terms, together with any policies incorporated into them, form the agreement
                between you and Skyward regarding the Services.
              </p>
              <p className="text-sm text-muted-foreground">
                If any provision of these Terms is found unenforceable, the remaining provisions
                will continue to apply.
              </p>
              <p className="text-sm text-muted-foreground">
                Our failure to enforce a provision does not waive our right to enforce it later.
              </p>
              <p className="text-sm text-muted-foreground">
                We may assign our rights or obligations in connection with a merger, acquisition,
                restructuring, sale of assets, or similar business transaction.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">14. Contact Us</h2>
              <p className="text-sm text-muted-foreground">
                Questions about these Terms can be sent to:{" "}
                <a
                  href="mailto:hello@skywardos.com"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  hello@skywardos.com
                </a>
              </p>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground font-medium">Skyward OS LLC</p>
                <p className="text-sm text-muted-foreground">Wyoming, United States</p>
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
