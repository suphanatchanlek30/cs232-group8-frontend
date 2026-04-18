import apiClient from "@/services/http/axios-instance";

type SubmitIncidentReportInput = {
  description: string;
  voiceText?: string;
  latitude: string;
  longitude: string;
  incidentDatetime: string;
  label: string;
  placeName: string;
  locationNote?: string;
  images: File[];
};

type SubmitIncidentReportResponse = {
  success: boolean;
  message: string;
  data: {
    reportId: string;
    trackingCode: string;
    incidentId: string | null;
    isMerged: boolean;
    status: string;
    candidateIncidentType: string | null;
  };
};

export async function submitIncidentReport(
  input: SubmitIncidentReportInput
): Promise<SubmitIncidentReportResponse> {
  const formData = new FormData();
  formData.append("reportText", input.description);
  
  if (input.voiceText) {
    formData.append("voiceText", input.voiceText);
  }
  
  formData.append("lat", input.latitude);
  formData.append("lng", input.longitude);
  formData.append("occurredAt", input.incidentDatetime);
  formData.append("label", input.label);
  formData.append("locationName", input.placeName);
  if (input.locationNote) {
    formData.append("locationNote", input.locationNote);
  }

  input.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await apiClient.post<SubmitIncidentReportResponse>(
    "/reports/multipart",
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
