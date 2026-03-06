import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const STEPS = ["Personal Details", "Business Details", "Address", "Additional", "Review & Pay"];

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  businessStructure: string;
  businessActivity: string;
  startDate: string;
  residentialAddress: string;
  businessAddress: string;
  registerBusinessName: boolean;
  registerGST: boolean;
  applyTFN: boolean;
};

const initialForm: FormData = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  businessStructure: "sole-trader",
  businessActivity: "",
  startDate: "",
  residentialAddress: "",
  businessAddress: "",
  registerBusinessName: false,
  registerGST: false,
  applyTFN: false,
};

const structures = [
  { value: "sole-trader", label: "Sole Trader" },
  { value: "company", label: "Company" },
  { value: "partnership", label: "Partnership" },
  { value: "trust", label: "Trust" },
];

const Apply = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <Layout>
      <div className="container py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold text-foreground">ABN Application</h1>
          <p className="mb-8 text-muted-foreground">Complete the form below to start your registration.</p>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {STEPS.map((label, i) => (
                <div key={label} className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      i < step
                        ? "bg-accent text-accent-foreground"
                        : i === step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                  </div>
                  <span className="mt-1 hidden text-xs text-muted-foreground sm:block">{label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground">Personal Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="04XX XXX XXX" />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground">Business Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Business Structure</Label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {structures.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => update("businessStructure", s.value)}
                          className={`rounded-lg border p-3 text-sm font-medium transition-colors ${
                            form.businessStructure === s.value
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border text-foreground hover:border-primary/30"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessActivity">Business Activity</Label>
                    <Input id="businessActivity" value={form.businessActivity} onChange={(e) => update("businessActivity", e.target.value)} placeholder="e.g. Web Development, Consulting" />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Business Start Date</Label>
                    <Input id="startDate" type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground">Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="residentialAddress">Residential Address</Label>
                    <Input id="residentialAddress" value={form.residentialAddress} onChange={(e) => update("residentialAddress", e.target.value)} placeholder="123 Main St, Sydney NSW 2000" />
                  </div>
                  <div>
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Input id="businessAddress" value={form.businessAddress} onChange={(e) => update("businessAddress", e.target.value)} placeholder="Same as residential or enter business address" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground">Additional Registrations</h2>
                <p className="text-sm text-muted-foreground">Select any additional registrations you need.</p>
                <div className="space-y-4">
                  {[
                    { id: "registerBusinessName" as const, label: "Register Business Name", desc: "Register a business name with ASIC (+$99)" },
                    { id: "registerGST" as const, label: "Register for GST", desc: "Required if turnover exceeds $75,000/year (+$39)" },
                    { id: "applyTFN" as const, label: "Apply for TFN", desc: "Apply for a Tax File Number (+$29)" },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        form[item.id] ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <Checkbox
                        checked={form[item.id] as boolean}
                        onCheckedChange={(v) => update(item.id, !!v)}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-foreground">Review & Payment</h2>
                <div className="space-y-3 rounded-lg border border-border bg-background p-5">
                  <Row label="Full Name" value={form.fullName} />
                  <Row label="Email" value={form.email} />
                  <Row label="Phone" value={form.phone} />
                  <Row label="Date of Birth" value={form.dob} />
                  <div className="my-2 border-t border-border" />
                  <Row label="Business Structure" value={structures.find((s) => s.value === form.businessStructure)?.label || ""} />
                  <Row label="Business Activity" value={form.businessActivity} />
                  <Row label="Start Date" value={form.startDate} />
                  <div className="my-2 border-t border-border" />
                  <Row label="Residential Address" value={form.residentialAddress} />
                  <Row label="Business Address" value={form.businessAddress} />
                  <div className="my-2 border-t border-border" />
                  <Row label="Business Name" value={form.registerBusinessName ? "Yes" : "No"} />
                  <Row label="GST Registration" value={form.registerGST ? "Yes" : "No"} />
                  <Row label="TFN Application" value={form.applyTFN ? "Yes" : "No"} />
                </div>

                <div className="rounded-lg border border-border bg-primary/5 p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${calculateTotal(form)}
                    </span>
                  </div>
                </div>

                <Button variant="success" size="lg" className="w-full gap-2" onClick={() => alert("Payment integration placeholder – connect Stripe to process payments.")}>
                  Proceed to Payment
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}

            {/* Navigation */}
            {step < 4 && (
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={prev} disabled={step === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button variant="hero" onClick={next}>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            {step === 4 && (
              <div className="mt-4">
                <Button variant="outline" onClick={prev}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-foreground">{value || "—"}</span>
  </div>
);

const calculateTotal = (form: FormData) => {
  let total = 49; // Base ABN
  if (form.registerBusinessName) total += 99;
  if (form.registerGST) total += 39;
  if (form.applyTFN) total += 29;
  return total;
};

export default Apply;
