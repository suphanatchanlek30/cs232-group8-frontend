import apiClient from "@/services/http/axios-instance";

const DEFAULT_UPLOAD_URL = "https://g7e3oj4z0d.execute-api.us-east-1.amazonaws.com/upload";

type SubmitIncidentReportInput = {
  userId: string;
  description: string;
  latitude: string;
  longitude: string;
  incidentDatetime: string;
  label: string;
  placeName: string;
  images: File[];
};

type SubmitIncidentReportResponse = {
  reportId?: string;
  message?: string;
  [key: string]: unknown;
};

export async function submitIncidentReport(
  input: SubmitIncidentReportInput
): Promise<SubmitIncidentReportResponse> {
  const uploadUrl =
    process.env.NEXT_PUBLIC_INCIDENT_UPLOAD_URL?.trim() || DEFAULT_UPLOAD_URL;

  const formData = new FormData();
  formData.append("user_id", input.userId);
  formData.append("description", input.description);
  formData.append("lat", input.latitude);
  formData.append("lon", input.longitude);
  formData.append("datetime", input.incidentDatetime);
  formData.append("label", input.label);
  formData.append("place_name", input.placeName);

  input.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.post<SubmitIncidentReportResponse>(
    uploadUrl,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
    }
  );

  return response.data;
}
