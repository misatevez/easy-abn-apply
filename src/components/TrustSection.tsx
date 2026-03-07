import { ShieldCheck, Lock, CheckCircle, UserCheck, Zap, ClipboardCheck, ShieldCheck as ShieldIcon, HeadphonesIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logoXero from "@/assets/logo-xero.png";
import logoCaanz from "@/assets/logo-caanz.png";
import logoTpb from "@/assets/logo-tpb.png";
import logoQuickbooks from "@/assets/logo-quickbooks.png";
import logoTaxInstitute from "@/assets/logo-tax-institute.png";
import logoMyob from "@/assets/logo-myob.png";

const trustIndicators = [
  { icon: ShieldCheck, label: "Accredited Tax Agent" },
  { icon: Lock, label: "Secure & Encrypted Application" },
  { icon: CheckCircle, label: "Government Compliant" },
  { icon: UserCheck, label: "Expert Review Before Submission" },
];

const logos = [
  { src: logoXero, alt: "Xero" },
  { src: logoCaanz, alt: "Chartered Accountants ANZ" },
  { src: logoTpb, alt: "Tax Practitioners Board Registered" },
  { src: logoQuickbooks, alt: "QuickBooks" },
  { src: logoTaxInstitute, alt: "The Tax Institute" },
  { src: logoMyob, alt: "MYOB" },
];

const conversionBenefits = [
  { icon: Zap, title: "Fast online application", description: "Complete your registration in minutes with our streamlined process." },
  { icon: ClipboardCheck, title: "Expert compliance review", description: "Every submission is reviewed by our qualified professionals." },
  { icon: ShieldIcon, title: "Secure submission to the ABR", description: "Your data is encrypted and submitted directly to the Australian Business Register." },
  { icon: HeadphonesIcon, title: "Support if you need help", description: "Our team is available to assist you throughout the process." },
];

const TrustSection = () => {
  return (
    <>
      {/* PART 1 — Trust Strip */}
      <section className="bg-primary/[0.04] py-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {trustIndicators.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-4">
        <div className="container">
          <div className="h-px bg-border/60" />
        </div>
      </div>

      {/* PART 2 — Professional Network */}
      <section className="bg-secondary/30 py-20">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column — Text */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                We work within a trusted professional ecosystem
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Our professional network and industry associations
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                We operate within recognised accounting platforms and
                professional regulatory frameworks to deliver compliant
                business registration services across Australia. Supporting
                Australian businesses with secure and accurate registrations.
              </p>
            </div>

            {/* Right column — Logo Grid (no containers) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
              {logos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] hover:brightness-110"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-20 w-auto max-w-[150px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PART 3 — Conversion Bridge */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
              Why thousands of Australians register their ABN with us
            </h2>

            <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {conversionBenefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/apply">
              <Button variant="hero" size="lg" className="px-10">
                Start my ABN Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
