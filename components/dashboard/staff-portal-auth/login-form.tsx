// components/dashboard/staff-portal-auth/login-form.tsx

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthInput from "./auth-input";
import { loginStaff } from "@/services/auth/staff-auth.service";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0 && !loading;
  }, [email, password, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      setLoading(true);
      setError(null);
      
      const user = await loginStaff(email, password);
      
      console.log("Logged in successfully:", user);
      
      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Login failed:", err);
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Invalid credentials or login failed.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex h-full items-center justify-center bg-white px-6 py-12 md:px-10">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-(--color-text)">Login</h2>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
          />

          <button
            type="submit"
            disabled={!canSubmit}
            className={`mt-3 h-12 w-full rounded-full text-sm font-medium text-white transition ${
              canSubmit
                ? "bg-(--color-primary) hover:bg-(--color-primary-hover)"
                : "cursor-not-allowed bg-neutral-300"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </section>
  );
}