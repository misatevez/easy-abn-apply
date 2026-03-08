import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProfessionalNetwork from "./ProfessionalNetwork";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <ProfessionalNetwork />
      <Footer />
    </div>
  );
};

export default Layout;
