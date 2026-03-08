import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail, Check } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    label: "REGISTRATION",
    title: "Complete the Online Form",
    description: "Submit your business details in our secure online form.",
    stepperLabel: "Submit your details",
  },
  {
    icon: ShieldCheck,
    label: "REVIEW",
    title: "Expert Compliance Review",
    description: "Our tax professionals review your application before submission.",
    stepperLabel: "Expert compliance review",
  },
  {
    icon: Mail,
    label: "DELIVERY",
    title: "Receive Your ABN",
    description: "Your ABN is typically delivered within minutes by email.",
    stepperLabel: "Receive your ABN",
  },
];

const highlights = [
  "Takes about 5 minutes",
  "Reviewed by accredited tax professionals",
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[350px] w-[350px] rounded-full bg-primary/[0.03]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[280px] w-[280px] rounded-full bg-primary/[0.02]" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How to Register Your ABN
          </h2>
          <p className="text-muted-foreground md:text-lg">
            We make ABN registration simple, secure, and fast.
          </p>
        </div>

        {/* Progress stepper */}
        <div className="mx-auto mb-14 hidden max-w-2xl md:block">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-1 items-center">
                {/* Line before (except first) */}
                {i > 0 && <div className="h-px flex-1 bg-primary/20" />}

                {/* Step circle + label */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex items-center justify-center rounded-full font-bold text-primary-foreground ${
                      i === 1
                        ? "h-10 w-10 bg-primary text-base"
                        : "h-7 w-7 bg-primary/60 text-xs"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`max-w-[120px] text-center text-sm leading-tight ${
                      i === 1 ? "font-semibold text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.stepperLabel}
                  </span>
                </div>

                {/* Line after (except last) */}
                {i < steps.length - 1 && <div className="h-px flex-1 bg-primary/20" />}
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
                className={`group relative flex flex-col rounded-xl p-7 transition-shadow duration-300 ${
                  i <= 1
                    ? "border-2 border-dashed border-primary/50 shadow-lg shadow-primary/5"
                    : "border border-dashed border-border shadow-sm"
                }`}
              >
                {/* Icon */}
                <div className="mb-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <s.icon className="h-6 w-6 text-primary" />
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
                      <Button variant="hero" size="lg" className="h-12 px-8 text-sm shadow-lg shadow-primary/20">
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
