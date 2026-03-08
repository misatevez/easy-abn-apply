import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary pb-20 pt-16 md:pb-28 md:pt-24">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/[0.06]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary-foreground/[0.05]" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-primary-foreground/[0.03]" />

      <div className="container relative z-10 px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-2 text-sm font-medium text-primary-foreground">
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
          Register Your ABN Online
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-xl text-lg text-primary-foreground/80 md:text-xl">
          Apply for your Australian Business Number in minutes.
        </p>

        {/* Supporting text */}
        <p className="mx-auto mb-10 max-w-lg text-base text-primary-foreground/70">
          Register your ABN, GST, and Business Name at the same application.
        </p>

        {/* Primary CTA */}
        <div className="mb-10">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 rounded-md bg-primary-foreground px-10 text-base font-semibold text-primary shadow-lg hover:bg-primary-foreground/90"
            >
              Start ABN Application
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-primary-foreground/90">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4" /> Accredited Tax Agent
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4" /> SSL Protected
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Expert Reviewed
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
