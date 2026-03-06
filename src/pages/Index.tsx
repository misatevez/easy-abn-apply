import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import EligibilityChecker from "@/components/EligibilityChecker";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <WhyChooseUs />
      <EligibilityChecker />
      <Testimonials />
      <FAQSection />
      <CTABanner />
    </Layout>
  );
};

export default Index;
