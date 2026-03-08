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
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-12">
        {/* Trust Strip */}
        <div className="mb-10 rounded-xl bg-primary/[0.04] p-6">
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

        {/* Divider */}
        <div className="my-10">
          <div className="h-px bg-border/60" />
        </div>

        {/* Conversion Bridge */}
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-16 text-3xl font-bold text-foreground md:text-4xl">
            Why Australian businesses trust our ABN service
          </h2>

          <div className="mb-20 flex flex-col items-center gap-10 sm:flex-row sm:gap-0 sm:divide-x sm:divide-border/50">
            {conversionBenefits.map((benefit) => (
              <div key={benefit.title} className="group flex flex-1 flex-col items-center px-8 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <benefit.icon className="h-7 w-7 text-primary" strokeWidth={2.25} />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">
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
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
