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
  // Business Name Details
  tradeUnderBusinessName: string;
  businessNameOption: string;
  newBusinessName: string;
  existingBusinessName: string;
  registrationPeriod: string;
  // Birth Details
  countryOfBirth: string;
  stateOfBirth: string;
  cityOfBirth: string;
  // GST Details
  registerForGST: string;
  annualTurnover: string;
  gstLodgeFrequency: string;
  gstResultTiming: string;
  importGoods: string;
  gstStartDay: string;
  gstStartMonth: string;
  gstStartYear: string;
  // Accounting Tasks
  accountingTasks: string[];
  // Final Confirmation
  acceptTerms: boolean;
  authoriseTaxAgent: boolean;
  confirmTrueInfo: boolean;
  authoriseASICAgent: boolean;
};

export type SectionProps = {
  form: ABNFormData;
  errors: Partial<Record<string, string>>;
  update: (field: keyof ABNFormData, value: string) => void;
  updateArray?: (field: keyof ABNFormData, value: string[]) => void;
  updateBoolean?: (field: keyof ABNFormData, value: boolean) => void;
};
