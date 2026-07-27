import { Form, popToRoot, showToast, Toast } from "@raycast/api";
import type { Thought } from "../types/thought";
import { useEditThought } from "../hooks/use-edit-thought";
import { EditThoughtField } from "./edit-thought-field";
import { EditThoughtSubmit } from "./edit-thought-submit";

export function EditThoughtForm({ thought }: { thought: Thought }) {
  const { error, isSaving, submit, clearError } = useEditThought(thought);

  async function handleSubmit(values: Record<string, unknown>) {
    try {
      await submit(typeof values.content === "string" ? values.content : "");
      await showToast({ style: Toast.Style.Success, title: "Thought updated" });
      await popToRoot();
    } catch {
      await showToast({
        style: Toast.Style.Failure,
        title: "Could not update thought",
      });
    }
  }

  return (
    <Form
      navigationTitle="Edit Thought"
      isLoading={isSaving}
      actions={
        <EditThoughtSubmit onSubmit={(values) => void handleSubmit(values)} />
      }
    >
      <EditThoughtField
        content={thought.content}
        error={error}
        onChange={clearError}
      />
    </Form>
  );
}
