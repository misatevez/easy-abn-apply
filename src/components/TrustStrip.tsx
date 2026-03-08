import { Shield, Lock, Landmark, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Accredited Tax Agent" },
  { icon: Lock, label: "Secure & Encrypted Application" },
  { icon: Landmark, label: "Government Compliant" },
  { icon: CheckCircle, label: "Expert Review Before Submission" },
];

const TrustStrip = () => {
  return (
    <section className="relative overflow-hidden py-10" style={{ background: "#F1F5FA" }}>
      <div className="pointer-events-none absolute -right-20 -top-16 h-[300px] w-[300px] rounded-full bg-[#DCE6FF]/[0.25] blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[250px] w-[250px] rounded-full bg-[#DCE6FF]/[0.20] blur-3xl" />
      <div className="container">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
