import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const SectionWrapper = ({ children, title }: { children: ReactNode; title?: string }) => (
  <div className="px-6 py-4 md:px-8 md:py-5">
    <div className="mx-auto max-w-[570px]">
      {title && <h3 className="mb-4 text-base font-semibold text-foreground">{title}</h3>}
      {children}
    </div>
  </div>
);

export const FieldError = ({ error }: { error?: string }) =>
  error ? <p className="mt-1 text-sm text-destructive">{error}</p> : null;

export const HelperText = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 text-xs text-muted-foreground">{children}</p>
);

export const StyledInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  className?: string;
}) => (
  <Input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`h-11 max-w-[500px] rounded-lg ${error ? "border-destructive" : ""} ${className}`}
  />
);
