import { SectionWrapper, StyledInput, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SectionProps } from "./types";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const PhoneSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper>
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Label>Mobile Phone Number <span className="text-destructive">*</span></Label>
        <StyledInput value={form.phone} onChange={(v) => update("phone", v)} placeholder="04XX XXX XXX" error={errors.phone} />
        <FieldError error={errors.phone} />
      </div>
      <div>
        <Label>Date of Birth <span className="text-destructive">*</span></Label>
        <div className="mt-1 grid grid-cols-3 gap-3">
          <StyledInput value={form.dobDay} onChange={(v) => update("dobDay", v)} placeholder="DD" error={errors.dobDay} />
          <Select value={form.dobMonth} onValueChange={(v) => update("dobMonth", v)}>
            <SelectTrigger className="h-11 rounded-lg">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m, i) => (
                <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <StyledInput value={form.dobYear} onChange={(v) => update("dobYear", v)} placeholder="YYYY" error={errors.dobDay} />
        </div>
        <FieldError error={errors.dobDay} />
      </div>
    </div>
  </SectionWrapper>
);

export default PhoneSection;
