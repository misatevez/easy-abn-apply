import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, Search, Hash } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Blue gradient hero background */}
      <section className="relative overflow-hidden bg-primary pb-44 pt-14 md:pb-52 md:pt-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/[0.06]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary-foreground/[0.05]" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-primary-foreground/[0.03]" />
      </section>

      {/* Floating white card */}
      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-[0_20px_50px_rgba(0,0,0,0.06)] ring-1 ring-border/50">
              <div className="px-6 py-12 text-center md:px-16 md:py-16">
                {/* Trust badge pill */}
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary">
                  <Shield className="h-4 w-4" />
                  Accredited Tax Agent – Licence No. 24666831
                </div>

                {/* Headline */}
                <h1 className="mb-4 text-2xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
                  ABN Registration{" "}
                  <span className="text-primary">Online</span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto mb-3 max-w-xl text-lg text-muted-foreground md:text-xl">
                  Apply for your Australian Business Number (ABN) in minutes
                </p>

                {/* Supporting text */}
                <p className="mx-auto mb-2 max-w-lg text-base text-primary font-medium">
                  You can also register for GST or apply for a Business Name in the same application.
                </p>
                <p className="mx-auto mb-10 max-w-lg text-sm text-muted-foreground">
                  Official documentation from the Australian Business Register
                </p>

                {/* Primary CTAs */}
                <div className="mb-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link to="/abn-registration">
                    <Button variant="hero" size="lg" className="h-14 px-10 text-base shadow-lg shadow-primary/25">
                      Apply for a new ABN
                    </Button>
                  </Link>
                  <Link to="/abn-registration?purpose=renew">
                    <Button variant="hero-outline" size="lg" className="h-14 px-10 text-base shadow-sm">
                      Renew my ABN
                    </Button>
                  </Link>
                </div>

                {/* Secondary utility row */}
                <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href="#abn-finder">
                    <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6 shadow-sm">
                      <Search className="h-4 w-4" />
                      ABN Finder
                    </Button>
                  </a>
                  <a href="#abn-lookup">
                    <Button variant="hero-outline" size="lg" className="h-12 gap-2 px-6 shadow-sm">
                      <Hash className="h-4 w-4" />
                      ABN Lookup
                    </Button>
                  </a>
                </div>

                {/* Trust indicators - matching ABN Registration page */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-primary" /> Secure & Encrypted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-4 w-4 text-primary" /> SSL Protected
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
