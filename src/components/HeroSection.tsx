import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Clock, Search, RefreshCw } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-20 md:pb-36 md:pt-32"
      style={{
        background: "linear-gradient(180deg, #F3F6FF 0%, #EAF0FF 45%, #FFFFFF 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#DCE6FF]/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-[#DCE6FF]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-[#DCE6FF]/[0.08] blur-2xl" />

      <div className="container relative z-10 px-4 text-center">
        {/* Floating Badge */}
        <div
          className="mb-12 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-[#2563EB] backdrop-blur-md"
          style={{
            background: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
          }}
        >
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        {/* Headline */}
        <h1 className="mb-5 text-4xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A] md:text-5xl lg:text-6xl">
          ABN Registration{" "}
          <span className="text-[#2563EB]">Online</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-xl text-lg leading-relaxed text-[#475569] md:text-xl">
          Apply for your Australian Business Number (ABN) in minutes
        </p>

        {/* Supporting text */}
        <p className="mx-auto mb-12 max-w-lg text-base leading-relaxed text-[#64748B]">
          You can also register for GST or apply for a Business Name in the same application.
        </p>

        {/* Primary buttons */}
        <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 rounded-lg bg-[#2563EB] px-10 text-base font-semibold text-white hover:bg-[#1D4ED8]"
              style={{ boxShadow: "0 10px 24px rgba(37, 99, 235, 0.22)" }}
            >
              Apply for a new ABN
            </Button>
          </Link>
          <Link to="/abn-registration">
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-lg border-[#2563EB]/30 bg-[#2563EB]/5 px-10 text-base font-semibold text-[#2563EB] hover:bg-[#2563EB]/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Renew my ABN
            </Button>
          </Link>
        </div>

        {/* Secondary buttons */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <Button variant="ghost" className="text-sm font-medium text-[#64748B] hover:text-[#2563EB]">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            ABN Finder
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-[#64748B] hover:text-[#2563EB]">
            <Search className="mr-1.5 h-3.5 w-3.5" />
            ABN Lookup
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#475569]">
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#3B82F6]" /> Secure & Encrypted
          </span>
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#3B82F6]" /> SSL Protected
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
