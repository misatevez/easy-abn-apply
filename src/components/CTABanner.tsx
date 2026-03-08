import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-28"
      style={{ background: "linear-gradient(135deg, #2563EB, #3B82F6)" }}
    >
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
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/abn-registration">
            <Button
              size="lg"
              className="h-14 gap-2.5 rounded-xl bg-primary-foreground px-10 text-base font-semibold text-primary shadow-lg shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-foreground/90 hover:shadow-xl hover:shadow-black/15 active:translate-y-0 active:scale-[0.98] active:shadow-md"
            >
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/abn-registration?purpose=renew">
            <Button
              variant="outline"
              size="lg"
              className="h-14 gap-2.5 rounded-xl border-2 border-primary-foreground/40 bg-transparent px-10 text-base font-semibold text-primary-foreground shadow-lg shadow-black/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-foreground/60 hover:bg-primary-foreground/10 hover:shadow-xl hover:shadow-black/10 active:translate-y-0 active:scale-[0.98] active:shadow-md"
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
