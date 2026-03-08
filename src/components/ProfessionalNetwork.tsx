import logoXero from "@/assets/logo-xero-2.svg";
import logoCaanz from "@/assets/logo-caanz-2.png";
import logoTpb from "@/assets/logo-tpb-3.webp";
import logoQuickbooks from "@/assets/logo-quickbooks-2.webp";
import logoTaxInstitute from "@/assets/logo-tax-institute-2.png";
import logoMyob from "@/assets/logo-myob-2.png";

const logos = [
  { src: logoXero, alt: "Xero", size: "h-[115px] w-[115px]" },
  { src: logoCaanz, alt: "Chartered Accountants ANZ", size: "h-[115px] w-[160px]" },
  { src: logoTpb, alt: "Tax Practitioners Board Registered", size: "h-[200px] w-[200px]" },
  { src: logoQuickbooks, alt: "QuickBooks", size: "h-[115px] w-[115px]" },
  { src: logoTaxInstitute, alt: "The Tax Institute", size: "h-[115px] w-[160px]" },
  { src: logoMyob, alt: "MYOB", size: "h-[115px] w-[115px]" },
];

const ProfessionalNetwork = () => {
  return (
    <section className="bg-[hsl(210,33%,98%)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-[140px]">
          {/* Left column - Text */}
          <div>
            <p className="mb-2 text-sm font-medium tracking-wide text-muted-foreground">
              Trusted by Leading Accounting & Financial Institutions
            </p>
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Our Professional Partners & Industry Associations
            </h2>
          </div>

          {/* Right column - Logos */}
          <div
            className="grid grid-cols-3 items-center justify-items-center"
            style={{ gap: "19px 80px" }}
          >
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.size} object-contain`}
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
