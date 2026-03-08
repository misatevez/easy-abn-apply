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
    <section className="bg-[#F8FAFC]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column - Text */}
          <div>
            <p className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">
              Trusted by leading accounting and financial institutions
            </p>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Our partners and associations
            </h2>
          </div>

          {/* Right column - Logos */}
          <div className="grid grid-cols-3 items-center justify-items-center gap-x-16 gap-y-12">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-[75px] w-[75px] object-contain"
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
