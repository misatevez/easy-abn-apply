import { CheckCircle2 } from "lucide-react";
import illustration from "@/assets/who-needs-abn-illustration.png";

const items = [
  "Freelancers & Contractors",
  "Sole Traders & Small Businesses",
  "Consultants & Online Businesses",
  "Professionals Billing Clients",
];

const WhoNeedsABN = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-20">
      <div className="container px-4">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          {/* Left — text + bullets */}
          <div>
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Who Needs an ABN?
            </h2>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-5 py-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-base font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — illustration */}
          <div className="flex items-center justify-center">
            <img
              src={illustration}
              alt="Australian business professionals who need an ABN"
              className="w-full max-w-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoNeedsABN;
