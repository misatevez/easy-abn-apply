import { useState, useMemo } from "react";
import { Search, Plus, Minus } from "lucide-react";
import Layout from "@/components/Layout";

interface FAQItem {
  question: string;
  answer: string | string[];
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "ABN Registration",
    items: [
      {
        question: "What is an Australian Business Number (ABN)?",
        answer: "An ABN is an Australian Business Number — a unique number that identifies your business to the government and the community.",
      },
      {
        question: "What information do I need to register my ABN?",
        answer: [
          "To apply for an ABN you will generally need:",
          "• Full legal name",
          "• Date of birth details",
          "• Tax File Number (TFN)",
          "• Business and residential addresses",
        ],
      },
      {
        question: "How long does an ABN registration take?",
        answer: "An ABN registration usually takes only a few minutes when all required information is correct.\nIf additional verification is required, our team will contact you for further information before processing the application.",
      },
      {
        question: "Do I need a Tax File Number (TFN) to get an ABN?",
        answer: "Providing your TFN is strongly recommended.\n\nThe TFN does not replace your ABN. The ATO may use it to confirm your identity. If a TFN is not provided, the ATO may delay the application or place it under manual review.\n\nYou can still apply without your TFN. Our team will contact you if it becomes required.",
      },
      {
        question: "Can I have two ABNs?",
        answer: "No. As a sole trader you can only have one ABN.\nIf you previously had an ABN, the ATO will reactivate your existing number instead of issuing a new one.",
      },
      {
        question: "I previously had an ABN. Can I reactivate it?",
        answer: "Yes. If you previously held an ABN, the ATO will reactivate your original ABN number rather than issuing a new one.",
      },
      {
        question: "As a sole trader, do I need a new ABN for each business?",
        answer: "No. A sole trader can operate multiple businesses under one ABN.",
      },
      {
        question: "How long does it take for my ABN to appear as active?",
        answer: "It can take 3 to 10 hours for the ABN to appear as active on the ABN Lookup while the ATO updates their records.\n\nYou will receive a confirmation by email and SMS once your ABN is active.",
      },
      {
        question: "How much does the ABN application cost?",
        answer: [
          "We charge an administration fee of $69.00 to process your ABN application.",
          "",
          "This fee covers:",
          "• Reviewing the application for errors",
          "• Lodging the application with the ATO",
          "• Following up on any issues that arise during processing",
        ],
      },
      {
        question: "What does it mean if my ABN is under review?",
        answer: [
          "Your ABN may be under review if:",
          "• Your previous ABN has been inactive for a long time",
          "• You have changed your name",
          "• Your name is very common",
          "",
          "In these cases the ATO may manually verify your details.",
        ],
      },
      {
        question: "My ABN is under review and I received a reference number. What happens next?",
        answer: "If your ABN is under review, it means the application has been submitted successfully and is awaiting manual confirmation by the ATO.\n\nApproval may take 3–7 business days.\nOnce issued, we will notify you by email and SMS.",
      },
      {
        question: "Why should I apply for an ABN through our service?",
        answer: [
          "We:",
          "• Check your application for errors before submission",
          "• Process ABN, GST and Business Name registrations together",
          "• Provide support from Registered Tax Agents and Chartered Accountants",
          "",
          "This ensures the process is simple, fast and accurate.",
        ],
      },
    ],
  },
  {
    title: "Business Name Registration",
    items: [
      {
        question: 'Can I register a business name with "Pty Ltd" at the end?',
        answer: 'No. A sole trader ABN cannot use "Pty Ltd".\n\n"Pty Ltd" is used only by companies registered with ASIC.\nSole traders can operate multiple businesses under one ABN using different registered business names.',
      },
      {
        question: "Why was my business name refused?",
        answer: [
          "ASIC may reject a business name if:",
          "• The name is already registered",
          "• The name is too similar to another name",
          "• The address provided is incomplete",
          "• The address is not accepted by Australia Post",
          "• The address is a PO Box instead of a street address",
        ],
      },
      {
        question: "If my business name is refused, do I need to pay again?",
        answer: "No.\nIf ASIC rejects your business name, our team will contact you to submit an alternative name free of charge.",
      },
      {
        question: "Can I register a business name under a cancelled ABN?",
        answer: "No.\nYour ABN must be active before a business name can be registered.\n\nOnce the ABN becomes active on the ATO system, the business name can be processed.",
      },
      {
        question: "If my profession changes, do I need a new ABN?",
        answer: "No.\nYou can operate different types of work under the same ABN.\n\nExample:\nYou may have originally registered as a cleaner and later work as a carpenter.\nYour ABN remains valid.",
      },
    ],
  },
  {
    title: "GST Registration",
    items: [
      {
        question: "How do I register for GST online?",
        answer: "Simply complete our online GST registration form.\nOnce submitted, our team verifies the details and processes the registration with the ATO.\n\nMost registrations are completed the same day.",
      },
      {
        question: "Do I need to register for GST?",
        answer: [
          "You must register for GST if:",
          "• Your business turnover exceeds $75,000 per year, or",
          "• You provide taxi or rideshare services (Uber, Didi, Ola etc.)",
          "",
          "You may also register voluntarily if your turnover is below the threshold.",
        ],
      },
      {
        question: "Do Uber or taxi drivers need GST?",
        answer: "Yes.\nAll taxi and rideshare drivers must register for GST from the first dollar earned, regardless of income level.",
      },
      {
        question: "Do I need an ABN to register for GST?",
        answer: "Yes.\nGST registration is linked to your ABN, so you must have an ABN before registering for GST.",
      },
      {
        question: "What date should GST registration start?",
        answer: "You must register for GST within 21 days of realising your turnover will exceed $75,000.",
      },
      {
        question: "How do I register for GST as a sole trader?",
        answer: "The process is the same for all business types.\n\nSimply complete our online GST registration form and we will handle the submission with the ATO.",
      },
      {
        question: "What are the advantages of online GST registration?",
        answer: [
          "• Most GST registrations are processed the same day",
          "• No waiting on hold with the ATO",
          "• Applications are handled by licensed tax agents",
          "• Email confirmation is sent once registration is complete",
        ],
      },
      {
        question: "What are my obligations after registering for GST?",
        answer: [
          "After registering you must:",
          "• Lodge Business Activity Statements (BAS)",
          "• Include GST on invoices",
          "• Maintain accurate business records",
          "• Keep receipts and documentation",
          "",
          "The ATO requires records to be kept for compliance purposes.",
        ],
      },
      {
        question: "Are there financial benefits to registering for GST?",
        answer: "In some cases yes.\n\nEven if your turnover is below $75,000, registering for GST may allow you to claim GST credits on business expenses, which can improve cash flow depending on your business structure.",
      },
    ],
  },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return faqSections;

    const query = searchQuery.toLowerCase();
    return faqSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          const answerText = Array.isArray(item.answer)
            ? item.answer.join(" ")
            : item.answer;
          return (
            item.question.toLowerCase().includes(query) ||
            answerText.toLowerCase().includes(query)
          );
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return answer.map((line, i) =>
        line === "" ? (
          <br key={i} />
        ) : (
          <p key={i} className={line.startsWith("•") ? "pl-4" : ""}>
            {line}
          </p>
        )
      );
    }
    return answer.split("\n").map((line, i) => (
      <p key={i} className={!line ? "h-2" : ""}>
        {line}
      </p>
    ));
  };

  return (
    <Layout>
      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--hero-gradient)" }}
      >
        <div className="container text-center">
          <h1 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-muted-foreground md:text-lg">
            Find answers to common questions about ABN, Business Name and GST
            registration.
          </p>

          {/* Search */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenItem(null);
                }}
                placeholder="Search for a question (ABN, GST, Business Name…)"
                className="h-12 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-sm text-foreground shadow-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-12">
            {filteredSections.length === 0 && (
              <p className="text-center text-muted-foreground">
                No questions match your search. Try a different term.
              </p>
            )}

            {filteredSections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-5 text-xl font-bold text-foreground md:text-2xl">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item, i) => {
                    const id = `${section.title}-${i}`;
                    const isOpen = openItem === id;
                    return (
                      <div
                        key={id}
                        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                      >
                        <button
                          onClick={() => toggleItem(id)}
                          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted/50 md:text-base"
                        >
                          <span>{item.question}</span>
                          {isOpen ? (
                            <Minus className="h-5 w-5 shrink-0 text-primary" />
                          ) : (
                            <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                            {renderAnswer(item.answer)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
