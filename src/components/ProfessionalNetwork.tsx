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
    <section className="bg-secondary/30 py-20 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left – text */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              Trusted by leading accounting and financial institutions
            </p>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Our partners and associations
            </h2>
          </div>

          {/* Right – logos */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto w-[130px] max-h-[90px] object-contain"
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
