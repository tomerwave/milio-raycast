import { useState } from "react";
import { isValidContent, normalizeContent } from "../domain/content";
import { nowIso } from "../domain/time";
import { updateThought } from "./thought-operations";
import { useThoughts } from "./use-thoughts";
import type { Thought } from "../types/thought";

export function useEditThought(thought: Thought) {
  const { persist, store } = useThoughts();
  const [error, setError] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);

  async function submit(content: string) {
    if (!store || !isValidContent(content)) {
      setError("Enter a thought before saving.");

      return;
    }

    setIsSaving(true);
    try {
      await persist(
        updateThought(store, thought.id, normalizeContent(content), nowIso()),
      );
      setError(undefined);
    } finally {
      setIsSaving(false);
    }
  }

  return {
    error,
    isSaving,
    submit,
    clearError: () => {
      setError(undefined);
    },
  };
}
