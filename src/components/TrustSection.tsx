import { ShieldCheck, Lock, CheckCircle, UserCheck } from "lucide-react";

import logoXero from "@/assets/logo-xero.png";
import logoCaanz from "@/assets/logo-caanz.png";
import logoTpb from "@/assets/logo-tpb.png";
import logoQuickbooks from "@/assets/logo-quickbooks.png";
import logoTaxInstitute from "@/assets/logo-tax-institute.png";
import logoMyob from "@/assets/logo-myob.png";

const trustIndicators = [
  { icon: ShieldCheck, label: "Accredited Tax Agent" },
  { icon: Lock, label: "Secure & Encrypted" },
  { icon: CheckCircle, label: "Government Compliant" },
  { icon: UserCheck, label: "Expert Review" },
];

const logos = [
  { src: logoXero, alt: "Xero" },
  { src: logoCaanz, alt: "Chartered Accountants ANZ" },
  { src: logoTpb, alt: "Tax Practitioners Board Registered" },
  { src: logoQuickbooks, alt: "QuickBooks" },
  { src: logoTaxInstitute, alt: "The Tax Institute" },
  { src: logoMyob, alt: "MYOB" },
];

const TrustSection = () => {
  return (
    <>
      {/* PART 1 — Trust Strip */}
      <section className="border-y border-border/50 bg-secondary/40 py-6">
        <div className="container">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10 md:gap-14">
            {trustIndicators.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5"
              >
                <item.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PART 2 — Professional Network */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column — Text */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                We work within a trusted professional ecosystem
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Our professional network and industry associations
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We work with recognised accounting platforms and within
                established professional and regulatory frameworks to support
                accurate, compliant, and efficient business registration
                services across Australia.
              </p>
              <p className="text-sm font-medium text-foreground/80">
                Supporting Australian businesses with compliant registration
                services.
              </p>
            </div>

            {/* Right column — Logo Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {logos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex items-center justify-center rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-12 w-auto max-w-[120px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
