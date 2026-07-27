export type ThoughtSource = "text" | "voice";

export type TranscriptStatus = "pending" | "complete" | "failed";

export interface Thought {
  id: string;
  content: string;
  source: ThoughtSource;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  audioPath?: string;
  transcriptStatus?: TranscriptStatus;
}
