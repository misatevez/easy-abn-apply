import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Clock, FileCheck, Search, Hash } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Secure & Encrypted" },
  { icon: CheckCircle2, label: "Government Compliant" },
  { icon: Clock, label: "Fast Processing" },
  { icon: FileCheck, label: "Expert Review" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(217 85% 62%) 100%)" }}>
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary-foreground/[0.06]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary-foreground/[0.04]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-primary-foreground/[0.03]" />

      <div className="container relative py-20 md:py-28 lg:py-32">
        {/* Floating white card */}
        <div
          className="mx-auto max-w-[1100px] rounded-[14px] bg-card px-6 py-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:px-10 md:px-16 md:py-16"
        >
          {/* Trust badge pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Accredited Tax Agent – Licence No. 24666831
          </div>

          {/* Headline */}
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            ABN Registration{" "}
            <span className="text-primary">Online</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-3 max-w-xl text-lg text-muted-foreground md:text-xl">
            Apply for your Australian Business Number (ABN) in minutes
          </p>

          {/* Supporting text */}
          <p className="mx-auto mb-2 max-w-lg text-sm text-muted-foreground">
            You can also register for GST or apply for a Business Name in the same application.
          </p>
          <p className="mx-auto mb-10 max-w-lg text-xs text-muted-foreground/60">
            Official documentation from the Australian Business Register
          </p>

          {/* Primary CTAs */}
          <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/abn-registration">
              <Button variant="hero" size="lg" className="h-14 px-10 text-base shadow-lg shadow-primary/25">
                Apply for a new ABN
              </Button>
            </Link>
            <Link to="/abn-registration?purpose=renew">
              <Button variant="hero-outline" size="lg" className="h-14 px-10 text-base shadow-sm">
                Renew my ABN
              </Button>
            </Link>
          </div>

          {/* Secondary utility row */}
          <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#abn-finder">
              <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6 shadow-sm">
                <Search className="h-4 w-4" />
                ABN Finder
              </Button>
            </a>
            <a href="#abn-lookup">
              <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6 shadow-sm">
                <Hash className="h-4 w-4" />
                ABN Lookup
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <badge.icon className="h-4 w-4 text-primary" />
                </div>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
