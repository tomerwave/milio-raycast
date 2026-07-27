import { normalizeContent } from "../domain/content";
import { createId } from "../domain/id";
import { CURRENT_STORE_VERSION, type MilioStore } from "../types/store";
import type { Thought } from "../types/thought";

export type ThoughtFilter = "unreviewed" | "reviewed" | "all";

export function createThought(content: string, timestamp: string): Thought {
  return {
    id: createId(),
    content: normalizeContent(content),
    source: "text",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function addThought(store: MilioStore, thought: Thought): MilioStore {
  return { ...store, thoughts: [thought, ...store.thoughts] };
}

export function updateThought(
  store: MilioStore,
  id: string,
  content: string,
  timestamp: string,
): MilioStore {
  return {
    ...store,
    thoughts: store.thoughts.map((thought) =>
      thought.id === id
        ? {
            ...thought,
            content: normalizeContent(content),
            updatedAt: timestamp,
          }
        : thought,
    ),
  };
}

export function setReviewed(
  store: MilioStore,
  id: string,
  reviewed: boolean,
  timestamp: string,
): MilioStore {
  return {
    ...store,
    thoughts: store.thoughts.map((thought) => {
      if (thought.id !== id) {
        return thought;
      }

      if (reviewed) {
        return { ...thought, reviewedAt: timestamp };
      }

      const unreviewed = { ...thought };

      delete unreviewed.reviewedAt;

      return unreviewed;
    }),
  };
}

export function deleteThought(store: MilioStore, id: string): MilioStore {
  return {
    ...store,
    thoughts: store.thoughts.filter((thought) => thought.id !== id),
  };
}

export function deleteReviewed(store: MilioStore): MilioStore {
  return {
    ...store,
    thoughts: store.thoughts.filter((thought) => !thought.reviewedAt),
  };
}

export function filterThoughts(
  thoughts: Thought[],
  filter: ThoughtFilter,
  query: string,
): Thought[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return thoughts
    .filter(
      (thought) =>
        filter === "all" ||
        (filter === "reviewed"
          ? Boolean(thought.reviewedAt)
          : !thought.reviewedAt),
    )
    .filter(
      (thought) =>
        !normalizedQuery ||
        thought.content.toLocaleLowerCase().includes(normalizedQuery),
    )
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function emptyStore(): MilioStore {
  return { version: CURRENT_STORE_VERSION, thoughts: [] };
}
