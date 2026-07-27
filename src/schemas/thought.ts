import { z } from "zod";

export const ThoughtSourceSchema = z.enum(["text", "voice"]);
export const TranscriptStatusSchema = z.enum(["pending", "complete", "failed"]);

export const ThoughtSchema = z.object({
  id: z.string().min(1),
  content: z.string(),
  source: ThoughtSourceSchema,
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
  reviewedAt: z.iso.datetime({ offset: true }).optional(),
  audioPath: z.string().optional(),
  transcriptStatus: TranscriptStatusSchema.optional(),
});
