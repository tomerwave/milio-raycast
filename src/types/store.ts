import type { Thought } from "./thought";

export const CURRENT_STORE_VERSION = 1;

export interface MilioStore {
  version: number;
  thoughts: Thought[];
  lastReviewAt?: string;
}
