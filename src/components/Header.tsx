import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "ABN Services",
    dropdown: [
      { label: "ABN Registration", href: "/apply" },
      { label: "ABN Finder", href: "/#abn-finder" },
      { label: "ABN Lookup", href: "/#abn-lookup" },
      { label: "Update ABN Details", href: "/#update-abn" },
      { label: "ABN Cancellation", href: "/#abn-cancellation" },
    ],
  },
  {
    label: "Business Name Services",
    dropdown: [
      { label: "Business Name Registration", href: "/apply" },
      { label: "Business Name Cancellation", href: "/#bn-cancellation" },
    ],
  },
  {
    label: "GST Services",
    dropdown: [
      { label: "GST Registration", href: "/apply" },
      { label: "GST Status", href: "/#gst-status" },
      { label: "GST Cancellation", href: "/#gst-cancellation" },
    ],
  },
  {
    label: "Support",
    dropdown: [
      { label: "FAQs", href: "/#faq" },
      { label: "Contact Us", href: "/#contact" },
    ],
  },
];

const DesktopDropdown = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const handleEnter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 text-sm font-medium text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground">
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="min-w-[220px] overflow-hidden rounded-lg border border-border bg-card shadow-xl">
          {item.dropdown!.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              className="block px-4 py-2.5 text-sm text-card-foreground transition-colors duration-150 hover:bg-primary/10 hover:text-primary"
            >
              {sub.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-[hsl(215_25%_12%)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(215_25%_12%/0.97)]">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">
            ABN<span className="text-primary">Register</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) =>
            item.dropdown ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <a
                key={item.label}
                href={item.href!}
                className="text-sm font-medium text-primary-foreground/80 transition-colors duration-200 hover:text-primary-foreground"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link to="/abn-registration">
            <Button variant="hero" size="lg">
              Start ABN Application
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-primary-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-primary-foreground/10 bg-[hsl(215_25%_12%)] p-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMobileDropdown(item.label)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/5 hover:text-primary-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileExpanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 flex flex-col gap-0.5 border-l border-primary-foreground/10 pl-3">
                      {item.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-md px-3 py-2 text-sm text-primary-foreground/60 transition-colors hover:text-primary"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/5 hover:text-primary-foreground"
                >
                  {item.label}
                </a>
              )
            )}
            <Link to="/abn-registration" onClick={() => setMobileOpen(false)} className="mt-2">
              <Button variant="hero" className="w-full">
                Start ABN Application
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
