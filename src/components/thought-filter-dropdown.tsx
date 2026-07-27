import { List } from "@raycast/api";
import type { ThoughtFilter } from "../hooks/thought-operations";

interface Props {
  value: ThoughtFilter;
  onChange: (value: ThoughtFilter) => void;
}

export function ThoughtFilterDropdown({ value, onChange }: Props) {
  return (
    <List.Dropdown
      tooltip="Filter thoughts"
      value={value}
      onChange={(nextValue) => {
        onChange(nextValue as ThoughtFilter);
      }}
    >
      <List.Dropdown.Item title="Unreviewed" value="unreviewed" />
      <List.Dropdown.Item title="Reviewed" value="reviewed" />
      <List.Dropdown.Item title="All" value="all" />
    </List.Dropdown>
  );
}
