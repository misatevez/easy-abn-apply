import { SectionWrapper, StyledInput, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const EmailSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Email">
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <Label>Email <span className="text-destructive">*</span></Label>
        <StyledInput value={form.email} onChange={(v) => update("email", v)} placeholder="your@email.com" type="email" error={errors.email} />
        <FieldError error={errors.email} />
      </div>
      <div>
        <Label>Confirmation Email <span className="text-destructive">*</span></Label>
        <StyledInput value={form.confirmEmail} onChange={(v) => update("confirmEmail", v)} placeholder="Confirm your email" type="email" error={errors.confirmEmail} />
        <FieldError error={errors.confirmEmail} />
      </div>
    </div>
  </SectionWrapper>
);

export default EmailSection;
