import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search } from "lucide-react";
import type { SectionProps } from "./types";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface ABNLookupResult {
  businessName: string;
  entityType: string;
  abnStatus: string;
  state: string;
}

interface ABNPurposeSectionProps extends SectionProps {
  onABNLookup?: (abn: string) => Promise<void>;
  abnLookupLoading?: boolean;
  abnLookupResult?: ABNLookupResult | null;
  abnLookupError?: string;
}

const ABNPurposeSection = ({
  form,
  errors,
  update,
  onABNLookup,
  abnLookupLoading = false,
  abnLookupResult,
  abnLookupError,
}: ABNPurposeSectionProps) => {
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
        <div className="mt-4 space-y-3">
          <div>
            <Label>If you previously had an ABN, please enter it here <span className="text-muted-foreground text-xs">(not mandatory)</span></Label>
            <div className="mt-1 flex items-center gap-2">
              <StyledInput
                value={form.previousABN}
                onChange={(v) => update("previousABN", v)}
                placeholder="e.g. 12 345 678 901"
                className="max-w-xs"
              />
              {onABNLookup && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 gap-1.5"
                  disabled={!form.previousABN.trim() || abnLookupLoading}
                  onClick={() => onABNLookup(form.previousABN)}
                >
                  {abnLookupLoading
                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : <Search className="h-3.5 w-3.5" />}
                  {abnLookupLoading ? "Looking up…" : "Lookup"}
                </Button>
              )}
            </div>

            {abnLookupError && (
              <p className="mt-1.5 text-sm text-destructive">{abnLookupError}</p>
            )}

            {abnLookupResult && (
              <div className="mt-2 rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-sm font-semibold text-foreground">
                  {abnLookupResult.businessName || "—"}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {abnLookupResult.entityType}
                  {abnLookupResult.state ? ` · ${abnLookupResult.state}` : ""}
                  {" · "}
                  <span className={abnLookupResult.abnStatus === "Active" ? "text-green-600" : "text-orange-600"}>
                    {abnLookupResult.abnStatus}
                  </span>
                </p>
              </div>
            )}

            <HelperText>
              If you are unsure about your ABN, use the Lookup button above to search the Australian Business Register.
            </HelperText>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default ABNPurposeSection;
