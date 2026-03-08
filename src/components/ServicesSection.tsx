import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, Receipt, RefreshCw, Info } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "ABN Registration",
    price: "$69",
    priceNote: "One-time service fee",
    description: "Apply for a new ABN or renew an existing one online.",
    cta: "Apply or Renew ABN",
    ctaLink: "/abn-registration",
    note: "Add Business Name or GST during the application.",
    popular: true,
  },
  {
    icon: Building2,
    title: "Business Name Registration",
    price: "$99",
    priceNote: "ASIC registration options",
    description: "Register or renew your business name with ASIC.",
    cta: "Register Business Name",
    ctaLink: "/business-name-registration",
    note: "ABN and GST can be added in the same form.",
    popular: false,
  },
  {
    icon: Receipt,
    title: "GST Registration",
    price: "$79",
    priceNote: "Can be added to ABN",
    description: "Register for GST quickly and securely online.",
    cta: "Register for GST",
    ctaLink: "/abn-registration",
    note: "ABN or Business Name can be added during the application.",
    popular: false,
  },
  {
    icon: RefreshCw,
    title: "Cancellations & Updates",
    price: "$69",
    priceNote: "Multiple changes supported",
    description: "Cancel or update your registrations with expert assistance.",
    cta: "Start Cancellation",
    ctaLink: "/abn-cancellation",
    note: "Handle multiple cancellations in one form.",
    popular: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-card p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] md:p-12">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Business Registration Services
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Choose the service you need. Additional services can be added during the application.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-2xl border-2 border-border bg-muted/30 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              {service.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-md">
                  Most Popular
                </span>
              )}

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <service.icon className="h-7 w-7 text-primary" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-foreground">
                {service.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="mb-5">
                <p className="text-3xl font-extrabold text-foreground">{service.price}</p>
                <p className="mt-1 text-xs text-muted-foreground">{service.priceNote}</p>
              </div>

              <Link to={service.ctaLink}>
                <Button variant="hero" className="w-full">
                  {service.cta}
                </Button>
              </Link>

              <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-primary/40" />
                {service.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
          Register an ABN, GST, and Business Name in one application, or manage multiple updates and cancellations together.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
