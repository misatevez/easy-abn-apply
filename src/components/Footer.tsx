import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoAustralia from "@/assets/logo-australia-flag.png";

const footerNav = [
{
  title: "Check Services",
  links: [
  { label: "ABN Find", href: "#" },
  { label: "ABN Lookup", href: "#" },
  { label: "GST Status", href: "#" },
  { label: "Business Name Availability", href: "#" }]

},
{
  title: "Registration Services",
  links: [
  { label: "ABN Register", href: "/abn-registration" },
  { label: "Renew my ABN", href: "/abn-registration?purpose=renew" },
  { label: "GST Register", href: "#" },
  { label: "Business Name Register", href: "/business-name-registration" }]

},
{
  title: "Cancellation Services",
  links: [
  { label: "ABN Cancellation", href: "/abn-cancellation" },
  { label: "GST Cancellation", href: "/gst-cancellation" },
  { label: "Business Name Cancellation", href: "/business-name-cancellation" }]

},
{
  title: "Other Services",
  links: [
  { label: "Update ABN Details", href: "/update-abn-details" },
  { label: "Backdate ABN / GST", href: "#" },
  { label: "Xero Set Up", href: "#" }]

},
{
  title: "Professional Consultation",
  links: [
  { label: "Consultation with a Qualified Accountant", href: "#" }]

}];


const Footer = () => {
  return (
    <footer className="bg-[hsl(215,25%,12%)] text-[hsl(210,20%,80%)]">
      {/* Top area */}
      <div className="container pt-16 pb-12">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <img src={logoAustralia} alt="ABN Number logo" className="h-12 w-12 rounded-full ring-2 ring-primary-foreground" />
            <span className="text-lg font-bold text-[hsl(0,0%,95%)]">
              ABN-Number
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Lock className="h-3.5 w-3.5 text-primary" />
            <span>SSL Certified & Secure Transaction</span>
          </div>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[hsl(210,15%,60%)]">
            Accredited Tax Agent – License No. 24666831.
            <br />
            Legally authorised to operate ABN registration services in accordance with Australian regulations.
          </p>
        </div>

        {/* Navigation columns */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {footerNav.map((section) =>
          <div key={section.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[hsl(0,0%,95%)]">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) =>
              <li key={link.label}>
                    <a
                  href={link.href}
                  className="text-sm transition-colors duration-200 hover:text-[hsl(0,0%,95%)]">
                  
                      {link.label}
                    </a>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Secondary links */}
      <div className="border-t border-[hsl(215,20%,20%)]">
        <div className="container flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-sm">
          <a href="/terms-and-conditions" className="transition-colors hover:text-[hsl(0,0%,95%)]">Terms and Conditions</a>
          <a href="#" className="transition-colors hover:text-[hsl(0,0%,95%)]">Privacy Policy</a>
          <a href="/faq" className="transition-colors hover:text-[hsl(0,0%,95%)]">FAQ</a>
          <a href="/contact-us" className="transition-colors hover:text-[hsl(0,0%,95%)]">Contact Us</a>
          <a href="mailto:info@yourdomain.com" className="flex items-center gap-1.5 transition-colors hover:text-[hsl(0,0%,95%)]">info@abn-number.com
            <Mail className="h-3.5 w-3.5" />
            info@yourdomain.com
          </a>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[hsl(215,20%,20%)]">
        <div className="container py-6 text-center">
          <p className="text-sm text-[hsl(210,15%,55%)]">
            © {new Date().getFullYear()} ABN Number. All rights reserved.
          </p>
          <p className="mt-1.5 text-xs text-[hsl(210,15%,45%)]">
            This is a paid registration service. We are not a government agency.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;