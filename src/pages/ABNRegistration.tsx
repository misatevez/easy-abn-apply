import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import ApplicantNameSection from "@/components/abn-registration/ApplicantNameSection";
import EmailSection from "@/components/abn-registration/EmailSection";
import PhoneSection from "@/components/abn-registration/PhoneSection";
import TFNSection from "@/components/abn-registration/TFNSection";
import ABNPurposeSection from "@/components/abn-registration/ABNPurposeSection";
import BusinessActivitySection from "@/components/abn-registration/BusinessActivitySection";
import AddressSection from "@/components/abn-registration/AddressSection";
import ReasonSection from "@/components/abn-registration/ReasonSection";
import BusinessNameSection from "@/components/abn-registration/BusinessNameSection";
import RegistrationPeriodSection from "@/components/abn-registration/RegistrationPeriodSection";
import BirthDetailsSection from "@/components/abn-registration/BirthDetailsSection";
import GSTSection from "@/components/abn-registration/GSTSection";
import AccountingTasksSection from "@/components/abn-registration/AccountingTasksSection";
import FinalConfirmationSection from "@/components/abn-registration/FinalConfirmationSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Lock,
  CheckCircle2,
  ClipboardCheck,
  Send,
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import type { ABNFormData } from "@/components/abn-registration/types";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { createOrderFromLovable, buildLineItems } from "@/lib/supabase/orders";

const TOTAL_SECTIONS = 18;

const initialForm: ABNFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phone: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  tfnOption: "",
  tfn: "",
  abnPurpose: "",
  abnStartDay: "",
  abnStartMonth: "",
  abnStartYear: "",
  previousABN: "",
  businessActivity: "",
  personalAddress: "",
  applyingReason: "",
  tradeUnderBusinessName: "",
  businessNameOption: "",
  newBusinessName: "",
  existingBusinessName: "",
  registrationPeriod: "",
  countryOfBirth: "",
  stateOfBirth: "",
  cityOfBirth: "",
  registerForGST: "",
  annualTurnover: "",
  gstLodgeFrequency: "",
  gstResultTiming: "",
  importGoods: "",
  gstStartDay: "",
  gstStartMonth: "",
  gstStartYear: "",
  accountingTasks: [],
  acceptTerms: false,
  authoriseTaxAgent: false,
  confirmTrueInfo: false,
  authoriseASICAgent: false,
};

interface ABNLookupResult {
  businessName: string;
  entityType: string;
  abnStatus: string;
  state: string;
}

const ABNRegistration = () => {
  const [searchParams] = useSearchParams();
  const purposeParam = searchParams.get("purpose");

  const [form, setForm] = useState<ABNFormData>({
    ...initialForm,
    abnPurpose: purposeParam === "renew" ? "reactivate" : "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [abnLookupLoading, setABNLookupLoading] = useState(false);
  const [abnLookupResult, setABNLookupResult] = useState<ABNLookupResult | null>(null);
  const [abnLookupError, setABNLookupError] = useState("");

  const update = useCallback((field: keyof ABNFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateArray = useCallback((field: keyof ABNFormData, value: string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateBoolean = useCallback((field: keyof ABNFormData, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const completedSections = useMemo(() => {
    let count = 0;
    if (form.lastName) count++;
    if (form.email && form.confirmEmail && form.email === form.confirmEmail) count++;
    if (form.phone) count++;
    if (form.dobDay && form.dobMonth && form.dobYear) count++;
    if (form.tfnOption) count++;
    if (form.abnPurpose) count++;
    if (form.businessActivity) count++;
    if (form.personalAddress) count++;
    if (form.applyingReason) count++;
    if (form.tradeUnderBusinessName) count++;
    if (form.tradeUnderBusinessName === "yes" && form.registrationPeriod) count++;
    if (form.tradeUnderBusinessName === "no") count++;
    if (form.countryOfBirth && form.cityOfBirth) count++;
    if (form.registerForGST) count++;
    if (form.registerForGST === "yes" && form.annualTurnover) count++;
    if (form.registerForGST === "yes" && form.gstLodgeFrequency) count++;
    if (form.registerForGST === "yes" && form.gstResultTiming && form.importGoods) count++;
    if (form.acceptTerms && form.authoriseTaxAgent && form.confirmTrueInfo && form.authoriseASICAgent) count++;
    if (form.registerForGST === "no") count += 3;
    return Math.min(count, TOTAL_SECTIONS);
  }, [form]);

  // Line items computed from current form state for the pricing summary
  const lineItems = useMemo(
    () => buildLineItems("ABN Registration", form as unknown as Record<string, unknown>),
    [form]
  );
  const totalCents = lineItems.reduce((sum, item) => sum + item.amount_cents, 0);

  const validate = (): Partial<Record<string, string>> => {
    const e: Partial<Record<string, string>> = {};

    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.confirmEmail.trim()) e.confirmEmail = "Please confirm your email";
    else if (form.email !== form.confirmEmail) e.confirmEmail = "Emails do not match";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s+()-]{8,15}$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.dobDay || !form.dobMonth || !form.dobYear) {
      e.dobDay = "Date of birth is required";
    } else {
      const d = parseInt(form.dobDay), m = parseInt(form.dobMonth), y = parseInt(form.dobYear);
      const date = new Date(y, m - 1, d);
      if (
        date.getDate() !== d ||
        date.getMonth() !== m - 1 ||
        date.getFullYear() !== y ||
        y < 1900 ||
        y > new Date().getFullYear()
      ) {
        e.dobDay = "Invalid date of birth";
      }
    }
    if (!form.abnPurpose) e.abnPurpose = "Please select a registration purpose";
    if (form.abnPurpose === "new" && (!form.abnStartDay || !form.abnStartMonth || !form.abnStartYear)) {
      e.abnStartDay = "Start date is required";
    }
    if (!form.businessActivity.trim()) e.businessActivity = "Business activity is required";
    if (!form.personalAddress.trim()) e.personalAddress = "Personal address is required";
    if (!form.applyingReason) e.applyingReason = "Please select a reason";
    if (form.tfnOption === "now" && form.tfn && !/^\d{3}\s?\d{3}\s?\d{3}$/.test(form.tfn.trim())) {
      e.tfn = "Invalid TFN format (e.g. 123 456 789)";
    }
    if (!form.tradeUnderBusinessName) e.tradeUnderBusinessName = "Please select an option";
    if (form.tradeUnderBusinessName === "yes") {
      if (!form.businessNameOption) e.businessNameOption = "Please select an option";
      if (form.businessNameOption === "new" && !form.newBusinessName.trim()) e.newBusinessName = "Business name is required";
      if (form.businessNameOption === "renew" && !form.existingBusinessName.trim()) e.existingBusinessName = "Business name is required";
      if (!form.registrationPeriod) e.registrationPeriod = "Please select a registration period";
    }
    if (!form.countryOfBirth) e.countryOfBirth = "Country of birth is required";
    if (!form.cityOfBirth.trim()) e.cityOfBirth = "City of birth is required";
    if (!form.registerForGST) e.registerForGST = "Please select an option";
    if (form.registerForGST === "yes") {
      if (!form.annualTurnover) e.annualTurnover = "Please select turnover range";
      if (!form.gstLodgeFrequency) e.gstLodgeFrequency = "Please select lodge frequency";
      if (!form.gstResultTiming) e.gstResultTiming = "Please select an option";
      if (!form.importGoods) e.importGoods = "Please select an option";
      if (!form.gstStartDay || !form.gstStartMonth || !form.gstStartYear) e.gstStartDay = "GST start date is required";
    }
    if (!form.acceptTerms) e.acceptTerms = "You must accept the Terms & Service";
    if (!form.authoriseTaxAgent) e.authoriseTaxAgent = "This authorisation is required";
    if (!form.confirmTrueInfo) e.confirmTrueInfo = "This confirmation is required";
    if (!form.authoriseASICAgent) e.authoriseASICAgent = "This authorisation is required";

    setErrors(e);
    return e;
  };

  const handleABNLookup = async (abn: string) => {
    const clean = abn.replace(/\s/g, "");
    if (!clean) return;
    setABNLookupLoading(true);
    setABNLookupError("");
    setABNLookupResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("abn-lookup", {
        body: { abn: clean },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      setABNLookupResult(data.data as ABNLookupResult);
    } catch (err) {
      setABNLookupError(
        err instanceof Error ? err.message : "Lookup failed. Please enter your details manually."
      );
    } finally {
      setABNLookupLoading(false);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      const firstKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await createOrderFromLovable(
        "ABN Registration",
        form as unknown as Record<string, unknown>
      );

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          orderId: order.id,
          items: lineItems,
          customerEmail: form.email,
          origin: window.location.origin,
        },
      });

      if (error) throw new Error(error.message);
      if (!data?.url) throw new Error("No checkout URL returned from payment provider.");

      window.location.href = data.url;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const sectionProps = { form, errors, update, updateArray, updateBoolean };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16 rounded-none border-0">
        <div className="container px-4 border-secondary border-solid rounded-none">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">

              {/* Header inside card */}
              <div className="px-6 pt-28 pb-2 md:pt-28 text-center ml-0 border-0 rounded-none md:px-[40px]">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-4xl">
                  Register your ABN online in minutes
                </h1>
                <p className="mt-2 text-primary my-[13px] text-lg font-medium px-0 font-sans pr-[20px] pt-[20px] pb-0 mx-[96px]">
                  You can also add GST registration or apply for a Business Name within the same application.
                </p>
                <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground text-base px-0 py-0 mx-[100px] my-[10px] mb-[11px] mr-[100px]">
                  Simply complete the form below with your details and our team will securely process your request. The application only takes a few minutes to complete.
                </p>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground my-[20px] mx-0 py-[10px]">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator before form fields */}
              <div className="mx-6 md:mx-10 border-t border-border my-[30px]" />

              {/* Personal Details */}
              <div>
                <ApplicantNameSection {...sectionProps} />
                <EmailSection {...sectionProps} />
                <PhoneSection {...sectionProps} />
                <TFNSection {...sectionProps} />
              </div>

              {/* ABN Purpose & Business Activity */}
              <div>
                <ABNPurposeSection
                  {...sectionProps}
                  onABNLookup={handleABNLookup}
                  abnLookupLoading={abnLookupLoading}
                  abnLookupResult={abnLookupResult}
                  abnLookupError={abnLookupError}
                />
                <BusinessActivitySection {...sectionProps} />
                <AddressSection {...sectionProps} />
                <ReasonSection {...sectionProps} />
              </div>

              {/* Business Name Details */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Business Name Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A business name is a name or title under which a person or other legal entity trades. It identifies you to your customers and allows you to differentiate yourself from your competitors. Individuals can trade either under their personal name (for example John Smith), or choose and register a Business Name, subject to availability (for example Smiths Delivery).
                  </p>
                </div>
                <BusinessNameSection {...sectionProps} />
                {form.tradeUnderBusinessName === "yes" && (
                  <RegistrationPeriodSection {...sectionProps} />
                )}
                <BirthDetailsSection {...sectionProps} />
              </div>

              {/* GST Details */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Goods and Services Tax (GST) Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    As a business owner it is your responsibility to register for GST:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span>if you want to claim fuel tax credits for your business</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>if your turnover exceeds the $75,000 threshold</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>if you provide taxi travel or ridesharing services such as Uber, Didi, Ola or Taxify.</li>
                  </ul>
                </div>
                <GSTSection {...sectionProps} />
              </div>

              {/* Accounting Tasks */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Accounting tasks we can help you with</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    We also offer support across a variety of accounting functions and tasks. Our professionals are CPA and CA accredited and can assist you in whatever capacity you require.
                  </p>
                </div>
                <AccountingTasksSection {...sectionProps} />
              </div>

              {/* What happens next */}
              <div className="border-t border-border">
                <div className="bg-[#F7F9FE] px-6 py-8 md:px-10">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">
                      What happens after you submit your application
                    </h3>
                    <p className="mt-1.5 mx-auto max-w-md text-sm text-muted-foreground">
                      After submitting your application, our team reviews your details and securely processes your ABN registration.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: ClipboardCheck, title: "Application Review", text: "Our accredited tax professionals review your application to ensure the information provided is accurate and compliant before lodgement." },
                      { icon: Send, title: "Secure Lodgement", text: "Once reviewed, your application is securely lodged with the Australian Business Register for processing." },
                      { icon: Mail, title: "Email Confirmation", text: "You will receive a confirmation email with the details of your ABN registration once the process has been completed." },
                    ].map(({ icon: Icon, title, text }, i) => (
                      <div key={i} className="rounded-xl border border-border/60 bg-card p-4 text-center">
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <h4 className="mt-2.5 text-sm font-semibold text-foreground">{title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-1.5 text-sm">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <span className="font-bold text-foreground">Your application is securely processed and reviewed by an Accredited Tax Agent.</span>
                  </div>
                </div>
              </div>

              {/* Final Confirmation */}
              <div className="border-t border-border">
                <FinalConfirmationSection {...sectionProps} />
              </div>

              {/* Pricing summary */}
              <div className="border-t border-border px-6 pt-6 md:px-8">
                <div className="mx-auto max-w-[570px] rounded-xl border border-border bg-muted/30 p-4">
                  <h3 className="text-sm font-semibold text-foreground">Order Summary</h3>
                  <div className="mt-3 space-y-2">
                    {lineItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium text-foreground">
                          A${(item.amount_cents / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                      <span className="text-foreground">Total (AUD)</span>
                      <span className="text-primary">
                        A${(totalCents / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-border px-6 pt-6 md:px-8 md:pt-8 text-center">
                <Button
                  variant="hero"
                  size="lg"
                  className="mx-auto gap-2 h-14 text-base px-12"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  You will be redirected to our secure payment page
                </p>
                <div className="h-16" />
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ABNRegistration;
