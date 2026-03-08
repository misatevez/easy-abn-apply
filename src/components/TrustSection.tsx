import { Zap, ClipboardCheck, Shield, Headphones } from "lucide-react";

const conversionBenefits = [
  { icon: Zap, title: "Fast Online Application", description: "Apply for your ABN in minutes using our simple online form." },
  { icon: ClipboardCheck, title: "Expert Compliance Review", description: "Every application is reviewed by accredited tax professionals." },
  { icon: Shield, title: "Secure Submission to the ABR", description: "Your details are encrypted and securely submitted." },
  { icon: Headphones, title: "Support When You Need It", description: "Our team is available if you need assistance." },
];

const TrustSection = () => {
  return (
    <>
      {/* Conversion Bridge */}
      <section className="relative overflow-hidden bg-white py-16">
        <div className="pointer-events-none absolute -left-28 top-10 h-[350px] w-[350px] rounded-full bg-[#DCE6FF]/[0.20] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-[300px] w-[300px] rounded-full bg-[#DCE6FF]/[0.18] blur-3xl" />
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {/* Divider */}
            <div className="mx-auto mb-14 h-px w-24 bg-border/40" />

            <h2 className="mb-16 text-center text-3xl font-bold text-foreground md:text-4xl">
              Why Businesses Trust Our ABN Registration Service
            </h2>

            {/* Desktop: 4 benefits with separators */}
            <div className="mb-20 hidden sm:flex sm:items-start sm:justify-between sm:gap-0">
              {conversionBenefits.map((benefit, i) => (
                <div key={benefit.title} className="flex flex-1 items-start">
                  <div className="group flex flex-1 flex-col items-center px-8 text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#E6EDFB] transition-colors duration-200 group-hover:bg-[#dce5f8]">
                      <benefit.icon className="h-7 w-7 text-primary transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-2 text-base font-extrabold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                  {i < conversionBenefits.length - 1 && (
                    <div className="w-px shrink-0 self-stretch bg-border/40" style={{ marginTop: "24px", marginBottom: "24px" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile stack */}
            <div className="mb-20 flex flex-col gap-10 sm:hidden">
              {conversionBenefits.map((benefit) => (
                <div key={benefit.title} className="group flex flex-col items-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-muted transition-colors duration-200 group-hover:bg-muted/80">
                    <benefit.icon className="h-7 w-7 text-primary transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-base font-extrabold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
