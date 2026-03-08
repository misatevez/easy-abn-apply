import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import ProfessionalNetwork from "@/components/ProfessionalNetwork";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="relative bg-muted/40">
        {/* Decorative background circles */}
        <div className="pointer-events-none absolute -left-40 top-[200px] h-[400px] w-[400px] rounded-full bg-primary/[0.03]" />
        <div className="pointer-events-none absolute -right-32 top-[600px] h-[350px] w-[350px] rounded-full bg-primary/[0.02]" />
        <div className="pointer-events-none absolute -left-20 top-[1200px] h-[300px] w-[300px] rounded-full bg-primary/[0.03]" />
        <div className="pointer-events-none absolute -right-40 top-[1800px] h-[380px] w-[380px] rounded-full bg-primary/[0.02]" />
        <div className="pointer-events-none absolute -left-32 top-[2400px] h-[320px] w-[320px] rounded-full bg-primary/[0.03]" />

        <div className="relative space-y-8 py-12">
          <HowItWorks />
          <TrustSection />
          <ServicesSection />
          <FAQSection />
          <ProfessionalNetwork />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
