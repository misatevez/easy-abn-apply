import { Shield, Lock, Landmark, CheckCircle } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "Accredited Tax Agent" },
  { icon: Lock, label: "Secure & Encrypted Application" },
  { icon: Landmark, label: "Government Compliant" },
  { icon: CheckCircle, label: "Expert Review Before Submission" },
];

const TrustStrip = () => {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-6">
      <div className="container px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-primary" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
