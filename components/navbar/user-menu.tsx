"use client";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-700 text-sm font-bold text-white">
        U
      </div>
      <span className="text-sm font-medium text-gray-800">User</span>
    </div>
  );
}