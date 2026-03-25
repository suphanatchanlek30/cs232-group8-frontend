// components/dashboard/staff-portal-auth/login-form.tsx

"use client";

import { useMemo, useState } from "react";
import AuthInput from "./auth-input";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0;
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    const payload = {
      email,
      password,
    };

    console.log("staff login payload", payload);
    alert("Login form submit ready");
  };

  return (
    <section className="flex h-full items-center justify-center bg-white px-6 py-12 md:px-10">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-(--color-text)">Login</h2>
        </div>

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
            Log in
          </button>
        </form>
      </div>
    </section>
  );
}