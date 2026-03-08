import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle2, RefreshCw, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      {/* Blue banner — same as other pages */}
      <section className="relative overflow-hidden bg-primary pb-44 pt-14 md:pb-52 md:pt-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/[0.05]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary-foreground/[0.04]" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-primary-foreground/[0.03]" />
      </section>

      {/* Floating card overlapping the banner */}
      <section className="relative bg-muted/30 pb-12">
        <div className="container px-4">
          <div className="mx-auto max-w-[920px] -mt-36 md:-mt-44">
            <div
              className="rounded-2xl bg-card px-8 py-12 text-center shadow-xl shadow-primary/[0.08] ring-1 ring-border/50 md:px-16"
            >
              {/* Badge */}
              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#D7E3FF] bg-[#EEF3FF] px-4 py-2 text-sm font-medium text-primary">
                <Shield className="h-4 w-4" />
                Accredited Tax Agent – Licence No. 24666831
              </div>

              {/* Headline */}
              <h1 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                ABN Registration{" "}
                <span className="text-primary">Online</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mb-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
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
                    className="h-[50px] rounded-[10px] border-[#BFD1FF] bg-transparent px-6 text-base font-semibold text-primary hover:bg-accent"
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
                  className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-primary hover:bg-accent"
                >
                  <Search className="mr-2 h-4 w-4" />
                  ABN Finder
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-[46px] rounded-[10px] border-[#BFD1FF] bg-transparent px-5 text-sm font-medium text-primary hover:bg-accent"
                >
                  <Search className="mr-2 h-4 w-4" />
                  ABN Lookup
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-foreground">
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
        </div>
      </section>
    </>
  );
};

export default HeroSection;
