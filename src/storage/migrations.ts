import { CURRENT_STORE_VERSION, type MilioStore } from "../types/store";
import { LegacyMilioStoreSchema, MilioStoreSchema } from "../schemas/store";

export function migrateStore(value: unknown): MilioStore {
  const result = MilioStoreSchema.safeParse(value);

  if (result.success) {
    return result.data;
  }

  const legacyResult = LegacyMilioStoreSchema.safeParse(value);

  if (legacyResult.success) {
    return { version: CURRENT_STORE_VERSION, ...legacyResult.data };
  }

  throw new Error(
    `Unsupported or invalid Milio store version; expected ${String(CURRENT_STORE_VERSION)}`,
  );
}
