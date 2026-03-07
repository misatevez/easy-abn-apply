import { useState, useCallback, useMemo } from "react";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import ABNRegistrationProgress from "@/components/abn-registration/ABNRegistrationProgress";
import { SectionWrapper, StyledInput, FieldError, HelperText } from "@/components/abn-registration/FormField";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Shield, Lock, CheckCircle2, ClipboardCheck, Send, Mail, ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type UpdateFormData = {
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
  updateFields: string[];
  newPersonalAddress: string;
  newBusinessAddress: string;
  newPhone: string;
  newEmail: string;
  newBusinessActivity: string;
  accountingTasks: string[];
  authoriseTaxAgent: boolean;
  confirmTrueInfo: boolean;
  acceptTerms: boolean;
};

const initialForm: UpdateFormData = {
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
  updateFields: [],
  newPersonalAddress: "",
  newBusinessAddress: "",
  newPhone: "",
  newEmail: "",
  newBusinessActivity: "",
  accountingTasks: [],
  authoriseTaxAgent: false,
  confirmTrueInfo: false,
  acceptTerms: false,
};

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const updateOptions = [
  "Personal Address",
  "Business Address",
  "Phone Number",
  "Email Address",
  "Business Activity",
];

const accountingOptions = [
  "Pre-order for a Xero Set up Account",
  "Pre-order for a Submission of the BAS (Business Activity Statements)",
  "Pre-order for a Tax Return",
  "Payroll solutions",
  "Affordable Bookkeeping Service",
  "Superannuation Services",
  "Consultation with a Tax Accountant",
];

const steps = [
  {
    icon: ClipboardCheck,
    title: "Application Review",
    text: "Our accredited tax professionals review your request to ensure the information is accurate and compliant before lodgement.",
  },
  {
    icon: Send,
    title: "Secure Lodgement",
    text: "Once reviewed, your updated details are securely lodged with the Australian Business Register for processing.",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    text: "A confirmation email will be sent to your nominated email address once your ABN update has been processed.",
  },
];

const TOTAL_SECTIONS = 10;

const UpdateABNDetails = () => {
  const [form, setForm] = useState<UpdateFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const navigate = useNavigate();

  const update = useCallback((field: keyof UpdateFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleArrayField = useCallback((field: keyof UpdateFormData, value: string) => {
    setForm((prev) => {
      const current = (prev[field] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  }, []);

  const updateBoolean = useCallback((field: keyof UpdateFormData, value: boolean) => {
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
    if (form.abn) count++;
    if (form.updateFields.length > 0) count++;
    // Count conditional fields completed
    const selected = form.updateFields;
    if (selected.length > 0) {
      let conditionalDone = true;
      if (selected.includes("Personal Address") && !form.newPersonalAddress) conditionalDone = false;
      if (selected.includes("Business Address") && !form.newBusinessAddress) conditionalDone = false;
      if (selected.includes("Phone Number") && !form.newPhone) conditionalDone = false;
      if (selected.includes("Email Address") && !form.newEmail) conditionalDone = false;
      if (selected.includes("Business Activity") && !form.newBusinessActivity) conditionalDone = false;
      if (conditionalDone) count++;
    }
    if (form.authoriseTaxAgent && form.confirmTrueInfo) count++;
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
    if (!form.abn.trim()) e.abn = "ABN is required";
    else if (!/^\d{2}\s?\d{3}\s?\d{3}\s?\d{3}$/.test(form.abn.trim())) e.abn = "Invalid ABN format (e.g. 51 824 753 556)";
    if (form.updateFields.length === 0) e.updateFields = "Please select at least one field to update";
    if (form.tfnOption === "now" && form.tfn && !/^\d{3}\s?\d{3}\s?\d{3}$/.test(form.tfn.trim())) {
      e.tfn = "Invalid TFN format (e.g. 123 456 789)";
    }

    // Validate conditional fields
    if (form.updateFields.includes("Personal Address") && !form.newPersonalAddress.trim()) e.newPersonalAddress = "New personal address is required";
    if (form.updateFields.includes("Business Address") && !form.newBusinessAddress.trim()) e.newBusinessAddress = "New business address is required";
    if (form.updateFields.includes("Phone Number") && !form.newPhone.trim()) e.newPhone = "New phone number is required";
    if (form.updateFields.includes("Email Address") && !form.newEmail.trim()) e.newEmail = "New email address is required";
    if (form.updateFields.includes("Business Activity") && !form.newBusinessActivity.trim()) e.newBusinessActivity = "New business activity is required";

    if (!form.authoriseTaxAgent) e.authoriseTaxAgent = "This authorisation is required";
    if (!form.confirmTrueInfo) e.confirmTrueInfo = "This confirmation is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate("/apply", { state: { service: "Update ABN Details", formData: form } });
    }
  };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[800px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header */}
              <div className="px-6 pt-8 pb-2 md:px-10 md:pt-10 text-center">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                  Update your ABN Details in 5 minutes
                </h1>
                <p className="mt-2 text-sm font-medium text-primary">
                  Please use this form to update any personal details related to your Australian Business Number (ABN) registration.
                </p>
                <div className="mt-3 mx-auto max-w-lg text-left text-sm leading-relaxed text-muted-foreground">
                  <p>This includes changes to your:</p>
                  <ul className="mt-1.5 space-y-1 ml-4">
                    <li className="flex gap-2"><span className="text-primary">•</span>Personal and Business Address</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>Email address and phone number</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>Any other relevant personal details</li>
                  </ul>
                  <p className="mt-2">
                    Providing accurate and up-to-date information ensures that your ABN records remain current and compliant with ATO requirements. If you have any questions or need assistance, please contact our support team.
                  </p>
                </div>
              </div>

              {/* Progress */}
              <ABNRegistrationProgress completed={completedSections} total={TOTAL_SECTIONS} />

              {/* Separator before form fields */}
              <div className="mx-6 md:mx-10 border-t border-border" />

              {/* Process summary */}
              <div className="px-6 pb-4 md:px-10">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { num: "1", text: "Fill in the form below to update your personal information." },
                    { num: "2", text: "Complete payment. You can pay by credit card. SSL Certified & Secure Transaction." },
                    { num: "3", text: "Once your application is approved, your updated ABN details will be emailed directly to your nominated email address." },
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

              {/* Phone */}
              <SectionWrapper title="Phone">
                <div className="max-w-sm">
                  <Label>Mobile Phone Number <span className="text-destructive">*</span></Label>
                  <StyledInput value={form.phone} onChange={(v) => update("phone", v)} placeholder="04XX XXX XXX" error={errors.phone} />
                  <FieldError error={errors.phone} />
                </div>
              </SectionWrapper>

              {/* Date of Birth */}
              <SectionWrapper title="Date of Birth">
                <Label>Date of Birth <span className="text-destructive">*</span></Label>
                <div className="mt-1 grid max-w-xs grid-cols-3 gap-3">
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
                      The TFN itself has 9 digits, with a check digit. Individuals receive a 9-digit TFN. Your Tax File Number (TFN) can be found on official Tax Office documents. We may contact you to provide your TFN if the ATO cannot verify your information with the details you have provided.
                    </HelperText>
                    <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3">
                      <p className="text-xs font-semibold text-foreground">Can't find your TFN?</p>
                      <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                        <li className="flex gap-2"><span className="text-primary">•</span>Look at your income tax notice of assessment.</li>
                        <li className="flex gap-2"><span className="text-primary">•</span>Look at a payment summary provided by your employer or your super statement.</li>
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

              {/* Update fields selection */}
              <div className="border-t border-border">
                <SectionWrapper title="Update the following information">
                  <p className="mb-3 text-sm text-muted-foreground">
                    Please fill out only the fields that require updates on your ABN registration form. Leave any fields that do not need changes blank. This will ensure that only the necessary information is updated.
                  </p>
                  <Label>I need to update the following information: <span className="text-destructive">*</span></Label>
                  <div className="mt-3 space-y-2.5">
                    {/* Personal Address */}
                    <div>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.updateFields.includes("Personal Address")} onCheckedChange={() => toggleArrayField("updateFields", "Personal Address")} />
                        <span className="text-sm text-foreground">Personal Address</span>
                      </label>
                      {form.updateFields.includes("Personal Address") && (
                        <div className="ml-7 mt-2">
                          <div className="flex items-end gap-3">
                            <div className="flex-1">
                              <Label>New Personal Address <span className="text-destructive">*</span></Label>
                              <StyledInput value={form.newPersonalAddress} onChange={(v) => update("newPersonalAddress", v)} placeholder="Start typing your address..." error={errors.newPersonalAddress} />
                            </div>
                            {form.newPersonalAddress && (
                              <Button type="button" variant="outline" size="sm" className="mb-0.5 gap-1 text-xs" onClick={() => update("newPersonalAddress", "")}>
                                <X className="h-3 w-3" /> Clear address
                              </Button>
                            )}
                          </div>
                          <FieldError error={errors.newPersonalAddress} />
                          <div className="mt-2 space-y-1">
                            <HelperText>Type in the field above to search and select your address</HelperText>
                            <HelperText>This must be a street address. It cannot be a PO Box, RMB, RSD or other delivery point address.</HelperText>
                            <HelperText>Please check the address above and edit the fields if required</HelperText>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Business Address */}
                    <div>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.updateFields.includes("Business Address")} onCheckedChange={() => toggleArrayField("updateFields", "Business Address")} />
                        <span className="text-sm text-foreground">Business Address</span>
                      </label>
                      {form.updateFields.includes("Business Address") && (
                        <div className="ml-7 mt-2">
                          <div className="flex items-end gap-3">
                            <div className="flex-1">
                              <Label>New Business Address <span className="text-destructive">*</span></Label>
                              <StyledInput value={form.newBusinessAddress} onChange={(v) => update("newBusinessAddress", v)} placeholder="Start typing your address..." error={errors.newBusinessAddress} />
                            </div>
                            {form.newBusinessAddress && (
                              <Button type="button" variant="outline" size="sm" className="mb-0.5 gap-1 text-xs" onClick={() => update("newBusinessAddress", "")}>
                                <X className="h-3 w-3" /> Clear address
                              </Button>
                            )}
                          </div>
                          <FieldError error={errors.newBusinessAddress} />
                          <div className="mt-2 space-y-1">
                            <HelperText>Type in the field above to search and select your address</HelperText>
                            <HelperText>This must be a street address. It cannot be a PO Box, RMB, RSD or other delivery point address.</HelperText>
                            <HelperText>Please check the address above and edit the fields if required</HelperText>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.updateFields.includes("Phone Number")} onCheckedChange={() => toggleArrayField("updateFields", "Phone Number")} />
                        <span className="text-sm text-foreground">Phone Number</span>
                      </label>
                      {form.updateFields.includes("Phone Number") && (
                        <div className="ml-7 mt-2 max-w-sm">
                          <Label>New Phone Number <span className="text-destructive">*</span></Label>
                          <StyledInput value={form.newPhone} onChange={(v) => update("newPhone", v)} placeholder="04XX XXX XXX" error={errors.newPhone} />
                          <FieldError error={errors.newPhone} />
                        </div>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.updateFields.includes("Email Address")} onCheckedChange={() => toggleArrayField("updateFields", "Email Address")} />
                        <span className="text-sm text-foreground">Email Address</span>
                      </label>
                      {form.updateFields.includes("Email Address") && (
                        <div className="ml-7 mt-2 max-w-sm">
                          <Label>New Email Address <span className="text-destructive">*</span></Label>
                          <StyledInput value={form.newEmail} onChange={(v) => update("newEmail", v)} placeholder="new@email.com" type="email" error={errors.newEmail} />
                          <FieldError error={errors.newEmail} />
                        </div>
                      )}
                    </div>

                    {/* Business Activity */}
                    <div>
                      <label className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.updateFields.includes("Business Activity")} onCheckedChange={() => toggleArrayField("updateFields", "Business Activity")} />
                        <span className="text-sm text-foreground">Business Activity</span>
                      </label>
                      {form.updateFields.includes("Business Activity") && (
                        <div className="ml-7 mt-2 max-w-md">
                          <Label>New Business Activity <span className="text-destructive">*</span></Label>
                          <StyledInput value={form.newBusinessActivity} onChange={(v) => update("newBusinessActivity", v)} placeholder="e.g. driver, cleaner, beauty, plumber" error={errors.newBusinessActivity} />
                          <FieldError error={errors.newBusinessActivity} />
                          <HelperText>Example: driver, cleaner, beauty, plumber, babysitting services</HelperText>
                        </div>
                      )}
                    </div>
                  </div>
                  <FieldError error={errors.updateFields} />
                </SectionWrapper>
              </div>

              {/* Accounting Tasks */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7">
                  <h2 className="text-lg font-bold text-foreground">Accounting tasks we can help you with</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We also offer support across a variety of other accounting functions and tasks. Our highly trained professionals are CPA and CA accredited, so they can help you in whatever capacity you require.
                  </p>
                </div>
                <SectionWrapper>
                  <Label className="text-sm font-medium">
                    Please select any Accounting task you may need ($49 pack)
                  </Label>
                  <div className="mt-3 space-y-2.5">
                    {accountingOptions.map((task) => (
                      <label key={task} className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox
                          checked={form.accountingTasks.includes(task)}
                          onCheckedChange={() => toggleArrayField("accountingTasks", task)}
                        />
                        <span className="text-sm text-foreground">{task}</span>
                      </label>
                    ))}
                  </div>
                </SectionWrapper>
              </div>

              {/* What happens next */}
              <div className="border-t border-border">
                <SectionWrapper>
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">
                      What happens after you submit your update request
                    </h3>
                    <p className="mt-1.5 mx-auto max-w-md text-sm text-muted-foreground">
                      Once you submit your request, our team reviews your details and securely processes your ABN update.
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {steps.map(({ icon: Icon, title, text }, i) => (
                      <div key={i} className="rounded-xl border border-border/60 bg-muted/30 p-4 text-center">
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <h4 className="mt-2.5 text-sm font-semibold text-foreground">{title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span>Your application is securely processed and reviewed by an Accredited Tax Agent.</span>
                  </div>
                </SectionWrapper>
              </div>

              {/* Final Confirmation */}
              <div className="border-t border-border">
                <SectionWrapper>
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.acceptTerms}
                        onCheckedChange={(checked) => updateBoolean("acceptTerms", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I have read and accept the <a href="#" className="text-primary hover:underline">Terms & Service</a> of use.
                      </span>
                    </label>

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.authoriseTaxAgent}
                        onCheckedChange={(checked) => updateBoolean("authoriseTaxAgent", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I authorise an Accredited Tax Agent, under licence number 24666831, to add me (if required) to their tax agent portal in order to proceed with this request. <span className="text-destructive">*</span>
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
                        The information provided in this application (including attachments if applicable) is true and correct. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.confirmTrueInfo} />
                  </div>
                </SectionWrapper>
              </div>

              {/* Submit */}
              <div className="border-t border-border p-6 md:p-8">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2 h-14 text-base"
                  onClick={handleSubmit}
                >
                  Update your ABN details
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Expert Reviewed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpdateABNDetails;
