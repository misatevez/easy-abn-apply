import logoXero from "@/assets/logo-xero.svg";
import logoCaanz from "@/assets/logo-caanz.png";
import logoTpb from "@/assets/logo-tpb.png";
import logoQuickbooks from "@/assets/logo-quickbooks.webp";
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
    <section className="bg-[hsl(210_40%_98%)] py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Our partners and associations
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-[820px] grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center rounded-2xl border border-border/60 bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              style={{ minHeight: 160 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-auto w-[140px] max-h-[100px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalNetwork;
