import { signal } from "@preact/signals-react";
import type { CheckHealth } from "../types";

export const checkHealthStore = signal<CheckHealth | null>(null);
export const checkHealthLoadingStore = signal(false);
export const checkHealthErrorStore = signal<string | null>(null);
export const checkHealthRequestedStore = signal(false);