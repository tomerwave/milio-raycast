import { List } from "@raycast/api";
import { formatTimestamp } from "../domain/time";
import type { Thought } from "../types/thought";

export function ThoughtDetail({ thought }: { thought: Thought }) {
  return (
    <List.Item.Detail
      markdown={thought.content}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.Label
            title="Captured"
            text={formatTimestamp(thought.createdAt)}
          />
          <List.Item.Detail.Metadata.Label
            title="Source"
            text={thought.source}
          />
          <List.Item.Detail.Metadata.Label
            title="Status"
            text={thought.reviewedAt ? "Reviewed" : "Unreviewed"}
          />
        </List.Item.Detail.Metadata>
      }
    />
  );
}
