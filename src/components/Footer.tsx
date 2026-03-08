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
    <footer className="bg-[hsl(215,25%,9%)] text-[hsl(210,18%,70%)]">
      {/* ── Top Row: Brand + Navigation ── */}
      <div className="container py-20">
        <div className="grid gap-16 lg:grid-cols-[380px_1fr]">
          {/* Brand & Trust Block */}
          <div className="space-y-7">
            <div className="flex items-center gap-3.5">
              <img
                src={logoAustralia}
                alt="ABN Number logo"
                className="h-12 w-12 rounded-full ring-2 ring-[hsl(0,0%,100%,0.12)]"
              />
              <span className="text-2xl font-bold tracking-tight text-[hsl(0,0%,98%)]">
                ABN-Number
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[hsl(210,15%,55%)] max-w-xs">
              Secure ABN &amp; GST registration services compliant with Australian regulations.
            </p>

            {/* Trust signals */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-sm">
                <Lock className="h-4 w-4 shrink-0 text-primary" />
                <span>SSL Secure Transaction</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm">
                <Shield className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>Licensed Australian Tax Agent – Licence No. 24666831</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-1">
              <Button asChild variant="hero" size="lg">
                <Link to="/abn-registration">
                  Register ABN Now
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Service Navigation Columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:pt-1">
            {serviceColumns.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.title}>
                  <div className="mb-5 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary/70" />
                    <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(0,0%,92%)]">
                      {col.title}
                    </h4>
                  </div>
                  <ul className="space-y-3">
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

      {/* ── Bottom Row ── */}
      <div className="border-t border-[hsl(215,20%,16%)]">
        <div className="container py-7">
          {/* Links + Email */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <Link to="/terms-and-conditions" className="transition-colors duration-200 hover:text-[hsl(0,0%,95%)]">Terms &amp; Conditions</Link>
              <Link to="/privacy-policy" className="transition-colors duration-200 hover:text-[hsl(0,0%,95%)]">Privacy Policy</Link>
              <Link to="/faq" className="transition-colors duration-200 hover:text-[hsl(0,0%,95%)]">FAQ</Link>
              <Link to="/contact-us" className="transition-colors duration-200 hover:text-[hsl(0,0%,95%)]">Contact Us</Link>
            </nav>
            <a
              href="mailto:info@abn-number.com"
              className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[hsl(0,0%,95%)]"
            >
              <Mail className="h-3.5 w-3.5" />
              info@abn-number.com
            </a>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="mt-7 border-t border-[hsl(215,20%,14%)] pt-6 text-center">
            <p className="text-xs text-[hsl(210,15%,45%)]">
              © {new Date().getFullYear()} ABN Number. All rights reserved.
            </p>
            <p className="mt-1.5 text-xs text-[hsl(210,15%,38%)]">
              ABN-Number is a private registration service and is not affiliated with the Australian Government.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
