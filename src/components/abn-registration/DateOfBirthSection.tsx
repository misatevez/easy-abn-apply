import { SectionWrapper, StyledInput, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const DateOfBirthSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Date of Birth">
    <Label>Date of Birth <span className="text-destructive">*</span></Label>
    <div className="mt-1 grid max-w-xs grid-cols-3 gap-3">
      <div>
        <StyledInput value={form.dobDay} onChange={(v) => update("dobDay", v)} placeholder="DD" error={errors.dobDay} />
      </div>
      <div>
        <StyledInput value={form.dobMonth} onChange={(v) => update("dobMonth", v)} placeholder="MM" error={errors.dobDay} />
      </div>
      <div>
        <StyledInput value={form.dobYear} onChange={(v) => update("dobYear", v)} placeholder="YYYY" error={errors.dobDay} />
      </div>
    </div>
    <FieldError error={errors.dobDay} />
  </SectionWrapper>
);

export default DateOfBirthSection;
