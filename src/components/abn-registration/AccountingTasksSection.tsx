import { SectionWrapper } from "./FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileText, Zap, Mail } from "lucide-react";
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

      {/* What happens next? */}
      <SectionWrapper>
        <h3 className="text-sm font-semibold text-foreground">What happens next?</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          After submitting your application, our team will review your details and process your ABN registration.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="flex items-start gap-2.5 rounded-lg bg-muted/40 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <FileText className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Instant ABN Display</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">Your ABN will appear on screen once issued.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg bg-muted/40 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Fast Processing</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">Your application is securely submitted to the Australian Business Register.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg bg-muted/40 p-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Mail className="h-3.5 w-3.5 text-primary" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground">Email Confirmation</h4>
              <p className="mt-0.5 text-xs text-muted-foreground">A copy of your ABN will also be sent to your email address.</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default AccountingTasksSection;
