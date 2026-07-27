import { Action, ActionPanel, Icon, showToast, Toast } from "@raycast/api";
import { useThoughtAction } from "../hooks/use-thought-action";
import type { MilioStore } from "../types/store";
import type { Thought } from "../types/thought";
import { DeleteReviewedAction } from "./delete-reviewed-action";
import { EditThoughtForm } from "./edit-thought-form";

interface Props {
  thought: Thought;
  store: MilioStore;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
}

export function ThoughtActions({ thought, store, persist, onChanged }: Props) {
  const actions = useThoughtAction({ thought, store, persist, onChanged });

  return (
    <ActionPanel>
      <Action.Push
        title="Edit Thought"
        icon={Icon.Pencil}
        target={<EditThoughtForm thought={thought} />}
      />
      <Action.CopyToClipboard title="Copy Thought" content={thought.content} />
      <Action
        title={thought.reviewedAt ? "Mark Unreviewed" : "Mark Reviewed"}
        icon={Icon.CheckCircle}
        onAction={() => void runAction(actions.markReviewed, "Marked reviewed")}
      />
      <Action
        title="Delete Thought"
        icon={Icon.Trash}
        style={Action.Style.Destructive}
        onAction={() => void runAction(actions.remove, "Thought deleted")}
      />
      <DeleteReviewedAction
        store={store}
        persist={persist}
        onChanged={onChanged}
      />
      {actions.isBusy && <Action title="Saving…" />}
    </ActionPanel>
  );
}

async function runAction(action: () => Promise<void>, title: string) {
  try {
    await action();
    await showToast({ style: Toast.Style.Success, title });
  } catch {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not save change",
    });
  }
}
