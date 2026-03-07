import { SectionWrapper, FieldError } from "./FormField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SectionProps } from "./types";

const reasons = [
  "New Business in Australia",
  "Investment Purposes",
  "Purchased existing Business",
  "Contractor / Subcontractor",
  "To receive payment for services",
  "Change in business structure",
];

const ReasonSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Reason for Applying">
    <Label>Why is the Individual / Sole Trader applying for an ABN? <span className="text-destructive">*</span></Label>
    <Select value={form.applyingReason} onValueChange={(v) => update("applyingReason", v)}>
      <SelectTrigger className="mt-1 h-11 rounded-lg">
        <SelectValue placeholder="Select why applying for an ABN" />
      </SelectTrigger>
      <SelectContent>
        {reasons.map((r) => (
          <SelectItem key={r} value={r}>{r}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FieldError error={errors.applyingReason} />
  </SectionWrapper>
);

export default ReasonSection;
