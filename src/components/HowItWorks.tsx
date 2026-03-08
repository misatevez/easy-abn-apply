import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail, Check } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    label: "REGISTRATION",
    title: "Complete the Online Form",
    description:
      "Provide your details to generate your ABN. You can also register a business name and GST in the same form.",
    stepperLabel: "Submit your details",
  },
  {
    icon: ShieldCheck,
    label: "REVIEW",
    title: "Expert Compliance Check",
    description:
      "Our team verifies your application meets ATO requirements and resolves any issues before submission.",
    stepperLabel: "Expert compliance review",
  },
  {
    icon: Mail,
    label: "DELIVERY",
    title: "Receive Your ABN Fast",
    description:
      "Your ABN is sent via email typically within 5 minutes, always within 2 hours.",
    stepperLabel: "Receive your ABN",
  },
];

const highlights = [
  "Takes about 5 minutes",
  "Reviewed by accredited tax professionals",
  "Secure & encrypted submission",
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-24">
      {/* Subtle decorative accent */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[350px] w-[350px] rounded-full bg-primary/[0.03]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[280px] w-[280px] rounded-full bg-primary/[0.02]" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How to register your official ABN?
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Because simplifying your business tasks just makes sense—we're here to make ABN registration quick and effortless.
          </p>
        </div>

        {/* Progress stepper */}
        <div className="mx-auto mb-12 hidden max-w-3xl md:block">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium text-foreground">{s.stepperLabel}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="mx-6 h-px w-24 bg-border lg:w-36" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="relative mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.label}
                className={`group relative flex flex-col rounded-xl border bg-card p-7 transition-shadow duration-300 ${
                  i === 0
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border shadow-sm hover:shadow-lg"
                }`}
              >
                {/* Step number + icon */}
                <div className="relative z-10 mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                </div>

                {/* Label */}
                <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.label}
                </span>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {/* First card: CTA + highlights */}
                {i === 0 && (
                  <div className="mt-6">
                    <Link to="/abn-registration">
                      <Button variant="hero" size="lg" className="h-12 w-full text-sm shadow-lg shadow-primary/20">
                        Start Your ABN Registration
                      </Button>
                    </Link>
                    <ul className="mt-4 space-y-1.5">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 shrink-0 text-muted-foreground" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
