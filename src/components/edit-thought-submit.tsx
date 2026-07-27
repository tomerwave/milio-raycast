import { Action, ActionPanel } from "@raycast/api";

interface Props {
  onSubmit: (values: Record<string, unknown>) => void;
}

export function EditThoughtSubmit({ onSubmit }: Props) {
  return (
    <ActionPanel>
      <Action.SubmitForm title="Save Changes" onSubmit={onSubmit} />
    </ActionPanel>
  );
}
