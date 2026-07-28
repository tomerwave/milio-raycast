import { closeMainWindow, Form, showToast, Toast } from "@raycast/api";
import { useCaptureThought } from "../hooks/use-capture-thought";
import { useCaptureTitle } from "../hooks/use-capture-title";
import { CaptureThoughtField } from "./capture-thought-field";
import { CaptureThoughtSubmit } from "./capture-thought-submit";

export function CaptureThoughtForm() {
  const { error, isLoading, isSaving, submit, clearError } =
    useCaptureThought();
  const title = useCaptureTitle();

  return (
    <Form
      navigationTitle="Capture Thought"
      isLoading={isLoading || isSaving}
      actions={
        <CaptureThoughtSubmit
          onSubmit={(values) => void submitCapture(values, submit)}
        />
      }
    >
      <CaptureThoughtField title={title} error={error} onChange={clearError} />
    </Form>
  );
}

async function submitCapture(
  values: Record<string, unknown>,
  submit: (content: string) => Promise<boolean>,
) {
  const isSaved = await saveCapture(values, submit);

  if (!isSaved) {
    return;
  }

  await showToast({ style: Toast.Style.Success, title: "Saved to Milio" });
  await closeMainWindow({ clearRootSearch: true });
}

async function saveCapture(
  values: Record<string, unknown>,
  submit: (content: string) => Promise<boolean>,
): Promise<boolean> {
  try {
    return await submit(
      typeof values.content === "string" ? values.content : "",
    );
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: "Could not save thought",
      message: `${getFailureMessage(error)} Your text is still in the form.`,
    });

    return false;
  }
}

function getFailureMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Milio could not write local data.";
}
