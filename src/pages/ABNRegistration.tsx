import { useState, useCallback, useMemo } from "react";
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
import { ArrowRight, Shield, Lock, CheckCircle2, ClipboardCheck, Send, Mail, ShieldCheck } from "lucide-react";
import type { ABNFormData } from "@/components/abn-registration/types";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const nextSteps = [
  {
    icon: ClipboardCheck,
    title: "Application Review",
    text: "Our accredited tax professionals review your application to ensure the information provided is accurate and compliant before lodgement.",
  },
  {
    icon: Send,
    title: "Secure Lodgement",
    text: "Once reviewed, your application is securely lodged with the Australian Business Register for processing.",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    text: "You will receive a confirmation email with the details of your ABN registration once the process has been completed.",
  },
];

const ABNRegistration = () => {
  const [searchParams] = useSearchParams();
  const purposeParam = searchParams.get("purpose");

  const [form, setForm] = useState<ABNFormData>({
    ...initialForm,
    abnPurpose: purposeParam === "renew" ? "reactivate" : "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const navigate = useNavigate();

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

  const validate = (): boolean => {
    const e: Partial<Record<string, string>> = {};

    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.confirmEmail.trim()) e.confirmEmail = "Please confirm your email";
    else if (form.email !== form.confirmEmail) e.confirmEmail = "Emails do not match";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s+()-]{8,15}$/.test(form.phone)) e.phone = "Invalid phone number";
    if (!form.dobDay || !form.dobMonth || !form.dobYear) e.dobDay = "Date of birth is required";
    else {
      const d = parseInt(form.dobDay), m = parseInt(form.dobMonth), y = parseInt(form.dobYear);
      const date = new Date(y, m - 1, d);
      if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y || y < 1900 || y > new Date().getFullYear()) {
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
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/apply", { state: { service: "ABN Registration", formData: form } });
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const sectionProps = { form, errors, update, updateArray, updateBoolean };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header inside card */}
              <div className="px-6 pt-8 pb-2 md:px-10 md:pt-10 text-center">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                  ABN & GST direct to your inbox in just 5 minutes
                </h1>
                <p className="mt-2 text-sm font-medium text-primary">
                  Business Name & other services available in the same form.
                </p>
                <p className="mt-2 mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Simply use the registration form to provide the necessary information for locating your ABN. The whole process will only take about a minute.
                </p>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator before form fields */}
              <div className="mx-6 md:mx-10 border-t border-border" />

              {/* Personal Details */}
              <div>
                <ApplicantNameSection {...sectionProps} />
                <EmailSection {...sectionProps} />
                <PhoneSection {...sectionProps} />
                <TFNSection {...sectionProps} />
              </div>

              {/* ABN Purpose & Business Activity */}
              <div>
                <ABNPurposeSection {...sectionProps} />
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
                <div className="px-6 pt-6 md:px-8 md:pt-7">
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
                <div className="px-6 pt-6 md:px-8 md:pt-7">
                  <h2 className="text-lg font-bold text-foreground">Accounting tasks we can help you with</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    We also offer support across a variety of accounting functions and tasks. Our professionals are CPA and CA accredited and can assist you in whatever capacity you require.
                  </p>
                </div>
                <AccountingTasksSection {...sectionProps} />
              </div>

              {/* What happens next */}
              <div className="border-t border-border">
                <div className="rounded-b-none rounded-t-none bg-primary/[0.04] px-6 py-8 md:px-10">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">
                      What happens after you submit your application
                    </h3>
                    <p className="mt-1.5 mx-auto max-w-md text-sm text-muted-foreground">
                      After submitting your application, our team reviews your details and securely processes your ABN registration.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {nextSteps.map(({ icon: Icon, title, text }, i) => (
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

              {/* Submit */}
              <div className="border-t border-border p-6 md:p-8">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2 h-14 text-base"
                  onClick={handleSubmit}
                >
                  Lodge my ABN application
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ABNRegistration;
