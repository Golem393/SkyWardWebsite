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
              Terms & Conditions
            </h1>
            <p className="text-sm text-muted-foreground">Last Updated: June 18, 2026</p>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-sm text-muted-foreground">Welcome to Skyward.</p>
            <p className="text-sm text-muted-foreground">
              These Terms and Conditions ("Terms") govern your access to and use of the Skyward
              website, software, services, and related products (collectively, the "Service")
              operated by Skyward OS LLC, a Wyoming limited liability company ("Skyward," "we,"
              "us," or "our").
            </p>
            <p className="text-sm text-muted-foreground">
              By creating an account, purchasing a subscription, installing Skyward, or using the
              Service, you agree to be bound by these Terms. If you do not agree, do not use the
              Service.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">1. Eligibility</h2>
              <p className="text-sm text-muted-foreground">
                You must be at least 18 years old or the age of majority in your jurisdiction to use
                the Service.
              </p>
              <p className="text-sm text-muted-foreground">You represent and warrant that:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>
                  You own the device being enrolled in Skyward or have authorization to manage it.
                </li>
                <li>The information you provide is accurate and current.</li>
                <li>Your use of the Service complies with applicable laws.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
              <p className="text-sm text-muted-foreground">
                Skyward is a smartphone transformation service designed to reduce distractions by
                restricting access to selected applications, websites, and categories of content.
              </p>
              <p className="text-sm text-muted-foreground">The Service may include:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Application restrictions</li>
                <li>Website filtering</li>
                <li>DNS filtering</li>
                <li>Device management tools</li>
                <li>Content blocking</li>
                <li>Security controls</li>
                <li>Account management services</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1 font-medium text-foreground">
                Features may change at any time.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">3. Supported Devices</h2>
              <p className="text-sm text-muted-foreground">
                Skyward currently supports selected Android devices.
              </p>
              <p className="text-sm text-muted-foreground">Compatibility may vary by:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Device manufacturer</li>
                <li>Device model</li>
                <li>Android version</li>
                <li>Carrier modifications</li>
                <li>Software updates</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1 font-medium text-foreground">
                We do not guarantee compatibility with all devices.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                4. Factory Reset Requirement
              </h2>
              <p className="text-sm text-muted-foreground">
                Certain Skyward installations require a factory reset of the device.
              </p>
              <p className="text-sm text-muted-foreground">
                A factory reset permanently removes applications, accounts, messages, photos, files,
                settings, and other data stored on the device.
              </p>
              <p className="text-sm text-muted-foreground">
                You acknowledge that the decision to factory reset your device is made by you and
                not by Skyward.
              </p>
              <p className="text-sm text-muted-foreground">You acknowledge and agree that:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>
                  You are solely responsible for backing up your device before beginning setup.
                </li>
                <li>Skyward is not responsible for lost data.</li>
                <li>Skyward cannot recover deleted data.</li>
              </ul>
              <p className="text-sm text-muted-foreground font-semibold pt-1">
                Failure to properly back up your device may result in permanent data loss.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">5. Account Registration</h2>
              <p className="text-sm text-muted-foreground">
                To use certain features, you may be required to create an account.
              </p>
              <p className="text-sm text-muted-foreground">You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activity occurring under your account</li>
                <li>Promptly notifying us of unauthorized access</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                We reserve the right to suspend or terminate accounts that contain inaccurate
                information or violate these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">6. Subscription and Billing</h2>
              <p className="text-sm text-muted-foreground">
                Access to the Service may require a paid subscription.
              </p>
              <p className="text-sm text-muted-foreground">
                Subscriptions may be offered on a monthly or annual basis.
              </p>
              <p className="text-sm text-muted-foreground">
                By purchasing a subscription, you authorize us and our payment processors to charge
                your selected payment method for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Subscription fees</li>
                <li>Applicable taxes</li>
                <li>Renewal charges</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                Subscription fees are billed in advance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">7. Automatic Renewal</h2>
              <p className="text-sm text-muted-foreground">
                Unless canceled before renewal, subscriptions automatically renew at the end of each
                billing period.
              </p>
              <p className="text-sm text-muted-foreground">
                You authorize us to charge the payment method associated with your account for
                renewal fees.
              </p>
              <p className="text-sm text-muted-foreground">
                You may cancel at any time through your account or by contacting us.
              </p>
              <p className="text-sm text-muted-foreground">
                Cancellation prevents future renewals but does not automatically generate refunds
                for prior charges except as provided in our refund policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">8. Refund Policy</h2>
              <p className="text-sm text-muted-foreground">
                First-time customers may request a refund within thirty (30) days of their initial
                purchase, subject to these Terms.
              </p>
              <p className="text-sm text-muted-foreground">
                Refund requests submitted after the applicable refund period may be denied.
              </p>
              <p className="text-sm text-muted-foreground">
                We reserve the right to refuse refunds where abuse, fraud, repeated refund requests,
                or misuse of the Service is suspected.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">9. Restrictions on Use</h2>
              <p className="text-sm text-muted-foreground">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Reverse engineer the Service</li>
                <li>Modify or attempt to bypass Skyward protections</li>
                <li>Circumvent filtering or management controls</li>
                <li>Resell or sublicense the Service</li>
                <li>Interfere with Service operations</li>
                <li>Use the Service for unlawful purposes</li>
                <li>Attempt unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                10. Content Filtering Disclaimer
              </h2>
              <p className="text-sm text-muted-foreground">
                Skyward uses curated blocklists, filtering systems, device controls, and third-party
                technologies to restrict access to certain applications, websites, and content.
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                No filtering technology is perfect.
              </p>
              <p className="text-sm text-muted-foreground">Accordingly:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Not all restricted content may be blocked at all times.</li>
                <li>New applications or websites may become available before being categorized.</li>
                <li>
                  Filtering results may vary by device, network, operating system, or other factors.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                Skyward does not guarantee complete blocking of any category of content.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">11. Third-Party Services</h2>
              <p className="text-sm text-muted-foreground">
                The Service may rely on third-party providers, including payment processors, DNS
                providers, device management providers, hosting providers, and other service
                providers.
              </p>
              <p className="text-sm text-muted-foreground">
                We are not responsible for interruptions, outages, errors, or failures caused by
                third-party services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">12. Device Functionality</h2>
              <p className="text-sm text-muted-foreground">
                The Service intentionally restricts access to certain applications, websites,
                features, or services.
              </p>
              <p className="text-sm text-muted-foreground">You acknowledge that:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Some applications may become unavailable.</li>
                <li>Some websites may be inaccessible.</li>
                <li>Certain device functions may operate differently while Skyward is active.</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1 font-medium text-foreground">
                These restrictions are part of the intended functionality of the Service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">13. No Emergency Use</h2>
              <p className="text-sm text-muted-foreground">
                The Service is not designed, intended, or certified for emergency communications,
                emergency response, medical monitoring, safety-critical functions, or life-support
                purposes.
              </p>
              <p className="text-sm text-muted-foreground">
                You are responsible for ensuring that your use of the Service does not interfere
                with your ability to access emergency services, emergency contacts, healthcare
                providers, or other critical communications.
              </p>
              <p className="text-sm text-muted-foreground">
                Skyward shall not be responsible for any loss, damage, injury, or harm arising from
                the use of the Service in connection with emergency, medical, safety-critical, or
                life-support situations.{" "}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">14. Service Availability</h2>
              <p className="text-sm text-muted-foreground">
                We strive to maintain reliable operation but do not guarantee uninterrupted
                availability.
              </p>
              <p className="text-sm text-muted-foreground">
                The Service may occasionally be unavailable due to:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Maintenance</li>
                <li>Security updates</li>
                <li>Technical failures</li>
                <li>Third-party outages</li>
                <li>Circumstances beyond our control</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">15. Force Majeure</h2>
              <p className="text-sm text-muted-foreground">
                Skyward shall not be liable for delays, interruptions, or failures resulting from
                causes beyond its reasonable control, including internet outages, telecommunications
                failures, cyberattacks, governmental actions, labor disputes, natural disasters,
                acts of war, or failures of third-party service providers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                16. Disclaimer of Warranties
              </h2>
              <p className="text-sm text-muted-foreground font-semibold uppercase">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE."
              </p>
              <p className="text-sm text-muted-foreground font-semibold uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SKYWARD DISCLAIMS ALL WARRANTIES, WHETHER
                EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES OF:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground uppercase">
                <li>MERCHANTABILITY</li>
                <li>FITNESS FOR A PARTICULAR PURPOSE</li>
                <li>NON-INFRINGEMENT</li>
                <li>ACCURACY</li>
                <li>RELIABILITY</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, UNINTERRUPTED, OR COMPLETELY
                EFFECTIVE IN ACHIEVING ANY PARTICULAR RESULT.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">17. Limitation of Liability</h2>
              <p className="text-sm text-muted-foreground font-semibold uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SKYWARD OS LLC, ITS MEMBERS, MANAGERS,
                EMPLOYEES, CONTRACTORS, AFFILIATES, AND SUPPLIERS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground uppercase">
                <li>INDIRECT DAMAGES</li>
                <li>INCIDENTAL DAMAGES</li>
                <li>SPECIAL DAMAGES</li>
                <li>CONSEQUENTIAL DAMAGES</li>
                <li>LOSS OF DATA</li>
                <li>LOSS OF PROFITS</li>
                <li>LOSS OF BUSINESS</li>
                <li>LOSS OF DEVICE FUNCTIONALITY</li>
                <li>SERVICE INTERRUPTION</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                IN NO EVENT SHALL SKYWARD'S TOTAL LIABILITY EXCEED THE GREATER OF:
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                (A) THE AMOUNT YOU PAID TO SKYWARD DURING THE TWELVE (12) MONTHS PRECEDING THE
                CLAIM; OR
              </p>
              <p className="text-sm text-muted-foreground font-semibold">
                (B) ONE HUNDRED U.S. DOLLARS ($100).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">18. Indemnification</h2>
              <p className="text-sm text-muted-foreground">
                You agree to defend, indemnify, and hold harmless Skyward OS LLC and its affiliates
                from any claims, damages, liabilities, losses, and expenses arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of applicable laws</li>
                <li>Your misuse of the Service</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                19. Suspension and Termination
              </h2>
              <p className="text-sm text-muted-foreground">
                We may suspend or terminate your access to the Service at any time if:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>You violate these Terms</li>
                <li>We suspect fraud or abuse</li>
                <li>Continued access creates legal, security, or operational risk</li>
              </ul>
              <p className="text-sm text-muted-foreground pt-1">
                Termination does not relieve you of payment obligations already incurred.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">20. Intellectual Property</h2>
              <p className="text-sm text-muted-foreground">
                All content, software, trademarks, logos, designs, and materials associated with
                Skyward are owned by Skyward OS LLC or its licensors.
              </p>
              <p className="text-sm text-muted-foreground">
                No rights are granted except as expressly provided in these Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">21. Changes to the Service</h2>
              <p className="text-sm text-muted-foreground">
                We reserve the right to modify, suspend, discontinue, or replace any portion of the
                Service at any time.
              </p>
              <p className="text-sm text-muted-foreground">
                We are not liable for modifications or discontinuation of any feature.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">22. Changes to These Terms</h2>
              <p className="text-sm text-muted-foreground">
                We may update these Terms from time to time.
              </p>
              <p className="text-sm text-muted-foreground">
                Updated Terms become effective when posted on our website.
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                Continued use of the Service after updates constitutes acceptance of the revised
                Terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">23. Governing Law</h2>
              <p className="text-sm text-muted-foreground">
                These Terms shall be governed by and construed in accordance with the laws of the
                State of Wyoming, United States, without regard to conflict of law principles.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">24. Dispute Resolution</h2>
              <p className="text-sm text-muted-foreground">
                Any dispute arising from or relating to these Terms or the Service shall be resolved
                exclusively in the state or federal courts located in Wyoming, and you consent to
                the jurisdiction of those courts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">25. Contact Information</h2>
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
