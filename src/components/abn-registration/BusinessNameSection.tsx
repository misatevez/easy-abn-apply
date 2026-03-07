import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const businessNameHelperText = `The form will not accept letters with accents such as à, é or ç.

Example: Lisa wants to register "Lisa's Café".
Although her name will need to be registered as "LISA'S CAFE", she can still use "Lisa's Café" on her marketing, signage and receipts.

Please type and check your preferred Business Name so the system can instantly check the availability of the Business Name entered.

Please do not register your domain name yet. We strongly suggest waiting until you receive the confirmation email from the ATO confirming your registered business name.`;

const BusinessNameSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper>
    <Label className="text-sm font-medium">
      Will you trade under a business name? <span className="text-destructive">*</span>
    </Label>

    <div className="mt-2 space-y-3">
      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.tradeUnderBusinessName === "yes" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input type="radio" name="tradeUnderBusinessName" checked={form.tradeUnderBusinessName === "yes"} onChange={() => update("tradeUnderBusinessName", "yes")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        <span className="text-sm font-medium text-foreground">Yes</span>
      </label>
      <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.tradeUnderBusinessName === "no" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
        <input type="radio" name="tradeUnderBusinessName" checked={form.tradeUnderBusinessName === "no"} onChange={() => update("tradeUnderBusinessName", "no")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
        <span className="text-sm font-medium text-foreground">No</span>
      </label>
    </div>
    <FieldError error={errors.tradeUnderBusinessName} />

    {form.tradeUnderBusinessName === "yes" && (
      <div className="mt-5">
        <Label>Please select one of the options below: <span className="text-destructive">*</span></Label>
        <div className="mt-2 space-y-3">
          <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.businessNameOption === "new" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
            <input type="radio" name="businessNameOption" checked={form.businessNameOption === "new"} onChange={() => update("businessNameOption", "new")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
            <span className="text-sm font-medium text-foreground">Register a NEW Business Name</span>
          </label>
          <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.businessNameOption === "renew" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
            <input type="radio" name="businessNameOption" checked={form.businessNameOption === "renew"} onChange={() => update("businessNameOption", "renew")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
            <span className="text-sm font-medium text-foreground">Renew my Business Name</span>
          </label>
        </div>
        <FieldError error={errors.businessNameOption} />

        {form.businessNameOption === "new" && (
          <div className="mt-5">
            <Label>Insert your Business Name <span className="text-destructive">*</span></Label>
            <StyledInput
              value={form.newBusinessName}
              onChange={(v) => update("newBusinessName", v)}
              placeholder="Enter your preferred business name"
              error={errors.newBusinessName}
            />
            <FieldError error={errors.newBusinessName} />
            <HelperText>{businessNameHelperText}</HelperText>
          </div>
        )}

        {form.businessNameOption === "renew" && (
          <div className="mt-5">
            <Label>Existing Business Name <span className="text-destructive">*</span></Label>
            <StyledInput
              value={form.existingBusinessName}
              onChange={(v) => update("existingBusinessName", v)}
              placeholder="Enter your existing business name"
              error={errors.existingBusinessName}
            />
            <FieldError error={errors.existingBusinessName} />
            <HelperText>{businessNameHelperText}</HelperText>
          </div>
        )}
      </div>
    )}
  </SectionWrapper>
);

export default BusinessNameSection;
