import { computed, signal } from "@preact/signals-react";
import type { AuthUser } from "../types";

export const registerLoadingStore = signal(false);
export const registerErrorStore   = signal<string | null>(null);
export const authUserStore        = signal<AuthUser | null>(null);
export const isLoggedInStore      = computed(() => authUserStore.value !== null);