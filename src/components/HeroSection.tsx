import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, RefreshCw, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary pb-44 pt-20 md:pb-52 md:pt-32">
      {/* Decorative circles — same style as other pages */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary-foreground/[0.06]" />
      <div className="pointer-events-none absolute -left-28 bottom-0 h-[450px] w-[450px] rounded-full bg-primary-foreground/[0.05]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[350px] w-[350px] rounded-full bg-primary-foreground/[0.04]" />

      <div className="container relative z-10 px-4">
        {/* Floating Card */}
        <div
          className="mx-auto max-w-[720px] rounded-[18px] bg-white px-8 py-12 text-center md:px-16"
          style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
        >
          {/* Badge */}
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D7E3FF] bg-[#EEF3FF] px-4 py-2 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Accredited Tax Agent – Licence No. 24666831
          </div>

          {/* Headline */}
          <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-[#0F172A] md:text-4xl lg:text-5xl">
            ABN Registration{" "}
            <span className="text-primary">Online</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-4 max-w-lg text-lg leading-relaxed text-[#475569]">
            Apply for your Australian Business Number (ABN) in minutes
          </p>

          {/* Supporting text */}
          <p className="mx-auto mb-2 max-w-md text-base leading-relaxed text-muted-foreground">
            You can also register for GST or apply for a Business Name in the same application.
          </p>
          <p className="mx-auto mb-10 max-w-md text-sm text-muted-foreground/70">
            Official documentation from the Australian Business Register
          </p>

          {/* Primary buttons */}
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/abn-registration">
              <Button
                size="lg"
                className="h-[50px] rounded-[10px] bg-primary px-6 text-base font-semibold text-primary-foreground shadow-[0_6px_18px_rgba(37,99,235,0.25)] hover:bg-primary/90"
              >
                Apply for a new ABN
              </Button>
            </Link>
            <Link to="/abn-registration">
              <Button
                size="lg"
                variant="outline"
                className="h-[50px] rounded-[10px] border-[#BFD1FF] bg-transparent px-6 text-base font-semibold text-primary hover:bg-[#F1F5FF]"
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
              className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-primary hover:bg-[#F1F5FF]"
            >
              <Search className="mr-2 h-4 w-4" />
              ABN Finder
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-primary hover:bg-[#F1F5FF]"
            >
              <Search className="mr-2 h-4 w-4" />
              ABN Lookup
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#475569]">
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> Secure & Encrypted
            </span>
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> SSL Protected
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
