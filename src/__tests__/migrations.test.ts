import { describe, expect, it } from "vitest";
import { migrateStore } from "../storage/migrations";

describe("store migrations", () => {
  it("accepts the current schema", () => {
    expect(migrateStore({ version: 1, thoughts: [] })).toEqual({
      version: 1,
      thoughts: [],
    });
  });

  it("adds the version to a legacy schema", () => {
    expect(migrateStore({ thoughts: [] })).toEqual({
      version: 1,
      thoughts: [],
    });
  });

  it("rejects unknown or invalid schemas", () => {
    const invalidValue: unknown = undefined;

    expect(() => migrateStore({ version: 99, thoughts: [] })).toThrow();
    expect(() => migrateStore(invalidValue)).toThrow();
  });
});
