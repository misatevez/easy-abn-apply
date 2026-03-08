import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import { SectionWrapper, StyledInput, FieldError, HelperText, SectionIntro } from "@/components/abn-registration/FormField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield, Lock, CheckCircle2, ClipboardCheck, Send, Mail, ShieldCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ───── helpers ───── */
const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const countries = [
  "Australia","Afghanistan","Albania","Algeria","Argentina","Austria","Bangladesh","Belgium","Brazil","Cambodia",
  "Canada","Chile","China","Colombia","Croatia","Czech Republic","Denmark","Egypt","Estonia","Ethiopia","Fiji",
  "Finland","France","Germany","Ghana","Greece","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq",
  "Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya","Kuwait","Laos","Latvia","Lebanon","Libya",
  "Lithuania","Luxembourg","Malaysia","Maldives","Malta","Mauritius","Mexico","Mongolia","Morocco","Myanmar",
  "Nepal","Netherlands","New Zealand","Nigeria","North Korea","Norway","Oman","Pakistan","Papua New Guinea",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Saudi Arabia","Serbia","Singapore",
  "Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
  "Syria","Taiwan","Tanzania","Thailand","Tonga","Tunisia","Turkey","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const australianStates = [
  "Australian Capital Territory","New South Wales","Northern Territory",
  "Queensland","South Australia","Tasmania","Victoria","Western Australia",
];

const turnoverOptions = [
  "$0 to $74,999","$75,000 to $149,000","$150,000 to $1,999,999",
  "$2,000,000 to $9,999,999","$10,000,000 to $19,999,999","$20,000,000 and over",
];

const accountingOptions = [
  "Pre-order for a Xero Set Up Account",
  "Pre-order for a BAS Submission",
  "Pre-order for a Tax Return",
  "Payroll Solutions",
  "Affordable Bookkeeping Service",
  "Superannuation Services",
  "Consultation with a Tax Accountant",
];

const businessNameHelperText = `The form will not accept letters with accents such as à, é or ç.\n\nExample: Lisa wants to register "Lisa's Café". Although her name will need to be registered as "LISA'S CAFE", she can still use "Lisa's Café" on her marketing, signage, and receipts.\n\nPlease type and check your preferred Business Name so the system can instantly check availability.\n\nPlease do not register your domain name yet. Wait until you receive confirmation that your business name has been registered.`;

/* ───── form type ───── */
type FormData = {
  businessNameOption: string;
  newBusinessName: string;
  existingBusinessName: string;
  registrationPeriod: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  personalAddress: string;
  countryOfBirth: string;
  stateOfBirth: string;
  cityOfBirth: string;
  tfnOption: string;
  tfn: string;
  registerForGST: string;
  annualTurnover: string;
  gstLodgeFrequency: string;
  gstResultTiming: string;
  importGoods: string;
  gstStartDay: string;
  gstStartMonth: string;
  gstStartYear: string;
  accountingTasks: string[];
  acceptTerms: boolean;
  authoriseTaxAgent: boolean;
  confirmTrueInfo: boolean;
  authoriseASICAgent: boolean;
};

const initialForm: FormData = {
  businessNameOption: "",
  newBusinessName: "",
  existingBusinessName: "",
  registrationPeriod: "",
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phone: "",
  dobDay: "",
  dobMonth: "",
  dobYear: "",
  personalAddress: "",
  countryOfBirth: "",
  stateOfBirth: "",
  cityOfBirth: "",
  tfnOption: "",
  tfn: "",
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

/* ───── component ───── */
const BusinessNameRegistration = () => {
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const navigate = useNavigate();

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  }, []);

  const updateBoolean = useCallback((field: keyof FormData, value: boolean) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  }, []);

  const toggleTask = (task: string) => {
    setForm((p) => {
      const current = p.accountingTasks;
      return {
        ...p,
        accountingTasks: current.includes(task)
          ? current.filter((t) => t !== task)
          : [...current, task],
      };
    });
  };

  /* ── validate ── */
  const validate = (): boolean => {
    const e: Partial<Record<string, string>> = {};

    if (!form.businessNameOption) e.businessNameOption = "Please select an option";
    if (form.businessNameOption === "new" && !form.newBusinessName.trim()) e.newBusinessName = "Business name is required";
    if (form.businessNameOption === "renew" && !form.existingBusinessName.trim()) e.existingBusinessName = "Business name is required";
    if (!form.registrationPeriod) e.registrationPeriod = "Please select a registration period";
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
      if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y || y < 1900 || y > new Date().getFullYear())
        e.dobDay = "Invalid date of birth";
    }
    if (!form.personalAddress.trim()) e.personalAddress = "Personal address is required";
    if (!form.countryOfBirth) e.countryOfBirth = "Country of birth is required";
    if (!form.cityOfBirth.trim()) e.cityOfBirth = "City of birth is required";
    if (form.tfnOption === "now" && form.tfn && !/^\d{3}\s?\d{3}\s?\d{3}$/.test(form.tfn.trim()))
      e.tfn = "Invalid TFN format (e.g. 123 456 789)";
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
      navigate("/apply", { state: { service: "Business Name Registration", formData: form } });
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const today = new Date();
  const gstDay = form.gstStartDay || String(today.getDate());
  const gstMonth = form.gstStartMonth || String(today.getMonth() + 1).padStart(2, "0");
  const gstYear = form.gstStartYear || String(today.getFullYear());

  /* ── Radio helper ── */
  const Radio = ({ name, value, checked, onChange, label }: { name: string; value: string; checked: boolean; onChange: (v: string) => void; label: string }) => (
    <label className="flex cursor-pointer items-center gap-2.5">
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="h-4 w-4 accent-primary" />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16 rounded-none border-0">
        <div className="container px-4 border-secondary border-solid rounded-none">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">

              {/* ── Card Header ── */}
              <div className="px-6 pt-28 pb-2 md:pt-28 text-center md:px-[40px]">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Are you looking to set up your Business Name?</p>
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-4xl">Business Name Registration Form</h1>
                <p className="mt-3 text-primary text-lg font-medium">Register your Business Name in minutes</p>

                {/* Intro steps */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Easy Online Registration</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Secure Online Payment</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Email Notification</span>
                </div>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground py-[10px]">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-6 md:mx-10 border-t border-border my-[30px]" />

              {/* ── LINE 1 – Business Name Option ── */}
              <SectionWrapper title="Please select one of the options below">
                <div className="space-y-2.5">
                  <Radio name="businessNameOption" value="new" checked={form.businessNameOption === "new"} onChange={(v) => update("businessNameOption", v)} label="Register a NEW Business Name" />
                  <Radio name="businessNameOption" value="renew" checked={form.businessNameOption === "renew"} onChange={(v) => update("businessNameOption", v)} label="Renew my Business Name" />
                </div>
                <FieldError error={errors.businessNameOption} />

                {form.businessNameOption === "new" && (
                  <div className="mt-4">
                    <Label>Insert your Business Name <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.newBusinessName} onChange={(v) => update("newBusinessName", v)} placeholder="Your new business name" error={errors.newBusinessName} />
                    <FieldError error={errors.newBusinessName} />
                    <p className="mt-2 text-xs text-muted-foreground whitespace-pre-line">{businessNameHelperText}</p>
                  </div>
                )}

                {form.businessNameOption === "renew" && (
                  <div className="mt-4">
                    <Label>Existing Business Name <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.existingBusinessName} onChange={(v) => update("existingBusinessName", v)} placeholder="Your existing business name" error={errors.existingBusinessName} />
                    <FieldError error={errors.existingBusinessName} />
                    <p className="mt-2 text-xs text-muted-foreground whitespace-pre-line">{businessNameHelperText}</p>
                  </div>
                )}
              </SectionWrapper>

              {/* ── LINE 2 – Registration Period ── */}
              <SectionWrapper title="Please select the period of registration">
                <div className="space-y-2.5">
                  <Radio name="registrationPeriod" value="1year" checked={form.registrationPeriod === "1year"} onChange={(v) => update("registrationPeriod", v)} label="Business Name 1 year (+$119)" />
                  <Radio name="registrationPeriod" value="3years" checked={form.registrationPeriod === "3years"} onChange={(v) => update("registrationPeriod", v)} label="Business Name 3 years (+$199)" />
                </div>
                <FieldError error={errors.registrationPeriod} />
              </SectionWrapper>

              {/* ── LINE 3 – Applicant Name ── */}
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

              {/* ── LINE 4 – Email ── */}
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

              {/* ── LINE 5 – Phone & DOB ── */}
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
                        <SelectTrigger className="h-11 rounded-lg"><SelectValue placeholder="Month" /></SelectTrigger>
                        <SelectContent>{months.map((m, i) => <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>)}</SelectContent>
                      </Select>
                      <StyledInput value={form.dobYear} onChange={(v) => update("dobYear", v)} placeholder="YYYY" error={errors.dobDay} />
                    </div>
                    <FieldError error={errors.dobDay} />
                  </div>
                </div>
              </SectionWrapper>

              {/* ── LINE 6 – Address ── */}
              <SectionWrapper title="Personal (Home) Address">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Label>Personal (home) address <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.personalAddress} onChange={(v) => update("personalAddress", v)} placeholder="Start typing your address..." error={errors.personalAddress} />
                  </div>
                  {form.personalAddress && (
                    <Button type="button" variant="outline" size="sm" className="mb-0.5 gap-1 text-xs" onClick={() => update("personalAddress", "")}>
                      <X className="h-3 w-3" /> Clear address
                    </Button>
                  )}
                </div>
                <FieldError error={errors.personalAddress} />
                <div className="mt-2 space-y-1">
                  <HelperText>Type in the field above to search and select your address</HelperText>
                  <HelperText>This must be a street address. It cannot be a PO Box, RMB, RSD or other delivery point address. This address should match your proof of identity (POI) documents.</HelperText>
                  <HelperText>Please check the address above and edit the fields if required</HelperText>
                </div>
              </SectionWrapper>

              {/* ── LINE 7 – Birth Details ── */}
              <SectionWrapper title="Birth Details">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label>Country of Birth <span className="text-destructive">*</span></Label>
                    <Select value={form.countryOfBirth} onValueChange={(v) => update("countryOfBirth", v)}>
                      <SelectTrigger className="h-11 rounded-lg"><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>{countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                    <FieldError error={errors.countryOfBirth} />
                  </div>
                  <div>
                    <Label>State of Birth</Label>
                    <Select value={form.stateOfBirth} onValueChange={(v) => update("stateOfBirth", v)}>
                      <SelectTrigger className="h-11 rounded-lg"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>{australianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>City or Town of Birth <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.cityOfBirth} onChange={(v) => update("cityOfBirth", v)} placeholder="City or town" error={errors.cityOfBirth} />
                    <FieldError error={errors.cityOfBirth} />
                  </div>
                </div>
              </SectionWrapper>

              {/* ── LINE 8 – TFN ── */}
              <SectionWrapper title="Tax File Number (TFN), not mandatory but strongly recommended">
                <div className="space-y-2.5">
                  <Radio name="tfnOption" value="now" checked={form.tfnOption === "now"} onChange={(v) => update("tfnOption", v)} label="I can supply my TFN now" />
                  <Radio name="tfnOption" value="later" checked={form.tfnOption === "later"} onChange={(v) => update("tfnOption", v)} label="I will supply my TFN later" />
                </div>
                {form.tfnOption === "now" && (
                  <div className="mt-4">
                    <Label>Tax File Number (123 456 789)</Label>
                    <StyledInput value={form.tfn} onChange={(v) => update("tfn", v)} placeholder="123 456 789" error={errors.tfn} />
                    <FieldError error={errors.tfn} />
                    <HelperText>The TFN itself has 9 digits, with a check digit. Individuals receive a 9-digit TFN. Your Tax File Number (TFN) can be found on official Tax Office documents. We may contact you to provide your TFN if the ATO cannot verify your information, as a TFN is required for an ABN number to be issued.</HelperText>
                  </div>
                )}
              </SectionWrapper>

              {/* ── GST Details ── */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Goods and Services Tax (GST) Details</h2>
                  <p className="mt-1 text-sm text-muted-foreground">As a business owner, it is your responsibility to register for GST:</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span>if you want to claim fuel tax credits</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>if your turnover exceeds $75,000 or is likely to exceed it</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>if you provide taxi travel or rideshare services</li>
                  </ul>
                </div>

                <SectionWrapper title="Would you like to register for GST? (+$79)">
                  <div className="space-y-2.5">
                    <Radio name="registerForGST" value="yes" checked={form.registerForGST === "yes"} onChange={(v) => {
                      update("registerForGST", v);
                      if (!form.gstStartDay) { update("gstStartDay", String(today.getDate())); update("gstStartMonth", String(today.getMonth() + 1).padStart(2, "0")); update("gstStartYear", String(today.getFullYear())); }
                    }} label="Yes" />
                    <Radio name="registerForGST" value="no" checked={form.registerForGST === "no"} onChange={(v) => update("registerForGST", v)} label="No" />
                  </div>
                  <FieldError error={errors.registerForGST} />

                  {form.registerForGST === "yes" && (
                    <div className="mt-6 space-y-6">
                      {/* Turnover */}
                      <div>
                        <Label>Annual expected turnover of the company <span className="text-destructive">*</span></Label>
                        <Select value={form.annualTurnover} onValueChange={(v) => update("annualTurnover", v)}>
                          <SelectTrigger className="h-11 max-w-[500px] rounded-lg"><SelectValue placeholder="Select turnover range" /></SelectTrigger>
                          <SelectContent>{turnoverOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                        </Select>
                        <FieldError error={errors.annualTurnover} />
                      </div>

                      {/* Lodge frequency */}
                      <div>
                        <Label>How often will the company lodge GST? <span className="text-destructive">*</span></Label>
                        <div className="mt-2 space-y-2">
                          <Radio name="gstLodgeFrequency" value="annually" checked={form.gstLodgeFrequency === "annually"} onChange={(v) => update("gstLodgeFrequency", v)} label="Annually — only if turnover is less than $75,000" />
                          <Radio name="gstLodgeFrequency" value="quarterly" checked={form.gstLodgeFrequency === "quarterly"} onChange={(v) => update("gstLodgeFrequency", v)} label="Quarterly — if turnover is less than $20 million" />
                          <Radio name="gstLodgeFrequency" value="monthly" checked={form.gstLodgeFrequency === "monthly"} onChange={(v) => update("gstLodgeFrequency", v)} label="Monthly — if turnover is $20 million or more" />
                        </div>
                        <FieldError error={errors.gstLodgeFrequency} />
                      </div>

                      {/* Result timing */}
                      <div>
                        <Label>When will you send GST results to the ATO? <span className="text-destructive">*</span></Label>
                        <div className="mt-2 space-y-2">
                          <Radio name="gstResultTiming" value="cash" checked={form.gstResultTiming === "cash"} onChange={(v) => update("gstResultTiming", v)} label="When I receive the cash" />
                          <Radio name="gstResultTiming" value="invoice" checked={form.gstResultTiming === "invoice"} onChange={(v) => update("gstResultTiming", v)} label="When I issue the invoice" />
                        </div>
                        <FieldError error={errors.gstResultTiming} />
                      </div>

                      {/* Import */}
                      <div>
                        <Label>Do you import goods and services into Australia? <span className="text-destructive">*</span></Label>
                        <div className="mt-2 space-y-2">
                          <Radio name="importGoods" value="yes" checked={form.importGoods === "yes"} onChange={(v) => update("importGoods", v)} label="Yes" />
                          <Radio name="importGoods" value="no" checked={form.importGoods === "no"} onChange={(v) => update("importGoods", v)} label="No" />
                        </div>
                        <FieldError error={errors.importGoods} />
                      </div>

                      {/* GST Start Date */}
                      <div>
                        <Label>Start Date for GST Registration <span className="text-destructive">*</span></Label>
                        <div className="mt-1 grid max-w-[500px] grid-cols-3 gap-3">
                          <StyledInput value={form.gstStartDay} onChange={(v) => update("gstStartDay", v)} placeholder="DD" error={errors.gstStartDay} />
                          <Select value={form.gstStartMonth} onValueChange={(v) => update("gstStartMonth", v)}>
                            <SelectTrigger className="h-11 rounded-lg"><SelectValue placeholder="Month" /></SelectTrigger>
                            <SelectContent>{months.map((m, i) => <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>)}</SelectContent>
                          </Select>
                          <StyledInput value={form.gstStartYear} onChange={(v) => update("gstStartYear", v)} placeholder="YYYY" error={errors.gstStartDay} />
                        </div>
                        <FieldError error={errors.gstStartDay} />
                        <div className="mt-2 space-y-1">
                          <HelperText>If the GST registration is backdated by more than 21 days, penalties may apply.</HelperText>
                          <HelperText>If your ABN is registered with a specific date, the GST date cannot be later than the ABN registration date.</HelperText>
                        </div>
                      </div>
                    </div>
                  )}
                </SectionWrapper>
              </div>

              {/* ── Accounting Tasks ── */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7 [&>*]:mx-auto [&>*]:max-w-[570px]">
                  <h2 className="text-lg font-bold text-foreground">Accounting tasks we can help you with</h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">We also offer support across a variety of accounting functions and tasks. Our professionals are CPA and CA accredited.</p>
                </div>
                <SectionWrapper>
                  <Label className="text-sm font-medium">Please select any accounting task you may need ($49 pack)</Label>
                  <div className="mt-3 space-y-2.5">
                    {accountingOptions.map((task) => (
                      <label key={task} className="flex cursor-pointer items-center gap-2.5">
                        <Checkbox checked={form.accountingTasks.includes(task)} onCheckedChange={() => toggleTask(task)} />
                        <span className="text-sm text-foreground">{task}</span>
                      </label>
                    ))}
                  </div>
                </SectionWrapper>
              </div>

              {/* ── What is next ── */}
              <div className="border-t border-border">
                <SectionWrapper title="What is next?">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span>Checked services will be charged at the end of this application</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>After payment, one of our team members will contact you within 48 hours for a free consultation</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>You will be informed about the process and final price, which may vary depending on your needs</li>
                  </ul>
                </SectionWrapper>
              </div>

              {/* ── What happens after submit ── */}
              <div className="border-t border-border">
                <div className="bg-[hsl(var(--primary)/0.03)] px-6 py-8 md:px-10">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">What happens after you submit your application</h3>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: ClipboardCheck, title: "Application Review", text: "Our accredited professionals review your application to ensure the information is accurate and compliant before lodgement." },
                      { icon: Send, title: "Secure Lodgement", text: "Once reviewed, your application is securely lodged for processing." },
                      { icon: Mail, title: "Email Confirmation", text: "You will receive a confirmation email once your registration has been processed." },
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

              {/* ── Declarations ── */}
              <div className="border-t border-border">
                <SectionWrapper title="Terms and Conditions of Service">
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox checked={form.acceptTerms} onCheckedChange={(c) => updateBoolean("acceptTerms", !!c)} className="mt-0.5" />
                      <span className="text-sm text-foreground">I have read and accept the <a href="#" className="text-primary hover:underline">Terms & Service</a> of use. <span className="text-destructive">*</span></span>
                    </label>
                    <FieldError error={errors.acceptTerms} />

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox checked={form.authoriseTaxAgent} onCheckedChange={(c) => updateBoolean("authoriseTaxAgent", !!c)} className="mt-0.5" />
                      <span className="text-sm text-foreground">I authorise an Accredited Tax Agent under licence number 24666831 to add me (if required) to their tax agent portal to proceed with this request. <span className="text-destructive">*</span></span>
                    </label>
                    <FieldError error={errors.authoriseTaxAgent} />

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox checked={form.confirmTrueInfo} onCheckedChange={(c) => updateBoolean("confirmTrueInfo", !!c)} className="mt-0.5" />
                      <span className="text-sm text-foreground">The information provided in this application is true and correct. <span className="text-destructive">*</span></span>
                    </label>
                    <FieldError error={errors.confirmTrueInfo} />

                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox checked={form.authoriseASICAgent} onCheckedChange={(c) => updateBoolean("authoriseASICAgent", !!c)} className="mt-0.5" />
                      <span className="text-sm text-foreground">I understand that ASIC does not permit changes to a registered business name. I confirm that my business name is correctly spelled and grammatically accurate. I authorise an Accredited ASIC Agent (License No. 35090) to add me to their ASIC agent portal if required to manage ASIC matters and lodge the business name. <span className="text-destructive">*</span></span>
                    </label>
                    <FieldError error={errors.authoriseASICAgent} />
                  </div>
                </SectionWrapper>
              </div>

              {/* ── Submit ── */}
              <div className="border-t border-border px-6 pt-6 md:px-8 md:pt-8 text-center">
                <Button variant="hero" size="lg" className="mx-auto gap-2 h-14 text-base px-12" onClick={handleSubmit}>
                  Lodge my ABN application
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <div className="h-28" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BusinessNameRegistration;
