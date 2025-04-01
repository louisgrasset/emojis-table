import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import logUpdate from "log-update";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = `${__dirname}/../`;

const BROWSERS = ["firefox", "chromium"];

if (!BROWSERS.includes(process.env?.BROWSER)) {
  throw new Error(`Browser target not supported.`);
}

const browser = process.env.BROWSER;
const commonManifest = {
  name: "Emojis table",
  description: "Get the right emojis from your browser in any tab!",
  action: {
    default_popup: "index.html",
  },
  icons: {
    16: "icons/icon-16.png",
    32: "icons/icon-32.png",
    48: "icons/icon-48.png",
    96: "icons/icon-96.png",
    128: "icons/icon-128.png",
    256: "icons/icon-256.png",
  },
  permissions: ["storage"],
};

const buildManifestFor = (browser) => {
  logUpdate(`Building manifest for ${browser}`);
  if (browser === "firefox") {
    logUpdate(`Manifest built for ${browser}`);
    return {
      ...commonManifest,
      browser_specific_settings: {
        gecko: {
          id: "{3c793fa2-eef3-441a-b40e-fa77611b767a}",
          strict_min_version: "109.0",
        },
      },
    };
  }

  if (browser === "chromium") {
    logUpdate(`Manifest built for ${browser}`);
    return {
      ...commonManifest,
    };
  }
};

const manifest = buildManifestFor(browser);
logUpdate.done();
logUpdate(`Writing manifest to file`);
writeFileSync(`${filePath}/manifest.json`, JSON.stringify(manifest), {
  encoding: "utf-8",
});
logUpdate(`Manifest written to file`);
