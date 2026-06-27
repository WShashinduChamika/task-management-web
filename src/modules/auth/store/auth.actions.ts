import { setAuthToken, setAuthUser } from "../../../core/storage/auth.storage";
import { getApiErrorMessage } from "../../../utils/get-api-error-message";
import { registerApi } from "../api/auth.api";
import type { LoginDto, RegisterDto } from "../types";
import {
  authUserStore,
  loginLoadingStore,
  registerErrorStore,
  registerLoadingStore,
} from "./auth.store";

export const registerAction = async (dto: RegisterDto): Promise<boolean> => {
  registerLoadingStore.value = true;
  registerErrorStore.value = null;

  try {
    const { data } = await registerApi(dto);
    const responseData = (data as any).data || data; // Handle wrapped API response
    setAuthToken(responseData.accessToken);
    setAuthUser(responseData.user);
    authUserStore.value = responseData.user;
    return true;
  } catch (error: any) {
    registerErrorStore.value = getApiErrorMessage(
      error,
      "Unable to create account",
    );
    return false;
  } finally {
    registerLoadingStore.value = false;
  }
};

export const loginAction = async (dto: LoginDto): Promise<boolean> => {
  loginLoadingStore.value = true;
  console.log(dto);

  setTimeout(() => {
    loginLoadingStore.value = false;
  }, 3000);

  return true;
};
