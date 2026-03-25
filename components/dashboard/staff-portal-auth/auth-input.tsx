// components/dashboard/staff-portal-auth/auth-input.tsx

import type { AuthInputProps } from "./types";

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-(--color-subtext)">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-transparent bg-(--color-muted) px-4 text-sm text-(--color-text) outline-none transition placeholder:text-neutral-400 focus:border-(--color-primary) focus:bg-white focus:ring-2 focus:ring-(--primary-soft)"
      />
    </div>
  );
}