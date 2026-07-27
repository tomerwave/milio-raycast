import { useState } from "react";
import { nowIso } from "../domain/time";
import { deleteThought, setReviewed } from "./thought-operations";
import type { MilioStore } from "../types/store";
import type { Thought } from "../types/thought";

interface Props {
  thought: Thought;
  store: MilioStore;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
}

export function useThoughtAction({
  thought,
  store,
  persist,
  onChanged,
}: Props) {
  const [isBusy, setIsBusy] = useState(false);

  async function change(nextStore: MilioStore) {
    setIsBusy(true);
    try {
      await persist(nextStore);
      await onChanged();
    } finally {
      setIsBusy(false);
    }
  }

  return {
    isBusy,
    markReviewed: () => change(setReviewed(store, thought.id, true, nowIso())),
    markUnreviewed: () =>
      change(setReviewed(store, thought.id, false, nowIso())),
    remove: () => change(deleteThought(store, thought.id)),
  };
}
