import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/privacy")({
  ssr: false,
  component: PrivacyPage,
});

function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">Last updated: August 13, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Skyward OS LLC ("Skyward," "we," "us," or "our") provides desktop and mobile
              applications designed to help users reduce screen time and build healthier digital
              habits.
            </p>
            <p className="text-sm text-muted-foreground">
              This Privacy Policy explains what personal information we collect, why we use it,
              when we share it, and the choices you have.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
              <p className="text-sm text-muted-foreground">
                We collect only the information reasonably necessary to provide, operate, secure,
                and improve Skyward.
              </p>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Account and service information
                </h3>
                <p className="text-sm text-muted-foreground">
                  Depending on how you use Skyward, you may provide us with:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground/80">Account information</span>,
                    such as your email address and authentication credentials.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/80">Settings and preferences</span>,
                    such as your time zone and blocking schedule preferences.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/80">Device information</span>,
                    such as the device's serial number.
                  </li>
                  <li>
                    <span className="font-medium text-foreground/80">Communications</span>, such as
                    information you provide when contacting us for support.
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground pt-1">
                  We may also collect basic information about how our website and applications are
                  used, such as pages or features accessed and the time of access.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">Payment information</h3>
                <p className="text-sm text-muted-foreground">
                  Payments are processed by Stripe.
                </p>
                <p className="text-sm text-muted-foreground">
                  When you make a payment, Stripe may collect information such as your name, billing
                  information, and payment card information. We do not store your full credit or
                  debit card number or card security code.
                </p>
                <p className="text-sm text-muted-foreground">
                  We may receive limited information from Stripe related to your transaction, such
                  as payment status, subscription status, transaction identifiers, and limited
                  customer or billing information.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                2. How We Use Your Information
              </h2>
              <p className="text-sm text-muted-foreground">
                We use the information described above to provide and operate Skyward, manage user
                accounts and devices, process subscriptions, provide support, troubleshoot problems,
                maintain security, and comply with legal obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                3. Legal Bases for Processing
              </h2>
              <p className="text-sm text-muted-foreground">
                If you are located in the European Economic Area ("EEA") or United Kingdom ("UK"),
                we process personal information only when we have a valid legal basis.
              </p>
              <p className="text-sm text-muted-foreground">
                Depending on the situation, we may process information:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>
                  To perform our contract with you, including providing your account and the Skyward
                  service;
                </li>
                <li>
                  For our legitimate interests, such as securing, maintaining, troubleshooting, and
                  improving our Services;
                </li>
                <li>With your consent, where consent is required; or</li>
                <li>To comply with legal obligations.</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                Where we rely on consent, you may withdraw your consent at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                4. How We Share Information
              </h2>
              <p className="text-sm text-muted-foreground">
                We may provide personal information to companies that help us operate Skyward,
                including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Payment processors, such as Stripe;</li>
                <li>Hosting and cloud infrastructure providers;</li>
                <li>Authentication and account-management providers;</li>
                <li>Analytics and error-monitoring providers</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                These providers may process information only as necessary to provide services to us
                and subject to applicable contractual and legal requirements.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                We may also disclose information if reasonably necessary to comply with law, respond
                to lawful requests, protect our rights or users, investigate fraud or security
                incidents, or complete a merger, acquisition, financing, or sale of all or part of
                our business.
              </p>
              <p className="text-sm text-muted-foreground pt-1 font-medium text-foreground">
                We do not sell personal information or share it for cross-context behavioral
                advertising.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">5. Cookies and Analytics</h2>
              <p className="text-sm text-muted-foreground">
                Our website may use cookies and similar technologies for essential functionality,
                security, preferences, and analytics.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                You can control cookies through your browser and, where required by applicable law,
                through the consent controls available on our website.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                6. International Data Transfers
              </h2>
              <p className="text-sm text-muted-foreground">
                We and our service providers may process personal information in countries other
                than the country where you live. Where required by law, we use legally recognized
                safeguards for international transfers, such as standard contractual protections.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                7. How Long We Keep Information
              </h2>
              <p className="text-sm text-muted-foreground">
                We retain personal information only for as long as reasonably necessary for the
                purposes described in this Privacy Policy.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                Account and device information is generally retained while your account is active.
                When your account is deleted, we will delete information that we no longer need,
                subject to reasonable technical limitations and any information we must retain for
                legal, accounting, fraud-prevention, dispute-resolution, or security purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">8. Security</h2>
              <p className="text-sm text-muted-foreground">
                We use reasonable technical and organizational safeguards designed to protect
                personal information against unauthorized access, loss, misuse, alteration, or
                disclosure.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                However, no internet transmission or data-storage system can be guaranteed to be
                completely secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">9. Your Privacy Rights</h2>
              <p className="text-sm text-muted-foreground">
                Depending on where you live, you may have the right to access, correct, delete, or
                obtain a copy of your personal information, or object to certain uses of it.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                To exercise a privacy right, email{" "}
                <a href="mailto:hello@skywardos.com" className="text-foreground underline underline-offset-2">
                  hello@skywardos.com
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">10. Children</h2>
              <p className="text-sm text-muted-foreground">
                Skyward accounts are intended for adults. Parents or legal guardians may use Skyward
                to manage devices used by minors.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                We do not knowingly allow children under 13 to create accounts or provide personal
                information directly to us without any consent required by applicable law.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                If we learn that we collected personal information from a child under 13 without
                required consent, we will take reasonable steps to delete it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                11. Changes to This Policy
              </h2>
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-sm text-muted-foreground pt-1">
                When we do, we will update the "Last updated" date above. If we make material
                changes, we may provide additional notice where required by law.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">12. Contact Us</h2>
              <p className="text-sm text-muted-foreground">
                If you have questions, concerns, or requests regarding this Privacy Policy or your
                personal information, contact us at{" "}
                <a href="mailto:hello@skywardos.com" className="text-foreground underline underline-offset-2">
                  hello@skywardos.com
                </a>
                .
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
