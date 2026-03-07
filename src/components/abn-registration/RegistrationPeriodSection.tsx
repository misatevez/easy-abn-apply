import { SectionWrapper, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const RegistrationPeriodSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper>
    <Label className="text-sm font-medium">
      Please select the period of registration <span className="text-destructive">*</span>
    </Label>
    <div className="mt-2 space-y-3">
      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.registrationPeriod === "1year" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input type="radio" name="registrationPeriod" checked={form.registrationPeriod === "1year"} onChange={() => update("registrationPeriod", "1year")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        <span className="text-sm font-medium text-foreground">Business Name 1 year (+$119)</span>
      </label>
      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.registrationPeriod === "3years" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input type="radio" name="registrationPeriod" checked={form.registrationPeriod === "3years"} onChange={() => update("registrationPeriod", "3years")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        <span className="text-sm font-medium text-foreground">Business Name 3 years (+$199)</span>
      </label>
    </div>
    <FieldError error={errors.registrationPeriod} />
  </SectionWrapper>
);

export default RegistrationPeriodSection;
