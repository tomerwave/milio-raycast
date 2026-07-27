import { List } from "@raycast/api";
import type { MilioStore } from "../types/store";
import { ThoughtFilterDropdown } from "./thought-filter-dropdown";
import { ThoughtListContent } from "./thought-list-content";
import type { ThoughtFilter } from "../hooks/thought-operations";

interface Props {
  store: MilioStore;
  isLoading: boolean;
  error?: string;
  persist: (store: MilioStore) => Promise<void>;
  onChanged: () => Promise<void>;
  morning: boolean;
  filter: ThoughtFilter;
  query: string;
  thoughts: import("../types/thought").Thought[];
  setFilter: (filter: ThoughtFilter) => void;
  setQuery: (query: string) => void;
}

export function ThoughtListView(props: Props) {
  return renderThoughtList(props);
}

function renderThoughtList(props: Props) {
  const listProps = {
    isLoading: props.isLoading,
    searchText: props.query,
    onSearchTextChange: props.setQuery,
    searchBarPlaceholder: "Search thoughts",
    searchBarAccessory: (
      <ThoughtFilterDropdown value={props.filter} onChange={props.setFilter} />
    ),
    navigationTitle: props.morning ? "Morning Review" : "Review Thoughts",
    isShowingDetail: true,
  };

  return (
    <List {...listProps}>
      <ThoughtListContent
        store={props.store}
        thoughts={props.thoughts}
        isLoading={props.isLoading}
        error={props.error}
        query={props.query}
        filter={props.filter}
        persist={props.persist}
        onChanged={props.onChanged}
      />
    </List>
  );
}
