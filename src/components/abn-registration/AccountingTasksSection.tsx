import { SectionWrapper } from "./FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ClipboardCheck, Globe, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import type { SectionProps } from "./types";

const accountingOptions = [
  "Pre-order for a Xero Set up Account",
  "Pre-order for a BAS Submission (Business Activity Statement)",
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
    text: "Our accredited tax professionals review your application to ensure the information is accurate and compliant before submission.",
  },
  {
    icon: Globe,
    title: "ABN Issued",
    text: "Once approved, your Australian Business Number (ABN) will appear on screen confirming your registration.",
  },
  {
    icon: Mail,
    title: "Email Confirmation",
    text: "A confirmation email containing your ABN and registration details will be sent to the email address you provided.",
  },
];

const flowSteps = ["Submit Application", "Review", "ABN Issued", "Confirmation Email"];

const AccountingTasksSection = ({ form, updateArray }: SectionProps) => {
  const toggleTask = (task: string) => {
    const current = form.accountingTasks || [];
    const updated = current.includes(task)
      ? current.filter((t) => t !== task)
      : [...current, task];
    updateArray?.("accountingTasks", updated);
  };

  return (
    <>
      <SectionWrapper>
        <Label className="text-sm font-medium">
          Please select any accounting task you may need ($49 pack)
        </Label>
        <div className="mt-3 space-y-2.5">
          {accountingOptions.map((task) => (
            <label key={task} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={form.accountingTasks?.includes(task)}
                onCheckedChange={() => toggleTask(task)}
              />
              <span className="text-sm text-foreground">{task}</span>
            </label>
          ))}
        </div>
      </SectionWrapper>

      {/* What happens after you submit */}
      <SectionWrapper>
        <div className="text-center">
          <h3 className="text-base font-bold text-foreground">
            What happens after you submit your application
          </h3>
          <p className="mt-1.5 mx-auto max-w-md text-sm text-muted-foreground">
            Once you lodge your application, our team reviews your details and securely processes your ABN registration.
          </p>
        </div>

        {/* Flow indicator */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
          {flowSteps.map((step, i) => (
            <span key={step} className="flex items-center gap-1.5">
              <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{step}</span>
              {i < flowSteps.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground/50" />}
            </span>
          ))}
        </div>

        {/* 3-step cards */}
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

        {/* Trust line */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Your application is securely processed and reviewed by an Accredited Tax Agent.</span>
        </div>
      </SectionWrapper>
    </>
  );
};

export default AccountingTasksSection;
