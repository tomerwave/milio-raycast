import { List } from "@raycast/api";
import { formatTimestamp } from "../domain/time";
import type { MilioStore } from "../types/store";
import type { Thought } from "../types/thought";
import { ThoughtActions } from "./thought-actions";
import { ThoughtDetail } from "./thought-detail";

interface Props {
  thought: Thought;
  store: MilioStore;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
}

export function ThoughtListItem({ thought, store, persist, onChanged }: Props) {
  return (
    <List.Item
      id={thought.id}
      title={thought.content}
      subtitle={formatTimestamp(thought.createdAt)}
      accessories={[
        { text: thought.reviewedAt ? "Reviewed" : "Unreviewed" },
        { text: thought.source },
      ]}
      actions={
        <ThoughtActions
          thought={thought}
          store={store}
          persist={persist}
          onChanged={onChanged}
        />
      }
      detail={<ThoughtDetail thought={thought} />}
    />
  );
}
