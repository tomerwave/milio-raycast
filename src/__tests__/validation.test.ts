import { describe, expect, it } from "vitest";
import { isValidContent, normalizeContent } from "../domain/content";
import { MilioStoreSchema } from "../schemas/store";

describe("validation", () => {
  it("normalizes and validates content", () => {
    expect(normalizeContent("  thought  ")).toBe("thought");
    expect(isValidContent(" ".repeat(3))).toBe(false);
    expect(isValidContent("thought")).toBe(true);
  });

  it("rejects malformed stores", () => {
    expect(
      MilioStoreSchema.safeParse({ version: 1, thoughts: [{ id: "x" }] })
        .success,
    ).toBe(false);
    expect(
      MilioStoreSchema.safeParse({ version: 2, thoughts: [] }).success,
    ).toBe(false);
  });
});
