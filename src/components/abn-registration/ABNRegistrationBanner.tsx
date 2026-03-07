import { Shield, Clock, CheckCircle2 } from "lucide-react";

const ABNRegistrationBanner = () => (
  <section className="relative overflow-hidden bg-primary py-14 md:py-20">
    <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/[0.05]" />
    <div className="pointer-events-none absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-primary-foreground/[0.04]" />

    <div className="container relative">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
          <Shield className="h-4 w-4" />
          Accredited Tax Agent – Licence No. 24666831
        </div>

        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
          ABN & GST direct to your inbox in just 5 minutes
        </h1>

        <p className="mb-3 text-lg font-medium text-primary-foreground/90">
          Business Name & other services available in the same form.
        </p>

        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-primary-foreground/70">
          Complete the registration form below to provide the required details for your ABN application. The process is streamlined, secure, and reviewed for compliance before submission.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 5 min application</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Expert reviewed</span>
          <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Secure & encrypted</span>
        </div>
      </div>
    </div>
  </section>
);

export default ABNRegistrationBanner;
