import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail, Check } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    label: "REGISTRATION",
    title: "Complete the Online Form",
    description: "Submit your business details in our secure online form.",
    stepperLabel: "Submit your\ndetails",
  },
  {
    icon: ShieldCheck,
    label: "REVIEW",
    title: "Expert Compliance Review",
    description: "Our tax professionals review your application before submission.",
    stepperLabel: "Expert\ncompliance review",
  },
  {
    icon: Mail,
    label: "DELIVERY",
    title: "Receive Your ABN",
    description: "Your ABN is typically delivered within minutes by email.",
    stepperLabel: "Receive your\nABN",
  },
];

const highlights = [
  "Takes about 5 minutes",
  "Reviewed by accredited tax professionals",
];

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        <div className="mx-auto max-w-5xl">
          {/* Step indicator */}
          <div className="relative mx-auto mb-14 hidden max-w-lg md:block">
            {/* Connecting line behind circles */}
            <div className="absolute left-[16.67%] right-[16.67%] top-[14px] h-px bg-border" />

            <div className="relative flex justify-between">
              {steps.map((s, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: "33.33%" }}>
                  <div
                    className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 ${
                      hoveredIndex === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`mt-2.5 whitespace-pre-line text-center text-sm leading-tight transition-colors duration-200 ${
                      hoveredIndex === i
                        ? "font-semibold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.stepperLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.label}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group flex flex-col rounded-xl border bg-card p-7 transition-all duration-200 ${
                  hoveredIndex === i
                    ? "border-primary shadow-md"
                    : "border-border shadow-sm"
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

                {/* First card extras */}
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
