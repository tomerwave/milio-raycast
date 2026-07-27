import {
  Action,
  ActionPanel,
  confirmAlert,
  Icon,
  showToast,
  Toast,
} from "@raycast/api";
import { deleteReviewed } from "../hooks/thought-operations";
import type { MilioStore } from "../types/store";

interface Props {
  store: MilioStore;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
}

export function DeleteReviewedAction({ store, persist, onChanged }: Props) {
  return (
    <ActionPanel.Section>
      <Action
        title="Delete All Reviewed"
        icon={Icon.Trash}
        style={Action.Style.Destructive}
        onAction={() => void deleteAllReviewed(store, persist, onChanged)}
      />
    </ActionPanel.Section>
  );
}

async function deleteAllReviewed(
  store: MilioStore,
  persist: Props["persist"],
  onChanged: Props["onChanged"],
) {
  const reviewedCount = store.thoughts.filter(
    (thought) => thought.reviewedAt,
  ).length;

  if (!reviewedCount) {
    await showToast({
      style: Toast.Style.Failure,
      title: "No reviewed thoughts",
    });

    return;
  }

  if (!(await confirmDeletion(reviewedCount))) {
    return;
  }

  await saveDeletion(store, persist, onChanged);
}

async function confirmDeletion(reviewedCount: number): Promise<boolean> {
  return confirmAlert({
    title: "Delete all reviewed thoughts?",
    message: `${String(reviewedCount)} thoughts will be permanently deleted.`,
  });
}

async function saveDeletion(
  store: MilioStore,
  persist: Props["persist"],
  onChanged: Props["onChanged"],
) {
  try {
    await persist(deleteReviewed(store));
    await onChanged();
    await showToast({
      style: Toast.Style.Success,
      title: "Reviewed thoughts deleted",
    });
  } catch {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not delete reviewed thoughts",
    });
  }
}
