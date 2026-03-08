import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, RefreshCw, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top solid blue bar */}
      <div className="absolute inset-x-0 top-0 h-[60px]" style={{ background: "#2F6DE0" }} />

      {/* Middle gradient band */}
      <div
        className="absolute inset-x-0 top-[60px] bottom-[120px]"
        style={{ background: "linear-gradient(180deg, #3E74DA 0%, #6C93D8 100%)" }}
      />

      {/* Bottom transition */}
      <div
        className="absolute inset-x-0 bottom-0 h-[120px]"
        style={{ background: "linear-gradient(180deg, #6C93D8 0%, #F6F8FC 100%)" }}
      />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-48 top-1/4 h-[600px] w-[600px] rounded-full bg-[#8FADE6]/[0.10] blur-3xl" />
      <div className="pointer-events-none absolute -right-48 top-1/3 h-[650px] w-[650px] rounded-full bg-[#8FADE6]/[0.10] blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-[#8FADE6]/[0.08] blur-2xl" />

      <div className="container relative z-10 px-4 pb-28 pt-24 md:pb-40 md:pt-36">
        {/* Floating Card */}
        <div
          className="mx-auto max-w-[720px] rounded-[18px] bg-white px-8 py-12 text-center md:px-16"
          style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
        >
          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D7E3FF] bg-[#EEF3FF] px-4 py-2 text-sm font-medium text-[#2563EB]">
            <Shield className="h-4 w-4" />
            Accredited Tax Agent – Licence No. 24666831
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-4xl lg:text-5xl">
            ABN Registration{" "}
            <span className="text-[#2563EB]">Online</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-4 max-w-lg text-lg leading-relaxed text-[#475569]">
            Apply for your Australian Business Number (ABN) in minutes
          </p>

          {/* Supporting text */}
          <p className="mx-auto mb-2 max-w-md text-base leading-relaxed text-[#64748B]">
            You can also register for GST or apply for a Business Name in the same application.
          </p>
          <p className="mx-auto mb-10 max-w-md text-sm text-[#94A3B8]">
            Official documentation from the Australian Business Register
          </p>

          {/* Primary buttons */}
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/abn-registration">
              <Button
                size="lg"
                className="h-[50px] rounded-[10px] bg-[#2563EB] px-6 text-base font-semibold text-white hover:bg-[#1D4ED8]"
                style={{ boxShadow: "0 6px 18px rgba(37, 99, 235, 0.25)" }}
              >
                Apply for a new ABN
              </Button>
            </Link>
            <Link to="/abn-registration">
              <Button
                size="lg"
                variant="outline"
                className="h-[50px] rounded-[10px] border-[#BFD1FF] bg-transparent px-6 text-base font-semibold text-[#2563EB] hover:bg-[#F1F5FF]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew my ABN
              </Button>
            </Link>
          </div>

          {/* Secondary buttons */}
          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              variant="outline"
              className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-[#2563EB] hover:bg-[#F1F5FF]"
            >
              <Search className="mr-2 h-4 w-4" />
              ABN Finder
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-[#2563EB] hover:bg-[#F1F5FF]"
            >
              <Search className="mr-2 h-4 w-4" />
              ABN Lookup
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#475569]">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#3B82F6]" /> Secure & Encrypted
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
