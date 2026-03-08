import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, Receipt, XCircle } from "lucide-react";

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
    renewLabel: "Renew an existing ABN →",
    renewLink: "/abn-registration?purpose=renew",
    note: "You can also add Business Name or GST registration during the application.",
  },
  {
    icon: Building2,
    title: "Business Name Registration",
    badge: null,
    price: "From $99",
    priceNote: "ASIC registration options",
    description: "Register or renew your business name with ASIC.",
    cta: "Register Business Name",
    ctaLink: "/business-name-registration",
    renewLabel: null,
    renewLink: null,
    note: "1 year ($99) or 3 year ($199) registration available.",
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
    renewLabel: null,
    renewLink: null,
    note: "You can also register an ABN or Business Name during the application.",
  },
  {
    icon: XCircle,
    title: "Cancellations & Updates",
    badge: null,
    price: "From $69",
    priceNote: "Multiple changes supported",
    description: "Cancel or update your registrations with expert assistance.",
    cta: "Start Cancellation",
    ctaLink: "/abn-cancellation",
    renewLabel: null,
    renewLink: null,
    note: "Manage ABN, GST, and Business Name cancellations in one form.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 bg-background">
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
            <div
              key={service.title}
              className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Top content */}
              <div className="flex flex-1 flex-col">
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>

              {/* Bottom content — aligned across cards */}
              <div className="mt-auto flex flex-col">
                {/* Price */}
                <div className="mb-5">
                  <p className="text-3xl font-bold text-foreground">{service.price}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{service.priceNote}</p>
                </div>

                {/* CTA */}
                <Link to={service.ctaLink}>
                  <Button variant="hero" className="w-full">
                    {service.cta}
                  </Button>
                </Link>

                {/* Renew text link */}
                {service.renewLink && service.renewLabel && (
                  <Link
                    to={service.renewLink}
                    className="mt-2.5 text-center text-xs font-medium text-primary hover:underline"
                  >
                    {service.renewLabel}
                  </Link>
                )}

                {/* Note */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/70">
                  {service.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Register an ABN, GST, and Business Name in one application, or manage multiple updates and cancellations together.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
