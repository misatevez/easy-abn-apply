import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import TrustStrip from "@/components/TrustStrip";
import FAQSection from "@/components/FAQSection";
import WhoNeedsABN from "@/components/WhoNeedsABN";


const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustStrip />
      <HowItWorks />
      <WhoNeedsABN />
      <TrustSection />
      <div className="container"><hr className="border-border" /></div>
      <ServicesSection />
      <FAQSection />
      
    </Layout>
  );
};

export default Index;
