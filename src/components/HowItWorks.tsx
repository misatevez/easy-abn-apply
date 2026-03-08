import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "Registration",
    indicator: "Submit your details",
    title: "Complete the Online Form",
    description: "Submit your business details in our secure online form.",
  },
  {
    icon: ShieldCheck,
    step: "Review",
    indicator: "Expert compliance review",
    title: "Expert Compliance Review",
    description: "Our tax professionals review your application before submission.",
  },
  {
    icon: Mail,
    step: "Delivery",
    indicator: "Receive your ABN",
    title: "Receive Your ABN",
    description: "Your ABN is typically delivered within minutes by email.",
  },
];

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-12">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            How to Register Your ABN
          </h2>
          <p className="text-muted-foreground md:text-lg">
            We make ABN registration simple, secure, and fast.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Step Indicator */}
          <div className="mb-10 hidden md:block">
            <div className="relative flex justify-between px-[calc(100%/6)]">
              <div className="absolute inset-x-[calc(100%/6)] top-4 h-0.5 -translate-y-1/2 bg-muted-foreground/25" />

              {hoveredIndex !== null && hoveredIndex > 0 && (
                <div
                  className="absolute top-4 h-0.5 -translate-y-1/2 bg-primary/40 transition-all duration-300"
                  style={{
                    left: "calc(100% / 6)",
                    width: `calc(${hoveredIndex} * (100% - 100% / 3) / 2)`,
                  }}
                />
              )}

              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className={`relative z-10 flex flex-col items-center gap-2 transition-colors duration-300 ${
                    hoveredIndex === i ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                      hoveredIndex === i
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-center text-sm font-medium max-w-[120px]">{s.indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.step}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col rounded-xl border-2 px-7 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl ${
                  i === 0
                    ? "border-primary bg-primary/[0.03] shadow-lg"
                    : "border-border bg-card shadow-sm"
                }`}
              >
                <div className="relative z-10 mb-5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-primary/15 ${
                      i === 0 ? "bg-primary/15" : "bg-primary/10"
                    }`}
                  >
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.step}
                </span>

                <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">
                  {s.title}
                </h3>

                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                {i === 0 && (
                  <div className="mt-6">
                    <Link to="/abn-registration">
                      <Button
                        variant="hero"
                        size="lg"
                        className="h-14 w-full text-base shadow-lg shadow-primary/20"
                      >
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
      </div>
    </section>
  );
};

export default HowItWorks;
