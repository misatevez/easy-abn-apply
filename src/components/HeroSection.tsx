import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2, Clock, FileCheck } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Secure & Encrypted" },
  { icon: CheckCircle2, label: "Government Compliant" },
  { icon: Clock, label: "Fast Processing" },
  { icon: FileCheck, label: "Expert Review" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/[0.03] via-background to-accent/[0.03]">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Trusted ABN Registration Service
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Register Your ABN{" "}
            <span className="text-primary">in Minutes</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Fast online registration for ABN, Business Name, and GST.
            <br className="hidden md:block" />
            We handle the paperwork so you can focus on your business.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/apply">
              <Button variant="hero" size="lg" className="h-13 px-8 text-base">
                Start Your Application
              </Button>
            </Link>
            <a href="#eligibility">
              <Button variant="hero-outline" size="lg" className="h-13 px-8">
                Check Eligibility
              </Button>
            </a>
          </div>

          {/* Step Progress Visual */}
          <div className="mx-auto mb-10 flex max-w-md items-center justify-center gap-2">
            {["Fill Form", "We Review", "Get ABN"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <span className="text-sm font-medium text-foreground">{step}</span>
                {i < 2 && <div className="h-px w-8 bg-border" />}
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <badge.icon className="h-4 w-4 text-accent" />
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
