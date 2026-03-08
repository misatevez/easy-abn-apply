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
    <footer>
      {/* ── Main Footer ── */}
      <div className="border-t border-[hsl(215,30%,15%,0.06)]" style={{ backgroundColor: "#0b1623" }}>
        <div className="container" style={{ paddingTop: "76px", paddingBottom: "48px" }}>
          <div className="grid gap-12 lg:grid-cols-[minmax(280px,35%)_1fr] lg:gap-10">
            {/* Brand & Trust */}
            <div className="space-y-6">
              <div className="flex items-center gap-3.5">
                <img
                  src={logoAustralia}
                  alt="ABN Number logo"
                  className="h-12 w-12 rounded-full ring-2 ring-[hsl(0,0%,100%,0.1)]"
                />
                <span className="text-2xl font-bold tracking-tight text-[hsl(0,0%,98%)]">
                  ABN-Number
                </span>
              </div>

              <p className="text-sm leading-relaxed text-[hsl(210,15%,72%)] max-w-[300px]">
                Secure ABN &amp; GST registration services compliant with Australian regulations.
              </p>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-[13px] text-[hsl(210,18%,82%)]">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>SSL Secure Transaction</span>
                </div>
                <div className="flex items-start gap-2.5 text-[13px] text-[hsl(210,18%,82%)]">
                  <Shield className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                  <span>Licensed Australian Tax Agent – Licence No. 24666831</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  variant="hero"
                  size="lg"
                  className="shadow-[0_0_24px_hsl(217,91%,53%,0.3)]"
                >
                  <Link to="/abn-registration">
                    Register ABN Now
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Service Columns */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:pl-4">
              {serviceColumns.map((col) => {
                const Icon = col.icon;
                return (
                  <div key={col.title}>
                    <div className="mb-4 flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-primary/60" />
                      <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[hsl(210,15%,82%)]">
                        {col.title}
                      </h4>
                    </div>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.href}
                            className="text-[13px] text-[hsl(210,15%,75%)] transition-colors duration-200 hover:text-[hsl(0,0%,95%)]"
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
      </div>

      {/* ── Legal Footer Bar ── */}
      <div style={{ backgroundColor: "#09121d" }}>
        <div className="container py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[hsl(210,15%,50%)]">
              <Link to="/terms-and-conditions" className="transition-colors duration-200 hover:text-[hsl(0,0%,88%)]">Terms &amp; Conditions</Link>
              <Link to="/privacy-policy" className="transition-colors duration-200 hover:text-[hsl(0,0%,88%)]">Privacy Policy</Link>
              <Link to="/faq" className="transition-colors duration-200 hover:text-[hsl(0,0%,88%)]">FAQ</Link>
              <Link to="/contact-us" className="transition-colors duration-200 hover:text-[hsl(0,0%,88%)]">Contact Us</Link>
            </nav>
            <a
              href="mailto:info@abn-number.com"
              className="flex items-center gap-1.5 text-[13px] text-[hsl(210,15%,50%)] transition-colors duration-200 hover:text-[hsl(0,0%,88%)]"
            >
              <Mail className="h-3.5 w-3.5" />
              info@abn-number.com
            </a>
          </div>

          <div className="mt-5 border-t border-[hsl(215,20%,12%)] pt-5 text-center">
            <p className="text-xs text-[hsl(210,15%,40%)]">
              © {new Date().getFullYear()} ABN Number. All rights reserved.
            </p>
            <p className="mt-1 text-[11px] text-[hsl(210,15%,33%)]">
              ABN-Number is a private registration service and is not affiliated with the Australian Government.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
