import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="bg-primary py-16">
      <div className="container text-center">
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
          Start Your ABN Application Today
        </h2>
        <p className="mb-8 text-lg text-primary-foreground/80">
          Join thousands of businesses who registered their ABN with us.
        </p>
        <Link to="/abn-registration">
          <Button
            variant="secondary"
            size="lg"
            className="h-13 gap-2 px-8 text-base font-semibold"
          >
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
