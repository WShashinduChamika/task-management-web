import { useSignals } from "@preact/signals-react/runtime";
import { useCallback } from "react";
import {
  activeUsersStore,
  activeUsersLoadingStore,
  activeUsersErrorStore,
} from "../store/user.store";
import { fetchActiveUsersAction } from "../store/user.actions";

export const useActiveUsers = () => {
  useSignals();

  const loadActiveUsers = useCallback(async () => {
    await fetchActiveUsersAction();
  }, []);

  return {
    users: activeUsersStore.value,
    isLoading: activeUsersLoadingStore.value,
    error: activeUsersErrorStore.value,
    loadActiveUsers,
  };
};
