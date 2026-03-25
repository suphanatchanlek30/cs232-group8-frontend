// components/dashboard/staff-portal-auth/types.ts

export interface AuthInputProps {
  label: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}
