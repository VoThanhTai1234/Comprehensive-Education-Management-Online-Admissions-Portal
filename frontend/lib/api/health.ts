import type { ApiResponse, HealthData } from "@/types/api";

const DEFAULT_API_URL = "http://localhost:8080";

function apiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/+$/, "");
}

export async function fetchHealth(signal?: AbortSignal): Promise<HealthData> {
  const response = await fetch(`${apiBaseUrl()}/api/health`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Backend trả về HTTP ${response.status}.`);
  }

  const payload = (await response.json()) as ApiResponse<HealthData>;
  if (!payload.success || !payload.data) {
    throw new Error(payload.error?.message ?? "Phản hồi backend không hợp lệ.");
  }

  return payload.data;
}

