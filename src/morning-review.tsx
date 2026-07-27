import { ThoughtList } from "./components/thought-list";
import { useThoughts } from "./hooks/use-thoughts";

export default function MorningReview() {
  const thoughts = useThoughts();

  return (
    <ThoughtList
      {...thoughts}
      morning
      onChanged={thoughts.refresh}
      store={thoughts.store ?? { version: 1, thoughts: [] }}
    />
  );
}
