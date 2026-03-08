import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-24" style={{ background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(217 85% 62%) 100%)" }}>
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/[0.06]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary-foreground/[0.05]" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-primary-foreground/[0.03]" />

      <div className="container relative text-center">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
          Start Your ABN Application Today
        </h2>
        <p className="mb-8 text-lg text-primary-foreground/85">
          Join thousands of businesses who registered their ABN with us.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-13 gap-2 bg-primary-foreground px-8 text-base font-semibold text-primary hover:bg-primary-foreground/90"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/abn-registration?purpose=renew">
            <Button
              variant="outline"
              size="lg"
              className="h-13 gap-2 border-primary-foreground/30 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Renew my ABN
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
