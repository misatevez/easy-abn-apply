import { CheckCircle2 } from "lucide-react";

const items = [
  "Freelancers and independent contractors",
  "Sole traders and small business owners",
  "Consultants and online service providers",
  "Professionals who invoice clients",
  "Startups or new businesses",
];

const WhoNeedsABN = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F6FA] py-20 md:py-24">
      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/[0.025]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/[0.02]" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-32 w-32 rounded-full bg-primary/[0.015]" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Who Needs an ABN?
          </h2>

          <p className="mb-10 text-base leading-relaxed text-muted-foreground">
            An Australian Business Number (ABN) is required if you operate a
            business or invoice clients in Australia.
          </p>

          <div className="mx-auto grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg px-4 py-3"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-[15px] text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoNeedsABN;
