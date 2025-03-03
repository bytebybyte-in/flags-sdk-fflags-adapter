import { flag } from "flags/next";
import { createFFlagsAdapter } from "flags-sdk-fflags-adapter";

const adapter = createFFlagsAdapter({
  orgId: "7655eaa6-9aaabd832",
  apiKey: "ff_pub_aaaaa",
  groupName: "frontend",
});

export const beta = flag<boolean, { targetingKey: string }>({
  key: "beta",
  identify: () => ({
    targetingKey: "tushar@fflags.com",
  }),
  adapter: adapter(),
  defaultValue: false,
});
