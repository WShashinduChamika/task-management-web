import { Outlet, Navigate } from "react-router-dom";
import { useSignals } from "@preact/signals-react/runtime";
import { isLoggedInStore } from "@/modules/auth/store/auth.store";

export const AuthGuard = () => {
  useSignals();

  const isLoggedIn = isLoggedInStore.value;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
