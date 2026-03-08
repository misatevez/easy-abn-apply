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
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
            Our partners and associations
          </h2>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-12">
            {logos.map((logo) => (
              <div
                key={logo.alt}
                className="group flex h-[170px] w-full items-center justify-center rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-auto w-[140px] object-contain"
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
