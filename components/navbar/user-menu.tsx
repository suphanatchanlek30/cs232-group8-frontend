// components/navbar/user-menu.tsx

"use client";

import { useAuth } from "@/hooks/useAuth";

export default function UserMenu() {
  const { user, login, logout, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>;
  }

  if (!isAuthenticated) {
    return (
      <button 
        onClick={login}
        className="rounded-md bg-[#00B900] px-3 py-1.5 text-sm font-bold text-white hover:bg-[#009900] transition-colors"
      >
        Login
      </button>
    );
  }

  const firstLetter = user?.fullName?.[0] || "U";

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={logout} title="Click to logout">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary) text-sm font-bold text-white">
        {firstLetter}
      </div>
      <span className="text-sm font-medium text-(--color-text)">{user?.fullName || "User"}</span>
    </div>
  );
}