import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SectionProps } from "./types";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const turnoverOptions = [
  "$0 to $74,999",
  "$75,000 to $149,000",
  "$150,000 to $1,999,999",
  "$2,000,000 to $9,999,999",
  "$10,000,000 to $19,999,999",
  "$20,000,000 and over",
];

const GSTSection = ({ form, errors, update }: SectionProps) => {
  const today = new Date();
  const defaultDay = form.gstStartDay || String(today.getDate()).padStart(2, "0");
  const defaultMonth = form.gstStartMonth || String(today.getMonth() + 1).padStart(2, "0");
  const defaultYear = form.gstStartYear || String(today.getFullYear());

  const handleGSTChange = (value: string) => {
    update("registerForGST", value);
    if (value === "yes") {
      if (!form.gstStartDay) update("gstStartDay", defaultDay);
      if (!form.gstStartMonth) update("gstStartMonth", defaultMonth);
      if (!form.gstStartYear) update("gstStartYear", defaultYear);
    }
  };

  return (
    <SectionWrapper>
      <Label className="text-sm font-medium">
        Would you like to register for GST? (+$79) <span className="text-destructive">*</span>
      </Label>
      <div className="mt-2 space-y-3">
        <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.registerForGST === "yes" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
          <input type="radio" name="registerForGST" checked={form.registerForGST === "yes"} onChange={() => handleGSTChange("yes")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          <span className="text-sm font-medium text-foreground">Yes</span>
        </label>
        <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.registerForGST === "no" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
          <input type="radio" name="registerForGST" checked={form.registerForGST === "no"} onChange={() => handleGSTChange("no")} className="h-4 w-4 accent-[hsl(var(--primary))]" />
          <span className="text-sm font-medium text-foreground">No</span>
        </label>
      </div>
      <FieldError error={errors.registerForGST} />

      {form.registerForGST === "yes" && (
        <div className="mt-5 space-y-5">
          {/* Annual Turnover */}
          <div>
            <Label>Annual expected turnover of the company? <span className="text-destructive">*</span></Label>
            <Select value={form.annualTurnover} onValueChange={(v) => update("annualTurnover", v)}>
              <SelectTrigger className="mt-1 h-11 rounded-lg">
                <SelectValue placeholder="Select turnover range" />
              </SelectTrigger>
              <SelectContent>
                {turnoverOptions.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError error={errors.annualTurnover} />
          </div>

          {/* Lodge Frequency */}
          <div>
            <Label>How often will the company lodge GST? <span className="text-destructive">*</span></Label>
            <div className="mt-2 space-y-3">
              {[
                { value: "annually", label: "Annually – only if turnover is less than $75,000" },
                { value: "quarterly", label: "Quarterly – if turnover is less than $20 million" },
                { value: "monthly", label: "Monthly – if turnover is $20 million or more" },
              ].map((opt) => (
                <label key={opt.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.gstLodgeFrequency === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <input type="radio" name="gstLodgeFrequency" checked={form.gstLodgeFrequency === opt.value} onChange={() => update("gstLodgeFrequency", opt.value)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError error={errors.gstLodgeFrequency} />
          </div>

          {/* GST Result Timing */}
          <div>
            <Label>When will you send GST results to the ATO? <span className="text-destructive">*</span></Label>
            <div className="mt-2 space-y-3">
              {[
                { value: "cash", label: "When I receive the cash" },
                { value: "invoice", label: "When I issue the invoice" },
              ].map((opt) => (
                <label key={opt.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.gstResultTiming === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <input type="radio" name="gstResultTiming" checked={form.gstResultTiming === opt.value} onChange={() => update("gstResultTiming", opt.value)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError error={errors.gstResultTiming} />
          </div>

          {/* Import Goods */}
          <div>
            <Label>Do you import goods and services into Australia? <span className="text-destructive">*</span></Label>
            <div className="mt-2 space-y-3">
              {[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ].map((opt) => (
                <label key={opt.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${form.importGoods === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <input type="radio" name="importGoods" checked={form.importGoods === opt.value} onChange={() => update("importGoods", opt.value)} className="h-4 w-4 accent-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
            <FieldError error={errors.importGoods} />
          </div>

          {/* GST Start Date */}
          <div>
            <Label>Start Date for GST Registration <span className="text-destructive">*</span></Label>
            <div className="mt-1 grid max-w-md grid-cols-3 gap-3">
              <StyledInput value={form.gstStartDay || defaultDay} onChange={(v) => update("gstStartDay", v)} placeholder="DD" error={errors.gstStartDay} />
              <Select value={form.gstStartMonth || defaultMonth} onValueChange={(v) => update("gstStartMonth", v)}>
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1).padStart(2, "0")}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <StyledInput value={form.gstStartYear || defaultYear} onChange={(v) => update("gstStartYear", v)} placeholder="YYYY" error={errors.gstStartDay} />
            </div>
            <FieldError error={errors.gstStartDay} />
            <HelperText>
              If the entity's GST registration is backdated by more than 21 days it may incur penalties and interest charges. Your GST registration will normally be processed from the application date.
            </HelperText>
            <HelperText>
              If your ABN has a specific start date, the GST registration date cannot be later than the ABN registration date.
            </HelperText>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default GSTSection;
