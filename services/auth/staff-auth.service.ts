import staffApiClient from "../http/staff-axios-instance";
import { setStaffTokens, clearStaffTokens } from "./token-storage";

export interface StaffUser {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  unit: {
    unitId: string;
    name: string;
  };
  permissions?: string[];
}

export const loginStaff = async (email: string, password: string) => {
  const response = await staffApiClient.post<{ success: boolean; message: string; data: { accessToken: string; refreshToken: string; user: StaffUser } }>(
    "/staff/auth/login",
    { email, password }
  );
  
  const { accessToken, refreshToken, user } = response.data.data;
  setStaffTokens(accessToken, refreshToken);
  return user;
};

export const logoutStaff = async (refreshToken: string) => {
  try {
    await staffApiClient.post<{ success: boolean; message: string; data: null }>(
      "/staff/auth/logout",
      { refreshToken }
    );
  } finally {
    clearStaffTokens();
  }
};

export const getStaffMe = async () => {
  const response = await staffApiClient.get<{ success: boolean; message: string; data: StaffUser }>(
    "/staff/auth/me"
  );
  return response.data.data;
};
