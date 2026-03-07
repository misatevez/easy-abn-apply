import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, ShieldCheck, Mail } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "Registration",
    title: "Complete the Online Registration Form.",
    description:
      "Provide the necessary details to generate your ABN with ease. Our experienced tax professionals are available to assist you with any questions. Additionally, you can register a business name and/or GST within the same form.",
  },
  {
    icon: ShieldCheck,
    step: "Review",
    title: "Experts verify compliance and accuracy before submission.",
    description:
      "Once we receive your details, our team will conduct a thorough assessment to ensure everything meets ATO requirements. If any issues arise, we will address them before proceeding with your application.",
  },
  {
    icon: Mail,
    step: "Delivery",
    title: "Receive your ABN quickly and conveniently.",
    description:
      "Once processed, your ABN will be sent to you via email and SMS—typically within 5 minutes and always within 2 hours—ensuring a seamless experience.",
  },
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

        {/* Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className="group relative flex flex-col rounded-xl border border-border bg-card p-7 shadow-sm transition-shadow duration-300 hover:shadow-lg"
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
                  {s.step}
                </span>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link to="/apply">
            <Button variant="hero" size="lg" className="h-14 px-10 text-base shadow-lg shadow-primary/20">
              Start my ABN Application
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
