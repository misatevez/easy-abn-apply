import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, Receipt, RefreshCw } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "ABN Registration",
    badge: "Most Popular",
    price: "$69",
    priceNote: "One-time service fee",
    description: "Apply for a new ABN or renew an existing one online.",
    cta: "Apply or Renew ABN",
    ctaLink: "/abn-registration",
    note: "Add Business Name or GST during the application.",
  },
  {
    icon: Building2,
    title: "Business Name Registration",
    badge: null,
    price: "$99",
    priceNote: "ASIC registration options",
    description: "Register or renew your business name with ASIC.",
    cta: "Register Business Name",
    ctaLink: "/business-name-registration",
    note: "ABN and GST can be added in the same form.",
  },
  {
    icon: Receipt,
    title: "GST Registration",
    badge: null,
    price: "$79",
    priceNote: "Can be added to ABN",
    description: "Register for GST quickly and securely online.",
    cta: "Register for GST",
    ctaLink: "/abn-registration",
    note: "ABN or Business Name can be added during the application.",
  },
  {
    icon: RefreshCw,
    title: "Cancellations & Updates",
    badge: null,
    price: "$69",
    priceNote: "Multiple changes supported",
    description: "Cancel or update your registrations with expert assistance.",
    cta: "Start Cancellation",
    ctaLink: "/abn-cancellation",
    note: "Handle multiple cancellations in one form.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative bg-white py-20">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="container relative">
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
            <div key={service.title} className="relative">
              {service.badge && (
                <div className="absolute -top-[11px] left-1/2 -translate-x-1/2 z-10">
                  <span className="rounded-full bg-[#FFE8B9] px-4 py-1 text-xs font-medium text-foreground shadow-sm whitespace-nowrap">
                    {service.badge}
                  </span>
                </div>
              )}
              <div
                className="group relative flex h-full flex-col rounded-2xl border-2 border-border bg-card p-7 shadow-sm transition-all duration-[250ms] hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                {/* Top content */}
                <div className="flex flex-1 flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                {/* Bottom content */}
                <div className="mt-auto flex flex-col">
                  <div className="mb-5">
                    <p className="text-3xl font-bold text-foreground">{service.price}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{service.priceNote}</p>
                  </div>

                  <Link to={service.ctaLink}>
                    <Button variant="hero" className="w-full">
                      {service.cta}
                    </Button>
                  </Link>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">
                    {service.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Register an ABN, GST, and Business Name in one application, or manage multiple updates and cancellations together.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
