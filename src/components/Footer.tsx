import { Lock, Shield, Mail, ArrowRight, FileText, RefreshCw, XCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoAustralia from "@/assets/logo-australia-flag.png";

const serviceColumns = [
  {
    title: "Registration",
    icon: FileText,
    links: [
      { label: "ABN Register", href: "/abn-registration" },
      { label: "GST Register", href: "#" },
      { label: "Business Name Register", href: "/business-name-registration" },
      { label: "Renew ABN", href: "/abn-registration?purpose=renew" },
    ],
  },
  {
    title: "Changes & Updates",
    icon: RefreshCw,
    links: [
      { label: "Update ABN Details", href: "/update-abn-details" },
      { label: "Backdate ABN / GST", href: "#" },
      { label: "Xero Setup", href: "#" },
    ],
  },
  {
    title: "Cancellations",
    icon: XCircle,
    links: [
      { label: "ABN Cancellation", href: "/abn-cancellation" },
      { label: "GST Cancellation", href: "/gst-cancellation" },
      { label: "Business Name Cancellation", href: "/business-name-cancellation" },
    ],
  },
  {
    title: "Help",
    icon: HelpCircle,
    links: [
      { label: "Consultation with a Qualified Accountant", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(215,25%,10%)] text-[hsl(210,20%,75%)]">
      {/* Main footer */}
      <div className="container pt-16 pb-14">
        <div className="grid gap-12 lg:grid-cols-[320px_1fr]">
          {/* Brand & Trust column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={logoAustralia}
                alt="ABN Number logo"
                className="h-11 w-11 rounded-full ring-2 ring-[hsl(0,0%,100%,0.15)]"
              />
              <span className="text-xl font-bold tracking-tight text-[hsl(0,0%,98%)]">
                ABN-Number
              </span>
            </div>

            {/* Trust signals */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <Lock className="h-4 w-4 shrink-0 text-primary" />
                <span>SSL Secure Transaction</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>Licensed Australian Tax Agent – Licence No. 24666831</span>
              </div>
              <p className="pl-[26px] text-[hsl(210,15%,55%)] leading-relaxed">
                Secure ABN &amp; GST registration services compliant with Australian regulations.
              </p>
            </div>

            {/* Conversion CTA */}
            <div className="rounded-lg border border-[hsl(215,25%,18%)] bg-[hsl(215,25%,13%)] p-5 space-y-3">
              <p className="text-[hsl(0,0%,95%)] font-semibold">
                Need an ABN today?
              </p>
              <Button asChild variant="hero" size="lg" className="w-full">
                <Link to="/abn-registration">
                  Register ABN Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Service columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceColumns.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.title}>
                  <div className="mb-4 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(0,0%,95%)]">
                      {col.title}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="text-sm transition-colors duration-200 hover:text-[hsl(0,0%,95%)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[hsl(215,20%,18%)]">
        <div className="container flex flex-col items-center gap-4 py-6 text-sm sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/terms-and-conditions" className="transition-colors hover:text-[hsl(0,0%,95%)]">Terms &amp; Conditions</Link>
            <Link to="/privacy-policy" className="transition-colors hover:text-[hsl(0,0%,95%)]">Privacy Policy</Link>
            <Link to="/faq" className="transition-colors hover:text-[hsl(0,0%,95%)]">FAQ</Link>
            <Link to="/contact-us" className="transition-colors hover:text-[hsl(0,0%,95%)]">Contact Us</Link>
            <a href="mailto:info@abn-number.com" className="flex items-center gap-1.5 transition-colors hover:text-[hsl(0,0%,95%)]">
              <Mail className="h-3.5 w-3.5" />
              info@abn-number.com
            </a>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[hsl(215,20%,18%)]">
        <div className="container py-5 text-center">
          <p className="text-sm text-[hsl(210,15%,50%)]">
            © {new Date().getFullYear()} ABN Number. All rights reserved.
          </p>
          <p className="mt-1.5 text-xs text-[hsl(210,15%,40%)]">
            This is a paid registration service. We are not a government agency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
