import { SectionWrapper, FieldError } from "./FormField";
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

const AccountingTasksSection = ({ form, errors, updateArray }: SectionProps) => {
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
        <div className="mt-3 space-y-3">
          {accountingOptions.map((task) => (
            <label
              key={task}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                form.accountingTasks?.includes(task) ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}
            >
              <Checkbox
                checked={form.accountingTasks?.includes(task)}
                onCheckedChange={() => toggleTask(task)}
              />
              <span className="text-sm text-foreground">{task}</span>
            </label>
          ))}
        </div>
      </SectionWrapper>

      {/* What is next? */}
      <SectionWrapper>
        <h3 className="text-base font-semibold text-foreground">What is next?</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            Checked services will be charged at the end of this application.
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            After completing payment one of our team members will contact you within 48 hours for a free consultation.
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span>
            You will be informed about the process and final price which may vary depending on your needs.
          </li>
        </ul>
      </SectionWrapper>

      {/* What's next info blocks */}
      <div className="border-t border-border" />
      <SectionWrapper>
        <h3 className="text-base font-semibold text-foreground">What's next?</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">ABN Display</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              The assigned Australian Business Number (ABN) will immediately appear on your screen confirming its status.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">Fast and Easy Process</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              We simplified the ABN application process into a single smart online form.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h4 className="text-sm font-semibold text-foreground">Email Confirmation</h4>
            <p className="mt-1 text-xs text-muted-foreground">
              A copy of your ABN will also be sent to the email address you provided during registration.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default AccountingTasksSection;
