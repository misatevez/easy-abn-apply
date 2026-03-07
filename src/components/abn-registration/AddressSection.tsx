import { SectionWrapper, StyledInput, FieldError, HelperText } from "./FormField";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { SectionProps } from "./types";

const AddressSection = ({ form, errors, update }: SectionProps) => (
  <SectionWrapper title="Personal (Home) Address">
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <Label>Personal (home) address <span className="text-destructive">*</span></Label>
        <StyledInput
          value={form.personalAddress}
          onChange={(v) => update("personalAddress", v)}
          placeholder="Start typing your address..."
          error={errors.personalAddress}
        />
      </div>
      {form.personalAddress && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mb-0.5 gap-1 text-xs"
          onClick={() => update("personalAddress", "")}
        >
          <X className="h-3 w-3" /> Clear address
        </Button>
      )}
    </div>
    <FieldError error={errors.personalAddress} />
    <div className="mt-2 space-y-1">
      <HelperText>Type in the field above to search and select your address</HelperText>
      <HelperText>This must be a street address. It cannot be a PO Box, RMB, RSD or other delivery point address. This address should match your proof of identity (POI) documents.</HelperText>
      <HelperText>Please check the address above and edit the fields if required</HelperText>
    </div>
  </SectionWrapper>
);

export default AddressSection;
