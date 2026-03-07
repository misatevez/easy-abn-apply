import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import { SectionWrapper, StyledInput, FieldError, HelperText } from "@/components/abn-registration/FormField";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Shield, Lock, CheckCircle2, ClipboardCheck, Send, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

type CancellationFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  tfnOption: string;
  tfn: string;
  abn: string;
  // GST Cancellation
  gstCancellationReason: string;
  gstCancelDay: string;
  gstCancelMonth: string;
  gstCancelYear: string;
  // Business Name Cancellation
  cancelBusinessName: string;
  businessNameToCancel: string;
  requestASICKey: string;
  asicKey: string;
  // ABN Cancellation
  cancelABN: string;
  abnCancellationReason: string;
  abnCancellationReasonOther: string;
  abnCancelDay: string;
  abnCancelMonth: string;
  abnCancelYear: string;
  // Terms
  acceptTerms: boolean;
  authoriseTaxAgent: boolean;
  confirmTrueInfo: boolean;
};

const initialForm: CancellationFormData = {
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
  abn: "",
  gstCancellationReason: "",
  gstCancelDay: String(new Date().getDate()).padStart(2, "0"),
  gstCancelMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
  gstCancelYear: String(new Date().getFullYear()),
  cancelBusinessName: "",
  businessNameToCancel: "",
  requestASICKey: "",
  asicKey: "",
  cancelABN: "",
  abnCancellationReason: "",
  abnCancellationReasonOther: "",
  abnCancelDay: String(new Date().getDate()).padStart(2, "0"),
  abnCancelMonth: String(new Date().getMonth() + 1).padStart(2, "0"),
  abnCancelYear: String(new Date().getFullYear()),
  acceptTerms: false,
  authoriseTaxAgent: false,
  confirmTrueInfo: false,
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const abnCancellationReasons = [
  "Business/Enterprise has closed down",
  "Business/Enterprise has never operated",
  "Business/Enterprise has been sold",
  "Business/Enterprise is no longer carried on in Australia",
  "Change in Business Structure",
  "Other",
];

const gstCancellationReasons = [
  "The entity has never operated on a GST-registered basis",
  "The entity has stopped operating on a GST-registered basis",
];

const nextSteps = [
  {
    icon: ClipboardCheck,
    title: "Application Review",
    text: "Our accredited tax professionals review your cancellation request to ensure the information is accurate and compliant before lodgement.",
  },
  {
    icon: Send,
    title: "Secure Lodgement",
    text: "Once reviewed, your cancellation request is securely lodged with the relevant authority for processing.",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    text: "A confirmation email will be sent to your nominated email address once your cancellation request has been processed.",
  },
];

const GSTCancellation = () => {
  const [form, setForm] = useState<CancellationFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const navigate = useNavigate();

  const update = useCallback((field: keyof CancellationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateBoolean = useCallback((field: keyof CancellationFormData, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

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
    if (!form.abn.trim()) e.abn = "ABN is required";
    else if (!/^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(form.abn.trim())) e.abn = "Invalid ABN format (e.g. 51 824 753 556)";
    if (form.tfnOption === "now" && form.tfn && !/^\d{3}\s?\d{3}\s?\d{3}$/.test(form.tfn.trim())) {
      e.tfn = "Invalid TFN format (e.g. 123 456 789)";
    }
    // GST - always shown
    if (!form.gstCancellationReason) e.gstCancellationReason = "Please select a reason";
    if (!form.gstCancelDay || !form.gstCancelMonth || !form.gstCancelYear) e.gstCancelDay = "Cancellation date is required";
    // Business Name
    if (!form.cancelBusinessName) e.cancelBusinessName = "Please select an option";
    if (form.cancelBusinessName === "yes" && !form.businessNameToCancel.trim()) e.businessNameToCancel = "Business name is required";
    if (form.cancelBusinessName === "yes" && !form.requestASICKey) e.requestASICKey = "Please select an option";
    // ABN - conditional
    if (form.cancelABN === "yes") {
      if (!form.abnCancellationReason) e.abnCancellationReason = "Please select a reason";
      if (form.abnCancellationReason === "Other" && !form.abnCancellationReasonOther.trim()) e.abnCancellationReasonOther = "Please specify the reason";
      if (!form.abnCancelDay || !form.abnCancelMonth || !form.abnCancelYear) e.abnCancelDay = "Cancellation date is required";
    }
    // Terms
    if (!form.acceptTerms) e.acceptTerms = "You must accept the Terms & Service";
    if (!form.authoriseTaxAgent) e.authoriseTaxAgent = "This authorisation is required";
    if (!form.confirmTrueInfo) e.confirmTrueInfo = "This confirmation is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/apply", { state: { service: "GST Cancellation", formData: form } });
    }
  };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header */}
              <div className="px-6 pt-8 pb-2 md:px-10 md:pt-10 text-center">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                  Cancel your GST / ABN / Business Name in 5 minutes
                </h1>
                <p className="mt-2 text-sm font-medium text-primary">
                  3 EASY STEPS TO CANCEL YOUR OFFICIAL GST / ABN / BUSINESS NAME
                </p>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-6 md:mx-10 border-t border-border" />

              {/* Process summary */}
              <div className="px-6 pb-4 md:px-10">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { num: "1", text: "Fill in the form below to cancel your personal ABN / GST / Business Name." },
                    { num: "2", text: "Complete payment. You can pay by credit card. SSL Certified & Secure Transaction." },
                    { num: "3", text: "Once your application is cancelled, your application status will be sent directly to your nominated email address." },
                  ].map((step) => (
                    <div key={step.num} className="rounded-xl border border-border/60 bg-muted/30 p-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {step.num}
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applicant Name */}
              <SectionWrapper>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label>First Name</Label>
                    <StyledInput value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="First Name" />
                    <HelperText>Legal First Name</HelperText>
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <StyledInput value={form.middleName} onChange={(v) => update("middleName", v)} placeholder="Middle Name" />
                    <HelperText>Legal Middle Name</HelperText>
                  </div>
                  <div>
                    <Label>Last Name <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="Last Name" error={errors.lastName} />
                    <HelperText>Legal Last Name</HelperText>
                    <FieldError error={errors.lastName} />
                  </div>
                </div>
              </SectionWrapper>

              {/* Email */}
              <SectionWrapper title="Email">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Email <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.email} onChange={(v) => update("email", v)} placeholder="your@email.com" type="email" error={errors.email} />
                    <FieldError error={errors.email} />
                  </div>
                  <div>
                    <Label>Confirmation Email <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.confirmEmail} onChange={(v) => update("confirmEmail", v)} placeholder="Confirm your email" type="email" error={errors.confirmEmail} />
                    <FieldError error={errors.confirmEmail} />
                  </div>
                </div>
              </SectionWrapper>

              {/* Phone + DOB */}
              <SectionWrapper>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Mobile Phone Number <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.phone} onChange={(v) => update("phone", v)} placeholder="04XX XXX XXX" error={errors.phone} />
                    <FieldError error={errors.phone} />
                  </div>
                  <div>
                    <Label>Date of Birth <span className="text-destructive">*</span></Label>
                    <div className="mt-1 grid grid-cols-3 gap-3">
                      <StyledInput value={form.dobDay} onChange={(v) => update("dobDay", v)} placeholder="DD" error={errors.dobDay} />
                      <Select value={form.dobMonth} onValueChange={(v) => update("dobMonth", v)}>
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((m, i) => (
                            <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <StyledInput value={form.dobYear} onChange={(v) => update("dobYear", v)} placeholder="YYYY" error={errors.dobDay} />
                    </div>
                    <FieldError error={errors.dobDay} />
                  </div>
                </div>
              </SectionWrapper>

              {/* TFN */}
              <SectionWrapper title="Tax File Number (TFN)">
                <p className="mb-3 text-sm text-muted-foreground">Not mandatory but strongly recommended:</p>
                <div className="space-y-2">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input type="radio" name="tfnOption" checked={form.tfnOption === "now"} onChange={() => update("tfnOption", "now")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                    <span className="text-sm text-foreground">I can supply my TFN now</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input type="radio" name="tfnOption" checked={form.tfnOption === "later"} onChange={() => update("tfnOption", "later")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                    <span className="text-sm text-foreground">I will supply my TFN later</span>
                  </label>
                </div>

                {form.tfnOption === "now" && (
                  <div className="mt-4 max-w-sm">
                    <Label>Tax File Number (123 456 789)</Label>
                    <StyledInput value={form.tfn} onChange={(v) => update("tfn", v)} placeholder="123 456 789" error={errors.tfn} />
                    <FieldError error={errors.tfn} />
                    <HelperText>
                      The TFN itself has 9 digits, with a check digit. Individuals receive a 9-digit TFN. Your Tax File Number (TFN) can be found on official Tax Office documents.
                    </HelperText>
                    <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                      <p className="text-xs font-semibold text-foreground">Can't find your TFN?</p>
                      <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span>Look at your income tax notice of assessment.</li>
                        <li className="flex gap-2"><span className="text-primary">•</span>Look at a payment summary (provided by your employer) or your super statement.</li>
                        <li className="flex gap-2"><span className="text-primary">•</span>If you have a myGov account linked to the ATO, you can access your TFN online.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </SectionWrapper>

              {/* ABN */}
              <SectionWrapper title="ABN (Australian Business Number)">
                <div className="max-w-sm">
                  <Label>ABN <span className="text-destructive">*</span></Label>
                  <StyledInput value={form.abn} onChange={(v) => update("abn", v)} placeholder="51 824 753 556" error={errors.abn} />
                  <FieldError error={errors.abn} />
                </div>
              </SectionWrapper>

              {/* ===== GST Cancellation Details ===== */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">GST Cancellation Details</h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">Cancelling your GST registration</p>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p>You must cancel your GST registration if you are selling or closing your business. You may also need to cancel your GST registration if you restructure your business.</p>
                    <p className="mt-2">You can choose to cancel your GST registration if your GST turnover is below the threshold for compulsory registration, unless you:</p>
                    <ul className="mt-1.5 space-y-1 ml-4">
                      <li className="flex gap-2"><span className="text-primary">•</span>Are a taxi driver, including ride-sourcing or chauffeur services</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>Represent an incapacitated entity who is registered or required to be registered for GST</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>Are an Australian resident who acts as an agent for a non-resident that is registered or required to be registered for GST</li>
                    </ul>
                  </div>
                </div>
                <SectionWrapper>
                  {/* GST reason shown directly */}
                  <div className="max-w-md">
                    <Label>Please select a reason for your GST cancellation: <span className="text-destructive">*</span></Label>
                    <Select value={form.gstCancellationReason} onValueChange={(v) => update("gstCancellationReason", v)}>
                      <SelectTrigger className="h-11 rounded-lg mt-1">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {gstCancellationReasons.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError error={errors.gstCancellationReason} />
                  </div>

                  <div className="mt-5">
                    <Label>Day for the GST Cancellation to take effect <span className="text-destructive">*</span></Label>
                    <div className="mt-1 grid max-w-sm grid-cols-3 gap-3">
                      <StyledInput value={form.gstCancelDay} onChange={(v) => update("gstCancelDay", v)} placeholder="DD" error={errors.gstCancelDay} />
                      <Select value={form.gstCancelMonth} onValueChange={(v) => update("gstCancelMonth", v)}>
                        <SelectTrigger className="h-11 rounded-lg">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((m, i) => (
                            <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <StyledInput value={form.gstCancelYear} onChange={(v) => update("gstCancelYear", v)} placeholder="YYYY" error={errors.gstCancelDay} />
                    </div>
                    <FieldError error={errors.gstCancelDay} />
                  </div>
                </SectionWrapper>
              </div>

              {/* ===== Business Name Cancellation Details ===== */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Business Name Cancellation Details</h2>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Reasons why we may initiate the cancellation of a Business Name</p>
                    <p className="mt-1.5">There are a number of reasons why we may initiate the cancellation of a business name. Some of the common reasons include:</p>
                    <ul className="mt-1.5 space-y-1 ml-4">
                      <li className="flex gap-2"><span className="text-primary">•</span>The business name holder does not renew their business name registration.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>The business name holder is a company that has been deregistered.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>We become aware of a matter after registration that would have affected our initial decision to register the business name.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>We become aware that the entity is disqualified from holding a business name.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>We are satisfied the entity is not carrying on a business under the business name.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>The entity fails to notify us of a change in information within the required time.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>The entity fails to respond to an ASIC request for information.</li>
                    </ul>
                  </div>
                </div>
                <SectionWrapper>
                  <Label>Would you like to cancel your Business Name? <span className="text-destructive">*</span></Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="radio" name="cancelBusinessName" checked={form.cancelBusinessName === "yes"} onChange={() => update("cancelBusinessName", "yes")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                      <span className="text-sm text-foreground">Yes</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="radio" name="cancelBusinessName" checked={form.cancelBusinessName === "no"} onChange={() => update("cancelBusinessName", "no")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                      <span className="text-sm text-foreground">No</span>
                    </label>
                  </div>
                  <FieldError error={errors.cancelBusinessName} />

                  {form.cancelBusinessName === "yes" && (
                    <div className="mt-4 space-y-4">
                      <div className="max-w-md">
                        <Label>Please specify the Business Name you would like to cancel <span className="text-destructive">*</span></Label>
                        <StyledInput value={form.businessNameToCancel} onChange={(v) => update("businessNameToCancel", v)} placeholder="Your business name" error={errors.businessNameToCancel} />
                        <FieldError error={errors.businessNameToCancel} />
                      </div>

                      <div>
                        <Label>Request the ASIC Key on my behalf? <span className="text-destructive">*</span></Label>
                        <div className="mt-2 space-y-2">
                          <label className="flex cursor-pointer items-center gap-2.5">
                            <input type="radio" name="requestASICKey" checked={form.requestASICKey === "yes"} onChange={() => update("requestASICKey", "yes")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                            <span className="text-sm text-foreground">Yes</span>
                          </label>
                          <label className="flex cursor-pointer items-center gap-2.5">
                            <input type="radio" name="requestASICKey" checked={form.requestASICKey === "no"} onChange={() => update("requestASICKey", "no")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                            <span className="text-sm text-foreground">No</span>
                          </label>
                        </div>
                        <FieldError error={errors.requestASICKey} />
                      </div>

                      {form.requestASICKey === "no" && (
                        <div className="max-w-md">
                          <Label>Enter your ASIC Key if you have it</Label>
                          <StyledInput value={form.asicKey} onChange={(v) => update("asicKey", v)} placeholder="e.g. 1-12345678901" />
                          <HelperText>If not, we can request it on your behalf.</HelperText>
                        </div>
                      )}

                      <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                        <p className="text-xs font-semibold text-foreground">Cannot find your ASIC Key?</p>
                        <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                          <li className="flex gap-2"><span className="text-primary">•</span>You can request it online at no cost via: <a href="https://asic.gov.au" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Request ASIC Key</a></li>
                          <li className="flex gap-2"><span className="text-primary">•</span>After request, your ASIC key will be delivered to your business email address within 24 hours</li>
                          <li className="flex gap-2"><span className="text-primary">•</span>An ASIC Key mostly looks like: 1-12345678901</li>
                          <li className="flex gap-2"><span className="text-primary">•</span>You can search your inbox for: ASIC.Transaction.No-reply@asic.gov.au and open the Welcome Letter PDF</li>
                          <li className="flex gap-2"><span className="text-primary">•</span>We can attempt to obtain this ASIC key to be emailed to your email address if all your details are correct and up to date with ASIC</li>
                          <li className="flex gap-2"><span className="text-primary">•</span>Please contact us at <a href="mailto:info@abn-number.com" className="text-primary hover:underline">info@abn-number.com</a></li>
                        </ul>
                      </div>
                    </div>
                  )}
                </SectionWrapper>
              </div>

              {/* ===== ABN Cancellation Details ===== */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">ABN Cancellation Details</h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">Cancel an Australian Business Number (ABN)</p>
                  <div className="mt-3 text-sm text-muted-foreground">
                    <p>You should cancel your ABN if your business:</p>
                    <ul className="mt-1.5 space-y-1 ml-4">
                      <li className="flex gap-2"><span className="text-primary">•</span>Has been sold</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>Has closed down</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>Has changed business structures</li>
                      <li className="flex gap-2"><span className="text-primary">•</span>Is no longer operating in Australia or making supplies connected with Australia</li>
                    </ul>
                  </div>
                </div>
                <SectionWrapper>
                  <Label>Would you like to cancel your ABN? <span className="text-destructive">*</span></Label>
                  <div className="mt-2 space-y-2">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="radio" name="cancelABN" checked={form.cancelABN === "yes"} onChange={() => update("cancelABN", "yes")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                      <span className="text-sm text-foreground">Yes</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="radio" name="cancelABN" checked={form.cancelABN === "no"} onChange={() => update("cancelABN", "no")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                      <span className="text-sm text-foreground">No</span>
                    </label>
                  </div>

                  {form.cancelABN === "yes" && (
                    <>
                      <div className="mt-4 max-w-md">
                        <Label>Reason for the ABN cancellation? <span className="text-destructive">*</span></Label>
                        <Select value={form.abnCancellationReason} onValueChange={(v) => update("abnCancellationReason", v)}>
                          <SelectTrigger className="h-11 rounded-lg mt-1">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {abnCancellationReasons.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError error={errors.abnCancellationReason} />
                      </div>

                      {form.abnCancellationReason === "Other" && (
                        <div className="mt-4 max-w-md">
                          <Label>Please specify the reason <span className="text-destructive">*</span></Label>
                          <StyledInput value={form.abnCancellationReasonOther} onChange={(v) => update("abnCancellationReasonOther", v)} placeholder="Please specify..." error={errors.abnCancellationReasonOther} />
                          <FieldError error={errors.abnCancellationReasonOther} />
                        </div>
                      )}

                      <div className="mt-5">
                        <Label>From what date does the Individual / Sole Trader require its ABN cancelled? <span className="text-destructive">*</span></Label>
                        <div className="mt-1 grid max-w-sm grid-cols-3 gap-3">
                          <StyledInput value={form.abnCancelDay} onChange={(v) => update("abnCancelDay", v)} placeholder="DD" error={errors.abnCancelDay} />
                          <Select value={form.abnCancelMonth} onValueChange={(v) => update("abnCancelMonth", v)}>
                            <SelectTrigger className="h-11 rounded-lg">
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent>
                              {months.map((m, i) => (
                                <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <StyledInput value={form.abnCancelYear} onChange={(v) => update("abnCancelYear", v)} placeholder="YYYY" error={errors.abnCancelDay} />
                        </div>
                        <FieldError error={errors.abnCancelDay} />
                      </div>
                    </>
                  )}
                </SectionWrapper>
              </div>

              {/* What happens next */}
              <div className="border-t border-border">
                <div className="bg-primary/[0.04] px-6 py-8 md:px-10">
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

              {/* Terms & Declarations */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7">
                  <h2 className="text-lg font-bold text-foreground">Terms and Conditions of Service</h2>
                </div>
                <SectionWrapper>
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.acceptTerms}
                        onCheckedChange={(checked) => updateBoolean("acceptTerms", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I have read and accept the <a href="#" className="text-primary hover:underline">Terms & Service</a> of use. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.acceptTerms} />

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.authoriseTaxAgent}
                        onCheckedChange={(checked) => updateBoolean("authoriseTaxAgent", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I authorise an Accredited Tax Agent, under licence number 24666831, to add me if required to their tax agent portal in order to proceed with this request. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.authoriseTaxAgent} />

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.confirmTrueInfo}
                        onCheckedChange={(checked) => updateBoolean("confirmTrueInfo", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        The information provided in this application, including attachments if applicable, is true and correct. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.confirmTrueInfo} />
                  </div>
                </SectionWrapper>
              </div>

              {/* Submit */}
              <div className="border-t border-border p-6 md:p-8 [&>*]:mx-auto [&>*]:max-w-[570px]">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2 h-14 text-base"
                  onClick={handleSubmit}
                >
                  Submit your Cancellation
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

export default GSTCancellation;
