export type ABNFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  tfnOption: string;
  tfn: string;
  abnPurpose: string;
  abnStartDay: string;
  abnStartMonth: string;
  abnStartYear: string;
  previousABN: string;
  businessActivity: string;
  personalAddress: string;
  applyingReason: string;
};

export type SectionProps = {
  form: ABNFormData;
  errors: Partial<Record<keyof ABNFormData, string>>;
  update: (field: keyof ABNFormData, value: string) => void;
};
