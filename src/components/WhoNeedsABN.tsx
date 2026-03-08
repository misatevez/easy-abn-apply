import { CheckCircle2 } from "lucide-react";
import illustrationImg from "@/assets/who-needs-abn-illustration.png";

const items = [
  "Freelancers & Independent Contractors",
  "Sole Traders & Small Business Owners",
  "Consultants & Online Service Providers",
  "Professionals Who Invoice Clients",
  "Startups or New Businesses",
];

const WhoNeedsABN = () => {
  return (
    <section className="relative overflow-hidden bg-[#F5F6FA] py-16">
      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/[0.02]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/[0.015]" />

      <div className="container relative px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left content */}
          <div>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Who Needs an ABN?
            </h2>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              An Australian Business Number (ABN) is required if you operate a
              business or invoice clients in Australia.
            </p>

            <div className="mb-8 flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-border/60 bg-background px-5 py-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-[15px] font-medium text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right illustration */}
          <div className="hidden lg:block">
            <img
              src={illustrationImg}
              alt="Business professionals illustration"
              className="w-[340px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoNeedsABN;
