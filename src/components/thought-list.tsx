import { useThoughtList } from "../hooks/use-thought-list";
import type { MilioStore } from "../types/store";
import { ThoughtListView } from "./thought-list-view";

interface Props {
  store: MilioStore;
  isLoading: boolean;
  error?: string;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
  morning?: boolean;
}

export function ThoughtList({
  store,
  isLoading,
  error,
  persist,
  onChanged,
  morning = false,
}: Props) {
  const state = useThoughtList(store.thoughts, morning ? "unreviewed" : "all");

  return (
    <ThoughtListView
      {...state}
      store={store}
      isLoading={isLoading}
      error={error}
      persist={persist}
      onChanged={onChanged}
      morning={morning}
    />
  );
}
