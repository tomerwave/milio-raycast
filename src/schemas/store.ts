import { z } from "zod";
import { CURRENT_STORE_VERSION } from "../types/store";
import { ThoughtSchema } from "./thought";

export const MilioStoreSchema = z.object({
  version: z.literal(CURRENT_STORE_VERSION),
  thoughts: z.array(ThoughtSchema),
  lastReviewAt: z.iso.datetime({ offset: true }).optional(),
});

export const LegacyMilioStoreSchema = z
  .object({
    thoughts: z.array(ThoughtSchema),
    lastReviewAt: z.iso.datetime({ offset: true }).optional(),
  })
  .strict();
