import { useMemo, useState } from "react";
import { filterThoughts, type ThoughtFilter } from "./thought-operations";
import type { Thought } from "../types/thought";

export function useThoughtList(
  thoughts: Thought[],
  initialFilter: ThoughtFilter = "unreviewed",
) {
  const [filter, setFilter] = useState<ThoughtFilter>(initialFilter);
  const [query, setQuery] = useState("");
  const visibleThoughts = useMemo(
    () => filterThoughts(thoughts, filter, query),
    [thoughts, filter, query],
  );

  return { filter, setFilter, query, setQuery, thoughts: visibleThoughts };
}
