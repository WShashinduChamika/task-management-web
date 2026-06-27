import axios from "axios";

export const getApiErrorMessage = (
  err: unknown,
  fallback: string
): string => {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.error?.message || err.response?.data?.message;
    console.log(message);
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message[0] ?? fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};
