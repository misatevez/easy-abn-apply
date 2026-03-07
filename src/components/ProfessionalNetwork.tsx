import logoXero from "@/assets/logo-xero.png";
import logoCaanz from "@/assets/logo-caanz.png";
import logoTpb from "@/assets/logo-tpb.png";
import logoQuickbooks from "@/assets/logo-quickbooks.png";
import logoTaxInstitute from "@/assets/logo-tax-institute.png";
import logoMyob from "@/assets/logo-myob.png";

const logos = [
  { src: logoXero, alt: "Xero" },
  { src: logoCaanz, alt: "Chartered Accountants ANZ" },
  { src: logoTpb, alt: "Tax Practitioners Board Registered" },
  { src: logoQuickbooks, alt: "QuickBooks" },
  { src: logoTaxInstitute, alt: "The Tax Institute" },
  { src: logoMyob, alt: "MYOB" },
];

const ProfessionalNetwork = () => {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="container">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              We work within a trusted professional ecosystem
            </p>
            <h2 className="mb-5 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Our professional network and industry associations
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              We operate within recognised accounting platforms and
              professional regulatory frameworks to deliver compliant
              business registration services across Australia. Supporting
              Australian businesses with secure and accurate registrations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center transition-transform duration-300 hover:scale-[1.03] hover:brightness-110"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-20 w-auto max-w-[150px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalNetwork;
