import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is an ABN?",
    a: "An Australian Business Number (ABN) is a unique 11-digit identifier issued by the Australian Business Register. It identifies your business to the government, other businesses, and the community.",
  },
  {
    q: "Who needs an ABN?",
    a: "Anyone carrying on an enterprise in Australia needs an ABN. This includes sole traders, partnerships, companies, trusts, and other entities operating a business.",
  },
  {
    q: "How long does it take to receive an ABN?",
    a: "Most ABN applications are processed within 1-2 business days. In some cases, the Australian Business Register may take up to 28 days if additional verification is required.",
  },
  {
    q: "Can I apply if I'm not an Australian resident?",
    a: "Yes, non-residents can apply for an ABN if they are carrying on a business in Australia. Additional documentation may be required to verify your identity.",
  },
  {
    q: "Do I need GST registration?",
    a: "You must register for GST if your business has a GST turnover of $75,000 or more per year ($150,000 for non-profit organisations). You can also voluntarily register if your turnover is below this threshold.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="bg-background py-20">
      <div className="container">
        <div className="mb-14 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl" style={{ color: '#0F172A' }}>Frequently Asked Questions</h2>
          <p style={{ color: '#64748B' }}>Everything you need to know about ABN registration</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline" style={{ color: '#0F172A' }}>
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent style={{ color: '#475569' }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
