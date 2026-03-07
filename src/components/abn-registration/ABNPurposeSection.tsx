import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SectionProps } from "./types";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const ABNPurposeSection = ({ form, errors, update }: SectionProps) => {
  const today = new Date();
  const defaultDay = form.abnStartDay || String(today.getDate()).padStart(2, "0");
  const defaultMonth = form.abnStartMonth || String(today.getMonth() + 1).padStart(2, "0");
  const defaultYear = form.abnStartYear || String(today.getFullYear());

  const handlePurposeChange = (value: string) => {
    update("abnPurpose", value);
    if (value === "new") {
      if (!form.abnStartDay) update("abnStartDay", defaultDay);
      if (!form.abnStartMonth) update("abnStartMonth", defaultMonth);
      if (!form.abnStartYear) update("abnStartYear", defaultYear);
    }
  };

  return (
    <SectionWrapper title="Individual ABN Registration Purpose">
      <p className="mb-3 text-sm text-muted-foreground">
        Select the type of registration <span className="text-destructive">*</span>
      </p>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="radio" name="abnPurpose" checked={form.abnPurpose === "new"} onChange={() => handlePurposeChange("new")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          <span className="text-sm text-foreground">NEW ABN Registration (Sole trader)</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input type="radio" name="abnPurpose" checked={form.abnPurpose === "reactivate"} onChange={() => handlePurposeChange("reactivate")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          <span className="text-sm text-foreground">Reactivate my Previous Individual ABN</span>
        </label>
      </div>

      <FieldError error={errors.abnPurpose} />

      {form.abnPurpose === "new" && (
        <div className="mt-4">
          <Label>From what date does the Individual / Sole Trader require its ABN? <span className="text-destructive">*</span></Label>
          <div className="mt-1 grid max-w-md grid-cols-3 gap-3">
            <StyledInput value={form.abnStartDay || defaultDay} onChange={(v) => update("abnStartDay", v)} placeholder="DD" error={errors.abnStartDay} />
            <Select value={form.abnStartMonth || defaultMonth} onValueChange={(v) => update("abnStartMonth", v)}>
              <SelectTrigger className="h-11 rounded-lg">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m, i) => (
                  <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <StyledInput value={form.abnStartYear || defaultYear} onChange={(v) => update("abnStartYear", v)} placeholder="YYYY" error={errors.abnStartDay} />
          </div>
          <FieldError error={errors.abnStartDay} />
        </div>
      )}

      {form.abnPurpose === "reactivate" && (
        <div className="mt-4">
          <Label>If you previously had an ABN, please enter it here in order to renew it <span className="text-muted-foreground text-xs">(not mandatory)</span></Label>
          <StyledInput value={form.previousABN} onChange={(v) => update("previousABN", v)} placeholder="Enter your previous ABN" className="max-w-xs" />
          <HelperText>
            If you are unsure about your ABN or can't remember it, feel free to use our complimentary services to assist you in completing the application.
          </HelperText>
          <div className="mt-2 flex gap-4">
            <a href="#abn-lookup" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">ABN Lookup</a>
            <a href="#abn-finder" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">ABN Finder</a>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default ABNPurposeSection;
