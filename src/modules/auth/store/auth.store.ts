import { signal } from "@preact/signals-react";

export const registerLoadingStore = signal(false);
export const registerErrorStore   = signal<string | null>(null);