import { defineManifest } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import packageJson from "./package.json";

const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (_env) => {
  return {
    manifest_version: 3,
    // up to four numbers separated by dots
    version: `${major}.${minor}.${patch}`,
    ...manifest,
  };
});
