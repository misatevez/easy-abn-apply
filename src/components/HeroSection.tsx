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
    <section className="relative overflow-hidden bg-background">
      {/* Subtle decorative shapes */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/[0.04]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-primary/[0.03]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[200px] w-[200px] rounded-full bg-primary/[0.02]" />

      <div className="container relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Accreditation badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Accredited Tax Agent – Licence No. 24666831
          </div>

          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            ABN Registration{" "}
            <span className="text-primary">Online</span>
          </h1>

          <p className="mb-3 text-lg text-muted-foreground md:text-xl">
            Apply for your Australian Business Number (ABN) in 5 minutes
          </p>

          <p className="mb-8 text-sm text-muted-foreground/70">
            Official documentation from the Australian Business Register
          </p>

          {/* Primary CTA */}
          <div className="mb-8">
            <Link to="/abn-registration">
              <Button variant="hero" size="lg" className="h-14 px-10 text-base shadow-lg shadow-primary/20">
                Start my ABN Application now
              </Button>
            </Link>
          </div>

          {/* Free tools */}
          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#abn-finder">
              <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6">
                <Search className="h-4 w-4" />
                ABN Finder
              </Button>
            </a>
            <a href="#abn-lookup">
              <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6">
                <Hash className="h-4 w-4" />
                ABN Lookup
              </Button>
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <badge.icon className="h-4 w-4 text-primary" />
                </div>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom subtle divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default HeroSection;
