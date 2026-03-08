import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Lock,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Send,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
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
}

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

const enquiryReasons = [
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
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const update = useCallback((field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const updateBoolean = useCallback((field: keyof ContactFormData, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

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
    if (!form.acceptTerms) e.acceptTerms = "You must accept the Terms & Service";
    if (!form.consentContact) e.consentContact = "This consent is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      toast({
        title: "Enquiry Sent",
        description: "Thank you for contacting us. We will respond within the next business day.",
      });
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.querySelector(`[name="${firstErrorKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const FieldError = ({ error }: { error?: string }) =>
    error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null;

  if (submitted) {
    return (
      <Layout>
        <ABNRegistrationBanner />
        <section className="relative bg-muted/30 pb-12 md:pb-16">
          <div className="container px-4">
            <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
              <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
                <div className="px-6 pt-28 pb-16 md:pt-28 text-center md:px-10">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-primary mb-6" />
                  <h1 className="text-2xl font-extrabold text-foreground md:text-4xl">
                    Thank You for Your Enquiry
                  </h1>
                  <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                    Your message has been received. A member of our team will review your enquiry and respond within the next business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="relative bg-muted/30 pb-12 md:pb-16">
        <div className="container px-4">
          <div className="mx-auto max-w-[1100px] -mt-36 md:-mt-44">
            <div className="rounded-2xl bg-card shadow-xl shadow-primary/[0.08] ring-1 ring-border/50">
              {/* Header */}
              <div className="px-6 pt-28 pb-2 md:pt-28 text-center md:px-[40px]">
                <h1 className="text-2xl font-extrabold leading-tight text-foreground md:text-4xl">
                  Contact Us
                </h1>
                <p className="mt-2 text-primary text-lg font-medium pt-5 pb-0 mx-auto max-w-lg">
                  Professional assistance for business registration and compliance services
                </p>
                <p className="mt-2 max-w-lg leading-relaxed text-muted-foreground text-base mx-auto my-2.5">
                  If you have any questions regarding our services or your application, please contact our team using the form below. We will be pleased to assist you.
                </p>

                {/* Trust Labels */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground my-5 py-2.5">
                  <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> Secure & Encrypted</span>
                  <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> SSL Protected</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Expert Reviewed</span>
                </div>
              </div>

              {/* Separator */}
              <div className="mx-6 md:mx-10 border-t border-border my-8" />

              {/* Intro text */}
              <div className="px-6 md:px-8">
                <div className="mx-auto max-w-[570px]">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Our team specialises in Australian business registration and compliance services. Whether you require assistance with an ABN, Business Name, GST registration, or updates to your existing details, we are here to help.
                  </p>
                  <p className="mt-4 text-sm font-semibold text-foreground">
                    You can contact us regarding:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-primary">•</span>ABN Registration & Reactivation</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>ABN Details Updates</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>Business Name Registration & Renewal</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>GST Registration & Cancellation</li>
                    <li className="flex gap-2"><span className="text-primary">•</span>ABN & Business Name Cancellation</li>
                  </ul>
                </div>
              </div>

              {/* Separator before form */}
              <div className="mx-6 md:mx-10 border-t border-border my-8" />

              {/* Contact Form */}
              <div className="px-6 py-4 md:px-8 md:py-5">
                <div className="mx-auto max-w-[570px]">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Your Details</h3>

                  {/* Name */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>First Name <span className="text-destructive">*</span></Label>
                      <Input
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        placeholder="First Name"
                        className={`h-11 max-w-[500px] rounded-lg ${errors.firstName ? "border-destructive" : ""}`}
                      />
                      <FieldError error={errors.firstName} />
                    </div>
                    <div>
                      <Label>Last Name <span className="text-destructive">*</span></Label>
                      <Input
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        placeholder="Last Name"
                        className={`h-11 max-w-[500px] rounded-lg ${errors.lastName ? "border-destructive" : ""}`}
                      />
                      <FieldError error={errors.lastName} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="px-6 py-4 md:px-8 md:py-5">
                <div className="mx-auto max-w-[570px]">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Email</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Email Address <span className="text-destructive">*</span></Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="your@email.com"
                        className={`h-11 max-w-[500px] rounded-lg ${errors.email ? "border-destructive" : ""}`}
                      />
                      <FieldError error={errors.email} />
                    </div>
                    <div>
                      <Label>Confirmation Email <span className="text-destructive">*</span></Label>
                      <Input
                        type="email"
                        value={form.confirmEmail}
                        onChange={(e) => update("confirmEmail", e.target.value)}
                        placeholder="Confirm your email"
                        className={`h-11 max-w-[500px] rounded-lg ${errors.confirmEmail ? "border-destructive" : ""}`}
                      />
                      <FieldError error={errors.confirmEmail} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="px-6 py-4 md:px-8 md:py-5">
                <div className="mx-auto max-w-[570px]">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Phone</h3>
                  <div>
                    <Label>Mobile Phone Number (optional)</Label>
                    <Input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="e.g. 04XX XXX XXX"
                      className="h-11 max-w-[500px] rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Reason for enquiry */}
              <div className="px-6 py-4 md:px-8 md:py-5">
                <div className="mx-auto max-w-[570px]">
                  <h3 className="mb-4 text-base font-semibold text-foreground">Enquiry Details</h3>
                  <div>
                    <Label>Reason for enquiry <span className="text-destructive">*</span></Label>
                    <Select value={form.reason} onValueChange={(v) => update("reason", v)}>
                      <SelectTrigger className={`h-11 max-w-[500px] rounded-lg ${errors.reason ? "border-destructive" : ""}`}>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        {enquiryReasons.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError error={errors.reason} />
                  </div>

                  {/* Conditional: Other */}
                  {form.reason === "Other" && (
                    <div className="mt-4">
                      <Label>Please specify your enquiry <span className="text-destructive">*</span></Label>
                      <Input
                        value={form.otherReason}
                        onChange={(e) => update("otherReason", e.target.value)}
                        placeholder="Please describe your enquiry"
                        className={`h-11 max-w-[500px] rounded-lg ${errors.otherReason ? "border-destructive" : ""}`}
                      />
                      <FieldError error={errors.otherReason} />
                    </div>
                  )}

                  {/* Subject */}
                  <div className="mt-4">
                    <Label>Subject <span className="text-destructive">*</span></Label>
                    <Input
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      placeholder="Subject of your enquiry"
                      className={`h-11 max-w-[500px] rounded-lg ${errors.subject ? "border-destructive" : ""}`}
                    />
                    <FieldError error={errors.subject} />
                  </div>

                  {/* Message */}
                  <div className="mt-4">
                    <Label>Message <span className="text-destructive">*</span></Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Please describe your enquiry in detail..."
                      rows={6}
                      className={`max-w-[500px] rounded-lg resize-y ${errors.message ? "border-destructive" : ""}`}
                    />
                    <FieldError error={errors.message} />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Please provide as much detail as possible so our team can assist you efficiently.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="border-t border-border">
                <div className="px-6 pt-6 md:px-8 md:pt-7">
                  <div className="mx-auto max-w-[570px]">
                    <h2 className="text-lg font-bold text-foreground">Additional Details (optional)</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Providing these details can help us assist you faster.
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 md:px-8 md:py-5">
                  <div className="mx-auto max-w-[570px] space-y-4">
                    <div>
                      <Label>ABN</Label>
                      <Input
                        value={form.abn}
                        onChange={(e) => update("abn", e.target.value)}
                        placeholder="e.g. 12 345 678 901"
                        className="h-11 max-w-[500px] rounded-lg"
                      />
                    </div>
                    <div>
                      <Label>Business Name</Label>
                      <Input
                        value={form.businessName}
                        onChange={(e) => update("businessName", e.target.value)}
                        placeholder="Your business name"
                        className="h-11 max-w-[500px] rounded-lg"
                      />
                    </div>
                    <div>
                      <Label>Preferred contact method</Label>
                      <Select value={form.preferredContact} onValueChange={(v) => update("preferredContact", v)}>
                        <SelectTrigger className="h-11 max-w-[500px] rounded-lg">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="border-t border-border">
                <div className="bg-[#F7F9FE] px-6 py-8 md:px-10">
                  <div className="text-center">
                    <h3 className="text-base font-bold text-foreground">
                      What happens after you contact us
                    </h3>
                    <p className="mt-1.5 mx-auto max-w-md text-sm text-muted-foreground">
                      After submitting your enquiry, our team will review your message and respond promptly.
                    </p>
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
                <div className="px-6 py-4 md:px-8 md:py-5">
                  <div className="mx-auto max-w-[570px]">
                    <h3 className="mb-4 text-base font-semibold text-foreground">Terms and Conditions of Service</h3>
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
                >
                  Send Enquiry
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

export default ContactUs;
