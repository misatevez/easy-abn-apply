import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import type { SectionProps } from "./types";

const ApplicantNameSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper>
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <StyledInput value={form.firstName} onChange={(v) => update("firstName", v)} placeholder="First Name" />
        <HelperText>Legal First Name</HelperText>
      </div>
      <div>
        <Label htmlFor="middleName">Middle Name</Label>
        <StyledInput value={form.middleName} onChange={(v) => update("middleName", v)} placeholder="Middle Name" />
        <HelperText>Legal Middle Name</HelperText>
      </div>
      <div>
        <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
        <StyledInput value={form.lastName} onChange={(v) => update("lastName", v)} placeholder="Last Name" error={errors.lastName} />
        <HelperText>Legal Last Name</HelperText>
        <FieldError error={errors.lastName} />
      </div>
    </div>
  </SectionWrapper>
);

export default ApplicantNameSection;
