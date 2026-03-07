import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, Receipt, Package } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "ABN Registration",
    description: "Get your Australian Business Number quickly with our streamlined application process.",
    price: "$49",
    popular: false,
  },
  {
    icon: Building2,
    title: "Business Name Registration",
    description: "Register your business name with ASIC. Protect your brand and operate legally.",
    price: "$99",
    popular: false,
  },
  {
    icon: Receipt,
    title: "GST Registration",
    description: "Register for Goods and Services Tax. Required if your turnover exceeds $75,000.",
    price: "$39",
    popular: false,
  },
  {
    icon: Package,
    title: "ABN + Business Name Package",
    description: "Complete package: ABN and Business Name registration together at a discounted rate.",
    price: "$129",
    popular: true,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Our Services</h2>
          <p className="text-muted-foreground">Choose the registration service that suits your needs</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className={`relative flex flex-col rounded-xl border p-6 transition-shadow hover:shadow-lg ${
                service.popular ? "border-primary bg-primary/[0.02] shadow-md" : "border-border bg-card"
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Best Value
                </div>
              )}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{service.description}</p>
              <p className="mb-4 text-2xl font-bold text-foreground">{service.price}</p>
              <Link to="/apply">
                <Button
                  variant={service.popular ? "hero" : "outline"}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
