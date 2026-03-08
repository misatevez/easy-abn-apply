import { ShieldCheck, Lock, CheckCircle, UserCheck, Zap, ClipboardCheck, ShieldCheck as ShieldIcon, HeadphonesIcon, ArrowRight } from "lucide-react";
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
  { icon: ShieldIcon, title: "Secure Submission to the ABR", description: "Your details are encrypted and securely submitted." },
  { icon: HeadphonesIcon, title: "Support When You Need It", description: "Our team is available if you need assistance." },
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
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
              Why Australian Businesses Trust Our ABN Service
            </h2>
            <p className="mb-12 text-muted-foreground">
              Trusted by thousands of Australian businesses
            </p>

            <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {conversionBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group flex flex-col items-center rounded-xl border-2 border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <Link to="/abn-registration">
              <Button variant="hero" size="lg" className="px-10">
                Start Your ABN Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Takes about 5 minutes • Secure submission
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
