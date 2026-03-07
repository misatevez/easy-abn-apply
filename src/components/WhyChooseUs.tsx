import { Zap, FormInput, UserCheck, Mail, Lock } from "lucide-react";

const benefits = [
  { icon: Zap, title: "Fast Processing", description: "Get your ABN in as little as one business day." },
  { icon: FormInput, title: "Simple Online Application", description: "Easy-to-follow form that takes minutes to complete." },
  { icon: UserCheck, title: "Expert Review", description: "Every application is checked by our registration specialists." },
  { icon: Mail, title: "Email Confirmation", description: "Receive your ABN and all documents straight to your inbox." },
  { icon: Lock, title: "Secure Payment", description: "256-bit SSL encryption keeps your data and payment safe." },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Why Choose Us</h2>
          <p className="text-muted-foreground">Trusted by thousands of Australian businesses</p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-xl border border-border bg-background p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <b.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
