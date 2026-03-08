import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden pb-28 pt-24 md:pb-40 md:pt-36"
      style={{
        background: "linear-gradient(180deg, #F4F7FF 0%, #EEF3FF 45%, #FFFFFF 100%)",
      }}
    >
      {/* Decorative circles — subtle */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#BFDBFE]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#C7D2FE]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[350px] w-[350px] rounded-full bg-[#DBEAFE]/[0.08] blur-2xl" />

      <div className="container relative z-10 flex justify-center px-4">
        {/* Soft integrated panel */}
        <div
          className="w-full max-w-[880px] rounded-2xl px-8 py-14 text-center md:px-16 md:py-16"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-[#DBEAFE] bg-[#EEF2FF]/80 px-5 py-2.5 text-sm font-medium text-[#2563EB]">
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
                className="h-14 rounded-[10px] bg-[#2563EB] px-10 text-base font-semibold text-white hover:bg-[#1D4ED8]"
                style={{
                  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.25)",
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
      </div>
    </section>
  );
};

export default HeroSection;
