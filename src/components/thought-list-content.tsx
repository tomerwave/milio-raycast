import { Icon, List } from "@raycast/api";
import type { MilioStore } from "../types/store";
import type { Thought } from "../types/thought";
import type { ThoughtFilter } from "../hooks/thought-operations";
import { ThoughtListItem } from "./thought-list-item";

interface Props {
  store: MilioStore;
  thoughts: Thought[];
  isLoading: boolean;
  error?: string;
  query: string;
  filter: ThoughtFilter;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
}

export function ThoughtListContent({
  store,
  thoughts,
  isLoading,
  error,
  query,
  filter,
  persist,
  onChanged,
}: Props) {
  if (error) {
    return errorView(error);
  }

  if (!isLoading && thoughts.length === 0) {
    return emptyView(query);
  }

  if (filter === "all") {
    return renderSections(thoughts, store, persist, onChanged);
  }

  return renderThoughts(thoughts, store, persist, onChanged);
}

function renderSections(
  thoughts: Thought[],
  store: MilioStore,
  persist: Props["persist"],
  onChanged: Props["onChanged"],
) {
  const unreviewed = thoughts.filter((thought) => !thought.reviewedAt);
  const reviewed = thoughts.filter((thought) => thought.reviewedAt);

  return [
    unreviewed.length > 0
      ? section("Unreviewed", unreviewed, store, persist, onChanged)
      : undefined,
    reviewed.length > 0
      ? section("Reviewed", reviewed, store, persist, onChanged)
      : undefined,
  ];
}

function section(
  title: string,
  thoughts: Thought[],
  store: MilioStore,
  persist: Props["persist"],
  onChanged: Props["onChanged"],
) {
  return (
    <List.Section key={title} title={title}>
      {renderThoughts(thoughts, store, persist, onChanged)}
    </List.Section>
  );
}

function renderThoughts(
  thoughts: Thought[],
  store: MilioStore,
  persist: Props["persist"],
  onChanged: Props["onChanged"],
) {
  return thoughts.map((thought) => (
    <ThoughtListItem
      key={thought.id}
      thought={thought}
      store={store}
      persist={persist}
      onChanged={onChanged}
    />
  ));
}

function errorView(error: string) {
  return (
    <List.EmptyView
      title="Milio could not load"
      description={error}
      icon={Icon.ExclamationMark}
    />
  );
}

function emptyView(query: string) {
  return (
    <List.EmptyView
      title={query ? "No matching thoughts" : "Your mind is clear."}
    />
  );
}
