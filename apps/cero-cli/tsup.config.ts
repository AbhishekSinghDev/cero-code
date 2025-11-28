import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  minify: true,
  // Bundle workspace packages but keep OpenTUI external
  external: ["@opentui/core", "@opentui/react"],
  noExternal: ["@cerocode/constants"], // Bundle this workspace package
  banner: {
    js: "#!/usr/bin/env bun",
  },
});
