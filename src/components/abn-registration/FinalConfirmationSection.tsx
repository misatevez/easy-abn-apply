import { SectionWrapper, FieldError } from "./FormField";
import { Checkbox } from "@/components/ui/checkbox";
import type { SectionProps } from "./types";

const FinalConfirmationSection = ({ form, errors, updateBoolean }: SectionProps) => (
  <SectionWrapper title="Terms and Conditions of Service">
    <div className="space-y-4">
      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={form.acceptTerms}
          onCheckedChange={(checked) => updateBoolean?.("acceptTerms", !!checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground">
          I have read and accept the <a href="#" className="text-primary hover:underline">Terms & Service</a> of use. <span className="text-destructive">*</span>
        </span>
      </label>
      <FieldError error={errors.acceptTerms} />

      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={form.authoriseTaxAgent}
          onCheckedChange={(checked) => updateBoolean?.("authoriseTaxAgent", !!checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground">
          I authorise an Accredited Tax Agent under licence number 24666831 to add me (if required) to their tax agent portal to proceed with this request. <span className="text-destructive">*</span>
        </span>
      </label>
      <FieldError error={errors.authoriseTaxAgent} />

      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={form.confirmTrueInfo}
          onCheckedChange={(checked) => updateBoolean?.("confirmTrueInfo", !!checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground">
          The information provided in this application is true and correct. <span className="text-destructive">*</span>
        </span>
      </label>
      <FieldError error={errors.confirmTrueInfo} />

      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={form.authoriseASICAgent}
          onCheckedChange={(checked) => updateBoolean?.("authoriseASICAgent", !!checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-foreground">
          I understand that ASIC does not permit changes to a registered business name. I confirm that my business name is correctly spelled and grammatically accurate. I authorise an Accredited ASIC Agent (License No. 35090) to add me to their ASIC agent portal if required to manage ASIC matters and lodge the business name. <span className="text-destructive">*</span>
        </span>
      </label>
      <FieldError error={errors.authoriseASICAgent} />
    </div>
  </SectionWrapper>
);

export default FinalConfirmationSection;
