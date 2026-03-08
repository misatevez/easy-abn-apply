import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, RefreshCw } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden pb-24 pt-20 md:pb-36 md:pt-32"
      style={{
        background: "linear-gradient(180deg, #2F6DE0 0%, #3E74DA 40%, #6C93D8 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[300px] w-[300px] rounded-full bg-white/[0.09] blur-2xl" />

      <div className="container relative z-10 px-4 text-center">
        {/* Soft translucent floating panel */}
        <div
          className="mx-auto max-w-2xl rounded-[18px] px-8 py-12 md:px-14 md:py-16"
          style={{
            background: "rgba(255,255,255,0.85)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Badge */}
          <div
            className="mb-10 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium text-[#2563EB]"
            style={{
              background: "rgba(237,242,255,0.7)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <Shield className="h-4 w-4" />
            Accredited Tax Agent – Licence No. 24666831
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A] md:text-4xl lg:text-5xl">
            ABN Registration{" "}
            <span className="text-[#2563EB]">Online</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-[#475569] md:text-lg">
            Apply for your Australian Business Number (ABN) in minutes.
          </p>

          {/* Buttons */}
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/abn-registration">
              <Button
                size="lg"
                className="h-13 rounded-[10px] bg-[#2563EB] px-8 text-base font-semibold text-white hover:bg-[#1D4ED8]"
                style={{ boxShadow: "0 6px 18px rgba(37,99,235,0.25)" }}
              >
                Apply for a new ABN
              </Button>
            </Link>
            <Link to="/abn-registration">
              <Button
                size="lg"
                variant="outline"
                className="h-13 rounded-[10px] border-[#2563EB]/25 bg-transparent px-8 text-base font-semibold text-[#2563EB] hover:bg-[#2563EB]/5"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew my ABN
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-[#3B82F6]" /> Secure & Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#3B82F6]" /> SSL Protected
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3B82F6]" /> Expert Reviewed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
