import { LocalStorage } from "@raycast/api";

const captureTitles = [
  "Tiny Thought, Big Future",
  "Plant This Brain Seed",
  "Catch That Thought",
  "Future You Says Thanks",
  "Save Your Spark",
  "Pocket This Idea",
];

const titleIndexKey = "capture-title-index";

export async function nextCaptureTitle(): Promise<string> {
  const previousIndex = await LocalStorage.getItem<number>(titleIndexKey);
  const titleIndex = ((previousIndex ?? -1) + 1) % captureTitles.length;

  await LocalStorage.setItem(titleIndexKey, titleIndex);

  return captureTitles[titleIndex] ?? "Capture a thought";
}
