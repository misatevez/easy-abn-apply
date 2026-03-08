import { CheckCircle2, Shield, Lock, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import illustration from "@/assets/who-needs-abn-illustration.png";

const items = [
  "Freelancers & Independent Contractors",
  "Sole Traders & Small Business Owners",
  "Consultants & Online Service Providers",
  "Professionals Who Invoice Clients",
  "Startups or New Businesses",
];

const trustIndicators = [
  { icon: Shield, label: "Secure & Encrypted" },
  { icon: FileCheck, label: "Licensed Australian Tax Agent" },
  { icon: Lock, label: "Expert Compliance Review" },
];

const WhoNeedsABN = () => {
  return (
    <section className="bg-[hsl(220_30%_97%)] py-20 md:py-24">
      <div className="container px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* Left — text + bullets + CTA */}
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Who Needs an ABN?
            </h2>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              An Australian Business Number (ABN) is required if you operate a
              business or invoice clients in Australia.
            </p>

            <div className="flex flex-col gap-3.5 mb-10">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3.5 rounded-xl border border-border/40 bg-card px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-[15px] font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/abn-registration">
              <Button
                size="lg"
                className="mb-6 h-[50px] rounded-[10px] bg-[linear-gradient(135deg,hsl(217_91%_53%),hsl(217_91%_60%))] px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_24px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,hsl(224_76%_48%),hsl(217_91%_53%))] hover:shadow-[0_12px_28px_rgba(37,99,235,0.4)] active:translate-y-0 active:scale-[0.97] active:shadow-md"
              >
                Start Your ABN Application
              </Button>
            </Link>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-muted-foreground">
              {trustIndicators.map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex items-center justify-center">
            <img
              src={illustration}
              alt="Australian business professionals who need an ABN"
              className="w-full max-w-xs lg:max-w-sm"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoNeedsABN;
