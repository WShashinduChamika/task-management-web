import type { RegisterDto } from "../types";
import { registerLoadingStore } from "./auth.store";

export const registerAction = async (dto: RegisterDto): Promise<boolean> => {
  registerLoadingStore.value = true;
  console.log(dto);

  setTimeout(() => {
     registerLoadingStore.value = false;
  }, 5000);

  return true;
};