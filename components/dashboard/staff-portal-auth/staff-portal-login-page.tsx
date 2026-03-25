// components/dashboard/staff-portal-auth/staff-portal-login-page.tsx

import AuthHero from "./auth-hero";
import LoginForm from "./login-form";

export default function StaffPortalLoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <AuthHero />
        <LoginForm />
      </div>
    </div>
  );
}