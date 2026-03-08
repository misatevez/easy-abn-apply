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

      {/* Conversion Bridge */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            {/* Thin centered divider above title */}
            <div className="mx-auto mb-14 h-px w-24 bg-border/40" />

            <h2 className="mb-14 text-center text-3xl font-bold text-foreground md:text-4xl">
              Why Australian businesses trust our ABN service
            </h2>

            {/* 4 features with vertical separators */}
            <div className="mb-14 hidden sm:flex">
              {conversionBenefits.map((benefit, i) => (
                <div key={benefit.title} className="flex flex-1">
                  <div className="flex flex-1 flex-col items-center px-5 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50">
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
                    <div className="w-px shrink-0 self-stretch bg-border/60" style={{ marginTop: "12px", marginBottom: "12px" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile stack */}
            <div className="mb-14 flex flex-col gap-10 sm:hidden">
              {conversionBenefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col items-center text-center">
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
