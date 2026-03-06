import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ABN<span className="text-primary">Register</span></span>
            </div>
            <p className="text-sm text-muted-foreground">
              Fast, simple ABN registration service. We help Australians register their business with ease.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#services" className="hover:text-foreground">ABN Registration</a></li>
              <li><a href="/#services" className="hover:text-foreground">Business Name</a></li>
              <li><a href="/#services" className="hover:text-foreground">GST Registration</a></li>
              <li><a href="/#services" className="hover:text-foreground">Packages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
              <li><a href="/#how-it-works" className="hover:text-foreground">How It Works</a></li>
              <li><Link to="/apply" className="hover:text-foreground">Apply Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground">Refund Policy</a></li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              support@abnregister.com.au
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ABN Register. All rights reserved.</p>
          <p className="mt-1 text-xs">
            This is a paid registration service. We are not a government agency.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
