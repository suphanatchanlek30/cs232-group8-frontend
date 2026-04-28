"use client";

import React, { createContext, useEffect, useState } from "react";
import liff from "@line/liff";
import { exchangeLiffToken, getReporterProfile, ReporterUser } from "@/services/auth/liff-auth.service";
import { getReporterAccessToken } from "@/services/auth/token-storage";

interface AuthContextType {
  user: ReporterUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ReporterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK_LIFF === "true") {
          console.log("Mock Mode: Skipping LIFF init...");
        } else {
          const liffId = process.env.NEXT_PUBLIC_LIFF_ID || "YOUR_LIFF_ID_HERE";
          await liff.init({ liffId });
        }

        const token = getReporterAccessToken();
        if (token) {
          try {
            const profile = await getReporterProfile();
            if (isMounted) setUser(profile);
          } catch (error) {
            console.error("Failed to get profile with existing token, attempting LIFF exchange...", error);
            await handleLiffAuth();
          }
        } else {
          await handleLiffAuth();
        }
      } catch (error) {
        console.error("LIFF initialization failed", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    async function handleLiffAuth() {
      if (process.env.NEXT_PUBLIC_USE_MOCK_LIFF === "true") {
        try {
          const payload = await exchangeLiffToken({
            idToken: "mock-line-token-student001",
            displayName: "Mock Testing User",
            pictureUrl: "https://ui-avatars.com/api/?name=Mock+User",
          });
          if (isMounted) setUser(payload.user);
        } catch (err) {
          console.error("Failed to exchange mock LIFF token", err);
        }
        return;
      }
      if (liff.isLoggedIn()) {
        try {
          const idToken = liff.getIDToken();
          if (idToken) {
            const profile = await liff.getProfile();
            const payload = await exchangeLiffToken({
              idToken,
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl,
            });
            if (isMounted) setUser(payload.user);
          }
        } catch (err) {
          console.error("Failed to exchange LIFF token", err);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = () => {
    if (process.env.NEXT_PUBLIC_USE_MOCK_LIFF === "true") {
      window.location.reload();
      return;
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  const logout = () => {
    import("@/services/auth/liff-auth.service").then(({ logoutReporter }) => {
      logoutReporter().then(() => {
        if (liff.isLoggedIn()) {
          liff.logout();
        }
        setUser(null);
        window.location.reload();
      }).catch(err => console.error("Failed to logout correctly", err));
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
