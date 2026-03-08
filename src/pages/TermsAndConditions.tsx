import Layout from "@/components/Layout";

const TermsAndConditions = () => {
  return (
    <Layout>
      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="container text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Terms And Conditions
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground md:text-lg">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-10">

            {/* 1 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By accessing, browsing, or using this website (https://abn-number.com), you acknowledge and agree to be bound by these Terms and Conditions ("Terms"). Additionally, you agree to comply with all applicable laws and regulations. The individual completing the ABN Number application form is referred to as "the applicant." The terms "we," "our," and "the company" refer to <a href="mailto:info@abn-number.com" className="text-primary hover:underline">info@abn-number.com</a>.
              </p>
            </div>

            {/* 2 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">2. General Information</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                We collect and store the following personal information in our secure database: name, place of birth, date of birth, passport number, expiry date, date of issue, supporting document type, email address, postal address, telephone number, connection log, IP address information, cookies, and payment records. For more details, please refer to our Privacy Policy.
              </p>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">Applicants must not:</p>
              <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>Provide false or incorrect information</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Omit required information on the application form</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Ignore or alter the registration process</li>
              </ul>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If any of these conditions are violated, we reserve the right to cancel the application and delete the applicant's data.
              </p>
            </div>

            {/* 3 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">3. Use of Our Website</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This website and its services are for personal use only. We are a private entity and are not affiliated with the Government of Australia. Users must not copy, reuse, modify, or download any part of the website for commercial purposes.
              </p>
            </div>

            {/* 4 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">4. Content of the Service</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Our website's terms of service and policies may be updated at any time for legal, security, or technical reasons. The applicant agrees to comply with any such modifications.
              </p>
            </div>

            {/* 5 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">5. Scope of Service</h2>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                We provide online processing of ABN Number applications. Our services include:
              </p>
              <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>Informing and collecting applicant information</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Submitting applications to relevant authorities</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Providing support during the tax registration process</li>
              </ul>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Upon submission and acceptance of an application, the applicant receives an email confirmation. Due to the personalized nature of this service, once the application is submitted, the contract between the applicant and our company is formalized.
              </p>
            </div>

            {/* 6 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">6. Responsibilities and Limitations</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We act as a service provider facilitating applications but do not guarantee the issuance of an ABN Number, as final approval rests with the government authority. Any fees paid are for processing, management, and support services, not for the issuance of an ABN Number.
              </p>
            </div>

            {/* 7 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">7. Applicant Responsibilities</h2>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">By using our service, you confirm that:</p>
              <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>The information provided is accurate and up-to-date</li>
                <li className="flex gap-2"><span className="text-primary">•</span>You are responsible for updating details with the Australian Taxation Office (ATO)</li>
                <li className="flex gap-2"><span className="text-primary">•</span>False or misleading information may lead to penalties from regulatory bodies</li>
              </ul>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                We may request identification to verify your details. We are not responsible for any loss resulting from incorrect information provided by you.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The applicant agrees that any contracted service may, if necessary, be transferred to another registered Tax Agent to expedite processing or ensure timely delivery. All Tax Agents involved are fully registered and compliant with the Tax Practitioners Board (TPB). Such a transfer will not affect the quality, accuracy, or validity of the service provided.
              </p>
            </div>

            {/* 8 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">8. Business Name Registration Services</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Business Name availability checks depend on the Australian Securities and Investments Commission (ASIC) register.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Registering a Business Name does not prevent others from registering similar names or trademarks.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                If your chosen Business Name is unavailable, you can choose another name at no cost or request a refund, minus a $49 administration fee.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Manual review by ASIC may delay or impact registration.
              </p>
            </div>

            {/* 9 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">9. Business Name Renewal Services</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                We send renewal reminders via email or SMS before your Business Name expires.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                You are responsible for renewing your Business Name.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We are not liable for any loss due to failure to renew your Business Name.
              </p>
            </div>

            {/* 10 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">10. ABN Cancellation Service</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                If your business ceases operations or undergoes structural changes, you must cancel your ABN.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                ABN cancellation affects related registrations, including GST and PAYG.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                If your cancellation request is denied, we will inform you.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We are not liable for losses resulting from ABN cancellation.
              </p>
            </div>

            {/* 11 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">11. Fees</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Fees include service charges and applicable government fees.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Payments must be made at the time of application submission.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                Fees are non-refundable unless otherwise specified.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Fees are in Australian dollars (AUD) and include GST where applicable.
              </p>
            </div>

            {/* 12 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">12. Refund Policy</h2>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">Refunds are only available in the following cases:</p>
              <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>If you withdraw your application before processing begins (subject to a $49 administration fee).</li>
                <li className="flex gap-2"><span className="text-primary">•</span>If an ABN application is not issued, a 50% refund of the application fee ($34.50) may be granted at our discretion.</li>
                <li className="flex gap-2"><span className="text-primary">•</span>Refunds received from ASIC will be passed on to you.</li>
              </ul>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We may offset any refunds against outstanding fees owed by you.
              </p>
            </div>

            {/* 13 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">13. Chargebacks</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Initiating a chargeback with your bank violates these Terms. If a chargeback is filed, any services provided (including ABN, Business Name, or GST registrations) will be immediately revoked.
              </p>
            </div>

            {/* 14 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">14. Limitation of Liability</h2>
              <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                We do not issue ABN Numbers or official documents; we only facilitate the application process. Therefore:
              </p>
              <ul className="mb-4 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2"><span className="text-primary">•</span>We are not liable for government processing delays.</li>
                <li className="flex gap-2"><span className="text-primary">•</span>We do not cover costs related to additional documentation requested by authorities.</li>
              </ul>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We recommend applying in advance and postponing commitments until you receive confirmation.
              </p>
            </div>

            {/* 15 */}
            <div>
              <h2 className="mb-3 text-xl font-bold text-foreground md:text-2xl">15. Contact Information</h2>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                For any inquiries, please contact us at <a href="mailto:info@abn-number.com" className="text-primary hover:underline">info@abn-number.com</a>.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                By using our services, you acknowledge and agree to these Terms and Conditions.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsAndConditions;
