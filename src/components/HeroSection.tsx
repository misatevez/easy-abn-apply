import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24"
      style={{ background: 'linear-gradient(180deg, #F4F7FF 0%, #EEF3FF 45%, #FFFFFF 100%)' }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/[0.05]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary/[0.04]" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-primary/[0.03]" />

      <div className="container relative z-10 px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl" style={{ color: '#0F172A' }}>
          Register Your ABN <span className="text-primary">Online</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-xl text-lg md:text-xl" style={{ color: '#475569' }}>
          Apply for your Australian Business Number in minutes.
        </p>

        {/* Supporting text */}
        <p className="mx-auto mb-10 max-w-lg text-base" style={{ color: '#64748B' }}>
          Register your ABN, GST, and Business Name at the same application.
        </p>

        {/* Primary CTA */}
        <div className="mb-4">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 rounded-md bg-primary px-10 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              style={{ boxShadow: '0 6px 14px rgba(37, 99, 235, 0.25)' }}
            >
              Start ABN Application
            </Button>
          </Link>
        </div>

        {/* Trust message under CTA */}
        <p className="mb-10 text-sm" style={{ color: '#94A3B8' }}>
          <Clock className="mr-1 inline h-3.5 w-3.5 align-text-bottom" />
          Takes less than 5 minutes • Secure submission
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold" style={{ color: '#334155' }}>
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-primary" /> Accredited Tax Agent
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-primary" /> SSL Protected
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
