export interface CheckHealth {
    status: string | null;
}

export interface CheckHealthApiResponse {
    status: CheckHealth;
    timeStamp: string;
}