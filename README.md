# @bytebybyte-in/flags-sdk-fflags-adapter

## Installation

```
npm install flags @bytebybyte-in/flags-sdk-fflags-adapter
```

## Usage

```ts
import { flag } from 'flags';
import { createFFlagsAdapter } from '@bytebybyte-in/flags-sdk-fflags-adapter';

const fflagsAdapter = createFFlagsAdapter({
  orgId: "7655eaa6-9aaabd832",
  apiKey: "ff_pub_aaaaa",
  groupName: "frontend",
});

export const beta = flag<boolean, { targetingKey: string }>({
  key: "beta",
  identify: () => ({
    targetingKey: "tushar@fflags.com",
  }),
  adapter: fflagsAdapter(),
  defaultValue: false,
});
```

To use the feature flag, you can check out [flags-sdk documentation](https://flags-sdk.dev/docs/getting-started/next).
