import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <TrustSection />
      <ServicesSection />
      <FAQSection />
      <CTABanner />
    </Layout>
  );
};

export default Index;
