import {
  activeUsersStore,
  activeUsersLoadingStore,
  activeUsersErrorStore,
} from "./user.store";
import { fetchActiveUsersApi } from "../api/user.api";
import { getApiErrorMessage } from "@/core/api/response";

export const fetchActiveUsersAction = async () => {
  activeUsersLoadingStore.value = true;
  activeUsersErrorStore.value = null;

  try {
    const users = await fetchActiveUsersApi();
    activeUsersStore.value = users;
  } catch (error) {
    activeUsersErrorStore.value = getApiErrorMessage(
      error,
      "Failed to fetch active users",
    );
  } finally {
    activeUsersLoadingStore.value = false;
  }
};
