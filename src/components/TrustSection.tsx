import { ShieldCheck, Lock, CheckCircle, UserCheck, Zap, ClipboardCheck, Shield, Headphones, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const trustIndicators = [
  { icon: ShieldCheck, label: "Accredited Tax Agent" },
  { icon: Lock, label: "Secure & Encrypted Application" },
  { icon: CheckCircle, label: "Government Compliant" },
  { icon: UserCheck, label: "Expert Review Before Submission" },
];

const conversionBenefits = [
  { icon: Zap, title: "Fast Online Application", description: "Apply for your ABN in minutes using our simple online form." },
  { icon: ClipboardCheck, title: "Expert Compliance Review", description: "Every application is reviewed by accredited tax professionals." },
  { icon: Shield, title: "Secure Submission to the ABR", description: "Your details are encrypted and securely submitted." },
  { icon: Headphones, title: "Support When You Need It", description: "Our team is available if you need assistance." },
];

const TrustSection = () => {
  return (
    <>
      {/* Trust Strip */}
      <section className="bg-white py-10">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {trustIndicators.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Bridge */}
      <section className="bg-white py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {/* Divider */}
            <div className="mx-auto mb-14 h-px w-24 bg-border/40" />

            <h2 className="mb-16 text-center text-3xl font-bold text-foreground md:text-4xl">
              Why Australian Businesses Trust Our ABN Service
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

            <div className="text-center">
              <Link to="/abn-registration">
                <Button variant="hero" size="lg" className="px-10 shadow-lg shadow-primary/20">
                  Start Your ABN Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
