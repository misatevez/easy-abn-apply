import { Zap, FormInput, UserCheck, Mail, Lock, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Zap, title: "Fast Processing", description: "Get your ABN quickly once your application is submitted and reviewed." },
  { icon: FormInput, title: "Simple Online Application", description: "A guided online form that takes only minutes to complete." },
  { icon: UserCheck, title: "Expert Application Review", description: "Our specialists review every submission to help prevent errors and delays." },
  { icon: Lock, title: "Secure & Encrypted Payment", description: "Your information and payment are protected with advanced encryption." },
  { icon: Mail, title: "Email Confirmation & Updates", description: "Receive your ABN and important updates directly to your inbox." },
  { icon: Layers, title: "Register Multiple Services", description: "Apply for ABN, Business Name, and GST within the same application." },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-card py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Why Australian businesses trust our ABN service</h2>
          <p className="text-muted-foreground">Trusted by thousands of Australian businesses</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex gap-4 rounded-xl border border-border bg-background p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
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

        <div className="mt-12 text-center">
          <Link to="/apply">
            <Button variant="hero" size="lg" className="px-10">
              Start my ABN Application
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
