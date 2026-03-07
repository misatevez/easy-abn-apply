import { SectionWrapper, StyledInput, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const PhoneSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Phone">
    <div className="max-w-sm">
      <Label>Mobile Phone Number <span className="text-destructive">*</span></Label>
      <StyledInput value={form.phone} onChange={(v) => update("phone", v)} placeholder="04XX XXX XXX" error={errors.phone} />
      <FieldError error={errors.phone} />
    </div>
  </SectionWrapper>
);

export default PhoneSection;
