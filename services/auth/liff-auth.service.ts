import apiClient from "@/services/http/axios-instance";
import {
  clearReporterTokens,
  getReporterRefreshToken,
  setReporterTokens,
} from "@/services/auth/token-storage";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

type ExchangeLiffTokenInput = {
  idToken: string;
  displayName?: string;
  pictureUrl?: string;
};

type ReporterUser = {
  userId: string;
  lineUserId?: string;
  fullName: string;
  lineDisplayName?: string;
  role: "REPORTER";
  reporterType?: string;
};

type ExchangeLiffTokenData = {
  accessToken: string;
  refreshToken: string;
  user: ReporterUser;
};

type RefreshReporterTokenData = {
  accessToken: string;
};

type LogoutReporterData = null;

type LiffMeData = ReporterUser;

export async function exchangeLiffToken(values: ExchangeLiffTokenInput) {
  const response = await apiClient.post<ApiEnvelope<ExchangeLiffTokenData>>(
    "/liff/auth/exchange",
    values
  );

  const payload = response.data.data;
  setReporterTokens(payload.accessToken, payload.refreshToken);

  return payload;
}

export async function refreshReporterToken(refreshToken?: string) {
  const tokenToUse = refreshToken || getReporterRefreshToken();

  if (!tokenToUse) {
    throw new Error("Missing reporter refresh token");
  }

  const response = await apiClient.post<ApiEnvelope<RefreshReporterTokenData>>(
    "/liff/auth/refresh",
    { refreshToken: tokenToUse }
  );

  const currentRefreshToken = getReporterRefreshToken() || tokenToUse;
  setReporterTokens(response.data.data.accessToken, currentRefreshToken);

  return response.data.data;
}

export async function logoutReporter(refreshToken?: string) {
  const tokenToUse = refreshToken || getReporterRefreshToken();

  if (!tokenToUse) {
    clearReporterTokens();
    return null;
  }

  try {
    await apiClient.post<ApiEnvelope<LogoutReporterData>>("/liff/auth/logout", {
      refreshToken: tokenToUse,
    });
  } finally {
    clearReporterTokens();
  }

  return null;
}

export async function getReporterProfile() {
  const response = await apiClient.get<ApiEnvelope<LiffMeData>>("/liff/auth/me");
  return response.data.data;
}

export type {
  ApiEnvelope,
  ExchangeLiffTokenData,
  ExchangeLiffTokenInput,
  LiffMeData,
  RefreshReporterTokenData,
  ReporterUser,
};
