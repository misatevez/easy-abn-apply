import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

const ContactUs = () => {
  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header */}
              <div className="px-6 pt-28 pb-2 md:pt-28 text-center md:px-[40px]">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-4xl">
                  Contact Us
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground my-5 py-2.5">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 md:px-10 pt-4 pb-16">
                <div className="mx-auto max-w-[570px]">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    Our team specialises in Australian business registration and compliance services. We aim to provide a smooth, reliable, and professional experience for all our clients. Whether you are establishing a new business or updating your existing details, our experienced team will be pleased to assist you.
                  </p>

                  <h2 className="mt-10 text-lg font-bold text-foreground">How to Reach Us</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                    📧 Email:{" "}
                    <a href="mailto:info@abn-number.com" className="text-primary font-semibold hover:underline">
                      info@abn-number.com
                    </a>
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    If you have any questions regarding our services or your application, please feel free to contact us by email. A member of our team will respond to your enquiry as soon as possible, typically within the next business day.
                  </p>

                  <h2 className="mt-10 text-lg font-bold text-foreground">Our Services</h2>
                  <ul className="mt-3 space-y-2 text-[15px] text-muted-foreground">
                    <li>✔ ABN Registration & Reactivation</li>
                    <li>✔ ABN Details Updates</li>
                    <li>✔ Business Name Registration & Renewal</li>
                    <li>✔ GST Registration & Cancellation</li>
                    <li>✔ ABN & Business Name Cancellation</li>
                  </ul>

                  <p className="mt-10 text-[15px] leading-relaxed text-muted-foreground">
                    We are committed to delivering efficient, accurate, and professional support, helping ensure your business remains compliant with Australian regulatory requirements.
                  </p>
                  <p className="mt-4 mb-4 text-[15px] leading-relaxed text-muted-foreground">
                    Should you require any assistance, please do not hesitate to contact our team. We will be happy to help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
