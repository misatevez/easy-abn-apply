import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const TFNSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Tax File Number (TFN)">
    <p className="mb-4 text-sm text-muted-foreground">
      Not mandatory but strongly recommended:
    </p>

    <div className="space-y-3">
      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.tfnOption === "now" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input
          type="radio"
          name="tfnOption"
          checked={form.tfnOption === "now"}
          onChange={() => update("tfnOption", "now")}
          className="h-4 w-4 accent-[hsl(var(--primary))]"
        />
        <span className="text-sm font-medium text-foreground">I can supply my TFN now</span>
      </label>

      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.tfnOption === "later" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input
          type="radio"
          name="tfnOption"
          checked={form.tfnOption === "later"}
          onChange={() => update("tfnOption", "later")}
          className="h-4 w-4 accent-[hsl(var(--primary))]"
        />
        <span className="text-sm font-medium text-foreground">I will supply my TFN later</span>
      </label>
    </div>

    {form.tfnOption === "now" && (
      <div className="mt-5">
        <Label>Tax File Number (123 456 789) <span className="text-muted-foreground text-xs">(optional)</span></Label>
        <StyledInput value={form.tfn} onChange={(v) => update("tfn", v)} placeholder="123 456 789" error={errors.tfn} className="max-w-xs" />
        <FieldError error={errors.tfn} />
        <HelperText>
          The TFN itself has 9 digits, with a check digit. Individuals receive a 9-digit TFN. Your Tax File Number (TFN) can be found on official Tax Office documents. We may contact you to provide your TFN if the ATO cannot verify your information with the details you have provided, as a TFN is required for an ABN to be issued.
        </HelperText>
      </div>
    )}
  </SectionWrapper>
);

export default TFNSection;
