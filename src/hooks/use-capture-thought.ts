import { useRef, useState } from "react";
import { isValidContent } from "../domain/content";
import { nowIso } from "../domain/time";
import { createThought } from "./thought-operations";
import { useThoughts } from "./use-thoughts";
import type { MilioStore } from "../types/store";

export function useCaptureThought() {
  const { isLoading, persist, store } = useThoughts();
  const [error, setError] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);
  const submitted = useRef(false);

  const submit = (content: string) =>
    submitThought(content, {
      isLoading,
      persist,
      setError,
      setIsSaving,
      store,
      submitted,
    });

  return {
    error,
    isLoading,
    isSaving,
    submit,
    clearError: () => {
      setError(undefined);
    },
  };
}

interface SubmitState {
  isLoading: boolean;
  persist: (store: MilioStore) => Promise<void>;
  setError: (error: string | undefined) => void;
  setIsSaving: (isSaving: boolean) => void;
  store?: MilioStore;
  submitted: SubmittedRef;
}

async function submitThought(
  content: string,
  state: SubmitState,
): Promise<boolean> {
  const validationError = getValidationError(content, state);

  if (validationError) {
    state.setError(validationError);

    return false;
  }

  if (!state.store) {
    return false;
  }

  state.submitted.current = true;
  state.setIsSaving(true);

  try {
    await saveThought(state.store, state.persist, content);
    state.setError(undefined);

    return true;
  } catch (error) {
    state.submitted.current = false;

    throw error;
  } finally {
    state.setIsSaving(false);
  }
}

function getValidationError(
  content: string,
  state: SubmitState,
): string | undefined {
  if (state.submitted.current) {
    return "Milio is already saving this thought.";
  }

  if (!isValidContent(content)) {
    return "Enter a thought before saving.";
  }

  if (state.isLoading || !state.store) {
    return "Milio is still loading. Try again in a moment.";
  }

  return undefined;
}

interface SubmittedRef {
  current: boolean;
}

async function saveThought(
  store: MilioStore,
  persist: (store: MilioStore) => Promise<void>,
  content: string,
) {
  await persist({
    ...store,
    thoughts: [createThought(content, nowIso()), ...store.thoughts],
  });
}
