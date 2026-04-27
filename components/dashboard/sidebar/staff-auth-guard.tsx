"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getStaffAccessToken } from "@/services/auth/token-storage";
import { getStaffMe } from "@/services/auth/staff-auth.service";

export function StaffAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getStaffAccessToken();
      
      if (!token) {
        router.replace("/staff-portal-auth");
        return;
      }

      try {
        // Verify token with backend
        await getStaffMe();
        setAuthorized(true);
      } catch {
        // Token invalid or role not allowed
        router.replace("/staff-portal-auth");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-slate-600">Authenticating Staff Portal...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
