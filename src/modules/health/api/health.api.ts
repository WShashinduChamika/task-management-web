import { api } from "../../../core/api";
import type { CheckHealthApiResponse } from "../types";

export const healthCheckApi = () => api.get<CheckHealthApiResponse>('/health');