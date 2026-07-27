import { Action, ActionPanel } from "@raycast/api";

interface Props {
  onSubmit: (values: Record<string, unknown>) => void;
}

export function CaptureThoughtSubmit({ onSubmit }: Props) {
  return (
    <ActionPanel>
      <Action.SubmitForm title="Save Thought" onSubmit={onSubmit} />
    </ActionPanel>
  );
}
