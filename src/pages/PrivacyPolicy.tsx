import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="container text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground md:text-lg">
            Learn how we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-10">

            <p className="text-sm leading-relaxed text-muted-foreground">
              This Privacy Policy explains how REGISTRATION MANAGEMENT PTY LTD collects, uses, discloses, and protects personal information obtained through our lead generation services and interactions with third parties. We are committed to safeguarding the privacy of individuals and comply with all relevant data protection laws. By using our services, you consent to the practices outlined in this Privacy Policy.
            </p>

            {/* 1 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">1. Introduction</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                1.1 We collect personal information that you provide voluntarily when using our services or interacting with our website.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                1.2 The personal information we may collect includes, but is not limited to, your name, contact details (email, phone number, mailing address), demographic information, and specific lead requirements.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">2. Use of Personal Information</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                2.1 We use personal information to provide and improve our lead generation services and to share relevant information with third parties that assist clients with their services.
              </p>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                2.2 Personal information may be used for the following purposes:
              </p>
              <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>Generating and organizing leads based on client requirements</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Communicating with clients and providing updates on leads and services</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Sharing lead information with third parties to facilitate connections with service providers</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Analyzing and improving our services, operations, and website functionality</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Complying with legal obligations and protecting our rights and the rights of others</li>
              </ul>
            </div>

            {/* 3 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">3. Information Sharing</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                3.1 We may share personal information with third-party service providers and partners to help deliver services to our clients. However, we do not sell or rent personal information for marketing purposes.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                3.2 We take reasonable steps to ensure that third parties handle personal information in accordance with applicable privacy laws and industry standards. However, we cannot guarantee the actions of third parties outside our control.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">4. Data Security</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                4.1 REGISTRATION MANAGEMENT PTY LTD implements reasonable security measures to protect personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                4.2 While we strive to safeguard your information, no method of transmission or storage over the Internet is entirely secure. As such, we cannot guarantee absolute security.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">5. Data Retention</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                5.1 We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                5.2 When personal information is no longer needed, we will securely dispose of it in accordance with our data retention and disposal procedures.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">6. Your Rights and Choices</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                6.1 You have the right to access, update, correct, or delete your personal information, subject to legal requirements.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                6.2 You may opt out of certain communications from us by following the unsubscribe instructions provided in our emails or by contacting us directly.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">7. Children's Privacy</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                7.1 Our services are not intended for individuals under 18 years old. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child without parental consent, we will take steps to delete that information.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">8. Third-Party Links</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                8.1 Our website may contain links to third-party websites or services. This Privacy Policy does not apply to these third-party sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of those third parties before providing any personal information.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">9. Changes to the Privacy Policy</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                9.1 We may update this Privacy Policy periodically to reflect changes in our practices or legal obligations. We will post the updated Privacy Policy on our website and indicate the revision date.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                9.2 We encourage you to review this Privacy Policy regularly to stay informed about how we collect, use, and protect your personal information.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">10. Contact Information</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                10.1 If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at <a href="mailto:info@abn-number.com" className="text-primary hover:underline">info@abn-number.com</a>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By using our lead generation services and sharing information with third parties, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
