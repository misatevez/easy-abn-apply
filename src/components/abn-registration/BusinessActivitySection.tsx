import { SectionWrapper, StyledInput, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const BusinessActivitySection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Business Activity">
    <Label>
      Business activity (Example: driver, cleaner, beauty, plumber, baby sitting services ): <span className="text-destructive">*</span>
    </Label>
    <StyledInput value={form.businessActivity} onChange={(v) => update("businessActivity", v)} placeholder="e.g. Web Development, Consulting" error={errors.businessActivity} />
    <FieldError error={errors.businessActivity} />
  </SectionWrapper>
);

export default BusinessActivitySection;
