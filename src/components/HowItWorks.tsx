import { FileText, Search, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Fill Out Online Form",
    description: "Complete our simple application form with your personal and business details.",
  },
  {
    icon: Search,
    title: "We Review Your Application",
    description: "Our experts review your details and ensure everything is accurate before submission.",
  },
  {
    icon: BadgeCheck,
    title: "Receive Your ABN Confirmation",
    description: "Get your ABN delivered to your inbox. Start operating your business right away.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-card py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to get your ABN</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {i + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
