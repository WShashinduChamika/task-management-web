import { signal } from "@preact/signals-react";
import type { FetchUserResponse } from "../types";

export const activeUsersStore = signal<FetchUserResponse[]>([]);
export const activeUsersLoadingStore = signal(false);
export const activeUsersErrorStore = signal<string | null>(null);
