import { SectionWrapper } from "./FormField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  );
};

export default AccountingTasksSection;
