import { expect, it } from "vitest";
import {
  addThought,
  createThought,
  deleteReviewed,
  deleteThought,
  emptyStore,
  filterThoughts,
  setReviewed,
  updateThought,
} from "../hooks/thought-operations";
import type { Thought } from "../types/thought";

const first: Thought = {
  id: "first",
  content: "First",
  source: "text",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};
const second: Thought = {
  id: "second",
  content: "Second idea",
  source: "text",
  createdAt: "2026-01-02T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
  reviewedAt: "2026-01-03T00:00:00.000Z",
};

it("creates normalized text thoughts", () => {
  const thought = createThought("  Remember this  ", first.createdAt);

  expect(thought).toMatchObject({
    content: "Remember this",
    source: "text",
    createdAt: first.createdAt,
    updatedAt: first.createdAt,
  });
  expect(thought.id).toBeTypeOf("string");
});

it("filters, searches, and sorts newest first", () => {
  const thoughts = filterThoughts([first, second], "all", "idea");

  expect(thoughts.map((thought) => thought.id)).toEqual(["second"]);
});

it("updates content without changing identity or creation time", () => {
  const store = addThought(addThought(emptyStore(), first), second);
  const result = updateThought(
    store,
    "first",
    " Updated ",
    "2026-01-04T00:00:00.000Z",
  );
  const updated = result.thoughts.find((thought) => thought.id === "first");

  expect(updated).toMatchObject({
    id: "first",
    content: "Updated",
    createdAt: first.createdAt,
    updatedAt: "2026-01-04T00:00:00.000Z",
  });
});

it("changes review state and deletes reviewed records", () => {
  const reviewed = setReviewed(
    addThought(emptyStore(), first),
    "first",
    true,
    "2026-01-03T00:00:00.000Z",
  );
  const cleared = deleteReviewed({
    ...reviewed,
    thoughts: [...reviewed.thoughts, second],
  });

  expect(reviewed.thoughts[0]?.reviewedAt).toBe(second.reviewedAt);
  expect(cleared.thoughts).toHaveLength(0);
});

it("deletes a single thought", () => {
  const store = addThought(addThought(emptyStore(), first), second);

  expect(
    deleteThought(store, "first").thoughts.map((thought) => thought.id),
  ).toEqual(["second"]);
});
