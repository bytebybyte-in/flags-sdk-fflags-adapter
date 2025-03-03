import { describe, it, expect } from "vitest";
import { createFFlagsAdapter } from ".";

describe("createFFlagsAdapter", () => {
  it("should pass", () => {
    const adapter = createFFlagsAdapter({
      apiKey: "ff_pub_aaaaa",
      groupName: "test",
      orgId: "org_12345",
    });

    expect(adapter).toBeDefined();
  });
});
