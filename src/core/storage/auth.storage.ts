const TOKEN_KEY = "tm_token";
const REFRESH_TOKEN_KEY = "tm_refresh_token";
const USER_KEY  = "tm_user";

export const getAuthToken     = () => localStorage.getItem(TOKEN_KEY);
export const setAuthToken     = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const getRefreshToken  = () => localStorage.getItem(REFRESH_TOKEN_KEY);
export const setRefreshToken  = (t: string) => localStorage.setItem(REFRESH_TOKEN_KEY, t);
export const getAuthUser      = () => JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
export const setAuthUser      = (u: unknown) => {
  console.log(u);
  localStorage.setItem(USER_KEY, JSON.stringify(u))};
export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
