import { CheckCircle2 } from "lucide-react";

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
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Who Needs an ABN?
          </h2>
          <div className="mx-auto grid max-w-md gap-4 text-left sm:grid-cols-2 sm:max-w-xl">
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
      </div>
    </section>
  );
};

export default WhoNeedsABN;
