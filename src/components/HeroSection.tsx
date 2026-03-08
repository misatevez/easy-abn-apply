import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-20 md:pb-36 md:pt-32"
      style={{
        background: "linear-gradient(180deg, #E4E8FF 0%, #F4FBFD 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#BFDBFE]/50 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[#C7D2FE]/45 blur-2xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-[#DBEAFE]/60 blur-xl" />

      <div className="container relative z-10 px-4 text-center">
        {/* Badge */}
        <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#DBEAFE] bg-[#EEF2FF]/80 px-5 py-2.5 text-sm font-medium text-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.06)]">
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        {/* Headline */}
        <h1 className="mb-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
          Register Your ABN{" "}
          <span className="text-[#2563EB]">Online</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-xl text-lg leading-relaxed text-[#475569] md:text-xl">
          Apply for your Australian Business Number in minutes.
        </p>

        {/* Supporting text */}
        <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-[#64748B]">
          Register your ABN, GST, and Business Name at the same application.
        </p>

        {/* Primary CTA */}
        <div className="mb-4">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 rounded-lg bg-[#2563EB] px-10 text-base font-semibold text-white hover:bg-[#1D4ED8]"
              style={{
                boxShadow: "0 10px 24px rgba(37, 99, 235, 0.22)",
              }}
            >
              Start ABN Application
            </Button>
          </Link>
        </div>

        {/* Micro reassurance */}
        <p className="mb-10 flex items-center justify-center gap-1.5 text-sm text-[#64748B]">
          <Clock className="h-3.5 w-3.5" />
          Takes less than 5 minutes
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#475569]">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#3B82F6]" /> Accredited Tax Agent
          </span>
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#3B82F6]" /> SSL Protected
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#3B82F6]" /> Expert Reviewed
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
