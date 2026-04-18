const REPORTER_ACCESS_TOKEN_KEY = "reporterAccessToken";
const REPORTER_REFRESH_TOKEN_KEY = "reporterRefreshToken";

const STAFF_ACCESS_TOKEN_KEY = "staffAccessToken";
const STAFF_REFRESH_TOKEN_KEY = "staffRefreshToken";

function canUseStorage() {
  return typeof window !== "undefined";
}

export function setReporterTokens(accessToken: string, refreshToken: string) {
  if (!canUseStorage()) return;

  localStorage.setItem(REPORTER_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REPORTER_REFRESH_TOKEN_KEY, refreshToken);
}

export function getReporterAccessToken() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(REPORTER_ACCESS_TOKEN_KEY);
}

export function getReporterRefreshToken() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(REPORTER_REFRESH_TOKEN_KEY);
}

export function clearReporterTokens() {
  if (!canUseStorage()) return;

  localStorage.removeItem(REPORTER_ACCESS_TOKEN_KEY);
  localStorage.removeItem(REPORTER_REFRESH_TOKEN_KEY);
}

export function setStaffTokens(accessToken: string, refreshToken: string) {
  if (!canUseStorage()) return;

  localStorage.setItem(STAFF_ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(STAFF_REFRESH_TOKEN_KEY, refreshToken);
}

export function getStaffAccessToken() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(STAFF_ACCESS_TOKEN_KEY);
}

export function getStaffRefreshToken() {
  if (!canUseStorage()) return null;

  return localStorage.getItem(STAFF_REFRESH_TOKEN_KEY);
}

export function clearStaffTokens() {
  if (!canUseStorage()) return;

  localStorage.removeItem(STAFF_ACCESS_TOKEN_KEY);
  localStorage.removeItem(STAFF_REFRESH_TOKEN_KEY);
}

export const reporterTokenStorageKeys = {
  accessToken: REPORTER_ACCESS_TOKEN_KEY,
  refreshToken: REPORTER_REFRESH_TOKEN_KEY,
};

export const staffTokenStorageKeys = {
  accessToken: STAFF_ACCESS_TOKEN_KEY,
  refreshToken: STAFF_REFRESH_TOKEN_KEY,
};
