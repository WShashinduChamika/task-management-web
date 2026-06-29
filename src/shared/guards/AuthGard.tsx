import { Outlet, Navigate } from "react-router-dom";
import { getAuthToken } from "@/core/storage/auth.storage";

export const AuthGuard = () => {
  const token = getAuthToken();

  return token ? <Outlet /> : <Navigate to="/" replace />;
};
