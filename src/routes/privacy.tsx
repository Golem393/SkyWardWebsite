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
            <p className="text-sm text-muted-foreground">Last Updated: June 18, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Skyward OS LLC ("Skyward," "we," "our," or "us") respects your privacy and is
              committed to protecting your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              This Privacy Policy explains how we collect, use, disclose, and protect information
              when you use the Skyward website, software, and related services (collectively, the
              "Service").
            </p>
            <p className="text-sm text-muted-foreground font-medium text-foreground">
              By using the Service, you agree to the practices described in this Privacy Policy.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Information You Provide</h3>
                <p className="text-sm text-muted-foreground">
                  We may collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Email address</li>
                  <li>Account credentials</li>
                  <li>Subscription information</li>
                  <li>Customer support communications</li>
                  <li>Information submitted during setup</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">Device Information</h3>
                <p className="text-sm text-muted-foreground">
                  To provide and manage the Service, we may collect certain device-related
                  information, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Device model</li>
                  <li>Device manufacturer</li>
                  <li>Android version</li>
                  <li>Device identifiers such as IMEI or serial number</li>
                  <li>Device enrollment status</li>
                  <li>Configuration and management information</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">Payment Information</h3>
                <p className="text-sm text-muted-foreground">
                  Payments are processed by third-party payment processors. We do not store complete
                  payment card information on our servers. We may receive limited billing
                  information such as:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Payment status</li>
                  <li>Transaction identifiers</li>
                  <li>Subscription status</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Automatically Collected Information
                </h3>
                <p className="text-sm text-muted-foreground">
                  When you use the Service, we may automatically collect:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Website usage information</li>
                  <li>Error logs and diagnostic information</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">2. How We Use Information</h2>
              <p className="text-sm text-muted-foreground">We use information to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Provide and operate the Service</li>
                <li>Create and manage accounts</li>
                <li>Process subscriptions and payments</li>
                <li>Enroll and manage supported devices</li>
                <li>Provide customer support</li>
                <li>Improve reliability and security</li>
                <li>Detect fraud, abuse, or unauthorized activity</li>
                <li>Comply with legal obligations</li>
                <li>Communicate with users regarding accounts, subscriptions, and updates</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                3. Device Management Information
              </h2>
              <p className="text-sm text-muted-foreground">
                Skyward is a device management service. As part of providing the Service, Skyward
                may collect and process information necessary to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Verify device compatibility</li>
                <li>Configure device restrictions</li>
                <li>Enforce content and application controls</li>
                <li>Maintain device enrollment</li>
                <li>Diagnose technical issues</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                We collect only the information reasonably necessary to provide these functions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                4. Content and Activity Monitoring
              </h2>
              <p className="text-sm text-muted-foreground">
                Skyward is not designed to monitor the contents of personal communications. We do
                not intentionally collect the content of:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Text messages</li>
                <li>Emails</li>
                <li>Phone calls</li>
                <li>Chat conversations</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                However, certain device-management or diagnostic information may be collected as
                necessary to provide the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                5. Cookies and Similar Technologies
              </h2>
              <p className="text-sm text-muted-foreground">
                Our website may use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Maintain user sessions</li>
                <li>Improve website functionality</li>
                <li>Analyze website usage</li>
                <li>Enhance security</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                You may adjust browser settings to limit cookies, although some features may not
                function properly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">6. Sharing of Information</h2>
              <p className="text-sm text-muted-foreground">We do not sell personal information.</p>
              <p className="text-sm text-muted-foreground">We may share information with:</p>

              <div className="space-y-2 pl-2">
                <h3 className="text-sm font-semibold text-foreground">Service Providers</h3>
                <p className="text-sm text-muted-foreground">
                  Third-party providers that help us operate the Service, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Payment processors</li>
                  <li>Hosting providers</li>
                  <li>Email providers</li>
                  <li>Analytics providers</li>
                  <li>Device management providers</li>
                  <li>Infrastructure providers</li>
                </ul>
              </div>

              <div className="space-y-2 pl-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">Legal Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  We may disclose information if required to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Comply with law</li>
                  <li>Respond to lawful requests</li>
                  <li>Protect our rights</li>
                  <li>Protect user safety</li>
                  <li>Prevent fraud or abuse</li>
                </ul>
              </div>

              <div className="space-y-2 pl-2 pt-2">
                <h3 className="text-sm font-semibold text-foreground">Business Transfers</h3>
                <p className="text-sm text-muted-foreground">
                  If Skyward is involved in a merger, acquisition, asset sale, financing, or similar
                  transaction, information may be transferred as part of that transaction.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">7. Data Retention</h2>
              <p className="text-sm text-muted-foreground">
                We retain information for as long as reasonably necessary to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Provide the Service</li>
                <li>Maintain accounts</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce agreements</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                When information is no longer required, we may delete or anonymize it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">8. Data Security</h2>
              <p className="text-sm text-muted-foreground">
                We implement reasonable administrative, technical, and organizational measures
                designed to protect personal information.
              </p>
              <p className="text-sm text-muted-foreground">
                However, no security system is completely secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">9. International Users</h2>
              <p className="text-sm text-muted-foreground">
                Skyward is operated from the United States. Information may be processed, stored,
                and transferred in the United States or other countries where our service providers
                operate.
              </p>
              <p className="text-sm text-muted-foreground font-medium text-foreground">
                By using the Service, you consent to such transfers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">10. Your Rights</h2>
              <p className="text-sm text-muted-foreground">
                Depending on your jurisdiction, you may have rights regarding your personal
                information, including:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Access</li>
                <li>Correction</li>
                <li>Deletion</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to certain processing activities</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                To exercise applicable rights, contact us using the information below.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                11. California Privacy Rights
              </h2>
              <p className="text-sm text-muted-foreground">
                If you are a California resident, you may have additional rights under applicable
                California privacy laws.
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                Skyward does not sell personal information.
              </p>
              <p className="text-sm text-muted-foreground">
                California residents may request information regarding the collection and use of
                their personal information by contacting us.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                12. European Economic Area and United Kingdom Users
              </h2>
              <p className="text-sm text-muted-foreground">
                For users located in the European Economic Area, Switzerland, or the United Kingdom,
                we process personal information based on:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Performance of a contract</li>
                <li>Legitimate business interests</li>
                <li>Compliance with legal obligations</li>
                <li>User consent where required</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                You may have additional rights under applicable privacy laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">13. Children's Privacy</h2>
              <p className="text-sm text-muted-foreground">
                The Service is not directed to children under the age of 13.
              </p>
              <p className="text-sm text-muted-foreground">
                We do not knowingly collect personal information from children under 13.
              </p>
              <p className="text-sm text-muted-foreground">
                If we become aware that such information has been collected, we will take reasonable
                steps to delete it.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                14. Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-sm text-muted-foreground">
                The updated version will be posted on our website with a revised effective date.
              </p>
              <p className="text-sm text-muted-foreground font-medium text-foreground">
                Continued use of the Service after updates constitutes acceptance of the revised
                Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">15. Contact Us</h2>
              <p className="text-sm text-muted-foreground font-medium">Skyward OS LLC</p>
              <p className="text-sm text-muted-foreground">Email: hello@skywardos.com</p>
              <p className="text-sm text-muted-foreground">Website: skywardos.com</p>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
