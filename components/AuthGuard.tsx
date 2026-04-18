"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, login } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      login();
    }
  }, [isLoading, isAuthenticated, login]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#00B900] border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // liff.login() will trigger redirect
  }

  return <>{children}</>;
}
