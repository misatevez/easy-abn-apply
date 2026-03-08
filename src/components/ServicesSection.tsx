import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Building2, Receipt, XCircle, Info } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "ABN Registration",
    price: "$69",
    description:
      "Apply for a new ABN or renew an existing one through our streamlined online process. Our experts review every submission for compliance before lodging it with the Australian Business Register.",
    cta: "Apply for ABN",
    renewLink: "/abn-registration?purpose=renew",
    note: "You can also add Business Name or GST registration during the application.",
    options: null,
    includes: null,
  },
  {
    icon: Building2,
    title: "Business Name Registration",
    price: "From $99",
    description:
      "Register your business name with ASIC and protect your brand identity. Choose a one-year or three-year registration period to suit your business plan and compliance needs.",
    cta: "Register Business Name",
    note: "You can also apply for an ABN and GST in the same form.",
    options: null,
    includes: null,
  },
  {
    icon: Receipt,
    title: "GST Registration",
    price: "$79",
    description:
      "Register for Goods and Services Tax if your business turnover exceeds $75,000 per year. Our experts ensure your GST registration is correctly submitted to the Australian Taxation Office.",
    cta: "Register for GST",
    note: "You can also register an ABN or Business Name during the application.",
    options: null,
    includes: null,
  },
  {
    icon: XCircle,
    title: "Cancellations & Updates",
    price: "$69",
    description:
      "Cancel or update your existing registrations quickly and easily. We handle the paperwork and ensure your changes are processed correctly and without delay.",
    cta: "Start Cancellation",
    note: "Multiple registrations can be cancelled within the same form.",
    options: null,
    includes: ["ABN cancellation", "GST cancellation", "Business name cancellation"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 bg-background">
      {/* Subtle background accents */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="container relative">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Our Services
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Choose the registration service that suits your needs. Additional services can be added during the application.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {service.title}
              </h3>

              {/* Description + Includes — grows to push price/CTA down */}
              <div className="mb-4 flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {service.includes && (
                  <ul className="mt-3 space-y-1.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price */}
              <div className="mb-5">
                <p className="text-3xl font-bold text-foreground">{service.price}</p>
              </div>

                {/* CTA */}
                <Link to="/abn-registration">
                  <Button variant="hero" className="w-full">
                    {service.cta}
                  </Button>
                </Link>

                {/* Renew link */}
                {service.renewLink && (
                  <Link to={service.renewLink} className="mt-2">
                    <Button variant="outline" className="w-full text-sm">
                      Renew my ABN
                    </Button>
                  </Link>
                )}

                {/* Note */}
                <p className="mt-3 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground/80">
                  <Info className="mt-0.5 h-3 w-3 shrink-0 text-primary/50" />
                  {service.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust message */}
        <div className="mt-12 text-center">
          <p className="font-medium text-foreground">
            Multiple registrations can be completed in one application.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Register an ABN, GST, and Business Name in one submission, or cancel multiple registrations at once.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
