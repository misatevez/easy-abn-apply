import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "Registration",
    title: "Complete the Online Form",
    description:
      "Provide your details to generate your ABN. You can also register a business name and GST in the same form.",
  },
  {
    icon: ShieldCheck,
    step: "Review",
    title: "Expert Compliance Check",
    description:
      "Our team verifies your application meets ATO requirements and resolves any issues before submission.",
  },
  {
    icon: Mail,
    step: "Delivery",
    title: "Receive Your ABN Fast",
    description:
      "Your ABN is sent via email typically within 5 minutes, always within 2 hours.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background py-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[350px] w-[350px] rounded-full bg-primary/[0.03]" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-[280px] w-[280px] rounded-full bg-primary/[0.02]" />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How to Register Your ABN
          </h2>
          <p className="text-muted-foreground md:text-lg">
            We make ABN registration simple, secure, and fast.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute left-0 right-0 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className={`group relative flex flex-col rounded-xl border-2 px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl ${
                  i === 0
                    ? "border-primary bg-primary/[0.03] shadow-lg"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                {/* Step number + icon */}
                <div className="relative z-10 mb-5 flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary/15 ${
                    i === 0 ? "bg-primary/15" : "bg-primary/10"
                  }`}>
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </div>
                </div>

                {/* Label */}
                <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.step}
                </span>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {/* CTA under Step 1 */}
                {i === 0 && (
                  <div className="mt-6">
                    <Link to="/abn-registration">
                      <Button variant="hero" size="lg" className="h-14 w-full text-base shadow-lg shadow-primary/20">
                        Start Your ABN Registration
                      </Button>
                    </Link>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>✓ Takes about 5 minutes</p>
                      <p>✓ Reviewed by accredited tax professionals</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default HowItWorks;
