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
      <section className="bg-primary/[0.04] py-10">
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

      {/* Divider */}
      <div className="py-4">
        <div className="container">
          <div className="h-px bg-border/60" />
        </div>
      </div>

      {/* Conversion Bridge */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-14 text-3xl font-bold text-foreground md:text-4xl">
              Why Australian businesses trust our ABN service
            </h2>

            {/* 4 items with vertical dividers */}
            <div className="mb-14 flex flex-col items-center gap-10 sm:flex-row sm:gap-0">
              {conversionBenefits.map((benefit, i) => (
                <div key={benefit.title} className="flex flex-1 items-start">
                  <div className="flex flex-col items-center px-6 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-sm font-bold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                  {i < conversionBenefits.length - 1 && (
                    <div className="hidden h-24 w-px shrink-0 self-center bg-border sm:block" />
                  )}
                </div>
              ))}
            </div>

            <Link to="/abn-registration">
              <Button variant="hero" size="lg" className="px-10 shadow-lg shadow-primary/20">
                Start Your ABN Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
