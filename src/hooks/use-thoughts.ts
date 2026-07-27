import { useCallback, useEffect, useState } from "react";
import { readStore, writeStore } from "../storage/store";
import type { MilioStore } from "../types/store";

export function useThoughts() {
  const [store, setStore] = useState<MilioStore>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setStore(await readStore());
      setError(undefined);
    } catch {
      setError("Milio could not read its local data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persist = useCallback(async (nextStore: MilioStore) => {
    await writeStore(nextStore);
    setStore(nextStore);
    setError(undefined);
  }, []);

  useEffect(() => void refresh(), [refresh]);

  return { store, error, isLoading, refresh, persist };
}
