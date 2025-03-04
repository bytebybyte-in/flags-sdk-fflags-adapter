import { dedupe, flag } from "flags/next";
import { createFFlagsAdapter } from "@bytebybyte-in/flags-sdk-fflags-adapter";

const adapter = createFFlagsAdapter({
  orgId: "7655eaa6-9aaabd832",
  apiKey: "ff_pub_aaaaa",
  groupName: "frontend",
});

const identify = dedupe(() => ({
  targetingKey: "tushar@fflags.com",
}));

export const beta = flag<boolean, { targetingKey: string }>({
  key: "beta",
  identify,
  adapter: adapter(),
  defaultValue: false,
});
