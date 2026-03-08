import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2F6FE4] to-[#5C8EF5] pt-28 pb-20 md:pt-32 md:pb-24 text-center">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/[0.03]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-white/[0.04]" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-white/[0.03]" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        {/* Accredited badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white">
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        {/* Title */}
        <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
          ABN Registration{" "}
          <span className="text-blue-200">Online</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-3 max-w-xl text-lg text-white/90 md:text-xl">
          Apply for your Australian Business Number (ABN) in minutes.
        </p>
        <p className="mx-auto mb-10 max-w-lg text-base text-white/70">
          Register your ABN, GST, or Business Name in one simple application.
        </p>

        {/* Primary CTA */}
        <div className="mb-6">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 rounded-lg bg-white px-10 text-base font-semibold text-primary shadow-lg hover:bg-white/90"
            >
              Start ABN Application
            </Button>
          </Link>
        </div>

        {/* Secondary links */}
        <div className="mb-12 flex items-center justify-center gap-3 text-sm text-white/80">
          <Link to="/abn-registration?purpose=renew" className="underline underline-offset-2 hover:text-white">
            Renew an existing ABN
          </Link>
          <span>·</span>
          <a href="#abn-finder" className="underline underline-offset-2 hover:text-white">
            Find an ABN
          </a>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-white/90">
          <span className="flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-white/70" /> Secure & Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <Lock className="h-4 w-4 text-white/70" /> SSL Protected
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-white/70" /> Expert Reviewed
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
