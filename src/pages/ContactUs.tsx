import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import { SectionWrapper, StyledInput, FieldError } from "@/components/abn-registration/FormField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Shield, Lock, CheckCircle2, ArrowRight, ClipboardCheck, Send, Mail, ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  reason: string;
  otherReason: string;
  subject: string;
  message: string;
  abn: string;
  businessName: string;
  preferredContact: string;
  acceptTerms: boolean;
  consentContact: boolean;
};

const initialForm: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  phone: "",
  reason: "",
  otherReason: "",
  subject: "",
  message: "",
  abn: "",
  businessName: "",
  preferredContact: "",
  acceptTerms: false,
  consentContact: false,
};

const reasonOptions = [
  "General Enquiry",
  "ABN Registration",
  "ABN Reactivation",
  "ABN Details Update",
  "Business Name Registration",
  "Business Name Renewal",
  "GST Registration",
  "GST Cancellation",
  "ABN Cancellation",
  "Business Name Cancellation",
  "Other",
];

const ContactUs = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const updateBoolean = (field: keyof ContactFormData, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<string, string>> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.confirmEmail.trim()) e.confirmEmail = "Please confirm your email";
    else if (form.email !== form.confirmEmail) e.confirmEmail = "Emails do not match";
    if (!form.reason) e.reason = "Please select a reason";
    if (form.reason === "Other" && !form.otherReason.trim()) e.otherReason = "Please specify your enquiry";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    if (!form.acceptTerms) e.acceptTerms = "You must accept the terms";
    if (!form.consentContact) e.consentContact = "You must consent to being contacted";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const firstKey = Object.keys(e)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    navigate("/apply", { state: { service: "Contact Us Enquiry", formData: form } });
  };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16 rounded-none border-0">
        <div className="container px-4 border-secondary border-solid rounded-none">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header */}
              <div className="px-6 pt-28 pb-2 md:pt-28 text-center md:px-[40px]">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-4xl">
                  Contact Us
                </h1>
                <p className="mt-2 text-primary my-[13px] text-lg font-medium pt-[20px] pb-0 mx-[96px]">
                  Professional assistance for business registration and compliance services
                </p>
                <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground text-base mx-auto my-[10px] mb-[11px]">
                  If you have any questions regarding our services or your application, please contact our team using the form below. We will be pleased to assist you.
                </p>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground my-[20px] py-[10px]">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure &amp; Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-6 md:mx-10 border-t border-border my-[30px]" />

              {/* Intro text */}
              <SectionWrapper>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our team specialises in Australian business registration and compliance services. Whether you require assistance with an ABN, Business Name, GST registration, or updates to your existing details, we are here to help.
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">You can contact us regarding:</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="text-primary">•</span>ABN Registration &amp; Reactivation</li>
                  <li className="flex gap-2"><span className="text-primary">•</span>ABN Details Updates</li>
                  <li className="flex gap-2"><span className="text-primary">•</span>Business Name Registration &amp; Renewal</li>
                  <li className="flex gap-2"><span className="text-primary">•</span>GST Registration &amp; Cancellation</li>
                  <li className="flex gap-2"><span className="text-primary">•</span>ABN &amp; Business Name Cancellation</li>
                </ul>
              </SectionWrapper>

              {/* Separator before form */}
              <div className="mx-6 md:mx-10 border-t border-border my-[10px]" />

              {/* Contact Form */}
              <SectionWrapper title="Contact Form">
                {/* Line 1: Names */}
                <div className="grid gap-4 sm:grid-cols-2" id="firstName">
                  <div>
                    <Label>First Name <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="First name" error={errors.firstName} />
                    <FieldError error={errors.firstName} />
                  </div>
                  <div id="lastName">
                    <Label>Last Name <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="Last name" error={errors.lastName} />
                    <FieldError error={errors.lastName} />
                  </div>
                </div>

                {/* Line 2: Emails */}
                <div className="mt-4 grid gap-4 sm:grid-cols-2" id="email">
                  <div>
                    <Label>Email Address <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.email} onChange={(v) => update("email", v)} placeholder="your@email.com" type="email" error={errors.email} />
                    <FieldError error={errors.email} />
                  </div>
                  <div id="confirmEmail">
                    <Label>Confirmation Email <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.confirmEmail} onChange={(v) => update("confirmEmail", v)} placeholder="Confirm your email" type="email" error={errors.confirmEmail} />
                    <FieldError error={errors.confirmEmail} />
                  </div>
                </div>

                {/* Line 3: Phone */}
                <div className="mt-4" id="phone">
                  <Label>Mobile Phone Number <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <StyledInput value={form.phone} onChange={(v) => update("phone", v)} placeholder="04XX XXX XXX" />
                </div>

                {/* Line 4: Reason */}
                <div className="mt-4" id="reason">
                  <Label>Reason for Enquiry <span className="text-destructive">*</span></Label>
                  <Select value={form.reason} onValueChange={(v) => update("reason", v)}>
                    <SelectTrigger className={`h-11 max-w-[500px] rounded-lg ${errors.reason ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasonOptions.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError error={errors.reason} />
                </div>

                {/* Conditional: Other reason */}
                {form.reason === "Other" && (
                  <div className="mt-4" id="otherReason">
                    <Label>Please specify your enquiry <span className="text-destructive">*</span></Label>
                    <StyledInput value={form.otherReason} onChange={(v) => update("otherReason", v)} placeholder="Please describe your enquiry" error={errors.otherReason} />
                    <FieldError error={errors.otherReason} />
                  </div>
                )}

                {/* Line 5: Subject */}
                <div className="mt-4" id="subject">
                  <Label>Subject <span className="text-destructive">*</span></Label>
                  <StyledInput value={form.subject} onChange={(v) => update("subject", v)} placeholder="Subject of your enquiry" error={errors.subject} />
                  <FieldError error={errors.subject} />
                </div>

                {/* Line 6: Message */}
                <div className="mt-4" id="message">
                  <Label>Message <span className="text-destructive">*</span></Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Please describe your enquiry in detail..."
                    className={`min-h-[160px] max-w-[500px] rounded-lg ${errors.message ? "border-destructive" : ""}`}
                  />
                  <FieldError error={errors.message} />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Please provide as much detail as possible so our team can assist you efficiently.
                  </p>
                </div>
              </SectionWrapper>

              {/* Additional Details */}
              <div className="border-t border-border">
                <SectionWrapper title="Additional Details (optional)">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>ABN</Label>
                      <StyledInput value={form.abn} onChange={(v) => update("abn", v)} placeholder="e.g. 12 345 678 901" />
                    </div>
                    <div>
                      <Label>Business Name</Label>
                      <StyledInput value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Your business name" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Preferred Contact Method</Label>
                    <Select value={form.preferredContact} onValueChange={(v) => update("preferredContact", v)}>
                      <SelectTrigger className="h-11 max-w-[500px] rounded-lg">
                        <SelectValue placeholder="Select preferred method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </SectionWrapper>
              </div>

              {/* What happens after you contact us */}
              <div className="border-t border-border">
                <div className="bg-[#F7F9FE] px-6 py-8 md:px-10">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">
                      What happens after you contact us
                    </h3>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: ClipboardCheck, title: "Message Received", text: "Your enquiry will be received securely by our team." },
                      { icon: Send, title: "Expert Review", text: "A member of our team will review your message and direct it to the appropriate department." },
                      { icon: Mail, title: "Response by Email", text: "We will respond to your enquiry as soon as possible, typically within the next business day." },
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
                    <span className="font-bold text-foreground">Your enquiry is securely received and reviewed by our professional support team.</span>
                  </div>
                </div>
              </div>

              {/* Declarations */}
              <div className="border-t border-border">
                <SectionWrapper title="Terms and Conditions of Service">
                  <div className="space-y-4">
                    <label className="flex cursor-pointer items-start gap-3" id="acceptTerms">
                      <Checkbox
                        checked={form.acceptTerms}
                        onCheckedChange={(checked) => updateBoolean("acceptTerms", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I have read and accept the <a href="#" className="text-primary hover:underline">Terms &amp; Service</a> of use. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.acceptTerms} />

                    <label className="flex cursor-pointer items-start gap-3" id="consentContact">
                      <Checkbox
                        checked={form.consentContact}
                        onCheckedChange={(checked) => updateBoolean("consentContact", !!checked)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground">
                        I consent to being contacted regarding my enquiry. <span className="text-destructive">*</span>
                      </span>
                    </label>
                    <FieldError error={errors.consentContact} />
                  </div>
                </SectionWrapper>
              </div>

              {/* Submit */}
              <div className="border-t border-border p-6 md:p-8 pb-[3cm] text-center">
                <Button
                  variant="hero"
                  size="lg"
                  className="mx-auto gap-2 h-14 text-base px-12"
                  onClick={handleSubmit}
                >
                  Send Enquiry
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
