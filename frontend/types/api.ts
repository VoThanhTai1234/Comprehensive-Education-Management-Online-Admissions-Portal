export interface ApiError {
  status: number;
  code: string;
  message: string;
  path: string;
  details: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
  timestamp: string;
}

export interface HealthData {
  status: "UP" | "DOWN";
  service: string;
  version: string;
  database: "UP" | "DOWN" | "NOT_CONFIGURED";
}

