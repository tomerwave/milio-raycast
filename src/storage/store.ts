import { LocalStorage } from "@raycast/api";
import { migrateStore } from "./migrations";
import { CURRENT_STORE_VERSION, type MilioStore } from "../types/store";

const STORE_KEY = "milio-store";

export async function readStore(): Promise<MilioStore> {
  const raw = await LocalStorage.getItem<string>(STORE_KEY);

  if (!raw) {
    return { version: CURRENT_STORE_VERSION, thoughts: [] };
  }

  return migrateStore(JSON.parse(raw));
}

export async function writeStore(store: MilioStore): Promise<void> {
  await LocalStorage.setItem(STORE_KEY, JSON.stringify(store));
}
