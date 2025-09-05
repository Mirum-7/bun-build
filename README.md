# Info

This is a simple library for building projects using Bun.

# Installation

```bash
bun add -d @mirum7/bun-build
```

# Usage

Add `build.config.ts` to the root of your project:

```ts
import { BuildConfig } from "@mirum7/bun-build";

const config: BuildConfig = {
  // your config options here
};

export default config;
```

Then, run the build command:

```bash
bun bun-build
```

# Configuration Options

Same as `BuildConfig` from [`bun`](https://bun.com/docs/bundler).
