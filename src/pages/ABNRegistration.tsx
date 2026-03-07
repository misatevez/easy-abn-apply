import { useState, useCallback, useMemo } from "react";
import Layout from "@/components/Layout";
import ABNRegistrationBanner from "@/components/abn-registration/ABNRegistrationBanner";
import ABNRegistrationProgress from "@/components/abn-registration/ABNRegistrationProgress";
import ApplicantNameSection from "@/components/abn-registration/ApplicantNameSection";
import EmailSection from "@/components/abn-registration/EmailSection";
import PhoneSection from "@/components/abn-registration/PhoneSection";
import DateOfBirthSection from "@/components/abn-registration/DateOfBirthSection";
import TFNSection from "@/components/abn-registration/TFNSection";
import ABNPurposeSection from "@/components/abn-registration/ABNPurposeSection";
import BusinessActivitySection from "@/components/abn-registration/BusinessActivitySection";
import AddressSection from "@/components/abn-registration/AddressSection";
import ReasonSection from "@/components/abn-registration/ReasonSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, CheckCircle2 } from "lucide-react";
import type { ABNFormData } from "@/components/abn-registration/types";
import { useNavigate } from "react-router-dom";

const TOTAL_SECTIONS = 9;

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
};

const ABNRegistration = () => {
  const [form, setForm] = useState<ABNFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ABNFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const update = useCallback((field: keyof ABNFormData, value: string) => {
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
    return count;
  }, [form]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ABNFormData, string>> = {};

    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.confirmEmail.trim()) newErrors.confirmEmail = "Please confirm your email";
    else if (form.email !== form.confirmEmail) newErrors.confirmEmail = "Emails do not match";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s+()-]{8,15}$/.test(form.phone)) newErrors.phone = "Invalid phone number";
    if (!form.dobDay || !form.dobMonth || !form.dobYear) newErrors.dobDay = "Date of birth is required";
    else {
      const d = parseInt(form.dobDay), m = parseInt(form.dobMonth), y = parseInt(form.dobYear);
      const date = new Date(y, m - 1, d);
      if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y || y < 1900 || y > new Date().getFullYear()) {
        newErrors.dobDay = "Invalid date of birth";
      }
    }
    if (!form.abnPurpose) newErrors.abnPurpose = "Please select a registration purpose";
    if (form.abnPurpose === "new" && (!form.abnStartDay || !form.abnStartMonth || !form.abnStartYear)) {
      newErrors.abnStartDay = "Start date is required";
    }
    if (!form.businessActivity.trim()) newErrors.businessActivity = "Business activity is required";
    if (!form.personalAddress.trim()) newErrors.personalAddress = "Personal address is required";
    if (!form.applyingReason) newErrors.applyingReason = "Please select a reason";

    if (form.tfnOption === "now" && form.tfn && !/^\d{3}\s?\d{3}\s?\d{3}$/.test(form.tfn.trim())) {
      newErrors.tfn = "Invalid TFN format (e.g. 123 456 789)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (validate()) {
      navigate("/apply", { state: { service: "ABN Registration", formData: form } });
    }
  };

  return (
    <Layout>
      <ABNRegistrationBanner />

      <section className="bg-background py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <ABNRegistrationProgress completed={completedSections} total={TOTAL_SECTIONS} />

            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="space-y-0 divide-y divide-border">
                <ApplicantNameSection form={form} errors={errors} update={update} />
                <EmailSection form={form} errors={errors} update={update} />
                <PhoneSection form={form} errors={errors} update={update} />
                <DateOfBirthSection form={form} errors={errors} update={update} />
                <TFNSection form={form} errors={errors} update={update} />
                <ABNPurposeSection form={form} errors={errors} update={update} />
                <BusinessActivitySection form={form} errors={errors} update={update} />
                <AddressSection form={form} errors={errors} update={update} />
                <ReasonSection form={form} errors={errors} update={update} />
              </div>

              {/* Submit */}
              <div className="border-t border-border p-6 md:p-8">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full gap-2 h-14 text-base"
                  onClick={handleSubmit}
                >
                  Continue to Checkout
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

export default ABNRegistration;
