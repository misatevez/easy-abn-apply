import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import ProfessionalNetwork from "@/components/ProfessionalNetwork";
import Testimonials from "@/components/Testimonials";
import EligibilityChecker from "@/components/EligibilityChecker";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <TrustSection />
      <ServicesSection />
      <EligibilityChecker />
      <Testimonials />
      <FAQSection />
      <ProfessionalNetwork />
      <CTABanner />
    </Layout>
  );
};

export default Index;
